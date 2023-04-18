import {TArrayLike, arrayLikeToColumnVector} from '@envisim/matrix';
import {IOptions, optionsDefaultRand} from './types.js';

/**
 * Selects a Poisson sample.
 *
 * @param prob - Array or column vector of inclusion probabilities.
 * @param options - Available: {@link IOptions.rand}
 * @returns An array of indices of the sample.
 */
export const poisson = (
  prob: TArrayLike,
  {rand = optionsDefaultRand}: IOptions = {},
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
 * @param prob - Array or column vector of inclusion probabilities.
 * @param n - The sample size.
 * @param options - Available: {@link IOptions.rand}
 * @returns An array of indices of the sample.
 * @throws `Error` if a solution is not found in `1e5` iterations
 */
export const conditionalPoisson = (
  prob: TArrayLike,
  n: number,
  {rand = optionsDefaultRand}: IOptions = {},
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
