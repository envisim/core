import {pointInBbox} from './bbox.js';
import {coordToWebMercator} from './projections.js';

// Longitude and latitude coordinates are ok, but it looks better
// if using the same projection as the map (less minor artifacts).
// Depends on density of points in the polygon.

// internal.
const pointInSimplePolygon = (
  point: number[],
  polygon: number[][],
): boolean => {
  const p = coordToWebMercator(point);
  const q = polygon.map(coordToWebMercator);
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
 * @param pointCoords - Coordinates [longitude,latitude] of a point.
 * @param polygonCoords - Coordinates of a Polygon, not MultiPolygon.
 * @returns - true if point is in polygon, otherwise false.
 */
export const pointInSinglePolygon = (
  pointCoords: number[],
  polygonCoords: number[][][],
): boolean => {
  if (!pointInSimplePolygon(pointCoords, polygonCoords[0])) {
    return false; // Not in first polygon.
  }
  for (let i = 1; i < polygonCoords.length; i++) {
    if (pointInSimplePolygon(pointCoords, polygonCoords[i])) {
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
 * @param point - A GeoJSON Feature with geometry type Point
 * @param polygon - A GeoJSON Feature with geometry type Polygon or MultiPolygon
 * @returns - `true` if the Point is inside the Polygon; `false` if the Point is not inside the Polygon
 */
export const pointInPolygon = (
  point: GeoJSON.Feature,
  polygon: GeoJSON.Feature,
): boolean => {
  if (point.geometry.type !== 'Point') {
    throw new Error(
      'pointInPolygon: type Point is required for geometry of point Feature.',
    );
  }
  if (
    polygon.geometry.type !== 'Polygon' &&
    polygon.geometry.type !== 'MultiPolygon'
  ) {
    throw new Error(
      'pointInPolygon: type Polygon or MultiPolygon is required for geometry of polygon Feature.',
    );
  }
  if (polygon.bbox) {
    if (!pointInBbox(point.geometry.coordinates, polygon.bbox)) {
      return false;
    }
  }
  if (polygon.geometry.type === 'Polygon') {
    return pointInSinglePolygon(
      point.geometry.coordinates,
      polygon.geometry.coordinates,
    );
  }
  if (polygon.geometry.type === 'MultiPolygon') {
    return pointInMultiPolygon(
      point.geometry.coordinates,
      polygon.geometry.coordinates,
    );
  }
  return false;
};
