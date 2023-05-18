import {positionInBBox} from './bbox.js';
import type * as GJ from './geojson/types.js';
import {AreaFeature} from './geojson/areas/ClassAreaFeature.js';
import {AreaObject} from './geojson/areas/AreaObjects.js';
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
 * Checks if a point is in a polygon.
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

// internal
const pointInMultiPolygon = (
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
 * Checks if a position is inside an AreaFeature.
 *
 * @param position - A GeoJSON Position [lon,lat].
 * @param areaFeature- An AreaFeature.
 * @returns - `true` if the position is inside the area; `false` if the position is not inside the area.
 */
export const positionInAreaFeature = (
  position: GJ.Position,
  areaFeature: GJ.AreaFeature,
): boolean => {
  const af = AreaFeature.isFeature(areaFeature)
    ? areaFeature
    : new AreaFeature(areaFeature);

  const box = af.getBBox();
  if (!positionInBBox(position, box)) {
    return false;
  }
  af.geomEach((geom: AreaObject) => {
    const box = geom.getBBox();
    if (positionInBBox(position, box)) {
      switch (geom.type) {
        case 'Point':
        case 'MultiPoint':
          if (geom.distanceToPosition(position) <= 0) {
            return true;
          }
          break;
        case 'Polygon':
          if (pointInSinglePolygon(position, geom.coordinates)) {
            return true;
          }
          break;
        case 'MultiPolygon':
          if (pointInMultiPolygon(position, geom.coordinates)) {
            return true;
          }
          break;
      }
    }
  });
  return false;
};
