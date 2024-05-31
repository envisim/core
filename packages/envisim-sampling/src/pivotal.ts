import {arrayLikeToArray} from '@envisim/matrix';

import {
  type AuxiliaryFixedSizedOptions,
  type AuxiliaryOptions,
  type PipsOptions,
  baseOptions,
} from './base-options/index.js';
import {Pivotal, PivotalMethod} from './sampling-classes/index.js';
import {arrayLikeToArrayAndCheckSize} from './utils.js';

/**
 * Selects a (pips) sample using the local pivotal method 1.
 *
 * @param options
 * @returns sample indices.
 */
export function lpm1({
  auxiliaries,
  rand = baseOptions.rand,
  eps = baseOptions.eps,
  treeBucketSize = baseOptions.treeBucketSize,
  ...options
}: AuxiliaryOptions | AuxiliaryFixedSizedOptions): number[] {
  const N = auxiliaries.nrow;
  const p =
    'n' in options
      ? options.n
      : arrayLikeToArrayAndCheckSize(options.probabilities, N);

  const lpm = new Pivotal(
    PivotalMethod.LPM1,
    p,
    auxiliaries,
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
 * @param options
 * @returns sample indices.
 */
export function lpm2({
  auxiliaries,
  rand = baseOptions.rand,
  eps = baseOptions.eps,
  treeBucketSize = baseOptions.treeBucketSize,
  ...options
}: AuxiliaryOptions | AuxiliaryFixedSizedOptions): number[] {
  const N = auxiliaries.nrow;
  const p =
    'n' in options
      ? options.n
      : arrayLikeToArrayAndCheckSize(options.probabilities, N);

  const lpm = new Pivotal(
    PivotalMethod.LPM2,
    p,
    auxiliaries,
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
export function lpm1s({
  auxiliaries,
  rand = baseOptions.rand,
  eps = baseOptions.eps,
  treeBucketSize = baseOptions.treeBucketSize,
  ...options
}: AuxiliaryOptions | AuxiliaryFixedSizedOptions): number[] {
  const N = auxiliaries.nrow;
  const p =
    'n' in options
      ? options.n
      : arrayLikeToArrayAndCheckSize(options.probabilities, N);

  const lpm = new Pivotal(
    PivotalMethod.LPM1SEARCH,
    p,
    auxiliaries,
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
 * @param options
 * @returns sample indices.
 */
export function rpm({
  probabilities,
  rand = baseOptions.rand,
  eps = baseOptions.eps,
}: PipsOptions): number[] {
  const p = arrayLikeToArray(probabilities, true);
  const N = p.length;

  const lpm = new Pivotal(PivotalMethod.RPM, p, undefined, N, N, eps, rand);
  lpm.run();

  return lpm.sample;
}

/**
 * Selects a (pips) sample using the sequential pivotal method.
 *
 * @param options
 * @returns sample indices.
 */
export function spm({
  probabilities,
  rand = baseOptions.rand,
  eps = baseOptions.eps,
}: PipsOptions): number[] {
  const p = arrayLikeToArray(probabilities, true);
  const N = p.length;

  const lpm = new Pivotal(PivotalMethod.SPM, p, undefined, N, N, eps, rand);
  lpm.run();

  return lpm.sample;
}
