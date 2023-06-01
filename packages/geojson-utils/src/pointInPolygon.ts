import type * as GJ from './geojson/types.js';
import {pointInBBox} from './bbox.js';
import {AreaFeature} from './geojson/areas/ClassAreaFeature.js';

// internal.
const pointInRing = (point: GJ.Position, polygon: GJ.Position[]): boolean => {
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
 * Checks if a point is in a Polygon.
 * Note: Not for MultiPolygon.
 *
 * @param point - Coordinates [lon,lat] of a point.
 * @param polygon - Coordinates of a Polygon, not MultiPolygon.
 * @returns - true if point is in polygon, otherwise false.
 */
export const pointInSinglePolygon = (
  point: GJ.Position,
  polygon: GJ.Position[][],
): boolean => {
  if (!pointInRing(point, polygon[0])) {
    return false; // Not in first polygon.
  }
  for (let i = 1; i < polygon.length; i++) {
    if (pointInRing(point, polygon[i])) {
      return false; // In a hole.
    }
  }
  return true;
};

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
  polygon: GJ.Position[][][],
): boolean => {
  for (let i = 0; i < polygon.length; i++) {
    if (pointInSinglePolygon(point, polygon[i])) {
      return true;
    }
  }
  return false;
};

/**
 * Checks if a point is inside an AreaFeature.
 *
 * @param point - A GeoJSON Position [lon,lat].
 * @param areaFeature- An AreaFeature.
 * @returns - `true` if the position is inside the area; `false` if the position is not inside the area.
 */
export const pointInAreaFeature = (
  point: GJ.Position,
  areaFeature: GJ.AreaFeature,
): boolean => {
  const af = AreaFeature.isFeature(areaFeature)
    ? areaFeature
    : new AreaFeature(areaFeature);
  const ag = af.geometry;
  const box = ag.getBBox();
  if (!pointInBBox(point, box)) {
    return false;
  }

  switch (ag.type) {
    case 'Point':
    case 'MultiPoint':
      if (ag.distanceToPosition(point) <= 0) {
        return true;
      }
      break;
    case 'Polygon':
      if (pointInSinglePolygon(point, ag.coordinates)) {
        return true;
      }
      break;
    case 'MultiPolygon':
      if (pointInMultiPolygon(point, ag.coordinates)) {
        return true;
      }
      break;
    case 'GeometryCollection':
      for (let i = 0; i < ag.geometries.length; i++) {
        const box = ag.geometries[i].getBBox();
        if (pointInBBox(point, box)) {
          const g = ag.geometries[i];
          switch (g.type) {
            case 'Point':
            case 'MultiPoint':
              if (g.distanceToPosition(point) <= 0) {
                return true;
              }
              break;
            case 'Polygon':
              if (pointInSinglePolygon(point, g.coordinates)) {
                return true;
              }
              break;
            case 'MultiPolygon':
              if (pointInMultiPolygon(point, g.coordinates)) {
                return true;
              }
              break;
          }
        }
      }
  }
  return false;
};
