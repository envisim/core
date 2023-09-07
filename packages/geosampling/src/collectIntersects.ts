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
      // Here the line that collects can be any curve,
      // as long as it has been randomly rotated.
      factor = Math.PI / (2 * baseFeature.length(Infinity));
    } else {
      // Here the line that collects should be straight,
      // which is why we can use the first segment of the line
      // to find the direction of the line.
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

  // Transfer designWeight to newFeature from frameFeature
  if (frameFeature.properties?._designWeight) {
    intersect.properties._designWeight =
      frameFeature.properties._designWeight * factor;
  }
  // Transfer index of parent frame unit as _parent
  intersect.properties._parent = index;
}

/**
 * Collect intersect of features as the new frame from base-collection
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
  // The same base object may be included in multiple intersects
  // as collection is done for each frame feature.

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
