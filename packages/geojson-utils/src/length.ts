import type * as GJ from './geojson/types.js';
import {distance} from './distance.js';

/**
 * Computes the length of the a GeoJSON segment.
 * @param start Start point [lon,lat]
 * @param end End point [lon,lat]
 * @param dist Optional distance for start using interpolated segment points.
 * @returns the length of the segment in meters.
 */
export function lengthOfSegment(
  start: GJ.Position,
  end: GJ.Position,
  dist = Infinity,
): number {
  const distToEnd = distance(start, end);

  if (distToEnd > dist) {
    let L = 0; // Aggregate length for segments longer than maxDist
    const numPointsToAdd = dist === Infinity ? 1 : Math.ceil(distToEnd / dist);
    const [lon0, lat0] = start;
    const [lon1, lat1] = end;
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
 * Computes the length of a LineString.
 * @param ls Coordinates of a LineString
 * @param dist Optional distance for start using interpolated segment points.
 * @returns the length of the LineString in meters.
 */
export function lengthOfLineString(ls: GJ.Position[], dist: number = Infinity) {
  let l = 0;

  for (let i = 0; i < ls.length - 1; i++) {
    l += lengthOfSegment(ls[i], ls[i + 1], dist);
  }

  return l;
}
