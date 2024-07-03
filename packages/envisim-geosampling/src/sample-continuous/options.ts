import {
  type AreaCollection,
  type GeoJSON as GJ,
  GeometricPrimitive,
  Layer,
  type LineCollection,
  type PointCollection,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

// BASE
export interface SampleBaseOptions {
  /**
   * An instance of {@link random.Random}
   * @defaultValue `new Random()`
   */
  rand?: Random;
  /**
   * The integer number of points used when converting circles to polygons.
   * @defaultValue `16`
   */
  pointsPerCircle?: number;
}

export const SAMPLE_BASE_OPTIONS: Readonly<Required<SampleBaseOptions>> = {
  rand: new Random(),
  pointsPerCircle: 16,
};

export function sampleBaseOptionsCheck<
  T extends AreaCollection | LineCollection | PointCollection,
>(_: Layer<T>, {pointsPerCircle}: SampleBaseOptions): number {
  if (
    pointsPerCircle &&
    (!Number.isInteger(pointsPerCircle) || pointsPerCircle <= 0)
  ) {
    return 110;
  }

  return 0;
}

// POINT extends BASE
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
   * @defaultValue `1.0`
   */
  ratio?: number;
  /**
   * Optional buffer in meters.
   * @defaultValue `0.0`
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

export function samplePointOptionsCheck<
  T extends AreaCollection | LineCollection | PointCollection,
>(
  layer: Layer<T>,
  {
    // pointSelection,
    sampleSize,
    ratio,
    // buffer,
    ...options
  }: SamplePointOptions,
): number {
  const baseCheck = sampleBaseOptionsCheck(layer, options);
  if (baseCheck !== 0) {
    return baseCheck;
  }

  if (!Number.isInteger(sampleSize) || sampleSize <= 0) {
    return 210;
  }

  if (ratio && ratio <= 0.0) {
    return 220;
  }

  return 0;
}

// FEATURE extends POINT
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

export function sampleFeatureOptionsCheck<
  T extends AreaCollection | LineCollection | PointCollection,
  F extends GJ.PointFeature | GJ.LineFeature | GJ.AreaFeature,
>(
  layer: Layer<T>,
  {
    // modelFeature,
    // rotation,
    // randomRotation,
    ...options
  }: SampleFeatureOptions<F>,
): number {
  const pointCheck = samplePointOptionsCheck(layer, options);
  if (pointCheck !== 0) {
    return pointCheck;
  }

  if (!Layer.isLayer(layer, GeometricPrimitive.AREA)) {
    return 310;
  }

  return 0;
}

// SYSTEMATIC LINE ON AREA extends BASE
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

export function sampleSystematicLineOnAreaOptionsCheck<
  T extends AreaCollection | LineCollection | PointCollection,
>(
  layer: Layer<T>,
  {
    distBetween,
    // rotation,
    ...options
  }: SampleSystematicLineOnAreaOptions,
): number {
  const baseCheck = sampleBaseOptionsCheck(layer, options);
  if (baseCheck !== 0) {
    return baseCheck;
  }

  if (distBetween <= 0.0) {
    return 410;
  }

  return 0;
}

// BELT ON AREA extends SYSTEMATIC LINE ON AREA
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

export function sampleBeltOnAreaOptionsCheck<
  T extends AreaCollection | LineCollection | PointCollection,
>(layer: Layer<T>, {halfWidth, ...options}: SampleBeltOnAreaOptions): number {
  const systematicLineOnAreaCheck = sampleBaseOptionsCheck(layer, options);
  if (systematicLineOnAreaCheck !== 0) {
    return systematicLineOnAreaCheck;
  }

  if (halfWidth <= 0.0) {
    return 510;
  }

  return 0;
}
