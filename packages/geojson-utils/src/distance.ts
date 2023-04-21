// @ts-ignore
//import {geodesic} from './geographiclib-geodesic.js';
import geodesic from 'geographiclib-geodesic';
// @ts-ignore
const geod = geodesic.Geodesic.WGS84;

/**
 * Computes the shortest distance in meters between two point coordinates.
 *
 * @param p1 - Point coordinates [lon,lat].
 * @param p2 - Point coordinates [lon,lat].
 * @returns - The distance in meters.
 */
export const distance = (
  p1: GeoJSON.Position,
  p2: GeoJSON.Position,
): number => {
  const result = geod.Inverse(p1[1], p1[0], p2[1], p2[0]);
  if (typeof result.s12 === 'number') {
    return result.s12;
  }
  // should never be reached
  throw new Error('Not able to compute distance.');
};
