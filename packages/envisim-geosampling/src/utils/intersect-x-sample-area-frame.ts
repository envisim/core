import {
  type AreaObject,
  type CirclesToPolygonsOptions,
  FeatureCollection,
  type LineObject,
  type PointObject,
  createDesignWeightProperty,
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

      let dw = 1.0;
      if (frameFeature.properties?.['_designWeight'] !== undefined) {
        dw *= frameFeature.properties['_designWeight'];
      }
      if (sampleFeature.properties?.['_designWeight'] !== undefined) {
        dw *= sampleFeature.properties['_designWeight'];
      }

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
export function intersectPointSampleAreaFrame(
  sample: FeatureCollection<PointObject>,
  frame: FeatureCollection<AreaObject>,
): FeatureCollection<PointObject> {
  const collection = FeatureCollection.newPoint();
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
export function intersectLineSampleAreaFrame(
  sample: FeatureCollection<LineObject>,
  frame: FeatureCollection<AreaObject>,
  options: CirclesToPolygonsOptions = {},
): FeatureCollection<LineObject> {
  const collection = FeatureCollection.newLine();
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
export function intersectAreaSampleAreaFrame(
  sample: FeatureCollection<AreaObject>,
  frame: FeatureCollection<AreaObject>,
  options: CirclesToPolygonsOptions = {},
): FeatureCollection<AreaObject> {
  const collection = FeatureCollection.newArea([], {_designWeight: createDesignWeightProperty()});
  intersectAreaFrame(collection, sample, frame, options, intersectAreaAreaGeometries);
  return collection;
}
