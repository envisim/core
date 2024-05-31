import {Matrix, TArrayLike} from '@envisim/matrix';
import {Random} from '@envisim/random';

export interface BaseOptions {
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

export const baseOptions: Readonly<Required<BaseOptions>> = {
  eps: 1e-9,
  rand: new Random(),
  treeBucketSize: 40,
};

export interface PipsOptions extends BaseOptions {
  /**
   * Inclusion probabilities of size N
   */
  probabilities: TArrayLike;
}

export interface AuxiliaryOptions extends PipsOptions {
  /**
   * Matrix of auxiliary variables
   */
  auxiliaries: Matrix;
}
