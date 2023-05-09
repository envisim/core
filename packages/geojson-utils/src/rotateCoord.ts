// @ts-ignore
import geodesic from 'geographiclib-geodesic';
import type * as GJ from './geojson/types.js';
// @ts-ignore
const geod = geodesic.Geodesic.WGS84;

/**
 * Rotates coord around refCoord clockwise by angle.
 *
 * @param coord - The [lon,lat] coordinate to rotate.
 * @param refCoord - The [lon,lat] reference coordinate to rotate around.
 * @param angle - The angle of the rotation in degrees.
 * @returns - The new coordinate as [lon,lat].
 */
export const rotateCoord = (
  coord: GJ.Position,
  refCoord: GJ.Position,
  angle: number,
): GJ.Position => {
  const result = geod.Inverse(refCoord[1], refCoord[0], coord[1], coord[0]);
  const dist = result.s12;
  const azimuth = result.azi1;
  if (typeof azimuth === 'number' && typeof dist === 'number') {
    const result2 = geod.Direct(
      refCoord[1],
      refCoord[0],
      (azimuth + angle + 360) % 360,
      dist,
    );
    if (typeof result2.lon2 === 'number' && typeof result2.lat2 === 'number') {
      return [result2.lon2, result2.lat2];
    }
  }
  // should never be reached
  throw new Error('Not able to rotate coord.');
};
