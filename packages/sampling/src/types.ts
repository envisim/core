import type {Matrix} from '@envisim/matrix';
import {Random} from '@envisim/random';

export interface IDistance {
  (xm: Matrix, a: number, b: number): number;
}

export interface IOptions {
  /**
   * Epsilon, used during comparisons of floats
   * @defaultValue `1e-9`
   */
  eps?: number;
  /**
   * An instance of {@link random.Random}
   * @defaultValue `new Random()`
   */
  rand?: Random;
  /**
   *
   *
   */
  treeBucketSize?: number;
}

/** @internal */
export const optionsDefaultEps: number = 1e-9;
/** @internal */
export const optionsDefaultRand: Random = new Random();
/** @internal */
export const optionsDefaultTreeBucketSize: number = 40;
