import {v4 as uuidv4} from 'uuid';

import {IPropertyRecord} from '@envisim/geojson-utils';
import {
  AreaCollection,
  AreaFeature,
  Geodesic,
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

// So far, a categorical property value is assumed to be a string
// representing the category. This allows us to use a stand-alone
// collection that follows the same structure as a GeoJSON FeatureCollection.
// No risk of id conflicts as collected properties recieve new ids.

// TODO: A helper function is needed to create property records for collections.

// A type for an object to hold all the data we need to aggregate from
// one feature to another.
type AggregateOpts = {
  intersectSize: number;
  properties: IPropertyRecord;
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
  Object.keys(opts.properties).forEach((key) => {
    const property = opts.properties[key];

    if (to.properties && from.properties) {
      if (property.type === 'numerical' && property.id) {
        const newId = opts.idMap[property.id];
        to.properties[newId] +=
          from.properties[property.id] * opts.intersectSize * factor;
      }
      if (property.type === 'categorical' && property.id) {
        const getNewId = property.id + '-' + from.properties[property.id];
        const newId = opts.idMap[getNewId];
        if (to.properties[newId]) {
          to.properties[newId] += opts.intersectSize * factor;
        }
      }
    }
  });
}

// Not sure if we should collect in place or create a new collection.
// If we collect in place, then we only need to return a record of the
// added properties. For now we collect in place, and return the same collection,
// together with a record of added properties.

interface TCollect<
  T extends PointCollection | LineCollection | AreaCollection,
> {
  properties: IPropertyRecord;
  collection: T;
}

/**
 * Collect properties to a frame collection from a base collection, given a
 * record of properties to be collected. Categorical properties are collected as
 * multiple numerical properties, one for each category to be collected.
 * @param frame
 * @param base
 * @param properties
 * @returns an object containing the collection and a record of added properties.
 */
export function collectProperties(
  frame: PointCollection,
  base: AreaCollection,
  properties: IPropertyRecord,
): TCollect<PointCollection>;
export function collectProperties(
  frame: LineCollection,
  base: LineCollection | AreaCollection,
  properties: IPropertyRecord,
): TCollect<LineCollection>;
export function collectProperties(
  frame: AreaCollection,
  base: PointCollection | LineCollection | AreaCollection,
  properties: IPropertyRecord,
): TCollect<AreaCollection>;
export function collectProperties(
  frame: PointCollection | LineCollection | AreaCollection,
  base: PointCollection | LineCollection | AreaCollection,
  properties: IPropertyRecord,
): TCollect<PointCollection | LineCollection | AreaCollection> {
  // Create an id map from input properties to output properties
  // and a record of new (numerical) properties. If the property to
  // be collected is categorical, the new id is found by "id-value".

  const idMap: Record<string, string> = {};
  const newProperties: IPropertyRecord = {};
  Object.keys(properties).forEach((id: string) => {
    const property = properties[id];
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

  // Add new properties to input frame.
  Object.keys(newProperties).forEach((id: string) => {
    frame.initProperty(id);
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
            intersectSize: intersectSize,
            properties: properties,
            idMap: idMap,
          });
        }
      });
    });
    return {properties: newProperties, collection: frame};
  }

  if (LineCollection.isCollection(frame) && LineCollection.isCollection(base)) {
    // Lines collect from lines.
    frame.features.forEach((frameFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineLineFeatures(frameFeature, baseFeature);
        if (intersect) {
          const intersectSize = intersect.count();
          aggregateInPlace(frameFeature, baseFeature, {
            intersectSize: intersectSize,
            properties: properties,
            idMap: idMap,
          });
        }
      });
    });
    return {properties: newProperties, collection: frame};
  }

  if (LineCollection.isCollection(frame) && AreaCollection.isCollection(base)) {
    // Lines collect from areas.
    frame.features.forEach((frameFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineAreaFeatures(frameFeature, baseFeature);
        if (intersect) {
          const intersectSize = intersect.length();
          aggregateInPlace(frameFeature, baseFeature, {
            intersectSize: intersectSize,
            properties: properties,
            idMap: idMap,
          });
        }
      });
    });
    return {properties: newProperties, collection: frame};
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
            intersectSize: intersectSize,
            properties: properties,
            idMap: idMap,
          });
        }
      });
    });
    return {properties: newProperties, collection: frame};
  }

  if (AreaCollection.isCollection(frame) && LineCollection.isCollection(base)) {
    // Areas collect from lines.
    frame.features.forEach((frameFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineAreaFeatures(baseFeature, frameFeature);
        if (intersect) {
          const intersectSize = intersect.length();
          aggregateInPlace(frameFeature, baseFeature, {
            intersectSize: intersectSize,
            properties: properties,
            idMap: idMap,
          });
        }
      });
    });
    return {properties: newProperties, collection: frame};
  }

  if (AreaCollection.isCollection(frame) && AreaCollection.isCollection(base)) {
    // Areas collect from areas.
    frame.features.forEach((frameFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectAreaAreaFeatures(frameFeature, baseFeature);
        if (intersect) {
          const intersectSize = intersect.area();
          aggregateInPlace(frameFeature, baseFeature, {
            intersectSize: intersectSize,
            properties: properties,
            idMap: idMap,
          });
        }
      });
    });
    return {properties: newProperties, collection: frame};
  }
  throw new Error('Invalid collect operation.');
}
