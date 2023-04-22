import {toFeatureCollection} from './toFeatureCollection.js';
import {distance} from './distance.js';

const lengthOfSegment = (
  p0: GeoJSON.Position,
  p1: GeoJSON.Position,
  maxDist: number,
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
const lengthOfLineString = (ls: GeoJSON.Position[], maxDist: number) => {
  let l = 0;
  for (let i = 0; i < ls.length - 1; i++) {
    l += lengthOfSegment(ls[i], ls[i + 1], maxDist);
  }
  return l;
};

// Internal.
const lengthOfGeometry = (
  geometry: GeoJSON.Geometry,
  opts = {_radius: 0, maxDist: 100000},
): number => {
  switch (geometry.type) {
    case 'LineString':
      return lengthOfLineString(geometry.coordinates, opts.maxDist);
    case 'MultiLineString':
    case 'Polygon':
      return geometry.coordinates.reduce(
        (prev, curr) => prev + lengthOfLineString(curr, opts.maxDist),
        0,
      );
    case 'MultiPolygon':
      return geometry.coordinates.reduce(
        (prev, curr) =>
          prev +
          curr.reduce(
            (prev, curr) => prev + lengthOfLineString(curr, opts.maxDist),
            0,
          ),
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
 * holes) is included. Distance is computed using geographiclib-geodesic, which treat
 * segments as geodesic paths. According to the GeoJSON specification, segments
 * are straight cartesian lines in longitude and latitude. Interpolated points
 * will be added (in the computation) if the distance between the segment endpoints
 * exceeds maxDist. This can inrease precision for long segments, at the cost of
 * a larger number of distance computations.
 *
 * @param geoJSON - A GeoJSON object.
 * @param maxDist - Optional max distance for start using interpolated segment points, default to 100000 (meters).
 * @returns - The length in meters.
 */
export const length = (geoJSON: GeoJSON.GeoJSON, maxDist = 100000): number => {
  const gj = toFeatureCollection(geoJSON, {copy: false});
  let L = 0; // Aggregate length to L
  gj.features.forEach((feature) => {
    const opts = {_radius: 0, maxDist: maxDist};
    if (feature.properties?._radius) {
      opts._radius = feature.properties._radius;
    }
    L += lengthOfGeometry(feature.geometry, opts);
  });
  return L;
};
