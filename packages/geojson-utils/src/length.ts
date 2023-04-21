import {toFeatureCollection} from './toFeatureCollection.js';
import {distance} from './distance.js';

// One degree of latitude is approx 111 km
// Approximately the same for longitude (at the equator)
// ? Set default to 1/111 degrees (longer than 1km) (take square to ease distance computation)
// ? Set dafault nr of points to add to 10

const lengthOfSegment = (
  p0: GeoJSON.Position,
  p1: GeoJSON.Position,
  maxDist = 100000,
): number => {
  let L = 0; // Aggregate length for segments longer than maxDist
  const dist = distance(p0, p1);
  if (dist > maxDist) {
    const numPointsToAdd = Math.ceil(dist / maxDist);
    const [lon0, lat0] = p0;
    const [lon1, lat1] = p1;
    let prev = p0;
    for (let i = 1; i <= numPointsToAdd; i++) {
      const t = i / numPointsToAdd;
      const lon = lon0 + t * (lon1 - lon0);
      const lat = lat0 + t * (lat1 - lat0);
      L += distance(prev, [lon, lat]);
      prev = [lon, lat];
    }
    return L;
  }
  return dist;
};

// Internal.
const lengthOfLineString = (ls: GeoJSON.Position[]) => {
  let l = 0;
  for (let i = 0; i < ls.length - 1; i++) {
    // Here it would be possible to choose precision in terms of
    // maximum length of segments (if we follow strictly the GeoJSON specification)
    // to account for segments being straight cartesian lines in lon,lat.
    // By adding "phantom" interpolated points on "long" segments in the computation
    // of the segment length, the difference between geodesic and cartesian in lon,lat can be reduced.
    // The same procedure can be applied for computing the area. This can perhaps be an option to the main
    // method length to choose how to treat segments (geodesic or cartesian).
    l += lengthOfSegment(ls[i], ls[i + 1]); //distance(ls[i], ls[i + 1]);
  }
  return l;
};

// Internal.
const lengthOfGeometry = (
  geometry: GeoJSON.Geometry,
  opts = {_radius: 0},
): number => {
  switch (geometry.type) {
    case 'LineString':
      return lengthOfLineString(geometry.coordinates);
    case 'MultiLineString':
    case 'Polygon':
      return geometry.coordinates.reduce(
        (prev, curr) => prev + lengthOfLineString(curr),
        0,
      );
    case 'MultiPolygon':
      return geometry.coordinates.reduce(
        (prev, curr) =>
          prev +
          curr.reduce((prev, curr) => prev + lengthOfLineString(curr), 0),
        0,
      );
    case 'GeometryCollection':
      return geometry.geometries.reduce(
        (prev, curr) => lengthOfGeometry(curr, opts) + prev,
        0,
      );
    case 'Point':
      if (opts._radius > 0) {
        return 2 * opts._radius * Math.PI;
      }
      return 0;
    case 'MultiPoint':
      if (opts._radius > 0) {
        return 2 * opts._radius * Math.PI * geometry.coordinates.length;
      }
      return 0;
    default:
      throw new Error('Unknown GeoJSON geometry type.');
  }
};

/**
 * Computes the length in meters of a GeoJSON object. All length (including
 * holes) is included. Length is computed using geographiclib, which treat
 * segments as geodesic paths.
 *
 * @param geoJSON - A GeoJSON object.
 * @returns - The length in meters.
 */
export const length = (geoJSON: GeoJSON.GeoJSON): number => {
  const gj = toFeatureCollection(geoJSON, {copy: false});
  let L = 0; // Aggregate length to L
  gj.features.forEach(feature => {
    const opts = {_radius: 0};
    if (feature.properties?._radius) {
      opts._radius = feature.properties._radius;
    }
    L += lengthOfGeometry(feature.geometry, opts);
  });
  return L;
};
