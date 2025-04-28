import { type Matrix, type Vector } from "@envisim/matrix";
import { Random, type RandomGenerator } from "@envisim/random";

/**
 * @inline
 * @expand
 */
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

/**
 * @inline
 * @expand
 */
export interface PipsOptions extends BaseOptions {
  /**
   * Inclusion probabilities of size N
   */
  probabilities: number[] | Vector;
}

/**
 * @inline
 * @expand
 */
export interface FixedSizedOptions extends BaseOptions {
  /**
   * Sample size
   */
  n: number;
}

/**
 * @inline
 * @expand
 */
export interface AuxiliaryOptions extends PipsOptions {
  /**
   * Matrix of auxiliary variables
   */
  auxiliaries: Matrix;
}

/**
 * @inline
 * @expand
 */
export interface AuxiliaryFixedSizedOptions extends FixedSizedOptions {
  /**
   * Matrix of auxiliary variables
   */
  auxiliaries: Matrix;
}
