// @ts-ignore
import geodesic from 'geographiclib-geodesic';
import {distance} from './distance.js';
// import {asFeatureCollection} from './asFeatureCollection.js';
import type * as GJ from './geojson/types.js';

// @ts-ignore
const geod = geodesic.Geodesic.WGS84;

// Internal.
const areaOfRingLonLat = (coords: GJ.Position[], maxDist: number): number => {
  const p = geod.Polygon(false);
  const n = coords.length;
  for (let i = 0; i < n - 1; i++) {
    const dist = distance(coords[i], coords[i + 1]);
    // add first point of segment (lat,lon)
    p.AddPoint(coords[i][1], coords[i][0]);
    // add more interpolated points?
    const numPointsToAdd = maxDist === Infinity ? 1 : Math.ceil(dist / maxDist);
    if (numPointsToAdd > 1) {
      // add more points
      const lon0 = coords[i][0];
      const lon1 = coords[i + 1][0];
      const lat0 = coords[i][1];
      const lat1 = coords[i + 1][1];
      for (let j = 1; j < numPointsToAdd; j++) {
        const t = j / numPointsToAdd;
        const lon = lon0 + t * (lon1 - lon0);
        const lat = lat0 + t * (lat1 - lat0);
        p.AddPoint(lat, lon);
      }
    }
  }
  // add last point
  p.AddPoint(coords[n - 1][1], coords[n - 1][0]);
  // compute and return area
  return Math.abs(p.Compute(false, true).area);
};

// Internal.
export const areaOfPolygonLonLat = (
  points: GJ.Position[][],
  maxDist: number,
): number => {
  // Full area of outer ring.
  let area = areaOfRingLonLat(points[0], maxDist);
  // Now substract area of any holes.
  for (let i = 1; i < points.length; i++) {
    area = area - areaOfRingLonLat(points[i], maxDist);
  }
  return area;
};

// Internal.
/*
const areaOfGeometry = (
  geometry: GeoJSON.Geometry,
  opts = {_radius: 0, maxDist: Infinity},
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
      return areaOfPolygonLonLat(geometry.coordinates, opts.maxDist);
    case 'MultiPolygon':
      return geometry.coordinates.reduce(
        (prev, curr) => areaOfPolygonLonLat(curr, opts.maxDist) + prev,
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
};*/

/**
 * Computes the sum of all areas of all geometries in a geoJSON.
 * Note: Not the same as area of union. The area is computed using
 * geographiclib, which means segments are treated as geodesic paths.
 * According to the GeoJSON specification, segments are straight cartesian
 * lines in longitude and latitude. Interpolated points will be added
 * (in the computation) if the distance between the segment endpoints
 * exceeds dist. This can inrease precision in area for long segments,
 * at the cost of a larger number of computations.
 *
 * @param geoJSON - A geoJSON.
 * @param dist - Optional distance for start using interpolated segment points, defaults to Infinity (meters).
 * @returns - The sum of area in square meters.
 */
/*function a(b:GeoJSON.AreaObject):number;
function a(b:GeoJSON.LineObject):number {

}
export a;*/

/*export const area = (geoJSON: GeoJSON.GeoJSON, dist = Infinity): number => {
  let A = 0; // aggregate area to A
  asFeatureCollection(geoJSON).features.forEach((feature) => {
    const opts = {_radius: 0, maxDist: dist};
    if (feature.properties?._radius) {
      opts._radius = feature.properties._radius;
    }
    A += areaOfGeometry(feature.geometry, opts);
  });
  return A;
};*/
