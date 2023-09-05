import {
  forwardAzimuth,
  intersectPointAreaFeatures,
  intersectLineLineFeatures,
  intersectLineAreaFeatures,
  intersectAreaAreaFeatures,
  PointFeature,
  LineFeature,
  AreaFeature,
  PointCollection,
  LineCollection,
  AreaCollection,
} from '@envisim/geojson-utils';

import {projectedLengthOfFeature} from './projectedLengthOfFeature.js';

function transferProperties(
  intersect: PointFeature | LineFeature | AreaFeature,
  frameFeature: PointFeature | LineFeature | AreaFeature,
  baseFeature: PointFeature | LineFeature | AreaFeature,
  index: number,
): void {
  // If line collects from line an additional factor is needed
  let factor = 1;
  if (
    LineFeature.isFeature(frameFeature) &&
    LineFeature.isFeature(baseFeature)
  ) {
    if (frameFeature.properties?._randomRotation === true) {
      factor = Math.PI / (2 * baseFeature.length(Infinity));
    } else {
      let azimuth = 0;
      if (frameFeature.geometry.type === 'LineString') {
        azimuth = forwardAzimuth(
          frameFeature.geometry.coordinates[0],
          frameFeature.geometry.coordinates[1],
        );
      } else if (frameFeature.geometry.type === 'MultiLineString') {
        azimuth = forwardAzimuth(
          frameFeature.geometry.coordinates[0][0],
          frameFeature.geometry.coordinates[0][1],
        );
      }
      factor = 1 / projectedLengthOfFeature(baseFeature, azimuth);
    }
  }

  // Transfer all properties from baseFeature to newFeature
  Object.keys(baseFeature.properties).forEach((key) => {
    intersect.properties[key] = baseFeature.properties[key];
  });

  // Transfer designWeight to newFeature from sampleFeature
  if (frameFeature.properties?._designWeight) {
    intersect.properties._designWeight =
      frameFeature.properties._designWeight * factor;
  }
  // Transfer index of parent sample unit as _parent
  intersect.properties._parent = index;
}

/**
 * Collect intersect of features as the new sample from base-collection
 * @param frame
 * @param base
 */
function collectIntersects(
  frame: PointCollection,
  base: AreaCollection,
): PointCollection;
function collectIntersects(
  frame: LineCollection,
  base: LineCollection,
): PointCollection;
function collectIntersects(
  frame: LineCollection,
  base: AreaCollection,
): LineCollection;
function collectIntersects(
  frame: AreaCollection,
  base: PointCollection,
): PointCollection;
function collectIntersects(
  frame: AreaCollection,
  base: LineCollection,
): LineCollection;
function collectIntersects(
  frame: AreaCollection,
  base: AreaCollection,
): AreaCollection;
function collectIntersects(
  frame: PointCollection | LineCollection | AreaCollection,
  base: PointCollection | LineCollection | AreaCollection,
): PointCollection | LineCollection | AreaCollection {
  // The same frame object may be included in multiple intersects
  // as collection is done for each frame feature.

  // frame type, base type => new type
  // point, area => point
  // line, line => point
  // line, area => line
  // area, point => point
  // area, line => line
  // area, area => area

  if (
    PointCollection.isCollection(frame) &&
    AreaCollection.isCollection(base)
  ) {
    const newFeatures: PointFeature[] = [];
    frame.features.forEach((frameFeature, index) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectPointAreaFeatures(frameFeature, baseFeature);
        if (intersect) {
          transferProperties(intersect, frameFeature, baseFeature, index);
          newFeatures.push(intersect);
        }
      });
    });
    return PointCollection.create(newFeatures, true);
  }

  if (LineCollection.isCollection(frame) && LineCollection.isCollection(base)) {
    const newFeatures: PointFeature[] = [];
    frame.features.forEach((frameFeature, index) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineLineFeatures(frameFeature, baseFeature);
        if (intersect) {
          transferProperties(intersect, frameFeature, baseFeature, index);
          newFeatures.push(intersect);
        }
      });
    });
    return PointCollection.create(newFeatures, true);
  }

  if (LineCollection.isCollection(frame) && AreaCollection.isCollection(base)) {
    const newFeatures: LineFeature[] = [];
    frame.features.forEach((frameFeature, index) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineAreaFeatures(frameFeature, baseFeature);
        if (intersect) {
          transferProperties(intersect, frameFeature, baseFeature, index);
          newFeatures.push(intersect);
        }
      });
    });
    return LineCollection.create(newFeatures, true);
  }

  if (
    AreaCollection.isCollection(frame) &&
    PointCollection.isCollection(base)
  ) {
    const newFeatures: PointFeature[] = [];
    frame.features.forEach((frameFeature, index) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectPointAreaFeatures(baseFeature, frameFeature);
        if (intersect) {
          transferProperties(intersect, frameFeature, baseFeature, index);
          newFeatures.push(intersect);
        }
      });
    });
    return PointCollection.create(newFeatures, true);
  }

  if (AreaCollection.isCollection(frame) && LineCollection.isCollection(base)) {
    const newFeatures: LineFeature[] = [];
    frame.features.forEach((frameFeature, index) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineAreaFeatures(baseFeature, frameFeature);
        if (intersect) {
          transferProperties(intersect, frameFeature, baseFeature, index);
          newFeatures.push(intersect);
        }
      });
    });
    return LineCollection.create(newFeatures, true);
  }

  if (AreaCollection.isCollection(frame) && AreaCollection.isCollection(base)) {
    const newFeatures: AreaFeature[] = [];
    frame.features.forEach((frameFeature, index) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectAreaAreaFeatures(frameFeature, baseFeature);
        if (intersect) {
          transferProperties(intersect, frameFeature, baseFeature, index);
          newFeatures.push(intersect);
        }
      });
    });
    return AreaCollection.create(newFeatures, true);
  }

  throw new Error('Unvalid collect operation.');
}
export {collectIntersects};
