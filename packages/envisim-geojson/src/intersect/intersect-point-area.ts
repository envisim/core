import { bboxInBBox } from "@envisim/geojson-utils";
import type * as GJ from "@envisim/geojson-utils/geojson";
import { type AreaObject, MultiPoint, Point, type PointObject } from "../objects/index.js";

/**
 * Intersection of points and area.
 *
 * @returns `null` if no intersection and PointFeature if intersection.
 */
export function intersectPointAreaGeometries(
  point: PointObject,
  area: AreaObject,
): PointObject | null {
  // Early return if bboxes of geometries doesn't overlap
  if (!bboxInBBox(point.getBBox(), area.getBBox())) {
    return null;
  }

  // Check each position
  const coordinates: GJ.Position[] = point
    .getCoordinateArray()
    .filter((p) => area.includesPosition(p));

  if (coordinates.length === 0) {
    return null;
  } else if (coordinates.length === 1) {
    return Point.create(coordinates[0], true);
  }

  return MultiPoint.create(coordinates, true);
}
