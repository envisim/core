import {arrayLikeToArray, Matrix, TArrayLike} from '@envisim/matrix';

import {Cps, CpsMethod} from './sampling-classes/Cps.js';
import {
  IOptions,
  optionsDefaultEps,
  optionsDefaultRand,
  optionsDefaultTreeBucketSize,
} from './types.js';

/**
 * Selects a Spatially Correlated Poisson Sample (SCPS)
 *
 * @param prob - inclusion probabilities of size N.
 * @param xm - matrix of auxilliary variables of size N*p.
 * @param options
 * @returns sample indices.
 */
export function scps(
  prob: TArrayLike,
  xm: Matrix,
  {
    rand = optionsDefaultRand,
    eps = optionsDefaultEps,
    treeBucketSize = optionsDefaultTreeBucketSize,
  }: IOptions = {},
): number[] {
  if (!Matrix.isMatrix(xm)) throw new TypeError('xm must be Matrix');

  const N = xm.nrow;
  const p = arrayLikeToArray(prob, true);

  if (p.length !== N)
    throw new RangeError('Rows in xm must match length of prob');

  const cps = new Cps(CpsMethod.SCPS, p, xm, N, treeBucketSize, eps, rand);
  cps.run();

  return cps.sample;
}

/**
 * Selects a coordinated Spatially Correlated Poisson Sample (SCPSCOORD)
 *
 * @param prob - inclusion probabilities of size N.
 * @param xm - matrix of auxilliary variables of size N*p.
 * @param random - random values of size N.
 * @param options
 * @returns sample indices.
 */
export function scpsCoord(
  prob: TArrayLike,
  xm: Matrix,
  random: TArrayLike,
  {
    rand = optionsDefaultRand,
    eps = optionsDefaultEps,
    treeBucketSize = optionsDefaultTreeBucketSize,
  }: IOptions = {},
): number[] {
  if (!Matrix.isMatrix(xm)) throw new TypeError('xm must be Matrix');

  const N = xm.nrow;
  const p = arrayLikeToArray(prob, true);
  const randvals = arrayLikeToArray(random, true);

  if (p.length !== N)
    throw new RangeError('Rows in xm must match length of prob');
  if (randvals.length !== N)
    throw new RangeError('Rows in xm must match length of random');

  const cps = new Cps(CpsMethod.LCPS, p, xm, N, treeBucketSize, eps, rand);
  cps.setRandomArr(randvals);
  cps.run();

  return cps.sample;
}

/**
 * Selects a Locally Correlated Poisson Sample (LCPS)
 *
 * @param prob - inclusion probabilities of size N.
 * @param xm - matrix of auxilliary variables of size N*p.
 * @param options
 * @returns sample indices.
 */
export function lcps(
  prob: TArrayLike,
  xm: Matrix,
  {
    rand = optionsDefaultRand,
    eps = optionsDefaultEps,
    treeBucketSize = optionsDefaultTreeBucketSize,
  }: IOptions = {},
): number[] {
  if (!Matrix.isMatrix(xm)) throw new TypeError('xm must be Matrix');

  const N = xm.nrow;
  const p = arrayLikeToArray(prob, true);

  if (p.length !== N)
    throw new RangeError('Rows in xm must match length of prob');

  const cps = new Cps(CpsMethod.LCPS, p, xm, N, treeBucketSize, eps, rand);
  cps.run();

  return cps.sample;
}
