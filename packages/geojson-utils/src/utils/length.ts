import type * as GJ from '../types/geojson.js';
import {rhumbDistance} from '../index.js';

/**
 * Computes the length of a GeoJSON segment, where the segment is a
 * rhumb line.
 * @param start start point [lon,lat]
 * @param end end point [lon,lat]
 * @returns the length of the segment in meters.
 */
export function lengthOfSegment(start: GJ.Position, end: GJ.Position): number {
  return rhumbDistance(start, end);
}

/**
 * Computes the length of a LineString, where each segment is a
 * rhumb line.
 * @param ls Coordinates of a LineString
 * @returns the length of the LineString in meters.
 */
export function lengthOfLineString(ls: GJ.Position[]) {
  let l = 0;
  for (let i = 0; i < ls.length - 1; i++) {
    l += rhumbDistance(ls[i], ls[i + 1]);
  }
  return l;
}
