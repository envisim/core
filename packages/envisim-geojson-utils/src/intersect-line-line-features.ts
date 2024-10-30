import type * as GJ from './types/geojson.js';
import {
  LineFeature,
  LineGeometryCollection,
  LineString,
  MultiPoint,
  Point,
  PointFeature,
} from './geojson/index.js';
import {bboxInBBox} from './utils/bbox.js';
import {type Segment, ringToSegments} from './utils/class-segment.js';

/**
 * Computes the intersect of two LineFeatures as
 * the crossing-points between the lines in the two features.
 *
 * @param feature1
 * @param feature2
 * @returns `null` if no crossings and PointFeature if intersection.
 */
export function intersectLineLineFeatures(
  feature1: LineFeature,
  feature2: LineFeature,
): PointFeature | null {
  const points: GJ.Position2[] = [];

  // early return if bboxes doesn't overlap
  if (!bboxInBBox(feature1.geometry.getBBox(), feature2.geometry.getBBox())) return null;

  if (
    LineGeometryCollection.isGeometryCollection(feature1.geometry) ||
    LineGeometryCollection.isGeometryCollection(feature2.geometry)
  ) {
    // We don't handle gcs
    return null;
  }

  const f1: Segment[] = LineString.isObject(feature1.geometry)
    ? ringToSegments(feature1.geometry.coordinates)
    : feature1.geometry.coordinates.flatMap(ringToSegments);
  const f2: Segment[] = LineString.isObject(feature2.geometry)
    ? ringToSegments(feature2.geometry.coordinates)
    : feature2.geometry.coordinates.flatMap(ringToSegments);

  for (const seg1 of f1) {
    for (const seg2 of f2) {
      const pt = seg1.intersect(seg2);
      if (pt) {
        points.push(pt);
      }
    }
  }

  if (points.length === 0) {
    return null;
  }

  if (points.length === 1) {
    return PointFeature.create(Point.create(points[0], true), {}, true);
  }

  return PointFeature.create(MultiPoint.create(points, true), {}, true);
}
