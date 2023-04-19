import {arrayLikeToArray, Matrix, TArrayLike} from '@envisim/matrix';
import {Pivotal, PivotalMethod} from './sampling-classes/Pivotal.js';
import {
  IOptions,
  optionsDefaultEps,
  optionsDefaultRand,
  optionsDefaultTreeBucketSize,
} from './types.js';

/**
 * Selects a (pips) sample using the local pivotal method 1.
 *
 * @param prob - an {@link matrix.TArrayLike} of inclusion probabilities,
 *   or a number `n` indicating equal inclusion probabilities `n / N`.
 * @param xm - N*p Matrix of auxilliary variables,
 *   where N is equal to size of `prob`.
 * @param options - See {@link IOptions}
 * @returns An array of indices of the sample.
 */
export function lpm1(
  prob: TArrayLike | number,
  xm: Matrix,
  {
    rand = optionsDefaultRand,
    eps = optionsDefaultEps,
    treeBucketSize = optionsDefaultTreeBucketSize,
  }: IOptions = {},
): number[] {
  if (!Matrix.isMatrix(xm)) throw new TypeError('xm must be Matrix');

  const N = xm.nrow;

  let p: number[] | number;

  if (typeof prob === 'number') {
    p = prob;
  } else {
    p = arrayLikeToArray(prob) as number[];
    if (p.length !== N)
      throw new RangeError('Rows in xm must match length of prob');
  }

  const lpm = new Pivotal(
    PivotalMethod.LPM1,
    p,
    xm,
    N,
    treeBucketSize,
    eps,
    rand,
  );
  lpm.run();

  return lpm.sample;
}

/**
 * Selects a (pips) sample using the local pivotal method 2.
 *
 * @param prob - an {@link matrix.TArrayLike} of inclusion probabilities,
 *   or a number `n` indicating equal inclusion probabilities `n / N`.
 * @param xm - N*p Matrix of auxilliary variables,
 *   where N is equal to size of `prob`.
 * @param options - See {@link IOptions}
 * @returns An array of indices of the sample.
 */
export function lpm2(
  prob: TArrayLike | number,
  xm: Matrix,
  {
    rand = optionsDefaultRand,
    eps = optionsDefaultEps,
    treeBucketSize = optionsDefaultTreeBucketSize,
  }: IOptions = {},
): number[] {
  if (!Matrix.isMatrix(xm)) throw new TypeError('xm must be Matrix');

  const N = xm.nrow;

  let p: number[] | number;

  if (typeof prob === 'number') {
    p = prob;
  } else {
    p = arrayLikeToArray(prob) as number[];
    if (p.length !== N)
      throw new RangeError('Rows in xm must match length of prob');
  }

  const lpm = new Pivotal(
    PivotalMethod.LPM2,
    p,
    xm,
    N,
    treeBucketSize,
    eps,
    rand,
  );
  lpm.run();

  return lpm.sample;
}

/**
 * Selects a (pips) sample using the local pivotal method 1 search.
 *
 * @param prob - an {@link matrix.TArrayLike} of inclusion probabilities,
 *   or a number `n` indicating equal inclusion probabilities `n / N`.
 * @param xm - N*p Matrix of auxilliary variables,
 *   where N is equal to size of `prob`.
 * @param options - See {@link IOptions}
 * @returns An array of indices of the sample.
 */
export function lpm1s(
  prob: TArrayLike | number,
  xm: Matrix,
  {
    rand = optionsDefaultRand,
    eps = optionsDefaultEps,
    treeBucketSize = optionsDefaultTreeBucketSize,
  }: IOptions = {},
): number[] {
  if (!Matrix.isMatrix(xm)) throw new TypeError('xm must be Matrix');

  const N = xm.nrow;

  let p: number[] | number;

  if (typeof prob === 'number') {
    p = prob;
  } else {
    p = arrayLikeToArray(prob) as number[];
    if (p.length !== N)
      throw new RangeError('Rows in xm must match length of prob');
  }

  const lpm = new Pivotal(
    PivotalMethod.LPM1SEARCH,
    p,
    xm,
    N,
    treeBucketSize,
    eps,
    rand,
  );
  lpm.run();

  return lpm.sample;
}

/**
 * Selects a (pips) sample using the random pivotal method.
 *
 * @param prob - an {@link matrix.TArrayLike} of inclusion probabilities.
 * @param options - See {@link IOptions}
 * @returns An array of indices of chosen units, the sample.
 */
export function rpm(
  prob: TArrayLike,
  {
    rand = optionsDefaultRand,
    eps = optionsDefaultEps,
  }: Omit<IOptions, 'treeBucketSize'> = {},
): number[] {
  const p = arrayLikeToArray(prob) as number[];
  const N = p.length;

  const lpm = new Pivotal(PivotalMethod.RPM, p, undefined, N, N, eps, rand);
  lpm.run();

  return lpm.sample;
}

/**
 * Selects a (pips) sample using the sequential pivotal method.
 *
 * @param prob - an {@link matrix.TArrayLike} of inclusion probabilities.
 * @param options - See {@link IOptions}
 * @returns An array of indices of chosen units, the sample.
 */
export function spm(
  prob: TArrayLike,
  {
    rand = optionsDefaultRand,
    eps = optionsDefaultEps,
  }: Omit<IOptions, 'treeBucketSize'> = {},
): number[] {
  const p = arrayLikeToArray(prob) as number[];
  const N = p.length;

  const lpm = new Pivotal(PivotalMethod.SPM, p, undefined, N, N, eps, rand);
  lpm.run();

  return lpm.sample;
}
