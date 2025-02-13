import {
  Feature,
  FeatureCollection,
  type GeoJSON as GJ,
  type LineObject,
  LineString,
  PlateCarree,
  Point,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';
import {throwRangeError} from '@envisim/utils';

import {OptionsBase, optionsBaseCheck} from './options.js';
import {SampleError} from '~/errors/sample-error.js';

export type SamplePointsOnLinesOptions = OptionsBase;

export function samplePointsOnLinesCheck(options: SamplePointsOnLinesOptions): SampleError {
  return optionsBaseCheck(options);
}

/**
 * Selects points according to method and sampleSize on a line layer.
 *
 * @param collection
 * @param opts
 */
export function samplePointsOnLines(
  collection: FeatureCollection<LineObject>,
  options: SamplePointsOnLinesOptions,
): FeatureCollection<Point, never> {
  throwRangeError(samplePointsOnLinesCheck(options));
  const {rand = new Random(), pointSelection, sampleSize} = options;

  const L = collection.measure(); // total length of input geoJSON
  if (L === 0) {
    throw new Error('Input layer has zero length.');
  }

  let distances: number[] = []; // Holds sample points as distances from 0 to L.

  switch (pointSelection) {
    default:
    case 'independent':
      distances = new Array(sampleSize)
        .fill(0)
        .map(() => rand.random() * L)
        .sort((a, b) => a - b);
      break;

    case 'systematic': {
      const start = (rand.random() * L) / sampleSize;
      distances = new Array(sampleSize)
        .fill(0)
        .map((_val, index) => (index * L) / sampleSize + start);
      break;
    }
  }

  const track = {dt: 0, currentIndex: 0};
  const points: GJ.Position[] = [];
  const parentIndex: number[] = [];
  const designWeight = L / sampleSize;

  collection.forEach((feature, index) => {
    const geom = feature.geometry;
    const result = samplePointsOnGeometry(geom, track, distances);

    points.push(...result);
    parentIndex.push(...Array.from<number>({length: result.length}).fill(index));
  });

  return FeatureCollection.newPoint<Point, never>(
    points.map(
      (p, i) =>
        new Feature<Point, never>(Point.create(p), {
          _designWeight:
            designWeight * collection.features[parentIndex[i]].getSpecialPropertyDesignWeight(),
        }),
    ),
  );
}

/**
 * Type for keeping track of distance travelled (dt) and index of sample point
 * to be placed next (currentIndex).
 */
type Track = {
  dt: number;
  currentIndex: number;
};

/** @internal */
function samplePointsOnGeometry(geometry: LineObject, track: Track, distances: number[]) {
  const points: GJ.Position[] = [];
  let segmentLength = 0;
  let fraction = 0;

  if (LineString.isObject(geometry)) {
    const lineStringCoords = geometry.coordinates;

    for (let i = 0; i < lineStringCoords.length - 1; i++) {
      segmentLength = PlateCarree.distance(lineStringCoords[i], lineStringCoords[i + 1]);

      for (let l = track.currentIndex; l < distances.length; l++) {
        if (distances[l] < track.dt + segmentLength) {
          fraction = (distances[l] - track.dt) / segmentLength;
          points.push(
            PlateCarree.intermediate(lineStringCoords[i], lineStringCoords[i + 1], fraction),
          );
          track.currentIndex += 1;
        }
      }

      track.dt += segmentLength;
    }
  } else {
    const mlsCoords = geometry.coordinates;

    for (let i = 0; i < mlsCoords.length; i++) {
      for (let j = 0; j < mlsCoords[i].length - 1; j++) {
        segmentLength = PlateCarree.distance(mlsCoords[i][j], mlsCoords[i][j + 1]);

        for (let l = track.currentIndex; l < distances.length; l++) {
          if (distances[l] < track.dt + segmentLength) {
            fraction = (distances[l] - track.dt) / segmentLength;
            points.push(PlateCarree.intermediate(mlsCoords[i][j], mlsCoords[i][j + 1], fraction));
            track.currentIndex += 1;
          }
        }

        track.dt += segmentLength;
      }
    }
  }

  return points;
}
