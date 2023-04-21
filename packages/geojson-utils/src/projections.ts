// @ts-ignore
import geodesic from 'geographiclib-geodesic';
// @ts-ignore
const geod = geodesic.Geodesic.WGS84;

// Constants
const toDeg = 180 / Math.PI;
const toRad = Math.PI / 180;
const PI_4 = Math.PI / 4;

// Internal
const coordToWebMercator = (coord: GeoJSON.Position): GeoJSON.Position => {
  return [coord[0], Math.log(Math.tan((coord[1] / 90 + 1) * PI_4)) * toDeg];
};

// Internal
const coordFromWebMercator = (coord: GeoJSON.Position): GeoJSON.Position => {
  return [coord[0], (Math.atan(Math.exp(coord[1] / toDeg)) / PI_4 - 1) * 90];
};

type Projection = {
  project: Function;
  unproject: Function;
};

/**
 * Web Mercator projection.
 * @returns Web Mercator projection.
 */
export const webMercator = (): Projection => {
  return {
    project: coordToWebMercator,
    unproject: coordFromWebMercator,
  };
};

/**
 * Azimuthal Equidistant projection based on the reference coordinate
 * provided as argument.
 * @param refCoord
 * @returns Azimuthal Equidistant projection.
 */
export const azimuthalEquidistant = (
  refCoord: GeoJSON.Position,
): Projection => {
  return {
    project: (coord: GeoJSON.Position): number[] => {
      const result = geod.Inverse(refCoord[1], refCoord[0], coord[1], coord[0]);
      if (typeof result.s12 === 'number' && typeof result.azi1 === 'number') {
        return [
          result.s12 * Math.cos((90 - result.azi1) * toRad),
          result.s12 * Math.sin((90 - result.azi1) * toRad),
        ];
      }
      throw new Error('Not able to project.');
    },
    unproject: (coord: number[]): GeoJSON.Position => {
      const dist = (coord[0] ** 2 + coord[1] ** 2) ** 0.5;
      const angle = Math.atan2(coord[1], coord[0]) * toDeg;
      const result = geod.Direct(refCoord[1], refCoord[0], 90 - angle, dist);
      if (typeof result.lon2 === 'number' && typeof result.lat2 === 'number') {
        return [result.lon2, result.lat2];
      }
      throw new Error('Not able to unproject.');
    },
  };
};

type Cartesian = [number, number, number];

// Internal.
// Helper function to convert from lonLat coordinates to
// cartesian coordinates on unit sphere.
const lonLatToCartesian = (coord: GeoJSON.Position): Cartesian => {
  const sinLon = Math.sin(coord[0] * toRad);
  const cosLon = Math.cos(coord[0] * toRad);
  const sinLat = Math.sin((90 - coord[1]) * toRad);
  const cosLat = Math.cos((90 - coord[1]) * toRad);
  return [sinLat * cosLon, sinLat * sinLon, cosLat];
};

// Internal.
// Helper function to convert from cartesian coordinates on unit sphere
// to lonLat.
const cartesianToLonLat = (coord: Cartesian): GeoJSON.Position => {
  const lon = Math.atan2(coord[1], coord[0]) * toDeg;
  const lat = 90 - Math.acos(coord[2]) * toDeg;
  return [lon, lat];
};

/**
 * Project [lon,lat] to/from cartesian [x,y,z] on unit sphere
 * @returns Cartesian projection
 */
export const cartesian = (): Projection => {
  return {
    project: (coord: GeoJSON.Position): Cartesian => {
      return lonLatToCartesian(coord);
    },
    unproject: (coord: Cartesian): GeoJSON.Position => {
      return cartesianToLonLat(coord);
    },
  };
};
