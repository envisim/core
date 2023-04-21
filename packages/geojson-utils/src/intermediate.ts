// @ts-ignore
import geodesic from 'geographiclib-geodesic';
// @ts-ignore
const geod = geodesic.Geodesic.WGS84;

/**
 * Computes an intermediate point on a geodesic path given a start point,
 * an end point and the fraction of the distance.
 *
 * @param p1 - Point coordinates [lon,lat] for start point.
 * @param p2 - Point coordinates [lon,lat] for end point.
 * @param fraction - The fraction of distance between the points.
 * @returns - The coordinates [lon,lat] of the intermediate point.
 */
export const intermediate = (
  p1: GeoJSON.Position,
  p2: GeoJSON.Position,
  fraction: number,
): GeoJSON.Position => {
  const result1 = geod.Inverse(p1[1], p1[0], p2[1], p2[0]);
  const dist = result1.s12;
  const azimuth = result1.azi1;
  let result2;
  if (typeof dist === 'number' && typeof azimuth === 'number') {
    result2 = geod.Direct(p1[1], p1[0], azimuth, dist * fraction);
    if (typeof result2.lon2 === 'number' && typeof result2.lat2 === 'number') {
      return [result2.lon2, result2.lat2];
    }
  }
  throw new Error('Not able to compute intermediate point.');
};
