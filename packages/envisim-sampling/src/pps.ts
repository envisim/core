import {ColumnVector, vectorToArray} from '@envisim/matrix';

import {
  type FixedSizedOptions,
  type PipsOptions,
  baseOptions,
} from './base-options/index.js';
import {assertSizeRange} from './utils.js';

/**
 * Generation of a random number between 0 and length of prob according to prob
 * a discrete random variable on 0,2,...,length-1.
 *
 * @param options
 * @returns the selected index.
 */
export function discrete({
  probabilities,
  rand = baseOptions.rand,
}: PipsOptions): number {
  const p = vectorToArray(probabilities, true);
  const N = p.length;
  const rn = rand.float();
  let psum = 0.0;

  for (let x = 0; x < N; x++) {
    psum += p[x];
    if (psum >= rn) return x;
  }

  return N - 1;
}

/**
 * Generation of an array of random numbers between 0 and length of prob,
 * according to prob.
 *
 * @param options
 * @returns sample indices.
 */
export function discreteArr({
  n,
  probabilities,
  rand = baseOptions.rand,
}: FixedSizedOptions & PipsOptions): number[] {
  const p = vectorToArray(probabilities, true);
  const N = p.length;
  assertSizeRange(n, 0, N, 'n');
  const s = Array.from<number>({length: n}).fill(N - 1);

  for (let i = 0; i < n; i++) {
    const re = rand.float();
    // let psum = 0.0;
    // let x = 0;

    for (let x = 0, psum = 0.0; x < N; x++) {
      psum += p[x];
      if (psum >= re) {
        s[i] = x;
        break;
      }
    }
  }

  return s;
}

/**
 * Selects a pps sample with replacement.
 *
 * @param options
 * @returns sample indices.
 */
export function ppswr({
  n,
  probabilities,
  rand = baseOptions.rand,
}: FixedSizedOptions & PipsOptions): number[] {
  const p = new ColumnVector(probabilities, false);
  const psum = p.sum();
  p.divide(psum, true);

  return discreteArr({probabilities: p, n, rand}).sort((a, b) => a - b);
}
