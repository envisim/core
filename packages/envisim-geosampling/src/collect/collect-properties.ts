import {v4 as uuidv4} from 'uuid';

import {
  type AreaObject,
  Feature,
  FeatureCollection,
  Geodesic,
  type LineObject,
  type PointObject,
  type PropertyRecord,
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
  Object.keys(opts.properties).forEach((key) => {
    const property = opts.properties[key];

    // Type must be numerical
    if (property.type === 'numerical') {
      if (Array.isArray(property.parent)) {
        // Collect from categorical variable
        const [id, value] = property.parent;

        // Only collect if value is equal to value
        if (from.properties[id] === value) {
          to.properties[key] += opts.intersectSize * factor;
        }
      } else {
        // Collect from numerical (same key)
        to.properties[key] += from.properties[key] * opts.intersectSize * factor;
      }
    }
  });
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
  Object.keys(rec).forEach((key) => {
    const property = rec[key];
    if (property.type === 'numerical') {
      const id = property.parent ? property.parent[0] : property.id;
      if (!Object.hasOwn(base.propertyRecord, id)) {
        throw new Error('Property to collect does not exist in the baseLayer property record.');
      }
    } else {
      // Categorical properties should not exist in this record
      throw new Error('Property record to collect cannot contain categorical properties.');
    }
    if (Object.hasOwn(frame.propertyRecord, key)) {
      throw new Error('Property to collect already exist in the frameLayer property record.');
    }
  });

  // Add new properties to new collection
  // and property record.
  Object.keys(rec).forEach((key) => {
    // Initialize each with value 0
    frame.initProperty(key, 0.0);

    // Add to the record
    newCollection.propertyRecord[key] = rec[key];
  });

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
  const newRecord: PropertyRecord = {};

  properties.forEach((key) => {
    // Check that the properties to collect are present in the record
    if (!Object.hasOwn(propertyRecord, key)) {
      throw new Error('Property to collect does not exist in the property record.');
    }

    // Get record of the property
    const rec = propertyRecord[key];

    if (rec.type === 'numerical') {
      // Keep old id
      const newId = rec.id;

      newRecord[newId] = {
        id: newId,
        type: 'numerical',
        name: rec.name,
      };
    } else if (rec.type === 'categorical') {
      // Create new record for each category

      rec.values.forEach((value: string, i: number) => {
        // Generate new id
        const newId = uuidv4();

        // Store also parent id, index
        newRecord[newId] = {
          id: newId,
          type: 'numerical',
          name: rec.name + '-' + value,
          parent: [rec.id, i],
        };
      });
    }
  });

  return newRecord;
}
