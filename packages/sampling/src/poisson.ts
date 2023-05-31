import {TArrayLike, arrayLikeToColumnVector} from '@envisim/matrix';

import {IOptions, optionsDefaultRand, PartialPick} from './types.js';

/**
 * Selects a Poisson sample.
 *
 * @param prob - inclusion probabilities of size N.
 * @param options
 * @returns sample indices.
 */
export const poisson = (
  prob: TArrayLike,
  {rand = optionsDefaultRand}: PartialPick<IOptions, 'rand'> = {},
): number[] => {
  const p = arrayLikeToColumnVector(prob);
  const N = p.length;
  const s: number[] = new Array(N);

  let j = 0;
  p.forEach((e, i) => {
    if (rand.float() < e) s[j++] = i;
  });

  s.splice(j, N);
  return s;
};

/**
 * Selects a conditional Poisson sample using the rejective method.
 *
 * @param prob - inclusion probabilities of size N.
 * @param n - sample size.
 * @param options
 * @returns sample indices.
 * @throws `Error` if a solution is not found in `1e5` iterations
 */
export const conditionalPoisson = (
  prob: TArrayLike,
  n: number,
  {rand = optionsDefaultRand}: PartialPick<IOptions, 'rand'> = {},
): number[] => {
  // depends on poisson
  // sum(p) should be n or close to n
  const p = arrayLikeToColumnVector(prob);
  let s: number[] = [];
  let run: number = 0;

  while (s.length != n) {
    s = poisson(p, {rand});

    run++;
    if (run >= 1e5)
      throw new Error(
        'conditionalPoisson could not find a sample in 1e5 iterations',
      );
  }

  return s;
};
