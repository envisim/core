import {
  type AreaObject,
  type CirclesToPolygonsOptions,
  FeatureCollection,
  type LineObject,
  type PointObject,
  intersectAreaAreaGeometries,
  intersectLineAreaGeometries,
  intersectPointAreaGeometries,
} from '@envisim/geojson-utils';

function intersectAreaFrame<T extends AreaObject | LineObject | PointObject>(
  collection: FeatureCollection<T>,
  sample: FeatureCollection<T>,
  frame: FeatureCollection<AreaObject>,
  options: CirclesToPolygonsOptions,
  intersectFunction: (s: T, f: AreaObject, o: CirclesToPolygonsOptions) => T | null,
) {
  frame.forEach((frameFeature) => {
    sample.forEach((sampleFeature) => {
      const intersect = intersectFunction(sampleFeature.geometry, frameFeature.geometry, options);
      if (intersect === null) return;

      const dw =
        frameFeature.getSpecialPropertyDesignWeight() *
        sampleFeature.getSpecialPropertyDesignWeight();
      collection.addGeometry(intersect, {_designWeight: dw}, true);
    });
  });
}

/**
 * Intersects a sample of points with an area frame and transfers _designWeight
 * to sample of points (if frame features have design weights).
 *
 * @param sample
 * @param frame
 */
export function intersectPointSampleAreaFrame<PID extends string>(
  sample: FeatureCollection<PointObject, PID>,
  frame: FeatureCollection<AreaObject>,
): FeatureCollection<PointObject, PID> {
  const collection = FeatureCollection.newPoint<PointObject, PID>();
  intersectAreaFrame(collection, sample, frame, {}, intersectPointAreaGeometries);
  return collection;
}

/**
 * Intersects a sample of lines with an area frame and transfers _designWeight
 * to sample of lines (if frame features have design weights).
 *
 * @param sample
 * @param frame
 */
export function intersectLineSampleAreaFrame<PID extends string>(
  sample: FeatureCollection<LineObject, PID>,
  frame: FeatureCollection<AreaObject>,
  options: CirclesToPolygonsOptions = {},
): FeatureCollection<LineObject, PID> {
  const collection = FeatureCollection.newLine<LineObject, PID>();
  intersectAreaFrame(collection, sample, frame, options, intersectLineAreaGeometries);
  return collection;
}

/**
 * Intersects a sample of area with an area frame and transfers _designWeight
 * to sample (if frame features have design weights).
 *
 * @param sample
 * @param frame
 */
export function intersectAreaSampleAreaFrame<PID extends string>(
  sample: FeatureCollection<AreaObject, PID>,
  frame: FeatureCollection<AreaObject>,
  options: CirclesToPolygonsOptions = {},
): FeatureCollection<AreaObject, PID> {
  const collection = FeatureCollection.newArea<AreaObject, PID>([]);
  intersectAreaFrame(collection, sample, frame, options, intersectAreaAreaGeometries);
  return collection;
}
