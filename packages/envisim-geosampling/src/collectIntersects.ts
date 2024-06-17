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
import {copy} from '@envisim/utils';

import {projectedLengthOfFeature} from './projectedLengthOfFeature.js';

/**
 * Internal function to transfer properties in place to the intersect from the
 * base feature and transfer _designWeight and _parent to the intersect from
 * the frame feature.
 * @param intersect
 * @param frameFeature
 * @param baseFeature
 * @param index
 */
function transferPropertiesInPlace(
  intersect: PointFeature,
  frameFeature: PointFeature,
  baseFeature: AreaFeature,
  index: number,
): void;
function transferPropertiesInPlace(
  intersect: PointFeature,
  frameFeature: LineFeature,
  baseFeature: LineFeature,
  index: number,
): void;
function transferPropertiesInPlace(
  intersect: LineFeature,
  frameFeature: LineFeature,
  baseFeature: AreaFeature,
  index: number,
): void;
function transferPropertiesInPlace(
  intersect: PointFeature,
  frameFeature: AreaFeature,
  baseFeature: PointFeature,
  index: number,
): void;
function transferPropertiesInPlace(
  intersect: LineFeature,
  frameFeature: AreaFeature,
  baseFeature: LineFeature,
  index: number,
): void;
function transferPropertiesInPlace(
  intersect: AreaFeature,
  frameFeature: AreaFeature,
  baseFeature: AreaFeature,
  index: number,
): void;
function transferPropertiesInPlace(
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
    if (frameFeature.properties?.['_randomRotation'] === 1) {
      // Here the line that collects can be any curve,
      // as long as it has been randomly rotated.
      factor = Math.PI / (2 * baseFeature.length());
    } else {
      // Here the line that collects should be straight,
      // which is why we can use the first segment of the line
      // to find the direction of the line.
      let azimuth = 0;
      if (frameFeature.geometry.type === 'LineString') {
        azimuth = Geodesic.forwardAzimuth(
          frameFeature.geometry.coordinates[0],
          frameFeature.geometry.coordinates[1],
        );
      } else if (frameFeature.geometry.type === 'MultiLineString') {
        azimuth = Geodesic.forwardAzimuth(
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
  if (frameFeature.properties?.['_designWeight']) {
    intersect.properties['_designWeight'] =
      frameFeature.properties['_designWeight'] * factor;
  }
  // Transfer index of parent frame unit as _parent
  intersect.properties['_parent'] = index;
}

/**
 * Internal function to fix the property record.
 * @param record
 */
function updateRecordInPlace(record: PropertyRecord): void {
  //Add design props to the record
  record['_designWeight'] = {
    id: '_designWeight',
    name: '_designWeight',
    type: 'numerical',
  };
  record['_parent'] = {
    id: '_parent',
    name: '_parent',
    type: 'numerical',
  };
}

/**
 * Collect intersect of features as the new frame from base-collection.
 * @param frameLayer
 * @param baseLayer
 */
export function collectIntersects(
  frameLayer: Layer<PointCollection>,
  baseLayer: Layer<AreaCollection>,
): Layer<PointCollection>;
export function collectIntersects(
  frameLayer: Layer<LineCollection>,
  baseLayer: Layer<LineCollection>,
): Layer<PointCollection>;
export function collectIntersects(
  frameLayer: Layer<LineCollection>,
  baseLayer: Layer<AreaCollection>,
): Layer<LineCollection>;
export function collectIntersects(
  frameLayer: Layer<AreaCollection>,
  baseLayer: Layer<PointCollection>,
): Layer<PointCollection>;
export function collectIntersects(
  frameLayer: Layer<AreaCollection>,
  baseLayer: Layer<LineCollection>,
): Layer<LineCollection>;
export function collectIntersects(
  frameLayer: Layer<AreaCollection>,
  baseLayer: Layer<AreaCollection>,
): Layer<AreaCollection>;
export function collectIntersects(
  frameLayer: Layer<PointCollection | LineCollection | AreaCollection>,
  baseLayer: Layer<PointCollection | LineCollection | AreaCollection>,
): Layer<PointCollection | LineCollection | AreaCollection> {
  // The same base object may be included in multiple intersects
  // as collection is done for each frame feature.
  const frame = frameLayer.collection;
  const base = baseLayer.collection;
  // The resulting layer contains all props from base layer
  // but values need to be updated for categorical props and
  // two design properties must be added to the new property
  // record. Set initial record here.
  const record = copy(baseLayer.propertyRecord);

  if (
    PointCollection.isCollection(frame) &&
    AreaCollection.isCollection(base)
  ) {
    const features: PointFeature[] = [];
    frame.features.forEach((frameFeature, index) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectPointAreaFeatures(frameFeature, baseFeature);
        if (intersect) {
          transferPropertiesInPlace(
            intersect,
            frameFeature,
            baseFeature,
            index,
          );
          features.push(intersect);
        }
      });
    });
    updateRecordInPlace(record);
    return new Layer(new PointCollection({features}, true), record, true);
  }

  if (LineCollection.isCollection(frame) && LineCollection.isCollection(base)) {
    const features: PointFeature[] = [];
    frame.features.forEach((frameFeature, index) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineLineFeatures(frameFeature, baseFeature);
        if (intersect) {
          transferPropertiesInPlace(
            intersect,
            frameFeature,
            baseFeature,
            index,
          );
          features.push(intersect);
        }
      });
    });
    updateRecordInPlace(record);
    return new Layer(new PointCollection({features}, true), record, true);
  }

  if (LineCollection.isCollection(frame) && AreaCollection.isCollection(base)) {
    const features: LineFeature[] = [];
    frame.features.forEach((frameFeature, index) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineAreaFeatures(frameFeature, baseFeature);
        if (intersect) {
          transferPropertiesInPlace(
            intersect,
            frameFeature,
            baseFeature,
            index,
          );
          features.push(intersect);
        }
      });
    });
    updateRecordInPlace(record);
    return new Layer(new LineCollection({features}, true), record, true);
  }

  if (
    AreaCollection.isCollection(frame) &&
    PointCollection.isCollection(base)
  ) {
    const features: PointFeature[] = [];
    frame.features.forEach((frameFeature, index) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectPointAreaFeatures(baseFeature, frameFeature);
        if (intersect) {
          transferPropertiesInPlace(
            intersect,
            frameFeature,
            baseFeature,
            index,
          );
          features.push(intersect);
        }
      });
    });
    updateRecordInPlace(record);
    return new Layer(new PointCollection({features}, true), record, true);
  }

  if (AreaCollection.isCollection(frame) && LineCollection.isCollection(base)) {
    const features: LineFeature[] = [];
    frame.features.forEach((frameFeature, index) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineAreaFeatures(baseFeature, frameFeature);
        if (intersect) {
          transferPropertiesInPlace(
            intersect,
            frameFeature,
            baseFeature,
            index,
          );
          features.push(intersect);
        }
      });
    });
    updateRecordInPlace(record);
    return new Layer(new LineCollection({features}, true), record, true);
  }

  if (AreaCollection.isCollection(frame) && AreaCollection.isCollection(base)) {
    const features: AreaFeature[] = [];
    frame.features.forEach((frameFeature, index) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectAreaAreaFeatures(frameFeature, baseFeature);
        if (intersect) {
          transferPropertiesInPlace(
            intersect,
            frameFeature,
            baseFeature,
            index,
          );
          features.push(intersect);
        }
      });
    });
    updateRecordInPlace(record);
    return new Layer(new AreaCollection({features}, true), record, true);
  }

  throw new Error('Unvalid collect operation.');
}
