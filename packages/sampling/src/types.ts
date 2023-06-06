import {Random} from '@envisim/random';

export type PartialPick<T, K extends keyof T> = Partial<Pick<T, K>>;

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
   * The bucket size to use when building k-d-trees
   * @defaultValue `40`
   */
  treeBucketSize?: number;
}

/** @internal */
export const optionsDefaultEps = 1e-9;
/** @internal */
export const optionsDefaultRand = new Random();
/** @internal */
export const optionsDefaultTreeBucketSize = 40;
