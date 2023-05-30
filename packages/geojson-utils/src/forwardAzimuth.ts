// @ts-ignore
import geodesic from 'geographiclib-geodesic';

import type * as GJ from './geojson/types.js';

// @ts-ignore
const geod = geodesic.Geodesic.WGS84;
const geodInverseOpts = geodesic.Geodesic.AZIMUTH;
/**
 * Computes the forward azimuth (angle from north) from the first point
 * to the second point for a geodesic path between the points.
 * The azimuth takes values in the range -180 to +180.
 *
 * @param p1 - Point coordinates [lon,lat] for first point.
 * @param p2 - Point coordinates [lon,lat] for second point.
 * @returns - The forward azimuth in degrees.
 */
export const forwardAzimuth = (p1: GJ.Position, p2: GJ.Position): number => {
  const result = geod.Inverse(p1[1], p1[0], p2[1], p2[0], geodInverseOpts);
  if (typeof result.azi1 === 'number') {
    return result.azi1;
  }
  // should never be reached
  throw new Error('Not able to compute forward azimuth');
};
