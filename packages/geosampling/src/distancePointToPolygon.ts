import {distance} from './distance.js';
import {pointInPolygon} from './pointInPolygon.js';

// Internal.
const dot = (u: GeoJSON.Position, v: GeoJSON.Position): number =>
  u[0] * v[0] + u[1] * v[1];

// Internal.
const distancePointToSegment = (
  point: GeoJSON.Position,
  segment: GeoJSON.Position[],
): number => {
  const v = [segment[1][0] - segment[0][0], segment[1][1] - segment[0][1]];
  const w = [point[0] - segment[0][0], point[1] - segment[0][1]];
  const c1 = dot(w, v);
  if (c1 <= 0) {
    return distance(point, segment[0]);
  }
  const c2 = dot(v, v);
  if (c2 <= c1) {
    return distance(point, segment[1]);
  }
  const b2 = c1 / c2;
  const Pb = [segment[0][0] + b2 * v[0], segment[0][1] + b2 * v[1]];
  return distance(point, Pb);
};

/**
 * Computes distance from a GeoJSON Feature with geometry type Point
 * to a GeoJSON Feature with geometry type Polygon or MultiPolygon.
 *
 * @param point - A GeoJSON Feature with geometry type Point.
 * @param polygon - A GeoJSON Feature with geometry type Polygon or MultiPolygon.
 * @returns - The distance between the point and the polygon. Negative if point is inside polygon.
 */
export const distancePointToPolygon = (
  point: GeoJSON.Feature,
  polygon: GeoJSON.Feature,
): number => {
  if (point.geometry.type !== 'Point') {
    throw new Error(
      'distancePointToPolygon: type Point is required for geometry of point Feature.',
    );
  }
  if (
    polygon.geometry.type !== 'Polygon' &&
    polygon.geometry.type !== 'MultiPolygon'
  ) {
    throw new Error(
      'distancePointToPolygon: type Polygon or MultiPolygon is required for geometry of polygon Feature.',
    );
  }
  let d = Infinity;
  let pointcoords = point.geometry.coordinates;
  if (polygon.geometry.type === 'Polygon') {
    let coords: GeoJSON.Position[][] = polygon.geometry.coordinates;
    for (let i = 0; i < coords.length; i++) {
      for (let j = 0; j < coords[i].length - 1; j++) {
        d = Math.min(
          d,
          distancePointToSegment(pointcoords, [coords[i][j], coords[i][j + 1]]),
        );
      }
    }
  }
  if (polygon.geometry.type === 'MultiPolygon') {
    let coords: GeoJSON.Position[][][] = polygon.geometry.coordinates;
    for (let i = 0; i < coords.length; i++) {
      for (let j = 0; j < coords[i].length; j++) {
        for (let k = 0; k < coords[i][j].length - 1; k++) {
          d = Math.min(
            d,
            distancePointToSegment(pointcoords, [
              coords[i][j][k],
              coords[i][j][k + 1],
            ]),
          );
        }
      }
    }
  }
  if (pointInPolygon(point, polygon)) {
    return -d;
  } else {
    return d;
  }
};
