import {Random} from '@envisim/random';
import type {GeoJSON} from '@envisim/geojson-utils';
import {
  Point,
  PointFeature,
  PointCollection,
  LineCollection,
  intermediate,
  lengthOfSegment,
} from '@envisim/geojson-utils';

// Comment: For now, length is computed with option for dist,
// for entire line and individual segments, but
// intermediate places new points on fraction of distance on a
// geodesic path between points instead of on the segment line.
// This is ok in applications, which are unlikely to use very long segments.
// We may consider creating intermediateOnSegment function.

// Type for keeping track of distance travelled (dt) and index of sample point
// to be placed next (currentIndex).
type Track = {
  dt: number;
  currentIndex: number;
};

// Internal.
const samplePointsOnGeometry = (
  geoJSON: GeoJSON.LineObject,
  track: Track,
  distances: number[],
  maxDist: number,
) => {
  let points = [];
  let segmentLength = 0;
  let fraction = 0;
  switch (geoJSON.type) {
    case 'LineString':
      let lineStringCoords = geoJSON.coordinates;
      for (let i = 0; i < lineStringCoords.length - 1; i++) {
        segmentLength = lengthOfSegment(
          lineStringCoords[i],
          lineStringCoords[i + 1],
          maxDist,
        );
        for (let l = track.currentIndex; l < distances.length; l++) {
          if (distances[l] < track.dt + segmentLength) {
            fraction = (distances[l] - track.dt) / segmentLength;
            points.push(
              intermediate(
                lineStringCoords[i],
                lineStringCoords[i + 1],
                fraction,
              ),
            );
            track.currentIndex += 1;
          }
        }
        track.dt += segmentLength;
      }
      break;
    case 'MultiLineString':
      let mlsCoords = geoJSON.coordinates;
      for (let i = 0; i < mlsCoords.length; i++) {
        for (let j = 0; j < mlsCoords[i].length - 1; j++) {
          segmentLength = lengthOfSegment(
            mlsCoords[i][j],
            mlsCoords[i][j + 1],
            maxDist,
          );
          for (let l = track.currentIndex; l < distances.length; l++) {
            if (distances[l] < track.dt + segmentLength) {
              fraction = (distances[l] - track.dt) / segmentLength;
              points.push(
                intermediate(mlsCoords[i][j], mlsCoords[i][j + 1], fraction),
              );
              track.currentIndex += 1;
            }
          }
          track.dt += segmentLength;
        }
      }
      break;
    default:
      throw new Error('Unknown GeoJSON LineObject.');
  }
  return points;
};

// Internal.
const samplePointsOnGeometryCollection = (
  geoJSON: GeoJSON.LineGeometryCollection,
  track: Track,
  distances: number[],
  maxDist: number,
): GeoJSON.Position[] => {
  let points: GeoJSON.Position[] = [];
  let result: GeoJSON.Position[] = [];
  
  for (let i = 0; i < geoJSON.geometries.length; i++) {
    result = samplePointsOnGeometry(
      geoJSON.geometries[i],
      track,
      distances,
      maxDist,
    );
    points = points.concat(result);
  }
  return points;
};

/**
 * Selects points according to method and sampleSize on a LineCollection.
 *
 * @param geoJSON - A LineCollection.
 * @param method - The method to use. Either 'uniform' or 'systematic'.
 * @param sampleSize - An integer > 0 for number of points to sample.
 * @param opts - An options object.
 * @param opts.rand - An optional instance of Random.
 * @param opts.dist - Optional distance for start using interpolated points on segments.
 * @returns - A PointCollection.
 */
export const samplePointsOnLines = (
  geoJSON: LineCollection,
  method: 'uniform' | 'systematic',
  sampleSize: number,
  opts: {rand?: Random; dist?: number} = {},
): PointCollection => {

  if(!LineCollection.isCollection(geoJSON)){
    throw new Error("Input geoJSON must be a LineCollection.");
  }

  if (method !== 'systematic' && method !== 'uniform') {
    throw new Error("Input method must be either 'uniform' or 'systematic'.");
  }

  if (
    typeof sampleSize !== 'number' ||
    sampleSize !== Math.round(sampleSize) ||
    sampleSize <= 0
  ) {
    throw new Error('Input sampleSize must be a positive integer.');
  }

  const rand = opts.rand ?? new Random();
  const maxDist = opts.dist ?? Infinity;

  const L = geoJSON.length(maxDist); // total length of input geoJSON
  if (L === 0) {
    throw new Error('Input GeoJSON has zero length.');
  }

  let distances: number[] = []; // Holds sample points as distances from 0 to L.

  switch (method) {
    case 'uniform':
      distances = new Array(sampleSize)
        .fill(0)
        .map(() => rand.float() * L)
        .sort((a, b) => a - b);
      break;
    case 'systematic':
      let start = (rand.float() * L) / sampleSize;
      distances = new Array(sampleSize)
        .fill(0)
        .map((_val, index) => (index * L) / sampleSize + start);
      break;
    default:
      throw new Error('Unknown method');
  }

  let track = {dt: 0, currentIndex: 0};
  let points: GeoJSON.Position[] = [];
  let parentIndex: number[] = [];
  let designWeight = L / sampleSize;

  geoJSON.features.forEach((feature, index) => {
    const geom = feature.geometry;
    let result;
    if (geom.type === 'GeometryCollection') {
      result = samplePointsOnGeometryCollection(
        geom,
        track,
        distances,
        maxDist,
      );
    } else {
      result = samplePointsOnGeometry(geom, track, distances, maxDist);
    }

    points = points.concat(result);
    parentIndex = parentIndex.concat(new Array(result.length).fill(index));
  });

  const features: GeoJSON.PointFeature[] = points.map(
    (coords, index): GeoJSON.PointFeature => {
      // transfer design weights if the frame has been sampled before
      let dw = designWeight;
      let parentFeature = geoJSON.features[parentIndex[index]];
      if (parentFeature.properties?._designWeight) {
        dw = dw * parentFeature.properties._designWeight;
      }

      return PointFeature.create(Point.create(coords), {_designWeight: dw});
    },
  );
  return PointCollection.create(features);
};