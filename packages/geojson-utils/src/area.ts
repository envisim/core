// @ts-ignore
import geodesic from 'geographiclib-geodesic';
import {toFeatureCollection} from './toFeatureCollection.js';

// @ts-ignore
const geod = geodesic.Geodesic.WGS84;

// Internal.
const areaOfSimplePolygonLonLat = (coords: GeoJSON.Position[]): number => {
  const p = geod.Polygon(false);
  coords.forEach((coord) => {
    p.AddPoint(coord[1], coord[0]);
  });
  return Math.abs(p.Compute(false, true).area);
};

// Internal.
const areaOfPolygonLonLat = (points: GeoJSON.Position[][]): number => {
  // Full area of outer ring.
  let area = areaOfSimplePolygonLonLat(points[0]);
  // Now substract area of any holes.
  for (let i = 1; i < points.length; i++) {
    area = area - areaOfSimplePolygonLonLat(points[i]);
  }
  return area;
};

// Internal.
const areaOfGeometry = (
  geometry: GeoJSON.Geometry,
  opts = {_radius: 0},
): number => {
  switch (geometry.type) {
    case 'Point':
      if (opts._radius > 0) {
        return Math.PI * opts._radius * opts._radius;
      }
      return 0;
    case 'MultiPoint':
      if (opts._radius > 0) {
        return (
          Math.PI * opts._radius * opts._radius * geometry.coordinates.length
        );
      }
      return 0;
    case 'Polygon':
      return areaOfPolygonLonLat(geometry.coordinates);
    case 'MultiPolygon':
      return geometry.coordinates.reduce(
        (prev, curr) => areaOfPolygonLonLat(curr) + prev,
        0,
      );
    case 'GeometryCollection':
      return geometry.geometries.reduce(
        (prev, curr) => areaOfGeometry(curr, opts) + prev,
        0,
      );
    default:
      return 0;
  }
};

/**
 * Computes the sum of all areas of all geometries in a geoJSON.
 * Note: Not the same as area of union. The area is computed using
 * geographiclib, which means segments are treated as geodesic paths.
 *
 * @param geoJSON - A geoJSON.
 * @returns - The sum of area in square meters.
 */
export const area = (geoJSON: GeoJSON.GeoJSON): number => {
  const gj = toFeatureCollection(geoJSON, {copy: false});
  let A = 0; // aggregate area to A
  gj.features.forEach((feature) => {
    const opts = {_radius: 0};
    if (feature.properties?._radius) {
      opts._radius = feature.properties._radius;
    }
    A += areaOfGeometry(feature.geometry, opts);
  });
  return A;
};
