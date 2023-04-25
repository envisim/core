import {Random} from '@envisim/random';
import {
  toFeature,
  intermediate,
  destination,
  length,
  lengthOfSegment,
} from '@envisim/geojson-utils';

// Comment: For now, length is computed with default dist,
// for entire line and individual segments, but
// intermediate places new points on fraction of distance on a
// geodesic path between points instead of on the segment line.
// This is ok in applications, which are unlikely to use very long segments.
// We may consider creating intermediateOnSegment function.

type Track = {
  dt: number;
  currentIndex: number;
};

// Internal.
const samplePointsOnGeometry = (
  geoJSON:
    | GeoJSON.Point
    | GeoJSON.MultiPoint
    | GeoJSON.LineString
    | GeoJSON.MultiLineString
    | GeoJSON.Polygon
    | GeoJSON.MultiPolygon,
  track: Track,
  distances: number[],
  opts = {_radius: 0},
) => {
  let points = [];
  let segmentLength = 0;
  let fraction = 0;
  switch (geoJSON.type) {
    case 'Point':
      let pointCoords = geoJSON.coordinates;
      if (opts._radius > 0) {
        segmentLength = Math.PI * opts._radius * 2;
        for (let i = track.currentIndex; i < distances.length; i++) {
          if (distances[i] < track.dt + segmentLength) {
            fraction = (distances[i] - track.dt) / segmentLength;
            points.push(destination(pointCoords, opts._radius, 360 * fraction));
            track.currentIndex += 1;
          }
        }
        track.dt += segmentLength;
      }
      break;
    case 'MultiPoint':
      let multiPointCoords = geoJSON.coordinates;
      if (opts._radius > 0) {
        segmentLength = Math.PI * opts._radius * 2;
        for (let k = 0; k < multiPointCoords.length; k++) {
          for (let i = track.currentIndex; i < distances.length; i++) {
            if (distances[i] < track.dt + segmentLength) {
              fraction = (distances[i] - track.dt) / segmentLength;
              points.push(
                destination(multiPointCoords[k], opts._radius, 360 * fraction),
              );
              track.currentIndex += 1;
            }
          }
          track.dt += segmentLength;
        }
      }
      break;
    case 'LineString':
      let lineStringCoords = geoJSON.coordinates;
      for (let i = 0; i < lineStringCoords.length - 1; i++) {
        segmentLength = lengthOfSegment(
          lineStringCoords[i],
          lineStringCoords[i + 1],
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
    case 'Polygon':
      let mlsCoords = geoJSON.coordinates;
      for (let i = 0; i < mlsCoords.length; i++) {
        for (let j = 0; j < mlsCoords[i].length - 1; j++) {
          segmentLength = lengthOfSegment(mlsCoords[i][j], mlsCoords[i][j + 1]);
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
    case 'MultiPolygon':
      let mpCoords = geoJSON.coordinates;
      for (let i = 0; i < mpCoords.length; i++) {
        for (let j = 0; j < mpCoords[i].length; j++) {
          for (let k = 0; k < mpCoords[i][j].length - 1; k++) {
            segmentLength = lengthOfSegment(
              mpCoords[i][j][k],
              mpCoords[i][j][k + 1],
            );
            for (let l = track.currentIndex; l < distances.length; l++) {
              if (distances[l] < track.dt + segmentLength) {
                fraction = (distances[l] - track.dt) / segmentLength;
                points.push(
                  intermediate(
                    mpCoords[i][j][k],
                    mpCoords[i][j][k + 1],
                    fraction,
                  ),
                );
                track.currentIndex += 1;
              }
            }
            track.dt += segmentLength;
          }
        }
      }
      break;
    default:
      throw new Error('Unknown GeoJSON geometry.');
  }
  return points;
};

// Internal.
const samplePointsOnGeometryCollection = (
  geoJSON: GeoJSON.GeometryCollection,
  track: Track,
  distances: number[],
  opts = {_radius: 0},
): GeoJSON.Position[] => {
  let points: GeoJSON.Position[] = [];
  let result: GeoJSON.Position[] = [];
  for (let i = 0; i < geoJSON.geometries.length; i++) {
    let geometry = geoJSON.geometries[i];
    if (geometry.type === 'GeometryCollection') {
      result = samplePointsOnGeometryCollection(
        geometry,
        track,
        distances,
        opts,
      );
    } else {
      result = samplePointsOnGeometry(geometry, track, distances, opts);
    }
    points = points.concat(result);
  }
  return points;
};

/**
 * Selects points according to method and sampleSize on any GeoJSON FeatureCollection
 * which has a positive length.
 *
 * @param geoJSON - A GeoJSON FeatureCollection.
 * @param opts - An options object.
 * @param opts.sampleSize - An integer > 0 for number of points to sample.
 * @param opts.method - The method to use. Either 'uniform' or 'systematic'.
 * @param opts.rand - An optional instance of Random.
 * @returns A GeoJSON FeatureCollection of Point Features.
 */
export const samplePointsOnLines = (
  geoJSON: GeoJSON.FeatureCollection,
  opts: {
    method?: 'uniform' | 'systematic';
    sampleSize?: number;
    rand?: Random;
  } = {},
): GeoJSON.FeatureCollection => {
  if (geoJSON.type !== 'FeatureCollection') {
    throw new Error(
      'Input GeoJSON must be a FeatureCollection, not type: ' +
        geoJSON.type +
        '.',
    );
  }
  const method = opts.method || 'uniform';
  const sampleSize = opts.sampleSize || 1;
  const rand = opts.rand ?? new Random();
  const L = length(geoJSON); // total length of input geoJSON

  if (L === 0) {
    throw new Error('Input GeoJSON has zero length.');
  }

  let distances = []; // Holds sample points as distances from 0 to L.

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

  for (let i = 0; i < geoJSON.features.length; i++) {
    let opts = {_radius: 0};
    let feature = geoJSON.features[i];
    if (feature.properties?._radius) {
      opts = {_radius: feature.properties._radius};
    }
    if (feature.geometry.type === 'GeometryCollection') {
      let result = samplePointsOnGeometryCollection(
        feature.geometry,
        track,
        distances,
        opts,
      );
      points = points.concat(result);
      parentIndex = parentIndex.concat(new Array(result.length).fill(i));
    } else {
      let result = samplePointsOnGeometry(
        feature.geometry,
        track,
        distances,
        opts,
      );
      points = points.concat(result);
      parentIndex = parentIndex.concat(new Array(result.length).fill(i));
    }
  }

  const features: GeoJSON.Feature[] = points.map(
    (coords, index): GeoJSON.Feature => {
      // transfer design weights if the frame has been sampled before
      let dw = designWeight;
      let parentFeature = geoJSON.features[parentIndex[index]];
      if (parentFeature.properties?._designWeight) {
        dw = dw * parentFeature.properties._designWeight;
      }
      return toFeature(
        {
          type: 'Point',
          coordinates: coords,
        },
        {
          properties: {
            _designWeight: dw,
          },
          copy: false,
        },
      );
    },
  );

  return {
    type: 'FeatureCollection',
    features: features,
  };
};
