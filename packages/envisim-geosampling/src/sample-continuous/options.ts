import {CirclesToPolygonsOptions, FeatureCollection, Point} from '@envisim/geojson-utils';
import {type RandomGenerator} from '@envisim/random';
import {throwRangeError} from '@envisim/utils';

import {DetectionFunction} from './distance-utils.js';
import {SAMPLE_ERROR_LIST, type SampleError} from '~/errors/index.js';

export {SAMPLE_ERROR_LIST, type SampleError, throwRangeError};

export interface OptionsBase {
  /**
   * An random number generator
   * @defaultValue `new Random()`
   */
  rand?: RandomGenerator;
  sampleSize: number;
  /**
   * @defaultValue `'independent'`
   */
  pointSelection?: 'independent' | 'systematic';
}

export function optionsBaseCheck({sampleSize}: OptionsBase) {
  if (!Number.isInteger(sampleSize) || sampleSize < 0) {
    return SAMPLE_ERROR_LIST.SAMPLE_SIZE_NOT_NON_NEGATIVE_INTEGER;
  }

  return null;
}

export type OptionsCircleConversion = CirclesToPolygonsOptions;

export function optionsCircleConversionCheck({
  pointsPerCircle,
}: OptionsCircleConversion): SampleError {
  if (
    pointsPerCircle !== undefined &&
    (!Number.isInteger(pointsPerCircle) || pointsPerCircle <= 0)
  ) {
    return SAMPLE_ERROR_LIST.POINTS_PER_CIRCLE_NOT_POSITIVE_INTEGER;
  }

  return null;
}

export interface OptionsRotationOfGrid {
  /**
   * If true, then the grid will be rotated
   * @defaultValue `0.0`
   */
  rotationOfGrid?: number | 'random';
}

export interface OptionsParallelLines {
  /**
   * The distance in meters between the parallel lines.
   */
  interspace: number;
  /**
   * Optional fixed rotation angle in degrees.
   * @defaultValue `0.0`
   */
  rotation?: number;
}

export function optionsParallelLinesCheck({interspace}: OptionsParallelLines): SampleError {
  if (interspace <= 0.0) {
    return SAMPLE_ERROR_LIST.SEPARATION_NOT_POSITIVE;
  }

  return null;
}

export interface OptionsDistancePoints {
  /**
   * The point layer to collect objects from.
   */
  baseCollection: FeatureCollection<Point>;
  /**
   * The detection function giving the detection probability as a
   * function of distance.
   */
  detectionFunction: DetectionFunction;
  /**
   * The cutoff distance in meters.
   */
  cutoff: number;
}

export function optionsDistancePointsCheck({
  baseCollection,
  cutoff,
}: OptionsDistancePoints): SampleError {
  if (cutoff <= 0.0) {
    return SAMPLE_ERROR_LIST.CUTOFF_NOT_POSITIVE;
  } else if (FeatureCollection.isPoint(baseCollection) === false) {
    return SAMPLE_ERROR_LIST.EXPECTED_POINT;
  }

  return null;
}
