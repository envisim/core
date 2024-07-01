import {v4 as uuidv4} from 'uuid';

import {
  AreaCollection,
  AreaFeature,
  Geodesic,
  Layer,
  LineCollection,
  LineFeature,
  PointCollection,
  PointFeature,
  type PropertyRecord,
  intersectAreaAreaFeatures,
  intersectLineAreaFeatures,
  intersectLineLineFeatures,
  intersectPointAreaFeatures,
} from '@envisim/geojson-utils';

import {projectedLengthOfFeature} from '../utils/index.js';

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
  to: PointFeature,
  from: AreaFeature,
  opts: AggregateOpts,
): void;
function aggregateInPlace(
  to: LineFeature,
  from: LineFeature,
  opts: AggregateOpts,
): void;
function aggregateInPlace(
  to: LineFeature,
  from: AreaFeature,
  opts: AggregateOpts,
): void;
function aggregateInPlace(
  to: AreaFeature,
  from: PointFeature,
  opts: AggregateOpts,
): void;
function aggregateInPlace(
  to: AreaFeature,
  from: LineFeature,
  opts: AggregateOpts,
): void;
function aggregateInPlace(
  to: AreaFeature,
  from: AreaFeature,
  opts: AggregateOpts,
): void;
function aggregateInPlace(
  to: PointFeature | LineFeature | AreaFeature,
  from: PointFeature | LineFeature | AreaFeature,
  opts: AggregateOpts,
): void {
  // If line collects from line an additional factor is needed
  let factor = 1;
  if (LineFeature.isFeature(from) && LineFeature.isFeature(to)) {
    if (to.properties?.['_randomRotation'] === 1) {
      // Here the line that collects can be any curve,
      // as long as it has been randomly rotated.
      factor = Math.PI / (2 * from.length());
    } else {
      // Here the line that collects should be straight,
      // which is why we can use the first segment of the line
      // to find the direction of the line.
      let azimuth = 0;
      if (to.geometry.type === 'LineString') {
        azimuth = Geodesic.forwardAzimuth(
          to.geometry.coordinates[0],
          to.geometry.coordinates[1],
        );
      } else if (to.geometry.type === 'MultiLineString') {
        azimuth = Geodesic.forwardAzimuth(
          to.geometry.coordinates[0][0],
          to.geometry.coordinates[0][1],
        );
      }
      factor = 1 / projectedLengthOfFeature(from, azimuth);
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
        to.properties[key] +=
          from.properties[key] * opts.intersectSize * factor;
      }
    }
  });
}

/**
 * Collect properties to a frame layer from a base layer, given an
 * array of properties to be collected. Categorical properties are collected as
 * multiple numerical properties, one for each category.
 * @param frameLayer
 * @param baseLayer
 * @param propertyRecord
 * @returns a new layer
 */
export function collectProperties(
  frameLayer: Layer<PointCollection>,
  baseLayer: Layer<AreaCollection>,
  properties: string[] | PropertyRecord,
): Layer<PointCollection>;
export function collectProperties(
  frameLayer: Layer<LineCollection>,
  baseLayer: Layer<LineCollection | AreaCollection>,
  properties: string[] | PropertyRecord,
): Layer<LineCollection>;
export function collectProperties(
  frameLayer: Layer<AreaCollection>,
  baseLayer: Layer<PointCollection | LineCollection | AreaCollection>,
  properties: string[] | PropertyRecord,
): Layer<AreaCollection>;
export function collectProperties(
  frameLayer: Layer<PointCollection | LineCollection | AreaCollection>,
  baseLayer: Layer<PointCollection | LineCollection | AreaCollection>,
  properties: string[] | PropertyRecord,
): Layer<PointCollection | LineCollection | AreaCollection> {
  // Make a full copy of the frame layer
  const newLayer = new Layer(
    frameLayer.collection,
    frameLayer.propertyRecord,
    false,
  );
  const frame = newLayer.collection;
  const base = baseLayer.collection;

  // The property record of new properties to collect
  const rec =
    Array.isArray(properties) === true
      ? collectPropertyRecord(baseLayer.propertyRecord, properties)
      : properties;

  // Check that the properties to collect are present in the baseLayer record
  // and not in the frameLayer record.
  Object.keys(rec).forEach((key) => {
    const property = rec[key];
    if (property.type === 'numerical') {
      const id = property.parent ? property.parent[0] : property.id;
      if (!Object.hasOwn(baseLayer.propertyRecord, id)) {
        throw new Error(
          'Property to collect does not exist in the baseLayer property record.',
        );
      }
    } else {
      // Categorical properties should not exist in this record
      throw new Error(
        'Property record to collect cannot contain categorical properties.',
      );
    }
    if (Object.hasOwn(frameLayer.propertyRecord, key)) {
      throw new Error(
        'Property to collect already exist in the frameLayer property record.',
      );
    }
  });

  // Add new properties to new collection
  // and property record.
  Object.keys(rec).forEach((key) => {
    // Initialize each with value 0
    frame.initProperty(key, 0);

    // Add to the record
    newLayer.propertyRecord[key] = rec[key];
  });

  // Do the collect for the different cases.
  if (
    PointCollection.isCollection(frame) &&
    AreaCollection.isCollection(base)
  ) {
    // Points collect from areas.
    frame.features.forEach((frameFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectPointAreaFeatures(frameFeature, baseFeature);
        if (intersect) {
          const intersectSize = intersect.count();
          aggregateInPlace(frameFeature, baseFeature, {
            intersectSize,
            properties: rec,
          });
        }
      });
    });
    return newLayer;
  }

  if (LineCollection.isCollection(frame) && LineCollection.isCollection(base)) {
    // Lines collect from lines.
    frame.features.forEach((frameFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineLineFeatures(frameFeature, baseFeature);
        if (intersect) {
          const intersectSize = intersect.count();
          aggregateInPlace(frameFeature, baseFeature, {
            intersectSize,
            properties: rec,
          });
        }
      });
    });
    return newLayer;
  }

  if (LineCollection.isCollection(frame) && AreaCollection.isCollection(base)) {
    // Lines collect from areas.
    frame.features.forEach((frameFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineAreaFeatures(frameFeature, baseFeature);
        if (intersect) {
          const intersectSize = intersect.length();
          aggregateInPlace(frameFeature, baseFeature, {
            intersectSize,
            properties: rec,
          });
        }
      });
    });
    return newLayer;
  }

  if (
    AreaCollection.isCollection(frame) &&
    PointCollection.isCollection(base)
  ) {
    // Areas collect from points.
    frame.features.forEach((frameFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectPointAreaFeatures(baseFeature, frameFeature);
        if (intersect) {
          const intersectSize = intersect.count();
          aggregateInPlace(frameFeature, baseFeature, {
            intersectSize,
            properties: rec,
          });
        }
      });
    });
    return newLayer;
  }

  if (AreaCollection.isCollection(frame) && LineCollection.isCollection(base)) {
    // Areas collect from lines.
    frame.features.forEach((frameFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineAreaFeatures(baseFeature, frameFeature);
        if (intersect) {
          const intersectSize = intersect.length();
          aggregateInPlace(frameFeature, baseFeature, {
            intersectSize,
            properties: rec,
          });
        }
      });
    });
    return newLayer;
  }

  if (AreaCollection.isCollection(frame) && AreaCollection.isCollection(base)) {
    // Areas collect from areas.
    frame.features.forEach((frameFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectAreaAreaFeatures(frameFeature, baseFeature);
        if (intersect) {
          const intersectSize = intersect.area();
          aggregateInPlace(frameFeature, baseFeature, {
            intersectSize,
            properties: rec,
          });
        }
      });
    });
    return newLayer;
  }
  throw new Error('Collect operation failed.');
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
      throw new Error(
        'Property to collect does not exist in the property record.',
      );
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
