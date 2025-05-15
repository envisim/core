/**
 * @module @envisim/geosampling/select-intersects
 */
import {
  type AreaObject,
  Feature,
  FeatureCollection,
  type FeatureProperties,
  type LineObject,
  type PointObject,
  type PureObject,
  intersectAreaAreaGeometries,
  intersectLineAreaGeometries,
  intersectPointAreaGeometries,
} from "@envisim/geojson";

export { type SelectError, SELECT_ERROR_LIST } from "./errors/index.js";

/**
 * Internal function to transfer properties to the intersect from the base feature and transfer
 * _designWeight and _parent to the intersect from the frame feature.
 */
function createProperties<G1 extends PureObject, G2 extends PureObject, P extends string>(
  frameFeature: Feature<G1>,
  baseFeature: Feature<G2, P>,
  parent: number,
): FeatureProperties<P> {
  const properties = { ...baseFeature.properties };
  delete properties["_measure"];
  delete properties["_count"];

  // Transfer designWeight to newFeature from frameFeature
  if (frameFeature.properties?.["_designWeight"] !== undefined) {
    properties["_designWeight"] = frameFeature.properties["_designWeight"];
  }
  // Transfer index of parent frame unit as _parent
  properties["_parent"] = parent;

  return properties;
}

/**
 * Select intersect of features as the new frame from base-collection.
 * @param frame
 * @param base
 */
export function selectAreaIntersectsArea<P extends string>(
  frame: FeatureCollection<AreaObject>,
  base: FeatureCollection<AreaObject, P>,
): FeatureCollection<AreaObject, P> {
  const collection = FeatureCollection.newArea([], base.propertyRecord, false);
  intersectFeatures(
    collection,
    frame.features,
    base.features,
    intersectAreaAreaGeometries,
    createProperties,
  );
  return collection;
}
export function selectAreaIntersectsLine<P extends string>(
  frame: FeatureCollection<LineObject>,
  base: FeatureCollection<AreaObject, P>,
): FeatureCollection<LineObject, P> {
  const collection = FeatureCollection.newLine([], base.propertyRecord, false);
  intersectFeatures(
    collection,
    frame.features,
    base.features,
    intersectLineAreaGeometries,
    createProperties,
  );
  return collection;
}
export function selectAreaIntersectsPoint<P extends string>(
  frame: FeatureCollection<PointObject>,
  base: FeatureCollection<AreaObject, P>,
): FeatureCollection<PointObject, P> {
  const collection = FeatureCollection.newPoint([], base.propertyRecord, false);
  intersectFeatures(
    collection,
    frame.features,
    base.features,
    intersectPointAreaGeometries,
    createProperties,
  );
  return collection;
}
export function selectLineIntersectsArea<P extends string>(
  frame: FeatureCollection<AreaObject>,
  base: FeatureCollection<LineObject, P>,
): FeatureCollection<LineObject, P> {
  // The same base object may be included in multiple intersects as collection is done for each
  // frame feature. The resulting layer contains all props from base layer but values need to be
  // updated for categorical props and two design properties must be added to the new property
  // record.
  const collection = FeatureCollection.newLine([], base.propertyRecord, false);
  intersectFeatures(
    collection,
    frame.features,
    base.features,
    (f, b) => intersectLineAreaGeometries(b, f),
    createProperties,
  );
  return collection;
}

export function selectPointIntersectsArea<P extends string>(
  frame: FeatureCollection<AreaObject>,
  base: FeatureCollection<PointObject, P>,
): FeatureCollection<PointObject, P> {
  const collection = FeatureCollection.newPoint([], base.propertyRecord, false);
  intersectFeatures(
    collection,
    frame.features,
    base.features,
    (f, b) => intersectPointAreaGeometries(b, f),
    createProperties,
  );
  return collection;
}

function intersectFeatures<
  F extends PureObject,
  B extends PureObject,
  C extends PureObject,
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
      collection.addFeature(feature, true);
    });
  });
}
