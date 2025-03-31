import { type Segment, ringToSegments, bboxInBBox } from "@envisim/geojson-utils";
import type * as GJ from "@envisim/geojson-utils/geojson";
import {
  type LineObject,
  LineString,
  MultiPoint,
  Point,
  type PointObject,
} from "../objects/index.js";

/**
 * Intersect of two lines: the crossing-points between the lines in the two features.
 *
 * @returns the points of the crossings, or `null` if no crossings.
 */
export function intersectLineLineGeometries(
  geometry1: LineObject,
  geometry2: LineObject,
): PointObject | null {
  // early return if bboxes doesn't overlap
  if (!bboxInBBox(geometry1.getBBox(), geometry2.getBBox())) {
    return null;
  }
  const points: GJ.Position2[] = [];

  const f1: Segment[] = LineString.isObject(geometry1)
    ? ringToSegments(geometry1.coordinates)
    : geometry1.coordinates.flatMap(ringToSegments);
  const f2: Segment[] = LineString.isObject(geometry2)
    ? ringToSegments(geometry2.coordinates)
    : geometry2.coordinates.flatMap(ringToSegments);

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
  } else if (points.length === 1) {
    return Point.create(points[0], true);
  }

  return MultiPoint.create(points, true);
}
