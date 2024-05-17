import {v4 as uuidv4} from 'uuid';

import {
  AreaCollection,
  AreaFeature,
  Geodesic,
  type IPropertyRecord,
  Layer,
  LineCollection,
  LineFeature,
  PointCollection,
  PointFeature,
  intersectAreaAreaFeatures,
  intersectLineAreaFeatures,
  intersectLineLineFeatures,
  intersectPointAreaFeatures,
} from '@envisim/geojson-utils';

import {projectedLengthOfFeature} from './projectedLengthOfFeature.js';

// A type for an object to hold all the data we need to aggregate from
// one feature to another.
type AggregateOpts = {
  intersectSize: number;
  propertyRecord: IPropertyRecord;
  idMap: Record<string, string>;
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
  Object.keys(opts.propertyRecord).forEach((key) => {
    const property = opts.propertyRecord[key];

    if (to.properties && from.properties) {
      if (property.type === 'numerical') {
        const newId = opts.idMap[property.id];
        to.properties[newId] +=
          from.properties[property.id] * opts.intersectSize * factor;
      }
      if (property.type === 'categorical') {
        const getNewId =
          property.id + '-' + property.values[from.properties[property.id]];
        const newId = opts.idMap[getNewId];
        to.properties[newId] += opts.intersectSize * factor;
      }
    }
  });
}

/**
 * Collect properties to a frame layer from a base layer, given a
 * record of properties to be collected. Categorical properties are collected as
 * multiple numerical properties, one for each category.
 * @param frameLayer
 * @param baseLayer
 * @param propertyRecord
 * @returns a new layer
 */
export function collectProperties(
  frameLayer: Layer<PointCollection>,
  baseLayer: Layer<AreaCollection>,
  propertyRecord: IPropertyRecord,
): Layer<PointCollection>;
export function collectProperties(
  frameLayer: Layer<LineCollection>,
  baseLayer: Layer<LineCollection | AreaCollection>,
  propertyRecord: IPropertyRecord,
): Layer<LineCollection>;
export function collectProperties(
  frameLayer: Layer<AreaCollection>,
  baseLayer: Layer<PointCollection | LineCollection | AreaCollection>,
  propertyRecord: IPropertyRecord,
): Layer<AreaCollection>;
export function collectProperties(
  frameLayer: Layer<PointCollection | LineCollection | AreaCollection>,
  baseLayer: Layer<PointCollection | LineCollection | AreaCollection>,
  propertyRecord: IPropertyRecord,
): Layer<PointCollection | LineCollection | AreaCollection> {
  // Make a full copy of the frame layer
  const newLayer = new Layer(
    frameLayer.collection,
    frameLayer.propertyRecord,
    false,
  );
  const frame = newLayer.collection;
  const base = baseLayer.collection;

  // Check that the properties to collect are present in the baseLayer record
  Object.keys(propertyRecord).forEach((key) => {
    if (!Object.hasOwn(baseLayer.propertyRecord, key)) {
      throw new Error(
        'Property to collect does not exist in the baseLayer property record.',
      );
    }
  });

  // Create an id map from input properties to output properties
  // and a record of new (numerical) properties. If the property to
  // be collected is categorical, the new id is found by "id-value".
  // The new name is name-value, e.g. landuse-forest. A new property
  // is created for each value.

  const idMap: Record<string, string> = {};
  const newProperties: IPropertyRecord = {};
  Object.keys(propertyRecord).forEach((id: string) => {
    const property = propertyRecord[id];
    if (property.type === 'numerical') {
      idMap[property.id] = uuidv4();
      const newId = idMap[property.id];
      newProperties[newId] = {
        id: newId,
        type: 'numerical',
        name: property.name,
      };
    } else if (property.type === 'categorical') {
      property.values.forEach((value: string) => {
        const getNewID = property.id + '-' + value;
        idMap[getNewID] = uuidv4();
        const newId = idMap[getNewID];
        newProperties[newId] = {
          id: newId,
          type: 'numerical',
          name: property.name + '-' + value,
        };
      });
    }
  });

  // Add new properties to new collection
  // and property record.
  Object.keys(newProperties).forEach((id: string) => {
    frame.initProperty(id);
    newLayer.propertyRecord[id] = newProperties[id];
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
            propertyRecord,
            idMap,
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
            propertyRecord,
            idMap,
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
            propertyRecord,
            idMap,
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
            propertyRecord,
            idMap,
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
            propertyRecord,
            idMap,
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
            propertyRecord,
            idMap,
          });
        }
      });
    });
    return newLayer;
  }
  throw new Error('Collect operation failed.');
}
