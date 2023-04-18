import {distance} from './distance.js';

// Internal.
const lengthOfLineStringLngLat = (ls: GeoJSON.Position[]) => {
  let l = 0;
  for (let i = 0; i < ls.length - 1; i++) {
    l += distance(ls[i], ls[i + 1]);
  }
  return l;
};

/**
 * Computes the length in meters of a GeoJSON object. All length (including
 * holes) is included. Distances are computed on an ellipsoidal earth model.
 *
 * @param geoJSON - A GeoJSON object.
 * @param opts - Internal, default empty.
 * @returns - The length in meters.
 */
export const length = (
  geoJSON: GeoJSON.GeoJSON,
  opts = {_radius: 0},
): number => {
  switch (geoJSON.type) {
    case 'LineString':
      return lengthOfLineStringLngLat(geoJSON.coordinates);
    case 'MultiLineString':
    case 'Polygon':
      return geoJSON.coordinates.reduce(
        (prev, curr) => prev + lengthOfLineStringLngLat(curr),
        0,
      );
    case 'MultiPolygon':
      return geoJSON.coordinates.reduce(
        (prev, curr) =>
          prev +
          curr.reduce((prev, curr) => prev + lengthOfLineStringLngLat(curr), 0),
        0,
      );
    case 'GeometryCollection':
      return geoJSON.geometries.reduce(
        (prev, curr) => length(curr, opts) + prev,
        0,
      );
    case 'Feature':
      if (geoJSON.properties?._radius) {
        return length(geoJSON.geometry, {_radius: geoJSON.properties._radius});
      }
      return length(geoJSON.geometry);
    case 'FeatureCollection':
      return geoJSON.features.reduce((prev, curr) => length(curr) + prev, 0);
    case 'Point':
      if (opts._radius > 0) {
        return 2 * opts._radius * Math.PI;
      }
      return 0;
    case 'MultiPoint':
      if (opts._radius > 0) {
        return 2 * opts._radius * Math.PI * geoJSON.coordinates.length;
      }
      return 0;
    default:
      throw new Error('length: Unknown GeoJSON type.');
  }
};
