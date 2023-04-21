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
 * @param prob - an {@link @envisim/matrix.TArrayLike} of inclusion probabilities.
 * @param xm N*p Matrix of auxilliary variables, where N is equal to size of `prob`.
 * @param options - See {@link IOptions}
 * @returns An array of indices of the sample.
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
  const p = arrayLikeToArray(prob);

  if (p.length !== N)
    throw new RangeError('Rows in xm must match length of prob');

  const cps = new Cps(CpsMethod.SCPS, p, xm, N, treeBucketSize, eps, rand);
  cps.run();

  return cps.sample;
}

/**
 * Selects a coordinated Spatially Correlated Poisson Sample (SCPSCOORD)
 *
 * @param prob - an {@link @envisim/matrix.TArrayLike} of inclusion probabilities.
 * @param xm - N*p Matrix of auxilliary variables, where N is equal to size of `prob`.
 * @param random - an {@link @envisim/matrix.TArrayLike} of random values
 * @param options - See {@link IOptions}
 * @returns An array of indices of the sample.
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
  const p = arrayLikeToArray(prob);
  const randvals = arrayLikeToArray(random);

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
 * @param prob - an {@link @envisim/matrix.TArrayLike} of inclusion probabilities.
 * @param xm N*p Matrix of auxilliary variables, where N is equal to size of `prob`.
 * @param options - See {@link IOptions}
 * @returns An array of indices of the sample.
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
  const p = arrayLikeToArray(prob);

  if (p.length !== N)
    throw new RangeError('Rows in xm must match length of prob');

  const cps = new Cps(CpsMethod.LCPS, p, xm, N, treeBucketSize, eps, rand);
  cps.run();

  return cps.sample;
}
