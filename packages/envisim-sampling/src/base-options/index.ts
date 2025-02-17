import {type Matrix, type Vector} from '@envisim/matrix';
import {Random, type RandomGenerator} from '@envisim/random';

export interface BaseOptions {
  /**
   * Epsilon, used during comparisons of floats
   * @defaultValue `1e-9`
   */
  eps?: number;
  /**
   * @defaultValue `new Random()`
   */
  rand?: RandomGenerator;
  /**
   * The bucket size to use when building k-d-trees
   * @defaultValue `40`
   */
  treeBucketSize?: number;
}

export const BASE_OPTIONS: Readonly<Required<BaseOptions>> = {
  eps: 1e-9,
  rand: new Random(),
  treeBucketSize: 40,
};

export interface PipsOptions extends BaseOptions {
  /**
   * Inclusion probabilities of size N
   */
  probabilities: number[] | Vector;
}

export interface FixedSizedOptions extends BaseOptions {
  /**
   * Sample size
   */
  n: number;
}

export interface AuxiliaryOptions extends PipsOptions {
  /**
   * Matrix of auxiliary variables
   */
  auxiliaries: Matrix;
}

export interface AuxiliaryFixedSizedOptions extends FixedSizedOptions {
  /**
   * Matrix of auxiliary variables
   */
  auxiliaries: Matrix;
}
