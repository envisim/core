import {type GeoJSON as GJ, PropertyRecord} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {SamplingError} from '../sampling-error.js';
import {ErrorType} from '../utils/index.js';
import {type SampleRelascopePointsOptions} from './relascope-points.js';

// BASE
/**
 * @see {@link SAMPLE_BASE_OPTIONS | default values}
 * @see {@link sampleBaseOptionsCheck | error codes}
 */
export interface SampleBaseOptions {
  /**
   * An instance of {@link random.Random}
   */
  rand?: Random;
  /**
   * The integer number of points used when converting circles to polygons.
   */
  pointsPerCircle?: number;
}

export const SAMPLE_BASE_OPTIONS: Readonly<Required<SampleBaseOptions>> = {
  rand: new Random(),
  pointsPerCircle: 16,
};

/**
 * Returns the following errors:
 * - {@link SamplingError.POINTS_PER_CIRCLE_NOT_POSITIVE_INTEGER}
 *
 * @returns `null` if check passes
 */
export function sampleBaseOptionsCheck({
  pointsPerCircle,
}: SampleBaseOptions): ErrorType<typeof SamplingError> {
  if (
    pointsPerCircle !== undefined &&
    (!Number.isInteger(pointsPerCircle) || pointsPerCircle <= 0)
  ) {
    return SamplingError.POINTS_PER_CIRCLE_NOT_POSITIVE_INTEGER;
  }

  return null;
}

// POINT extends BASE
/**
 * @see {@link SAMPLE_POINT_OPTIONS | default values}
 * @see {@link samplePointOptionsCheck | error codes}
 */
export interface SamplePointOptions extends SampleBaseOptions {
  /**
   * The method to use for selection of points.
   */
  pointSelection: 'independent' | 'systematic';
  /**
   * The (average) number of points to select.
   */
  sampleSize: number;
  /**
   * Optional ratio between distance in west-east direction to south-north
   * direction.
   */
  ratio?: number;
  /**
   * Optional buffer in meters.
   */
  buffer?: number;
  /**
   * Optional rotation
   */
  rotationOfGrid?: number;
  /**
   * Optional random rotation
   */
  randomRotationOfGrid?: boolean;
}

export const SAMPLE_POINT_OPTIONS: Readonly<Required<SamplePointOptions>> = {
  ...SAMPLE_BASE_OPTIONS,
  pointSelection: 'independent',
  sampleSize: 1,
  ratio: 1.0,
  buffer: 0.0,
  rotationOfGrid: 0.0,
  randomRotationOfGrid: false,
};

/**
 * Returns the following errors:
 * - any error from {@link sampleBaseOptionsCheck}
 * - {@link SamplingError.SAMPLE_SIZE_NOT_NON_NEGATIVE_INTEGER}
 * - {@link SamplingError.RATIO_NOT_POSITIVE}
 *
 * @returns `null` if check passes
 */
export function samplePointOptionsCheck({
  // pointSelection,
  sampleSize,
  ratio,
  // buffer,
  ...options
}: SamplePointOptions): ErrorType<typeof SamplingError> {
  const baseCheck = sampleBaseOptionsCheck(options);
  if (baseCheck !== null) {
    return baseCheck;
  }

  if (!Number.isInteger(sampleSize) || sampleSize < 0) {
    return SamplingError.SAMPLE_SIZE_NOT_NON_NEGATIVE_INTEGER;
  }

  if (ratio !== undefined && ratio <= 0.0) {
    return SamplingError.RATIO_NOT_POSITIVE;
  }

  return null;
}

// FEATURE extends POINT
/**
 * @see {@link SAMPLE_FEATURE_OPTIONS | default values}
 * @see {@link sampleFeatureOptionsCheck | error codes}
 */
export interface SampleFeatureOptions<G extends GJ.PointObject | GJ.LineObject | GJ.AreaObject>
  extends SamplePointOptions {
  /**
   * A model feature of points or lines or areas to be placed on the selcted
   * points.
   */
  modelGeometry: G;
  /**
   * Optional rotation angle in degrees to rotate the model geometry.
   * @defaultValue `0.0`
   */
  rotationOfGeometry?: number;
  /**
   * If true, then the model geometry will be randomly rotated. Forced random
   * rotation is used for line geometries.
   * @defaultValue `false`
   */
  randomRotationOfGeometry?: boolean;
  /**
   * If true, then the grid will be rotated
   * @defaultValue `0.0`
   */
  rotationOfGrid?: number;
  /**
   * If true, then the grid will be randomly rotated
   * @defaultValue `false`
   */
  randomRotationOfGrid?: boolean;
}

export const SAMPLE_FEATURE_OPTIONS: Readonly<
  Required<
    Omit<SampleFeatureOptions<GJ.PointObject | GJ.LineObject | GJ.AreaObject>, 'modelGeometry'>
  >
> = {
  ...SAMPLE_POINT_OPTIONS,
  pointSelection: 'independent',
  sampleSize: 1,
  rotationOfGeometry: 0.0,
  randomRotationOfGeometry: false,
  rotationOfGrid: 0.0,
  randomRotationOfGrid: false,
};

/**
 * Returns the following errors:
 * - any error from {@link samplePointOptionsCheck}.
 *
 * @returns `null` if check passes
 */
export function sampleFeatureOptionsCheck<
  G extends GJ.AreaObject | GJ.LineObject | GJ.PointObject,
>({
  // modelFeature,
  // rotation,
  // randomRotation,
  ...options
}: SampleFeatureOptions<G>): ErrorType<typeof SamplingError> {
  const pointCheck = samplePointOptionsCheck(options);
  if (pointCheck !== null) {
    return pointCheck;
  }

  return null;
}

// SYSTEMATIC LINE ON AREA extends BASE
/**
 * @see {@link SAMPLE_SYSTEMATIC_LINE_ON_AREA_OPTIONS | default values}
 * @see {@link sampleSystematicLineOnAreaOptionsCheck | error codes}
 */
export interface SampleSystematicLineOnAreaOptions extends SampleBaseOptions {
  /**
   * The distance in meters between the parallel lines.
   */
  distBetween: number;
  /**
   * Optional fixed rotation angle in degrees.
   * @defaultValue `0.0`
   */
  rotation?: number;
}

export const SAMPLE_SYSTEMATIC_LINE_ON_AREA_OPTIONS: Readonly<
  Required<Omit<SampleSystematicLineOnAreaOptions, 'distBetween'>>
> = {
  ...SAMPLE_BASE_OPTIONS,
  rotation: 0.0,
};

/**
 * Returns the following errors:
 * - any error from {@link sampleBaseOptionsCheck}
 * - {@link SamplingError.DIST_BETWEEN_NOT_POSITIVE}
 *
 * @returns `null` if check passes
 */
export function sampleSystematicLineOnAreaOptionsCheck({
  distBetween,
  // rotation,
  ...options
}: SampleSystematicLineOnAreaOptions): ErrorType<typeof SamplingError> {
  const baseCheck = sampleBaseOptionsCheck(options);
  if (baseCheck !== null) {
    return baseCheck;
  }

  if (distBetween <= 0.0) {
    return SamplingError.DIST_BETWEEN_NOT_POSITIVE;
  }

  return null;
}

// BELT ON AREA extends SYSTEMATIC LINE ON AREA
/**
 * @see {@link SAMPLE_BELT_ON_AREA_OPTIONS | default values}
 * @see {@link sampleBeltOnAreaOptionsCheck | error codes}
 */
export interface SampleBeltOnAreaOptions extends SampleSystematicLineOnAreaOptions {
  /**
   * The half-width of the belt.
   */
  halfWidth: number;
}

export const SAMPLE_BELT_ON_AREA_OPTIONS: Readonly<
  Required<Omit<SampleBeltOnAreaOptions, 'distBetween' | 'halfWidth'>>
> = {
  ...SAMPLE_SYSTEMATIC_LINE_ON_AREA_OPTIONS,
};

/**
 * Returns the following errors:
 * - any error from {@link sampleBaseOptionsCheck}
 * - {@link SamplingError.HALF_WIDTH_NOT_POSITIVE}
 *
 * @returns `null` if check passes
 */
export function sampleBeltOnAreaOptionsCheck({
  halfWidth,
  ...options
}: SampleBeltOnAreaOptions): ErrorType<typeof SamplingError> {
  const systematicLineOnAreaCheck = sampleBaseOptionsCheck(options);
  if (systematicLineOnAreaCheck !== null) {
    return systematicLineOnAreaCheck;
  }

  if (halfWidth <= 0.0) {
    return SamplingError.HALF_WIDTH_NOT_POSITIVE;
  }

  return null;
}

export {type SampleRelascopePointsOptions};
export const SAMPLE_RELASCOPE_POINTS_OPTIONS: Readonly<
  Required<Omit<SampleRelascopePointsOptions, 'baseCollection' | 'sizeProperty'>>
> = {
  ...SAMPLE_POINT_OPTIONS,
  factor: 1.0,
};
export function sampleRelascopePointsOptionsCheck({
  factor,
  baseCollection,
  sizeProperty,
  ...options
}: SampleRelascopePointsOptions): ErrorType<typeof SamplingError> {
  const pointCheck = samplePointOptionsCheck(options);
  if (pointCheck !== null) {
    return pointCheck;
  } else if (factor && factor <= 0.0) {
    return SamplingError.FACTOR_NOT_POSITIVE;
  }

  const prop = baseCollection.propertyRecord.getId(sizeProperty);
  if (prop === null) {
    return SamplingError.SIZE_PROPERTY_MISSING;
  } else if (!PropertyRecord.propertyIsNumerical(prop)) {
    return SamplingError.SIZE_PROPERTY_NOT_NUMERICAL;
  }

  return null;
}
