import type * as GJ from '../types/geojson.js';
import {distance} from '../index.js';

/**
 * Computes a position on the segment at a fraction of the length of the
 * segment, where the segment is of type plate carrée.
 * @param p1 start point [lon,lat]
 * @param p2 end point [lon,lat]
 * @param fraction the fraction of the length
 * @returns the position on the segment
 */
export function intermediateOnSegment(
  p1: GJ.Position,
  p2: GJ.Position,
  fraction: number,
): GJ.Position {
  if (fraction < 0 || fraction > 1) {
    throw new Error('fraction must be between 0 and 1');
  }

  const distToEnd = distance(p1, p2);
  const dist = 1000;

  if (distToEnd > dist) {
    const cumdists: number[] = [];
    const positions: GJ.Position[] = [];

    let L = 0; // Aggregate length for segments longer than dist
    const numPointsToAdd = Math.ceil(distToEnd / dist);
    const [lon0, lat0] = p1;
    const [lon1, lat1] = p2;
    let prev: GJ.Position = [lon0, lat0];
    cumdists.push(L);
    positions.push([...prev]);
    for (let i = 1; i <= numPointsToAdd; i++) {
      const t = i / numPointsToAdd;
      const lon = lon0 + t * (lon1 - lon0);
      const lat = lat0 + t * (lat1 - lat0);
      L += distance(prev, [lon, lat]);
      prev = [lon, lat];
      cumdists.push(L);
      positions.push([...prev]);
    }
    const distToPlaceAt = fraction * L;
    for (let i = 1; i < positions.length; i++) {
      if (cumdists[i] >= distToPlaceAt) {
        const t =
          (distToPlaceAt - cumdists[i - 1]) / (cumdists[i] - cumdists[i - 1]);
        return [
          positions[i - 1][0] + t * (positions[i][0] - positions[i - 1][0]),
          positions[i - 1][1] + t * (positions[i][1] - positions[i - 1][1]),
        ];
      }
    }
  }

  return [
    p1[0] + fraction * (p2[0] - p1[0]),
    p1[1] + fraction * (p2[1] - p1[1]),
  ];
}
