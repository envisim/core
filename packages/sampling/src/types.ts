import type {Matrix} from '@envisim/matrix';
import {Random} from '@envisim/random';
import {distanceEuclidean2} from './distances.js';

export interface IDistance {
  (xm: Matrix, a: number, b: number, categorical?: number[]): number;
}

export interface IOptions {
  /**
   * An instance of {@link random.Random}
   * @defaultValue `new Random()`
   */
  rand?: Random;
  /**
   * Epsilon, used during comparisons of floats
   * @defaultValue `1e-9`
   */
  eps?: number;
  /**
   * A {@link IDistance} function
   * @defaultValue {@link euclideanSquared}
   */
  distfun?: IDistance;
  /*
   * Type of sampling method variant
   */
  variant?: number;
  /*
   * Which balancing variables to treat as categorical.
   * Must be a vector of column indices
   */
  categorical?: number[];
}

/** @internal */
export const optionsDefaultRand: Random = new Random();
/** @internal */
export const optionsDefaultEps: number = 1e-9;
/** @internal */
export const optionsDefaultDistfun: IDistance = distanceEuclidean2;
