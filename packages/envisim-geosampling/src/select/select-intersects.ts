import {
  type AreaObject,
  Feature,
  FeatureCollection,
  type GeoJSON as GJ,
  Geodesic,
  type LineObject,
  type PointObject,
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
function createProperties(
  frameFeature: Feature<AreaObject> | Feature<LineObject> | Feature<PointObject>,
  baseFeature: Feature<AreaObject> | Feature<LineObject> | Feature<PointObject>,
  parent: number,
): GJ.FeatureProperties<number | string> {
  const properties: GJ.FeatureProperties<number | string> = {};

  Object.keys(baseFeature.properties).forEach((key) => {
    properties[key] = baseFeature.properties[key];
  });

  // Transfer designWeight to newFeature from frameFeature
  if (frameFeature.properties?.['_designWeight'] !== undefined) {
    properties['_designWeight'] = frameFeature.properties['_designWeight'];
  }
  // Transfer index of parent frame unit as _parent
  properties['_parent'] = parent;

  return properties;
}

function createPropertiesForLine(
  frameFeature: Feature<LineObject>,
  baseFeature: Feature<LineObject>,
  parent: number,
): GJ.FeatureProperties<number | string> {
  const properties = createProperties(frameFeature, baseFeature, parent);

  if (properties?.['_designWeight'] === undefined) {
    return properties;
  }

  if (frameFeature.getSpecialPropertyRandomRotation() === 1) {
    // Here the line that collects can be any curve,
    // as long as it has been randomly rotated.
    (properties['_designWeight'] as number) *= Math.PI / (2.0 * baseFeature.geometry.length());
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

    (properties['_designWeight'] as number) *=
      1.0 / projectedLengthOfGeometry(baseFeature.geometry, azimuth);
  }

  return properties;
}

/**
 * Select intersect of features as the new frame from base-collection.
 * @param frame
 * @param base
 */
export function selectIntersects(
  frame: FeatureCollection<PointObject>,
  base: FeatureCollection<AreaObject>,
): FeatureCollection<PointObject>;
export function selectIntersects<
  B extends FeatureCollection<AreaObject> | FeatureCollection<LineObject>,
>(
  frame: FeatureCollection<LineObject>,
  base: B,
): B extends FeatureCollection<AreaObject>
  ? FeatureCollection<LineObject>
  : FeatureCollection<PointObject>;
export function selectIntersects<
  B extends
    | FeatureCollection<AreaObject>
    | FeatureCollection<LineObject>
    | FeatureCollection<PointObject>,
>(frame: FeatureCollection<AreaObject>, base: B): B;
export function selectIntersects(
  frame:
    | FeatureCollection<AreaObject>
    | FeatureCollection<LineObject>
    | FeatureCollection<PointObject>,
  base:
    | FeatureCollection<AreaObject>
    | FeatureCollection<LineObject>
    | FeatureCollection<PointObject>,
): FeatureCollection<AreaObject> | FeatureCollection<LineObject> | FeatureCollection<PointObject> {
  // The same base object may be included in multiple intersects
  // as collection is done for each frame feature.
  // The resulting layer contains all props from base layer
  // but values need to be updated for categorical props and
  // two design properties must be added to the new property
  // record. Set initial record here.
  const record = base.propertyRecord.copy(false);
  record.addDesignWeight();
  record.addParent();

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
  C extends AreaObject | LineObject | PointObject,
  F extends AreaObject | LineObject | PointObject,
  B extends AreaObject | LineObject | PointObject,
>(
  collection: FeatureCollection<C>,
  frame: Feature<F>[],
  base: Feature<B>[],
  intersectFunction: (a: F, b: B) => C | null,
  propertiesFunction: (
    f: Feature<F>,
    b: Feature<B>,
    i: number,
  ) => GJ.FeatureProperties<number | string>,
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
