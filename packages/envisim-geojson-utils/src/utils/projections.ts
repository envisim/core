import geodesic from 'geographiclib-geodesic';

import type * as GJ from '../types/geojson.js';

const geod = geodesic.Geodesic.WGS84;
const geodInverseOpts = geodesic.Geodesic.DISTANCE | geodesic.Geodesic.AZIMUTH;
const geodDirectOpts = geodesic.Geodesic.LONGITUDE | geodesic.Geodesic.LATITUDE;

// Constants
const TO_DEG = 180 / Math.PI;
const TO_RAD = Math.PI / 180;

export type ProjectionFunction = (coord: GJ.Position) => GJ.Position;
export type NestedPosition = GJ.Position | NestedPosition[];

/**
 * Helper function to project/unproject coords
 * @param coords
 * @param proj
 * @returns
 */
export function projectCoords<T extends NestedPosition>(coords: T, proj: ProjectionFunction): T {
  if (Array.isArray(coords[0])) {
    return (coords as NestedPosition[]).map((coord) => {
      return projectCoords(coord, proj);
    }) as T;
  }
  return proj(coords as GJ.Position) as T;
}

export type Projection = {
  project: ProjectionFunction;
  unproject: ProjectionFunction;
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
      const result = geod.Inverse(refCoord[1], refCoord[0], coord[1], coord[0], geodInverseOpts);
      if (typeof result.s12 === 'number' && typeof result.azi1 === 'number') {
        return [
          result.s12 * Math.cos((90 - result.azi1) * TO_RAD),
          result.s12 * Math.sin((90 - result.azi1) * TO_RAD),
        ];
      }
      throw new Error('Not able to project.');
    },
    unproject: (coord: GJ.Position): GJ.Position => {
      const dist = (coord[0] ** 2 + coord[1] ** 2) ** 0.5;
      const angle = Math.atan2(coord[1], coord[0]) * TO_DEG;
      const result = geod.Direct(refCoord[1], refCoord[0], 90 - angle, dist, geodDirectOpts);
      if (typeof result.lon2 === 'number' && typeof result.lat2 === 'number') {
        return [result.lon2, result.lat2];
      }
      throw new Error('Not able to unproject.');
    },
  };
};
