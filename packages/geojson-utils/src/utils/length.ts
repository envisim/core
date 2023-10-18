import type * as GJ from '../types/geojson.js';
import {PlateCarree} from './PlateCarree.js';

/**
 * Computes the approximate length of a LineString, where each segment is
 * of type plate carrée.
 * @param ls Coordinates of a LineString
 * @returns the length of the LineString in meters.
 */
export function lengthOfLineString(ls: GJ.Position[]) {
  let l = 0;
  for (let i = 0; i < ls.length - 1; i++) {
    l += PlateCarree.distance(ls[i], ls[i + 1]);
  }
  return l;
}
