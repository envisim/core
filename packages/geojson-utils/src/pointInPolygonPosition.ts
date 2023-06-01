import type * as GJ from './geojson/types.js';

/** @internal */
function pointInRing(point: GJ.Position, polygon: GJ.Position[]): boolean {
  const p = point;
  const q = polygon;
  const n = q.length;
  let inside = false;

  for (let i = 0, j = n - 1; i < n; j = i++) {
    if (
      q[i][1] > p[1] != q[j][1] > p[1] &&
      p[0] <
        ((q[j][0] - q[i][0]) * (p[1] - q[i][1])) / (q[j][1] - q[i][1]) + q[i][0]
    ) {
      inside = !inside;
    }
  }
  return inside;
}

/**
 * Checks if a point is in a Polygon.
 * Note: Not for MultiPolygon.
 *
 * @param point Coordinates [lon,lat] of a point.
 * @param polygon Coordinates of a Polygon, not MultiPolygon.
 * @returns `true` if point is in polygon.
 */
export function pointInSinglePolygonPosition(
  point: GJ.Position,
  polygon: GJ.Position[][],
): boolean {
  if (!pointInRing(point, polygon[0])) {
    return false; // Not in first polygon.
  }

  for (let i = 1; i < polygon.length; i++) {
    if (pointInRing(point, polygon[i])) {
      return false; // In a hole.
    }
  }

  return true;
}

/**
 * Checks if a point is in a MultiPolygon.
 * Note: Not for Polygon.
 *
 * @param point Coordinates [lon,lat] of a point.
 * @param polygon Coordinates of a MultiPolygon, not Polygon.
 * @returns `true` if point is in polygon.
 */
export function pointInMultiPolygonPosition(
  point: GJ.Position,
  polygons: GJ.Position[][][],
): boolean {
  return polygons.some((pol) => pointInSinglePolygonPosition(point, pol));
}
