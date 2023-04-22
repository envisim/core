import {pointInBbox} from './bbox.js';

// internal.
const pointInSimplePolygon = (
  point: number[],
  polygon: number[][],
): boolean => {
  const p = point;
  const q = polygon;
  const n = q.length;
  let i = 0;
  let j = 0;
  let inside = false;
  for (i = 0, j = n - 1; i < n; j = i++) {
    if (
      q[i][1] > p[1] != q[j][1] > p[1] &&
      p[0] <
        ((q[j][0] - q[i][0]) * (p[1] - q[i][1])) / (q[j][1] - q[i][1]) + q[i][0]
    ) {
      inside = !inside;
    }
  }
  return inside;
};

/**
 * Checks if a point is in a polygon.
 * Note: Not for MultiPolygon.
 *
 * @param point - Coordinates [lon,lat] of a point.
 * @param polygon - Coordinates of a Polygon, not MultiPolygon.
 * @returns - true if point is in polygon, otherwise false.
 */
export const pointInSinglePolygon = (
  point: number[],
  polygon: number[][][],
): boolean => {
  if (!pointInSimplePolygon(point, polygon[0])) {
    return false; // Not in first polygon.
  }
  for (let i = 1; i < polygon.length; i++) {
    if (pointInSimplePolygon(point, polygon[i])) {
      return false; // In a hole.
    }
  }
  return true;
};

// internal
const pointInMultiPolygon = (
  point: number[],
  polygon: number[][][][],
): boolean => {
  for (let i = 0; i < polygon.length; i++) {
    if (pointInSinglePolygon(point, polygon[i])) {
      return true;
    }
  }
  return false;
};

/**
 * Checks if a GeoJSON Feature with geometry type Point is within a
 * GeoJSON Feature with geometry type Polygon or MultiPolygon.
 *
 * @param point - A GeoJSON Feature with geometry type Point.
 * @param polygon - A GeoJSON Feature with geometry type Polygon or MultiPolygon.
 * @returns - `true` if the Point is inside the Polygon; `false` if the Point is not inside the Polygon.
 */
export const pointInPolygon = (
  point: GeoJSON.Feature,
  polygon: GeoJSON.Feature,
): boolean => {
  const ptype = polygon.geometry.type;
  if (point.geometry.type !== 'Point') {
    throw new Error('Type Point is required for geometry of point Feature.');
  }
  if (ptype !== 'Polygon' && ptype !== 'MultiPolygon') {
    throw new Error(
      'Type Polygon or MultiPolygon is required for geometry of polygon Feature.',
    );
  }
  if (polygon.bbox) {
    if (!pointInBbox(point.geometry.coordinates, polygon.bbox)) {
      return false;
    }
  }
  if (ptype === 'Polygon') {
    return pointInSinglePolygon(
      point.geometry.coordinates,
      polygon.geometry.coordinates,
    );
  }
  if (ptype === 'MultiPolygon') {
    return pointInMultiPolygon(
      point.geometry.coordinates,
      polygon.geometry.coordinates,
    );
  }
  return false;
};
