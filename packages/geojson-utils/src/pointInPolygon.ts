import type * as GJ from './geojson/types.js';
import {pointInBBox} from './bbox.js';
import type {AreaObject} from './geojson/areas/AreaObjects.js';
import {toAreaGeometry} from './geojson/areas/toAreaGeometry.js';

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
 * @param point - Coordinates [lon,lat] of a point.
 * @param polygon - Coordinates of a Polygon, not MultiPolygon.
 * @returns - true if point is in polygon, otherwise false.
 */
export function pointInSinglePolygon(
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
 * @param point - Coordinates [lon,lat] of a point.
 * @param polygon - Coordinates of a MultiPolygon, not Polygon.
 * @returns - true if point is in polygon, otherwise false.
 */
export const pointInMultiPolygon = (
  point: GJ.Position,
  polygons: GJ.Position[][][],
): boolean => {
  return polygons.some((pol) => pointInSinglePolygon(point, pol));
};

/**
 * Checks if a point is inside an AreaGeometry.
 *
 * @param point - A GeoJSON Position [lon,lat].
 * @param geometry
 * @returns `true` if the position is inside the area.
 */
export function pointInAreaGeometry(
  point: GJ.Position,
  geometry: GJ.AreaGeometry,
): boolean {
  const ag = toAreaGeometry(geometry, true);

  // If it is not in the bounding box, we can give up
  if (!pointInBBox(point, ag.getBBox())) return false;

  switch (ag.type) {
    case 'Point':
    case 'MultiPoint':
      return ag.distanceToPosition(point) <= 0;

    case 'Polygon':
      return pointInSinglePolygon(point, ag.coordinates);

    case 'MultiPolygon':
      return pointInMultiPolygon(point, ag.coordinates);

    case 'GeometryCollection':
      return ag.geometries.some((geom: AreaObject) =>
        pointInAreaGeometry(point, geom),
      );

    default:
      return false;
  }
}

/**
 * Checks if a point is inside an AreaFeature.
 *
 * @param point - A GeoJSON Position [lon,lat].
 * @param feature
 * @returns `true` if the position is inside the area.
 */
export function pointInAreaFeature(
  point: GJ.Position,
  feature: GJ.AreaFeature,
): boolean {
  return pointInAreaGeometry(point, feature.geometry);
}
