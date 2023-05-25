// @ts-ignore
import geodesic from 'geographiclib-geodesic';
import type * as GJ from './geojson/types.js';
// @ts-ignore
const geod = geodesic.Geodesic.WGS84;
const geodInverseOpts = geodesic.Geodesic.DISTANCE | geodesic.Geodesic.AZIMUTH;
const geodDirectOpts = geodesic.Geodesic.LONGITUDE | geodesic.Geodesic.LATITUDE;

// TODO?: Add interpolation for long distance or create new function
// intermediateOnSegment which uses interpolation. This would place the
// point on the segment, but precision would depend on dist. Alternative
// can be to put point proportional on segment. Should use the same as length
// in sampling on lines.

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
  p1: GJ.Position,
  p2: GJ.Position,
  fraction: number,
): GJ.Position => {
  const result1 = geod.Inverse(p1[1], p1[0], p2[1], p2[0], geodInverseOpts);
  const dist = result1.s12;
  const azimuth = result1.azi1;
  let result2;
  if (typeof dist === 'number' && typeof azimuth === 'number') {
    result2 = geod.Direct(
      p1[1],
      p1[0],
      azimuth,
      dist * fraction,
      geodDirectOpts,
    );
    if (typeof result2.lon2 === 'number' && typeof result2.lat2 === 'number') {
      return [result2.lon2, result2.lat2];
    }
  }
  throw new Error('Not able to compute intermediate point.');
};
