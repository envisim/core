import { BASE_OPTIONS, type FixedSizedOptions } from "./base-options/index.js";
import { assertSizeRange } from "./utils.js";

export interface SrsOptions extends FixedSizedOptions {
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
export function srswor({ n, N, rand = BASE_OPTIONS.rand }: SrsOptions): number[] {
  assertSizeRange(N, 1, Number.MAX_SAFE_INTEGER, "N");
  assertSizeRange(n, 0, N, "n");

  const nn = Math.min(n, N);
  const s: number[] = [];
  s.length = nn;
  let ns = 0;

  for (let i = 0; i < N; i++) {
    if (rand.random() < (nn - ns) / (N - i)) {
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
export function srswr({ n, N, rand = BASE_OPTIONS.rand }: SrsOptions): number[] {
  assertSizeRange(N, 1, Number.MAX_SAFE_INTEGER, "N");
  assertSizeRange(n, 0, N, "n");

  const s: number[] = [];
  s.length = n;

  for (let i = 0; i < n; i++) {
    s[i] = Math.floor(rand.random() * N);
  }

  s.sort((a, b) => a - b);

  return s;
}
