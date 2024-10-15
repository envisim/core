import {type GeoJSON as GJ, Layer} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

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
 * - pointsPerCircle is not a positive integer.
 *
 * @returns `null` if check passes
 */
export function sampleBaseOptionsCheck({
  pointsPerCircle,
}: SampleBaseOptions): string | null {
  if (
    pointsPerCircle &&
    (!Number.isInteger(pointsPerCircle) || pointsPerCircle <= 0)
  ) {
    return 'pointsPerCircle is not a positive integer.';
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
}

export const SAMPLE_POINT_OPTIONS: Readonly<Required<SamplePointOptions>> = {
  ...SAMPLE_BASE_OPTIONS,
  pointSelection: 'independent',
  sampleSize: 1,
  ratio: 1.0,
  buffer: 0.0,
};

/**
 * Returns the following errors:
 * - any error from {@link sampleBaseOptionsCheck}.
 * - sampleSize is not a non-negative integer.
 * - ratio is not positive.
 *
 * @returns `null` if check passes
 */
export function samplePointOptionsCheck({
  // pointSelection,
  sampleSize,
  ratio,
  // buffer,
  ...options
}: SamplePointOptions): string | null {
  const baseCheck = sampleBaseOptionsCheck(options);
  if (baseCheck !== null) {
    return baseCheck;
  }

  if (!Number.isInteger(sampleSize) || sampleSize < 0) {
    return 'sampleSize is not a non-negative integer.';
  }

  if (ratio && ratio <= 0.0) {
    return 'ratio is not positive.';
  }

  return null;
}

// FEATURE extends POINT
/**
 * @see {@link SAMPLE_FEATURE_OPTIONS | default values}
 * @see {@link sampleFeatureOptionsCheck | error codes}
 */
export interface SampleFeatureOptions<
  F extends GJ.PointFeature | GJ.LineFeature | GJ.AreaFeature,
> extends SamplePointOptions {
  /**
   * A model feature of points or lines or areas to be placed on the selcted
   * points.
   */
  modelFeature: F;
  /**
   * Optional rotation angle in degrees to rotate the model feature.
   * @defaultValue `0.0`
   */
  rotation?: number;
  /**
   * If true, then the model feature will be randomly rotated. Forced random
   * rotation is used for line features.
   * @defaultValue `false`
   */
  randomRotation?: boolean;
}

export const SAMPLE_FEATURE_OPTIONS: Readonly<
  Required<
    Omit<
      SampleFeatureOptions<GJ.PointFeature | GJ.LineFeature | GJ.AreaFeature>,
      'modelFeature'
    >
  >
> = {
  ...SAMPLE_POINT_OPTIONS,
  pointSelection: 'independent',
  sampleSize: 1,
  rotation: 0.0,
  randomRotation: false,
};

/**
 * Returns the following errors:
 * - any error from {@link samplePointOptionsCheck}.
 * - layer is not {@link Layer<AreaCollection>}.
 *
 * @returns `null` if check passes
 */
export function sampleFeatureOptionsCheck<
  F extends GJ.PointFeature | GJ.LineFeature | GJ.AreaFeature,
>({
  // modelFeature,
  // rotation,
  // randomRotation,
  ...options
}: SampleFeatureOptions<F>): string | null {
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
 * - any error from {@link sampleBaseOptionsCheck}.
 * - distBetween is not positive.
 *
 * @returns `null` if check passes
 */
export function sampleSystematicLineOnAreaOptionsCheck({
  distBetween,
  // rotation,
  ...options
}: SampleSystematicLineOnAreaOptions): string | null {
  const baseCheck = sampleBaseOptionsCheck(options);
  if (baseCheck !== null) {
    return baseCheck;
  }

  if (distBetween <= 0.0) {
    return 'distBetween is not positive.';
  }

  return null;
}

// BELT ON AREA extends SYSTEMATIC LINE ON AREA
/**
 * @see {@link SAMPLE_BELT_ON_AREA_OPTIONS | default values}
 * @see {@link sampleBeltOnAreaOptionsCheck | error codes}
 */
export interface SampleBeltOnAreaOptions
  extends SampleSystematicLineOnAreaOptions {
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
 * - any error from {@link sampleBaseOptionsCheck}.
 * - halfWidth is not positive.
 *
 * @returns `null` if check passes
 */
export function sampleBeltOnAreaOptionsCheck({
  halfWidth,
  ...options
}: SampleBeltOnAreaOptions): string | null {
  const systematicLineOnAreaCheck = sampleBaseOptionsCheck(options);
  if (systematicLineOnAreaCheck !== null) {
    return systematicLineOnAreaCheck;
  }

  if (halfWidth <= 0.0) {
    return 'halfWidth is not positive.';
  }

  return null;
}
