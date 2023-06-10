import {arrayLikeToArray, Matrix, TArrayLike} from '@envisim/matrix';

import {Pivotal, PivotalMethod} from './sampling-classes/Pivotal.js';
import {
  IOptions,
  optionsDefaultEps,
  optionsDefaultRand,
  optionsDefaultTreeBucketSize,
  PartialPick,
} from './types.js';

/**
 * Selects a (pips) sample using the local pivotal method 1.
 *
 * @param prob - inclusion probabilities of size N,
 *   or a number `n` indicating equal inclusion probabilities `n / N`.
 * @param xm - matrix of auxilliary variables of size N*p.
 * @param options
 * @returns sample indices.
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
  Matrix.assert(xm);

  const N = xm.nrow;

  let p;

  if (typeof prob === 'number') {
    p = prob as number;
  } else {
    p = arrayLikeToArray(prob, true) as number[];
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
 * @param prob - inclusion probabilities of size N,
 *   or a number `n` indicating equal inclusion probabilities `n / N`.
 * @param xm - matrix of auxilliary variables of size N *p.
 * @param options
 * @returns sample indices.
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
  Matrix.assert(xm);

  const N = xm.nrow;

  let p;

  if (typeof prob === 'number') {
    p = prob as number;
  } else {
    p = arrayLikeToArray(prob, true) as number[];
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
 * @param prob - inclusion probabilities of size N,
 *   or a number `n` indicating equal inclusion probabilities `n / N`.
 * @param xm - matrix of auxilliary variables of size N*p.
 * @param options
 * @returns sample indices.
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
  Matrix.assert(xm);

  const N = xm.nrow;

  let p;

  if (typeof prob === 'number') {
    p = prob as number;
  } else {
    p = arrayLikeToArray(prob, true) as number[];
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
 * @param prob - inclusion probabilities of size N.
 * @param options
 * @returns sample indices.
 */
export function rpm(
  prob: TArrayLike,
  {
    rand = optionsDefaultRand,
    eps = optionsDefaultEps,
  }: PartialPick<IOptions, 'rand' | 'eps'> = {},
): number[] {
  const p = arrayLikeToArray(prob, true);
  const N = p.length;

  const lpm = new Pivotal(PivotalMethod.RPM, p, undefined, N, N, eps, rand);
  lpm.run();

  return lpm.sample;
}

/**
 * Selects a (pips) sample using the sequential pivotal method.
 *
 * @param prob - inclusion probabilities of size N.
 * @param options
 * @returns sample indices.
 */
export function spm(
  prob: TArrayLike,
  {
    rand = optionsDefaultRand,
    eps = optionsDefaultEps,
  }: PartialPick<IOptions, 'rand' | 'eps'> = {},
): number[] {
  const p = arrayLikeToArray(prob, true);
  const N = p.length;

  const lpm = new Pivotal(PivotalMethod.SPM, p, undefined, N, N, eps, rand);
  lpm.run();

  return lpm.sample;
}
