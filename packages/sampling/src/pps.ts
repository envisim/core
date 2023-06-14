import {arrayLikeToArray, ColumnVector, TArrayLike} from '@envisim/matrix';

import {IOptions, optionsDefaultRand, PartialPick} from './types.js';

/**
 * Generation of a random number between 0 and length of prob according to prob
 * a discrete random variable on 0,2,...,length-1.
 *
 * @param prob - inclusion probabilities of size N.
 * @param options
 * @returns the selected index.
 */
export const discrete = (
  prob: TArrayLike,
  {rand = optionsDefaultRand}: PartialPick<IOptions, 'rand'> = {},
): number => {
  const p = arrayLikeToArray(prob, true);
  const N = p.length;
  const rn = rand.float();
  let psum = 0.0;

  for (let x = 0; x < N; x++) {
    psum += p[x];
    if (psum >= rn) return x;
  }

  return N - 1;
};

/**
 * Generation of an array of random numbers between 0 and length of prob,
 * according to prob.
 *
 * @param prob - inclusion probabilities of size N.
 * @param n - the number of elements in the returning array
 * @param options
 * @returns sample indices.
 */
export const discreteArr = (
  prob: TArrayLike,
  n: number,
  {rand = optionsDefaultRand}: PartialPick<IOptions, 'rand'> = {},
): number[] => {
  const p = arrayLikeToArray(prob, true);
  const N = p.length;
  const s = new Array<number>(n).fill(N - 1);

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
};

/**
 * Selects a pps sample with replacement.
 *
 * @param prob - inclusion probabilities of size N.
 * @param n - sample size.
 * @param options
 * @returns sample indices.
 */
export const ppswr = (
  prob: TArrayLike,
  n: number,
  {rand = optionsDefaultRand}: PartialPick<IOptions, 'rand'> = {},
): number[] => {
  const p = new ColumnVector(prob, false);
  const psum = p.sum();
  p.divide(psum, true);

  return discreteArr(p, n, {rand}).sort((a, b) => a - b);
};
