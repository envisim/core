import {IOptions, optionsDefaultRand} from './types.js';

/**
 * Selects a simple random sampling without replacement.
 *
 * @param n - Sample size.
 * @param N - Population size.
 * @param options - Available: {@link IOptions.rand}
 * @returns The sample.
 */
export const srswor = (
  n: number,
  N: number,
  {rand = optionsDefaultRand}: IOptions = {},
): number[] => {
  if (n === undefined || N === undefined)
    throw new TypeError('n and N must be number');

  const nn = Math.min(n, N);
  const s = new Array(nn);
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
 * @param n - Sample size.
 * @param N - Population size.
 * @param options - Available: {@link IOptions.rand}
 * @returns The sample.
 */
export const srswr = (
  n: number,
  N: number,
  {rand = optionsDefaultRand}: IOptions = {},
): number[] => {
  if (n === undefined || N === undefined)
    throw new TypeError('n and N must be number');

  const s = new Array(n);

  for (let i = 0; i < n; i++) {
    s[i] = Math.floor(rand.float() * N);
  }

  s.sort((a, b) => a - b);

  return s;
};

/**
 * Selects a simple random sampling with and without replacement.
 * If `variant = 1`, {@link srswr} is run, otherwise {@link srswor}
 *
 * @param n - Sample size.
 * @param N - Population size.
 * @param options - Available: {@link IOptions.rand}, {@link IOptions.variant}
 * @returns The sample.
 */
export const srs = (
  n: number,
  N: number,
  {rand = optionsDefaultRand, variant = 0}: IOptions = {},
): number[] => {
  if (variant === 1) return srswr(n, N, {rand});
  return srswor(n, N, {rand});
};
