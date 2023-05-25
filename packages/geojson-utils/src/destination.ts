// @ts-ignore
import geodesic from 'geographiclib-geodesic';
import type * as GJ from './geojson/types.js';
// @ts-ignore
const geod = geodesic.Geodesic.WGS84;
const geodDirectOpts = geodesic.Geodesic.LONGITUDE | geodesic.Geodesic.LATITUDE;

/**
 * Computes the destination point on a geodesic path given a point,
 * a distance and an azimuth.
 *
 * @param point - Point coordinates [lon,lat].
 * @param dist - The distance in meters.
 * @param azimuth - Azimuth (angle) clockwise from north in degrees.
 * @returns - The coordinates [lon,lat] of the destination point.
 */
export const destination = (
  point: GJ.Position,
  dist: number,
  azimuth: number,
): GJ.Position => {
  const result = geod.Direct(
    point[1],
    point[0],
    (azimuth + 360) % 360,
    dist,
    geodDirectOpts,
  );
  if (typeof result.lon2 === 'number' && typeof result.lat2 === 'number') {
    return [result.lon2, result.lat2];
  }
  // should never be reached
  throw new Error('Not able to compute destination point.');
};
