import {v4 as uuidv4} from 'uuid';

import {IPropertyRecord} from '@envisim/geojson-utils';
import {
  PointFeature,
  LineFeature,
  AreaFeature,
  PointCollection,
  LineCollection,
  AreaCollection,
  forwardAzimuth,
  intersectLineLineFeatures,
  intersectAreaAreaFeatures,
  intersectLineAreaFeatures,
  intersectPointAreaFeatures,
} from '@envisim/geojson-utils';
import {copy} from '@envisim/utils';

import {projectedLengthOfFeature} from './projectedLengthOfFeature.js';

// So far, a categorical property value is assumed to be a string
// representing the category. This allows us to use a stand-alone
// collection that follows the same structure as a GeoJSON FeatureCollection.
// No risk of id conflicts as collected properties recieve new ids.

// TODO: A helper function is needed to create property records for collections.

// A type for a map from "old" id to "new" id. The ids are the (internal) property names.
type IdMap = {[key: string]: string};

// A type for an object to hold all the data we need to aggregate from
// one feature to another.
type TaggregateOpts = {
  to: PointFeature | LineFeature | AreaFeature;
  from: PointFeature | LineFeature | AreaFeature;
  toSize: number;
  intersectSize: number;
  properties: IPropertyRecord;
  idMap: IdMap;
};

// A function to aggregate properties from a features to another.
const aggregate = (opts: TaggregateOpts) => {
  // If line collects from line an additional factor is needed
  let factor = 1;
  if (LineFeature.isFeature(opts.from) && LineFeature.isFeature(opts.to)) {
    if (opts.to.properties?._randomRotation === true) {
      // Here the line that collects can be any curve,
      // as long as it has been randomly rotated.
      factor = Math.PI / (2 * opts.from.length(Infinity));
    } else {
      // Here the line that collects should be "straight",
      // which is why we can use the first segment of the line
      // to find the direction of the line.
      let azimuth = 0;
      if (opts.to.geometry.type === 'LineString') {
        azimuth = forwardAzimuth(
          opts.to.geometry.coordinates[0],
          opts.to.geometry.coordinates[1],
        );
      } else if (opts.to.geometry.type === 'MultiLineString') {
        azimuth = forwardAzimuth(
          opts.to.geometry.coordinates[0][0],
          opts.to.geometry.coordinates[0][1],
        );
      }
      factor = 1 / projectedLengthOfFeature(opts.from, azimuth);
    }
  }

  // Go through all the properties and aggregate them.
  // All new properties are of type numerical.
  Object.keys(opts.properties).forEach((key) => {
    const property = opts.properties[key];

    if (opts.to.properties && opts.from.properties) {
      if (property.type === 'numerical' && property.id) {
        const newId = opts.idMap[property.id];
        opts.to.properties[newId] +=
          ((opts.from.properties[property.id] * opts.intersectSize) /
            opts.toSize) *
          factor;
      }
      if (property.type === 'categorical' && property.id) {
        const getNewId = property.id + '-' + opts.from.properties[property.id];
        const newId = opts.idMap[getNewId];
        if (opts.to.properties[newId]) {
          opts.to.properties[newId] +=
            (opts.intersectSize / opts.toSize) * factor;
        }
      }
    }
  });
};

// Not sure if we should collect in place or create a new collection.
// If we collect in place, we only need to return a record of the
// added properties. For now we collect in place, and return the same collection,
// together with a record of added properties.

type TcollectWithPoints = {
  properties: IPropertyRecord;
  collection: PointCollection;
};
type TcollectWithLines = {
  properties: IPropertyRecord;
  collection: LineCollection;
};
type TcollectWithAreas = {
  properties: IPropertyRecord;
  collection: AreaCollection;
};

function collectProperties(
  frame: PointCollection,
  base: AreaCollection,
  properties: IPropertyRecord,
): TcollectWithPoints;
function collectProperties(
  frame: LineCollection,
  base: LineCollection | AreaCollection,
  properties: IPropertyRecord,
): TcollectWithLines;
function collectProperties(
  frame: AreaCollection,
  base: PointCollection | LineCollection | AreaCollection,
  properties: IPropertyRecord,
): TcollectWithAreas;
function collectProperties(
  frame: PointCollection | LineCollection | AreaCollection,
  base: PointCollection | LineCollection | AreaCollection,
  properties: IPropertyRecord,
): TcollectWithPoints | TcollectWithLines | TcollectWithAreas {
  // Create an id map from input properties to output properties
  // and a record of new (numerical) properties. If the property to
  // be collected is categorical, the new id is found by "id-value".

  const idMap: IdMap = {};
  const newProperties: IPropertyRecord = {};
  Object.keys(properties).forEach((id: string) => {
    let property = properties[id];
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
      const frameUnitSize = frameFeature.count();
      base.features.forEach((baseFeature) => {
        const intersect = intersectPointAreaFeatures(frameFeature, baseFeature);
        if (intersect) {
          const intersectSize = intersect.count();
          aggregate({
            to: frameFeature,
            from: baseFeature,
            toSize: frameUnitSize,
            intersectSize: intersectSize,
            properties: properties,
            idMap: idMap,
          });
        }
      });
    });
    return {properties: newProperties, collection: frame};
  } else if (
    LineCollection.isCollection(frame) &&
    LineCollection.isCollection(base)
  ) {
    // Lines collect from lines.
    frame.features.forEach((frameFeature) => {
      const frameUnitSize = frameFeature.length(Infinity);
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineLineFeatures(frameFeature, baseFeature);
        if (intersect) {
          const intersectSize = intersect.count();
          aggregate({
            to: frameFeature,
            from: baseFeature,
            toSize: frameUnitSize,
            intersectSize: intersectSize,
            properties: properties,
            idMap: idMap,
          });
        }
      });
    });
    return {properties: newProperties, collection: frame};
  } else if (
    LineCollection.isCollection(frame) &&
    AreaCollection.isCollection(base)
  ) {
    // Lines collect from areas.
    frame.features.forEach((frameFeature) => {
      const frameUnitSize = frameFeature.length(Infinity);
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineAreaFeatures(frameFeature, baseFeature);
        if (intersect) {
          const intersectSize = intersect.length(Infinity);
          aggregate({
            to: frameFeature,
            from: baseFeature,
            toSize: frameUnitSize,
            intersectSize: intersectSize,
            properties: properties,
            idMap: idMap,
          });
        }
      });
    });
    return {properties: newProperties, collection: frame};
  } else if (
    AreaCollection.isCollection(frame) &&
    PointCollection.isCollection(base)
  ) {
    // Areas collect from points.
    frame.features.forEach((frameFeature) => {
      const frameUnitSize = frameFeature.area();
      base.features.forEach((baseFeature) => {
        const intersect = intersectPointAreaFeatures(baseFeature, frameFeature);
        if (intersect) {
          const intersectSize = intersect.count();
          aggregate({
            to: frameFeature,
            from: baseFeature,
            toSize: frameUnitSize,
            intersectSize: intersectSize,
            properties: properties,
            idMap: idMap,
          });
        }
      });
    });
    return {properties: newProperties, collection: frame};
  } else if (
    AreaCollection.isCollection(frame) &&
    LineCollection.isCollection(base)
  ) {
    // Areas collect from lines.
    frame.features.forEach((frameFeature) => {
      const frameUnitSize = frameFeature.area();
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineAreaFeatures(baseFeature, frameFeature);
        if (intersect) {
          const intersectSize = intersect.length(Infinity);
          aggregate({
            to: frameFeature,
            from: baseFeature,
            toSize: frameUnitSize,
            intersectSize: intersectSize,
            properties: properties,
            idMap: idMap,
          });
        }
      });
    });
    return {properties: newProperties, collection: frame};
  } else if (
    AreaCollection.isCollection(frame) &&
    AreaCollection.isCollection(base)
  ) {
    // Areas collect from areas.
    frame.features.forEach((frameFeature) => {
      const sampleUnitSize = frameFeature.area();
      base.features.forEach((baseFeature) => {
        const intersect = intersectAreaAreaFeatures(frameFeature, baseFeature);
        if (intersect) {
          const intersectSize = intersect.area();
          aggregate({
            to: frameFeature,
            from: baseFeature,
            toSize: sampleUnitSize,
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
export {collectProperties};
