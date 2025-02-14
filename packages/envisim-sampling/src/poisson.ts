import {BASE_OPTIONS, type FixedSizedOptions, type PipsOptions} from './base-options/index.js';

/**
 * Selects a Poisson sample.
 *
 * @param options
 * @returns sample indices.
 */
export function poissonSampling({probabilities, rand = BASE_OPTIONS.rand}: PipsOptions): number[] {
  const N = probabilities.length;
  const s: number[] = [];
  s.length = N;

  let j = 0;
  probabilities.forEach((value, index) => {
    if (rand.random() <= value) s[j++] = index;
  });

  s.splice(j);
  return s;
}

/**
 * Selects a conditional Poisson sample using the rejective method.
 *
 * @param options
 * @returns sample indices.
 * @throws `Error` if a solution is not found in `1e5` iterations
 */
export function conditionalPoissonSampling({
  n,
  probabilities,
  rand = BASE_OPTIONS.rand,
}: FixedSizedOptions & PipsOptions): number[] {
  // depends on poisson
  // sum(p) should be n or close to n
  let s: number[] = [];
  let run: number = 0;

  while (s.length != n) {
    s = poissonSampling({probabilities, rand});

    run++;
    if (run >= 1e5)
      throw new Error('conditionalPoissonSampling could not find a sample in 1e5 iterations');
  }

  return s;
}
