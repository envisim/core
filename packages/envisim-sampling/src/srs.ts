import {IOptions, PartialPick, optionsDefaultRand} from './types.js';

/**
 * Selects a simple random sampling without replacement.
 *
 * @param n - sample size.
 * @param N - population size.
 * @param options
 * @returns sample indices.
 */
export const srswor = (
  n: number,
  N: number,
  {rand = optionsDefaultRand}: PartialPick<IOptions, 'rand'> = {},
): number[] => {
  if (n === undefined || N === undefined)
    throw new TypeError('n and N must be number');

  const nn = Math.min(n, N);
  const s = new Array<number>(nn);
  let ns = 0;

  for (let i = 0; i < N; i++) {
    if (rand.float() < (nn - ns) / (N - i)) {
      s[ns] = i;
      ns++;
    }
  }

  return s;
};

/**
 * Selects a simple random sampling with replacement.
 *
 * @param n - sample size.
 * @param N - population size.
 * @param options
 * @returns sample indices.
 */
export const srswr = (
  n: number,
  N: number,
  {rand = optionsDefaultRand}: PartialPick<IOptions, 'rand'> = {},
): number[] => {
  if (n === undefined || N === undefined)
    throw new TypeError('n and N must be number');

  const s = new Array<number>(n);

  for (let i = 0; i < n; i++) {
    s[i] = Math.floor(rand.float() * N);
  }

  s.sort((a, b) => a - b);

  return s;
};
