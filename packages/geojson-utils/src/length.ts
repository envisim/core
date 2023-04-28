import {asFeatureCollection} from './asFeatureCollection.js';
import {distance} from './distance.js';

/**
 * Computes the length of the a GeoJSON segment.
 * @param start - Start point [lon,lat]
 * @param end - End point [lon,lat]
 * @param dist - Optional distance for start using interpolated segment points, defaults to 100000 (meters).
 * @returns - The length of the segment in meters.
 */
export const lengthOfSegment = (
  start: GeoJSON.Position,
  end: GeoJSON.Position,
  dist = 100000,
): number => {
  let L = 0; // Aggregate length for segments longer than maxDist
  const distToEnd = distance(start, end);
  if (distToEnd > dist) {
    const numPointsToAdd = Math.ceil(distToEnd / dist);
    const [lon0, lat0] = start;
    const [lon1, lat1] = end;
    let prev = start;
    for (let i = 1; i <= numPointsToAdd; i++) {
      const t = i / numPointsToAdd;
      const lon = lon0 + t * (lon1 - lon0);
      const lat = lat0 + t * (lat1 - lat0);
      L += distance(prev, [lon, lat]);
      prev = [lon, lat];
    }
    return L;
  }
  return distToEnd;
};

// Internal.
const lengthOfLineString = (ls: GeoJSON.Position[], dist: number) => {
  let l = 0;
  for (let i = 0; i < ls.length - 1; i++) {
    l += lengthOfSegment(ls[i], ls[i + 1], dist);
  }
  return l;
};

// Internal.
const lengthOfGeometry = (
  geometry: GeoJSON.Geometry,
  opts = {_radius: 0, dist: 100000},
): number => {
  switch (geometry.type) {
    case 'LineString':
      return lengthOfLineString(geometry.coordinates, opts.dist);
    case 'MultiLineString':
    case 'Polygon':
      return geometry.coordinates.reduce(
        (prev, curr) => prev + lengthOfLineString(curr, opts.dist),
        0,
      );
    case 'MultiPolygon':
      return geometry.coordinates.reduce(
        (prev, curr) =>
          prev +
          curr.reduce(
            (prev, curr) => prev + lengthOfLineString(curr, opts.dist),
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
 * exceeds dist. This can inrease precision for long segments, at the cost of
 * a larger number of distance computations.
 *
 * @param geoJSON - A GeoJSON object.
 * @param dist - Optional distance for start using interpolated segment points, defaults to 100000 (meters).
 * @returns - The length in meters.
 */
export const length = (geoJSON: GeoJSON.GeoJSON, dist = 100000): number => {
  let L = 0; // Aggregate length to L
  asFeatureCollection(geoJSON).features.forEach((feature) => {
    const opts = {_radius: 0, dist: dist};
    if (feature.properties?._radius) {
      opts._radius = feature.properties._radius;
    }
    L += lengthOfGeometry(feature.geometry, opts);
  });
  return L;
};
