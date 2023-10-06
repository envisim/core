import type * as GJ from '../types/geojson.js';
import {distance} from '../index.js';

/**
 * Computes the approximate length of a GeoJSON segment, where the segment is
 * of type plate carré.
 * @param p1 start point [lon,lat]
 * @param p2 end point [lon,lat]
 * @returns the length of the segment in meters.
 */
export function lengthOfSegment(p1: GJ.Position, p2: GJ.Position): number {
  const distToEnd = distance(p1, p2);
  const dist = 1000;
  if (distToEnd > dist) {
    let L = 0; // Aggregate length for segments longer than dist
    const numPointsToAdd = Math.ceil(distToEnd / dist);
    const [lon0, lat0] = p1;
    const [lon1, lat1] = p2;
    let prev: GJ.Position = [lon0, lat0];

    for (let i = 1; i <= numPointsToAdd; i++) {
      const t = i / numPointsToAdd;
      const lon = lon0 + t * (lon1 - lon0);
      const lat = lat0 + t * (lat1 - lat0);
      L += distance(prev, [lon, lat]);
      prev = [lon, lat];
    }

    return L;
  }

  return distToEnd;
}

/**
 * Computes the approximate length of a LineString, where each segment is
 * of type plate carrée.
 * @param ls Coordinates of a LineString
 * @returns the length of the LineString in meters.
 */
export function lengthOfLineString(ls: GJ.Position[]) {
  let l = 0;
  for (let i = 0; i < ls.length - 1; i++) {
    l += lengthOfSegment(ls[i], ls[i + 1]);
  }
  return l;
}
