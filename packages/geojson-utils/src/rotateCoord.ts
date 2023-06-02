// @ts-ignore
import geodesic from 'geographiclib-geodesic';

import type {GeoJSON as GJ} from './geojson/index.js';

const geod = geodesic.Geodesic.WGS84;
const geodInverseOpts = geodesic.Geodesic.DISTANCE | geodesic.Geodesic.AZIMUTH;
const geodDirectOpts = geodesic.Geodesic.LONGITUDE | geodesic.Geodesic.LATITUDE;

/**
 * Rotates coord around refCoord clockwise by angle.
 *
 * @param coord The [lon,lat] coordinate to rotate.
 * @param refCoord The [lon,lat] reference coordinate to rotate around.
 * @param angle The angle of the rotation in degrees.
 * @returns the new coordinate as [lon,lat].
 */
export function rotateCoord(
  coord: GJ.Position,
  refCoord: GJ.Position,
  angle: number,
): GJ.Position {
  const result = geod.Inverse(
    refCoord[1],
    refCoord[0],
    coord[1],
    coord[0],
    geodInverseOpts,
  );
  const dist = result.s12 as number;
  const azimuth = result.azi1 as number;

  const result2 = geod.Direct(
    refCoord[1],
    refCoord[0],
    (azimuth + angle + 360) % 360,
    dist,
    geodDirectOpts,
  );

  return [result2.lon2, result2.lat2] as [number, number];
}
