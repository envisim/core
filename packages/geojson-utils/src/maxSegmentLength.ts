import {segmentEach} from './segmentEach.js';
import {distance} from './distance.js';

/**
 * Computes the maximum segment length in meters.
 * @param geoJSON - Any GeoJSON.
 * @returns - The maximum segment length in meters.
 */
export const maxSegmentLength = (geoJSON: GeoJSON.GeoJSON): number => {
  let L = 0;
  segmentEach(geoJSON, (segment: GeoJSON.Position[]) => {
    L = Math.max(L, distance(segment[0], segment[1]));
  });
  return L;
};
