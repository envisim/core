import {type FixedSizedOptions, baseOptions} from './base-options/index.js';

interface SrsOptions extends FixedSizedOptions {
  /**
   * Population size
   */
  N: number;
}

/**
 * Selects a simple random sampling without replacement.
 *
 * @param options
 * @returns sample indices.
 */
export function srswor({n, N, rand = baseOptions.rand}: SrsOptions): number[] {
  if (n === undefined || N === undefined || n < 0 || N <= 0)
    throw new TypeError('n and N must be a positive number');

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
}

/**
 * Selects a simple random sampling with replacement.
 *
 * @param options
 * @returns sample indices.
 */
export function srswr({n, N, rand = baseOptions.rand}: SrsOptions): number[] {
  if (n === undefined || N === undefined || n < 0 || N <= 0)
    throw new TypeError('n and N must be number');

  const s = new Array<number>(n);

  for (let i = 0; i < n; i++) {
    s[i] = Math.floor(rand.float() * N);
  }

  s.sort((a, b) => a - b);

  return s;
}
