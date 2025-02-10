import {
  type AreaObject,
  Feature,
  FeatureCollection,
  type FeatureProperties,
  Geodesic,
  type LineObject,
  type PointObject,
  type PureObject,
  intersectAreaAreaGeometries,
  intersectLineAreaGeometries,
  intersectLineLineGeometries,
  intersectPointAreaGeometries,
} from '@envisim/geojson-utils';

import {projectedLengthOfGeometry} from '../utils/index.js';

/**
 * Internal function to transfer properties to the intersect from the base feature and transfer
 * _designWeight and _parent to the intersect from the frame feature.
 */
function createProperties<G1 extends PureObject, G2 extends PureObject, P extends string>(
  frameFeature: Feature<G1>,
  baseFeature: Feature<G2, P>,
  parent: number,
): FeatureProperties<P> {
  const properties = {...baseFeature.properties};

  // Transfer designWeight to newFeature from frameFeature
  if (frameFeature.properties?.['_designWeight'] !== undefined) {
    properties['_designWeight'] = frameFeature.properties['_designWeight'];
  }
  // Transfer index of parent frame unit as _parent
  properties['_parent'] = parent;

  return properties;
}

function createPropertiesForLine<P extends string>(
  frameFeature: Feature<LineObject>,
  baseFeature: Feature<LineObject, P>,
  parent: number,
): FeatureProperties<P> {
  const properties = createProperties(frameFeature, baseFeature, parent);

  if (properties['_designWeight'] === undefined) {
    return properties;
  }

  if (frameFeature.getSpecialPropertyRandomRotation() === 1) {
    // Here the line that collects can be any curve,
    // as long as it has been randomly rotated.
    properties['_designWeight'] *= Math.PI / (2.0 * baseFeature.geometry.length());
  } else {
    // Here the line that collects should be straight,
    // which is why we can use the first segment of the line
    // to find the direction of the line.
    let azimuth = 0.0;
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

    properties['_designWeight'] *= 1.0 / projectedLengthOfGeometry(baseFeature.geometry, azimuth);
  }

  return properties;
}

/**
 * Select intersect of features as the new frame from base-collection.
 * @param frame
 * @param base
 */
export function selectIntersects<P extends string>(
  frame: FeatureCollection<PointObject>,
  base: FeatureCollection<AreaObject, P>,
): FeatureCollection<PointObject, P>;
export function selectIntersects<P extends string, G extends AreaObject | LineObject>(
  frame: FeatureCollection<LineObject>,
  base: FeatureCollection<G, P>,
): G extends AreaObject ? FeatureCollection<LineObject, P> : FeatureCollection<PointObject, P>;
export function selectIntersects<P extends string, G extends PureObject>(
  frame: FeatureCollection<AreaObject>,
  base: FeatureCollection<G, P>,
): FeatureCollection<G, P>;
export function selectIntersects<P extends string>(
  frame: FeatureCollection<PureObject>,
  base: FeatureCollection<PureObject, P>,
): FeatureCollection<PureObject, P> {
  // The same base object may be included in multiple intersects
  // as collection is done for each frame feature.
  // The resulting layer contains all props from base layer
  // but values need to be updated for categorical props and
  // two design properties must be added to the new property
  // record. Set initial record here.
  const record = base.propertyRecord.copy(false);

  if (FeatureCollection.isPoint(frame) && FeatureCollection.isArea(base)) {
    const layer = FeatureCollection.newPoint([], record);
    intersectFeatures(
      layer,
      frame.features,
      base.features,
      intersectPointAreaGeometries,
      createProperties,
    );
    return layer;
  }

  if (FeatureCollection.isLine(frame)) {
    if (FeatureCollection.isLine(base)) {
      const layer = FeatureCollection.newPoint([], record);
      intersectFeatures(
        layer,
        frame.features,
        base.features,
        intersectLineLineGeometries,
        createPropertiesForLine,
      );
      return layer;
    }

    if (FeatureCollection.isArea(base)) {
      const layer = FeatureCollection.newLine([], record);
      intersectFeatures(
        layer,
        frame.features,
        base.features,
        intersectLineAreaGeometries,
        createProperties,
      );
      return layer;
    }
  }

  FeatureCollection.assertArea(frame);

  if (FeatureCollection.isPoint(base)) {
    const layer = FeatureCollection.newPoint([], record);
    intersectFeatures(
      layer,
      frame.features,
      base.features,
      (f, b) => intersectPointAreaGeometries(b, f),
      createProperties,
    );
    return layer;
  }

  if (FeatureCollection.isLine(base)) {
    const layer = FeatureCollection.newLine([], record);
    intersectFeatures(
      layer,
      frame.features,
      base.features,
      (f, b) => intersectLineAreaGeometries(b, f),
      createProperties,
    );
    return layer;
  }

  FeatureCollection.assertArea(base);

  const layer = FeatureCollection.newArea([], record);
  intersectFeatures(
    layer,
    frame.features,
    base.features,
    intersectAreaAreaGeometries,
    createProperties,
  );
  return layer;
}

function intersectFeatures<
  C extends PureObject,
  F extends PureObject,
  B extends PureObject,
  PID extends string,
>(
  collection: FeatureCollection<C, PID>,
  frame: Feature<F>[],
  base: Feature<B, PID>[],
  intersectFunction: (a: F, b: B) => C | null,
  propertiesFunction: (f: Feature<F>, b: Feature<B, PID>, i: number) => FeatureProperties<PID>,
) {
  frame.forEach((frameFeature, index) => {
    base.forEach((baseFeature) => {
      const intersect = intersectFunction(frameFeature.geometry, baseFeature.geometry);
      if (intersect === null) return;
      const feature = new Feature(
        intersect,
        propertiesFunction(frameFeature, baseFeature, index),
        true,
      );
      // transferPropertiesInPlace(feature, frameFeature, baseFeature, index);
      collection.addFeature(feature, true);
    });
  });
}
