import type * as GJ from '../types/geojson.js';
import {rhumbAreaOfRing} from './rhumb.js';

/**
 * Computes the rhumb area of a Polygon (not MultiPolygon)
 * @param points the coordinates of the Polygon.
 * @returns the area in square meters.
 */
export const areaOfPolygonLonLat = (points: GJ.Position[][]): number => {
  // Full area of outer ring.
  let area = rhumbAreaOfRing(points[0]);
  // Now substract area of any holes.
  for (let i = 1; i < points.length; i++) {
    area = area - rhumbAreaOfRing(points[i]);
  }
  return area;
};
