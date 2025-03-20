import {v4 as uuid} from 'uuid';

import {
  type AreaObject,
  Feature,
  FeatureCollection,
  type LineObject,
  type PointObject,
  PropertyRecord,
  type PureObject,
  type RetractingObject,
  intersectAreaAreaGeometries,
  intersectLineAreaGeometries,
  intersectPointAreaGeometries,
} from '@envisim/geojson-utils';

// A type for an object to hold all the data we need to aggregate from
// one feature to another.
type AggregateOpts = {
  intersectSize: number;
  collectProperties: PropertyRecord;
  fromProperties: PropertyRecord;
};

/**
 * A function to aggregate properties from a features to another.
 * @param to the feature to aggregate to.
 * @param from the feature to aggregate from.
 * @param opts object with additional information needed to aggregate properties.
 */
function aggregateInPlace(
  to: Feature<PureObject>,
  from: Feature<PureObject>,
  opts: AggregateOpts,
): void {
  // Go through all the properties and aggregate them.
  // All new properties are of type numerical.
  for (const property of opts.collectProperties.getRecord()) {
    const id = property.id;
    // Type must be numerical
    if (PropertyRecord.isNumerical(property)) {
      if (Array.isArray(property.parent)) {
        // Collect from categorical variable
        const [fromID, index] = property.parent;
        const fromProperty = opts.fromProperties.getId(fromID);
        if (fromProperty !== null && fromProperty.type === 'categorical') {
          const value = fromProperty.values[index];
          // Only collect if value is equal to value
          if (from.properties[fromID] === value) {
            (to.properties[id] as number) += opts.intersectSize / to.measure();
          }
        }
      } else {
        // Collect from numerical (same key)
        (to.properties[id] as number) +=
          ((from.properties[id] as number) * opts.intersectSize) / to.measure();
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
export function collectProperties<PF extends string, PB extends string, GF extends PureObject>(
  frame: FeatureCollection<GF, PF>,
  base: FeatureCollection<RetractingObject<GF>, PB>,
  properties: PB[] | PropertyRecord<PB>,
): FeatureCollection<GF, PF | string> {
  // Make a full copy of the frame layer
  const rec =
    Array.isArray(properties) === true
      ? collectPropertyRecord(base.propertyRecord, properties)
      : properties;

  const newCollection = frame.copy(false) as FeatureCollection<GF, PF | string>;
  newCollection.propertyRecord = new PropertyRecord({
    ...frame.propertyRecord.record,
    ...rec.record,
  });

  // The property record of new properties to collect

  // Check that the properties to collect are present in the baseLayer record
  // and not in the frameLayer record.
  for (const property of rec.getRecord()) {
    if (!PropertyRecord.isNumerical(property)) {
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
    newCollection.forEach((f: Feature<PureObject, string>) => (f.properties[property.id] = 0.0));
  }

  // Do the collect for the different cases.
  if (FeatureCollection.isPoint(newCollection) && FeatureCollection.isArea(base)) {
    // Points collect from areas.
    intersectFeatures(
      newCollection.features,
      base.features,
      intersectPointAreaGeometries,
      rec,
      base.propertyRecord,
    );
    return newCollection;
  }

  if (FeatureCollection.isLine(newCollection) && FeatureCollection.isArea(base)) {
    // Lines collect from areas.
    intersectFeatures(
      newCollection.features,
      base.features,
      intersectLineAreaGeometries,
      rec,
      base.propertyRecord,
    );
    return newCollection;
  }

  FeatureCollection.assertArea(newCollection);

  if (FeatureCollection.isPoint(base)) {
    intersectFeatures(
      newCollection.features,
      base.features,
      (f, b) => intersectPointAreaGeometries(b, f),
      rec,
      base.propertyRecord,
    );
    return newCollection;
  }

  if (FeatureCollection.isLine(base)) {
    // Areas collect from lines.
    intersectFeatures(
      newCollection.features,
      base.features,
      (f, b) => intersectLineAreaGeometries(b, f),
      rec,
      base.propertyRecord,
    );
    return newCollection;
  }

  FeatureCollection.assertArea(base);

  intersectFeatures(
    newCollection.features,
    base.features,
    intersectAreaAreaGeometries,
    rec,
    base.propertyRecord,
  );
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
  baseRec: PropertyRecord,
) {
  frame.forEach((frameFeature) => {
    base.forEach((baseFeature) => {
      const intersect = intersectFunction(frameFeature.geometry, baseFeature.geometry);

      if (intersect === null) return;
      const intersectSize = intersect.measure();
      aggregateInPlace(frameFeature, baseFeature, {
        intersectSize,
        collectProperties: rec,
        fromProperties: baseRec,
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
export function collectPropertyRecord<P extends string>(
  propertyRecord: PropertyRecord<P>,
  properties: P[],
): PropertyRecord<string> {
  // Collected numerical properties keep their original id,
  // but categorical properties recieve new id for each category.
  const newRecord = new PropertyRecord<string>({});

  for (const id of properties) {
    const rec = propertyRecord.getId(id);
    if (rec === null) {
      throw new Error(`Property ${id} to collect does not exist in the property record.`);
    }

    if (PropertyRecord.isCategorical(rec)) {
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
