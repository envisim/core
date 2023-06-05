import type * as GJ from '../types/geojson.js';
import {distance} from './distance.js';

// Internal.
const dot = (u: GJ.Position, v: GJ.Position): number =>
  u[0] * v[0] + u[1] * v[1];

/**
 * Computes the shortest distance between a point and a segment.
 * @param point - Coordinates of point [lon, lat].
 * @param segment - Coordinates of segment [[lon1,lat1],[lon2,lat2]].
 * @returns - The distance in meters.
 */
export const distancePositionToSegment = (
  point: GJ.Position,
  segment: GJ.Position[],
): number => {
  const v: GJ.Position = [
    segment[1][0] - segment[0][0],
    segment[1][1] - segment[0][1],
  ];
  const w: GJ.Position = [point[0] - segment[0][0], point[1] - segment[0][1]];
  const c1 = dot(w, v);
  if (c1 <= 0) {
    return distance(point, segment[0]);
  }
  const c2 = dot(v, v);
  if (c2 <= c1) {
    return distance(point, segment[1]);
  }
  const b2 = c1 / c2;
  const Pb: GJ.Position = [
    segment[0][0] + b2 * v[0],
    segment[0][1] + b2 * v[1],
  ];
  return distance(point, Pb);
};
