import {
  type GeoJSON as GJ,
  GeometricPrimitive,
  Layer,
} from '@envisim/geojson-utils';
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
 * - 110: pointsPerCircle is not a positive integer
 *
 * @returns `0` if check passes
 */
export function sampleBaseOptionsCheck({
  pointsPerCircle,
}: SampleBaseOptions): number {
  if (
    pointsPerCircle &&
    (!Number.isInteger(pointsPerCircle) || pointsPerCircle <= 0)
  ) {
    return 110;
  }

  return 0;
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
 * - <200: any error from {@link sampleBaseOptionsCheck}
 * - 210: sampleSize is not a non-negative integer
 * - 220: ratio is not positive
 *
 * @returns `0` if check passes
 */
export function samplePointOptionsCheck({
  // pointSelection,
  sampleSize,
  ratio,
  // buffer,
  ...options
}: SamplePointOptions): number {
  const baseCheck = sampleBaseOptionsCheck(options);
  if (baseCheck !== 0) {
    return baseCheck;
  }

  if (!Number.isInteger(sampleSize) || sampleSize < 0) {
    return 210;
  }

  if (ratio && ratio <= 0.0) {
    return 220;
  }

  return 0;
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
 * - <300: any error from {@link samplePointOptionsCheck}
 * - 310: layer is not {@link Layer<AreaCollection>}
 *
 * @returns `0` if check passes
 */
export function sampleFeatureOptionsCheck<
  F extends GJ.PointFeature | GJ.LineFeature | GJ.AreaFeature,
>({
  // modelFeature,
  // rotation,
  // randomRotation,
  ...options
}: SampleFeatureOptions<F>): number {
  const pointCheck = samplePointOptionsCheck(options);
  if (pointCheck !== 0) {
    return pointCheck;
  }

  return 0;
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
 * - <400: any error from {@link sampleBaseOptionsCheck}
 * - 410: distBetween is not positive
 *
 * @returns `0` if check passes
 */
export function sampleSystematicLineOnAreaOptionsCheck({
  distBetween,
  // rotation,
  ...options
}: SampleSystematicLineOnAreaOptions): number {
  const baseCheck = sampleBaseOptionsCheck(options);
  if (baseCheck !== 0) {
    return baseCheck;
  }

  if (distBetween <= 0.0) {
    return 410;
  }

  return 0;
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
 * - <500: any error from {@link sampleBaseOptionsCheck}
 * - 510: halfWidth is not positive
 *
 * @returns `0` if check passes
 */
export function sampleBeltOnAreaOptionsCheck({
  halfWidth,
  ...options
}: SampleBeltOnAreaOptions): number {
  const systematicLineOnAreaCheck = sampleBaseOptionsCheck(options);
  if (systematicLineOnAreaCheck !== 0) {
    return systematicLineOnAreaCheck;
  }

  if (halfWidth <= 0.0) {
    return 510;
  }

  return 0;
}
