import type {Random} from '@envisim/random';
import {arrayLikeToArray, ColumnVector, TArrayLike} from '@envisim/matrix';
import {IOptions, optionsDefaultRand} from './types.js';

/**
 * Selects A systematic (pips) sample.
 *
 * @ignore
 * @param p - Array of inclusion probabilities.
 * @param fun - Index function.
 * @returns The sample.
 */
const _systematic = (
  p: number[],
  fun: (i: number) => number,
  rand: Random,
): number[] => {
  const N = p.length;
  const s = [];

  let r = rand.float();
  let psum = 0.0;

  for (let i = 0; i < N; i++) {
    if (psum <= r && r < psum + p[fun(i)]) {
      s.push(fun(i));
      r += 1.0;
    }
    psum += p[fun(i)];
  }

  return s;
};

/**
 * Selects a systematic (pips) sample.
 *
 * @param prob - an {@link matrix.TArrayLike} of inclusion probabilities.
 * @param options - Available: {@link IOptions.rand}
 * @returns An array of indices of the sample.
 */
export const systematic = (
  prob: TArrayLike,
  {rand = optionsDefaultRand}: IOptions = {},
): number[] => {
  const p = arrayLikeToArray(prob);
  return _systematic(p, (i) => i, rand);
};

/**
 * Selects a systematic (pips) sample with initial randomization of order of the units.
 *
 * @param prob - an {@link matrix.TArrayLike} of inclusion probabilities.
 * @param options - Available: {@link IOptions.rand}
 * @returns An array of indices of the sample.
 */
export const randomSystematic = (
  prob: TArrayLike,
  {rand = optionsDefaultRand}: IOptions = {},
): number[] => {
  const p = arrayLikeToArray(prob);
  const N = p.length;
  const index = ColumnVector.createSequence(0, N - 1, 1)
    .sortRandom(true, rand)
    .toArray();

  return _systematic(p, (i) => index[i], rand).sort((a, b) => a - b);
};
