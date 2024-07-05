import {sequence, vectorToArray} from '@envisim/matrix';
import type {Random} from '@envisim/random';

import {BASE_OPTIONS, type PipsOptions} from './base-options/index.js';

/**
 * Selects A systematic (pips) sample.
 *
 * @ignore
 * @param p - inclusion probabilities of size N.
 * @param fun - index function.
 * @returns sample indices.
 */
const _systematic = (
  p: number[],
  fun: (i: number) => number,
  rand: Random,
): number[] => {
  const N = p.length;
  const s: number[] = [];

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
 * @param options
 * @returns sample indices.
 */
export function systematic({
  probabilities,
  rand = BASE_OPTIONS.rand,
}: PipsOptions): number[] {
  const p = vectorToArray(probabilities, true);
  return _systematic(p, (i) => i, rand);
}

/**
 * Selects a systematic (pips) sample with initial randomization of order of the units.
 *
 * @param options
 * @returns sample indices.
 */
export function randomSystematic({
  probabilities,
  rand = BASE_OPTIONS.rand,
}: PipsOptions): number[] {
  const p = vectorToArray(probabilities, true);
  const N = p.length;
  const index = sequence(0, N - 1, 1)
    .sortRandom(true, rand)
    .toArray();

  return _systematic(p, (i) => index[i], rand).sort((a, b) => a - b);
}
