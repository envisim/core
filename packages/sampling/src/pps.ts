import {
  arrayLikeToArray,
  arrayLikeToColumnVector,
  TArrayLike,
} from '@envisim/matrix';
import {IOptions, optionsDefaultRand} from './types.js';

/**
 * Generation of a random number between 0 and length of prob according to prob
 * a discrete random variable on 0,2,...,length-1.
 *
 * @param prob - an {@link matrix.TArrayLike} of inclusion probabilities.
 * @param options - Available: {@link IOptions.rand}
 * @returns The selected index.
 */
export const discrete = (
  prob: TArrayLike,
  {rand = optionsDefaultRand}: IOptions = {},
): number => {
  const p = arrayLikeToArray(prob);
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
 * @param prob - an {@link matrix.TArrayLike} of inclusion probabilities.
 * @param n - the number of elements in the returning array
 * @param options - Available: {@link IOptions.rand}
 * @returns An array of size `n` of selected indices.
 */
export const discreteArr = (
  prob: TArrayLike,
  n: number,
  {rand = optionsDefaultRand}: IOptions = {},
): number[] => {
  const p = arrayLikeToArray(prob);
  const N = p.length;
  const s = new Array(n).fill(N - 1);

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
 * @param prob - an {@link matrix.TArrayLike} of inclusion probabilities.
 * @param n - The sample size.
 * @param options - Available: {@link IOptions.rand}
 * @returns An array of indices of the sample.
 */
export const ppswr = (
  prob: TArrayLike,
  n: number,
  {rand = optionsDefaultRand}: IOptions = {},
): number[] => {
  const p = arrayLikeToColumnVector(prob);
  const psum = p.sum();
  p.divideScalar(psum, true);

  return discreteArr(p, n, {rand}).sort((a, b) => a - b);
};
