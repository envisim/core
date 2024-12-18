import {v4 as uuid} from 'uuid';

import {
  type AreaObject,
  Feature,
  FeatureCollection,
  Geodesic,
  type LineObject,
  type PointObject,
  PropertyRecord,
  intersectAreaAreaGeometries,
  intersectLineAreaGeometries,
  intersectLineLineGeometries,
  intersectPointAreaGeometries,
} from '@envisim/geojson-utils';

import {projectedLengthOfGeometry} from '../utils/index.js';

// A type for an object to hold all the data we need to aggregate from
// one feature to another.
type AggregateOpts = {
  intersectSize: number;
  properties: PropertyRecord;
};

/**
 * A function to aggregate properties from a features to another.
 * @param to the feature to aggregate to.
 * @param from the feature to aggregate from.
 * @param opts object with additional information needed to aggregate properties.
 */
function aggregateInPlace(
  to: Feature<AreaObject | LineObject | PointObject>,
  from: Feature<AreaObject | LineObject | PointObject>,
  opts: AggregateOpts,
): void {
  // If line collects from line an additional factor is needed
  let factor = 1;
  if (Feature.isLine(from) && Feature.isLine(to)) {
    if (to.properties?.['_randomRotation'] === 1) {
      // Here the line that collects can be any curve,
      // as long as it has been randomly rotated.
      factor = Math.PI / (2.0 * from.geometry.length());
    } else {
      // Here the line that collects should be straight,
      // which is why we can use the first segment of the line
      // to find the direction of the line.
      let azimuth = 0;
      if (to.geometry.type === 'LineString') {
        azimuth = Geodesic.forwardAzimuth(to.geometry.coordinates[0], to.geometry.coordinates[1]);
      } else if (to.geometry.type === 'MultiLineString') {
        azimuth = Geodesic.forwardAzimuth(
          to.geometry.coordinates[0][0],
          to.geometry.coordinates[0][1],
        );
      }
      factor = 1.0 / projectedLengthOfGeometry(from.geometry, azimuth);
    }
  }

  // Go through all the properties and aggregate them.
  // All new properties are of type numerical.
  for (const property of opts.properties.getRecord()) {
    const id = property.id;
    // Type must be numerical
    if (PropertyRecord.propertyIsNumerical(property)) {
      if (Array.isArray(property.parent)) {
        // Collect from categorical variable
        const [id, value] = property.parent;

        // Only collect if value is equal to value
        if (from.properties[id] === value) {
          (to.properties[id] as number) += opts.intersectSize * factor;
        }
      } else {
        // Collect from numerical (same key)
        (to.properties[id] as number) +=
          (from.properties[id] as number) * opts.intersectSize * factor;
      }
    }
  }
}

/**
 * Collect properties to a frame layer from a base layer, given an
 * array of properties to be collected. Categorical properties are collected as
 * multiple numerical properties, one for each category.
 * @param frame
 * @param base
 * @param properties
 * @returns collection
 */
export function collectProperties(
  frame: FeatureCollection<PointObject>,
  base: FeatureCollection<AreaObject>,
  properties: string[] | PropertyRecord,
): FeatureCollection<PointObject>;
export function collectProperties(
  frame: FeatureCollection<LineObject>,
  base: FeatureCollection<AreaObject> | FeatureCollection<LineObject>,
  properties: string[] | PropertyRecord,
): FeatureCollection<LineObject>;
export function collectProperties(
  frame: FeatureCollection<AreaObject>,
  base:
    | FeatureCollection<AreaObject>
    | FeatureCollection<LineObject>
    | FeatureCollection<PointObject>,
  properties: string[] | PropertyRecord,
): FeatureCollection<AreaObject>;
export function collectProperties(
  frame:
    | FeatureCollection<AreaObject>
    | FeatureCollection<LineObject>
    | FeatureCollection<PointObject>,
  base:
    | FeatureCollection<AreaObject>
    | FeatureCollection<LineObject>
    | FeatureCollection<PointObject>,
  properties: string[] | PropertyRecord,
): FeatureCollection<AreaObject> | FeatureCollection<LineObject> | FeatureCollection<PointObject> {
  // Make a full copy of the frame layer
  const newCollection = frame.copy(false);
  // const newLayer = new Layer(frameLayer.collection, frameLayer.propertyRecord, false);

  // The property record of new properties to collect
  const rec =
    Array.isArray(properties) === true
      ? collectPropertyRecord(base.propertyRecord, properties)
      : properties;

  // Check that the properties to collect are present in the baseLayer record
  // and not in the frameLayer record.
  for (const property of rec.getRecord()) {
    if (!PropertyRecord.propertyIsNumerical(property)) {
      // Categorical properties should not exist in this record
      throw new Error('Property record to collect must only contain numerical properties.');
    }

    const id = property.parent ? property.parent[0] : property.id;
    if (!base.propertyRecord.hasId(id)) {
      throw new Error('Property to collect does not exist in the baseLayer property record.');
    }

    if (frame.propertyRecord.hasId(property.id)) {
      throw new Error('Property to collect already exist in the frameLayer property record.');
    }

    // Add new properties to new collection and property record.
    // Initialize each with value 0
    frame.initProperty(property.id, 0.0);
    // Add to the record
    newCollection.propertyRecord.addNumerical(property);
  }

  // Do the collect for the different cases.
  if (FeatureCollection.isPoint(frame) && FeatureCollection.isArea(base)) {
    // Points collect from areas.
    intersectFeatures(frame.features, base.features, intersectPointAreaGeometries, rec);
    return newCollection;
  }

  if (FeatureCollection.isLine(frame)) {
    if (FeatureCollection.isLine(base)) {
      // Lines collect from lines.
      intersectFeatures(frame.features, base.features, intersectLineLineGeometries, rec);
      return newCollection;
    }

    if (FeatureCollection.isArea(base)) {
      // Lines collect from areas.
      intersectFeatures(frame.features, base.features, intersectLineAreaGeometries, rec);
      return newCollection;
    }
  }

  FeatureCollection.assertArea(frame);

  if (FeatureCollection.isPoint(base)) {
    intersectFeatures(
      frame.features,
      base.features,
      (f, b) => intersectPointAreaGeometries(b, f),
      rec,
    );
    return newCollection;
  }

  if (FeatureCollection.isLine(base)) {
    // Areas collect from lines.
    intersectFeatures(
      frame.features,
      base.features,
      (f, b) => intersectLineAreaGeometries(b, f),
      rec,
    );
    return newCollection;
  }

  FeatureCollection.assertArea(base);

  intersectFeatures(frame.features, base.features, intersectAreaAreaGeometries, rec);
  return newCollection;
}

function intersectFeatures<
  F extends AreaObject | LineObject | PointObject,
  B extends AreaObject | LineObject | PointObject,
>(
  frame: Feature<F>[],
  base: Feature<B>[],
  intersectFunction: (a: F, b: B) => AreaObject | LineObject | PointObject | null,
  rec: PropertyRecord,
) {
  frame.forEach((frameFeature) => {
    base.forEach((baseFeature) => {
      const intersect = intersectFunction(frameFeature.geometry, baseFeature.geometry);

      if (intersect === null) return;
      const intersectSize = intersect.measure();
      aggregateInPlace(frameFeature, baseFeature, {
        intersectSize,
        properties: rec,
      });
    });
  });
}

/**
 * Derives the resulting property record of collected properties.
 * This property record needs to be merged with the existing
 * property record for a complete record of properties available
 * after a collect operation. Merge is done automatically when
 * using collectProperties.
 *
 * @param propertyRecord the property record to collect from.
 * @param properties the ids of the properties to collect.
 * @returns the property record collected properties.
 */
export function collectPropertyRecord(
  propertyRecord: PropertyRecord,
  properties: string[],
): PropertyRecord {
  // Collected numerical properties keep their original id,
  // but categorical properties recieve new id for each category.
  const newRecord = new PropertyRecord();

  for (const id of properties) {
    const rec = propertyRecord.getId(id);
    if (rec === null) {
      throw new Error(`Property ${id} to collect does not exist in the property record.`);
    }

    if (PropertyRecord.propertyIsCategorical(rec)) {
      // Create new record for each category
      rec.values.forEach((value: string, i: number) => {
        // Generate new id

        // Store also parent id, index
        newRecord.addNumerical({
          id: uuid(),
          name: rec.name + '-' + value,
          parent: [rec.id, i],
        });
      });
    } else {
      newRecord.addNumerical({id: rec.id, name: rec.name});
    }
  }

  return newRecord;
}
