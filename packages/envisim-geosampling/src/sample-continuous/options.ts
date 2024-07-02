import type {GeoJSON as GJ} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

export interface SampleBaseOptions {
  /**
   * An instance of {@link random.Random}
   * @defaultValue `new Random()`
   */
  rand?: Random;
  /**
   * The number of points used when converting circles to polygons.
   * @defaultValue `16`
   */
  pointsPerCircle?: number;
}
export const SAMPLE_BASE_OPTIONS: Readonly<Required<SampleBaseOptions>> = {
  rand: new Random(),
  pointsPerCircle: 16,
};

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

export interface SampleSystematicLineOnAreaOptions extends SampleBaseOptions {
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

export interface SampleBeltOnAreaOptions
  extends SampleSystematicLineOnAreaOptions {
  halfWidth: number;
}
export const SAMPLE_BELT_ON_AREA_OPTIONS: Readonly<
  Required<Omit<SampleBeltOnAreaOptions, 'distBetween' | 'halfWidth'>>
> = {
  ...SAMPLE_SYSTEMATIC_LINE_ON_AREA_OPTIONS,
};
