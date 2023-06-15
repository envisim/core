import geodesic from 'geographiclib-geodesic';

import type * as GJ from '../types/geojson.js';

const geod = geodesic.Geodesic.WGS84;
const geodInverseOpts = geodesic.Geodesic.DISTANCE;

/**
 * Computes the shortest distance in meters between two point coordinates.
 *
 * @param p1 - Point coordinates [lon,lat].
 * @param p2 - Point coordinates [lon,lat].
 * @returns - The distance in meters.
 */
export function distance(p1: GJ.Position, p2: GJ.Position): number {
  const result = geod.Inverse(p1[1], p1[0], p2[1], p2[0], geodInverseOpts);
  if (typeof result.s12 === 'number') {
    return result.s12;
  }
  // should never be reached
  throw new Error('Not able to compute distance.');
}
