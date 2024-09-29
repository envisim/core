import geodesic from 'geographiclib-geodesic';

import type * as GJ from '../types/geojson.js';

const geod = geodesic.Geodesic.WGS84;
const geodInverseOpts = geodesic.Geodesic.DISTANCE | geodesic.Geodesic.AZIMUTH;
const geodDirectOpts = geodesic.Geodesic.LONGITUDE | geodesic.Geodesic.LATITUDE;

// Constants
const toDeg = 180 / Math.PI;
const toRad = Math.PI / 180;

export type Projection = {
  project: (coord: GJ.Position) => GJ.Position;
  unproject: (coord: GJ.Position) => GJ.Position;
};

/**
 * Azimuthal Equidistant projection based on the reference coordinate
 * provided as argument.
 * @param refCoord - A GeoJSON.Position
 * @returns - Azimuthal Equidistant projection.
 */
export const azimuthalEquidistant = (refCoord: GJ.Position): Projection => {
  return {
    project: (coord: GJ.Position): GJ.Position => {
      const result = geod.Inverse(
        refCoord[1],
        refCoord[0],
        coord[1],
        coord[0],
        geodInverseOpts,
      );
      if (typeof result.s12 === 'number' && typeof result.azi1 === 'number') {
        return [
          result.s12 * Math.cos((90 - result.azi1) * toRad),
          result.s12 * Math.sin((90 - result.azi1) * toRad),
        ];
      }
      throw new Error('Not able to project.');
    },
    unproject: (coord: GJ.Position): GJ.Position => {
      const dist = (coord[0] ** 2 + coord[1] ** 2) ** 0.5;
      const angle = Math.atan2(coord[1], coord[0]) * toDeg;
      const result = geod.Direct(
        refCoord[1],
        refCoord[0],
        90 - angle,
        dist,
        geodDirectOpts,
      );
      if (typeof result.lon2 === 'number' && typeof result.lat2 === 'number') {
        return [result.lon2, result.lat2];
      }
      throw new Error('Not able to unproject.');
    },
  };
};
