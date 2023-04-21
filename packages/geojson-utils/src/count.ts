import {toFeatureCollection} from './toFeatureCollection.js';

// Internal.
const countInGeometry = (
  geometry: GeoJSON.Geometry,
  opts = {_radius: 0},
): number => {
  let size = 0;
  switch (geometry.type) {
    case 'Point':
      if (opts._radius === 0) {
        size = 1;
      }
      break;
    case 'MultiPoint':
      if (opts._radius === 0) {
        size = geometry.coordinates.length;
      }
      break;
    case 'GeometryCollection':
      geometry.geometries.forEach((geometry) => {
        size += countInGeometry(geometry, opts);
      });
      break;
    default:
      break;
  }
  return size;
};

/**
 * Compute number of (single) points in geometries including
 * Point and MultiPoint but excluding PointCircles.
 *
 * @param geoJSON - The GeoJSON to count (single) points in Point/MultiPoint geometries.
 * @returns - The number of (single) points in Point/MultiPoint geometries.
 */
export const count = (geoJSON: GeoJSON.GeoJSON): number => {
  let size = 0;
  toFeatureCollection(geoJSON, {copy: false}).features.forEach((feature) => {
    const opts = {_radius: 0};
    if (feature.properties?._radius) {
      opts._radius = feature.properties._radius;
    }
    size += countInGeometry(feature.geometry, opts);
  });
  return size;
};
