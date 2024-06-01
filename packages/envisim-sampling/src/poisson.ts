import {
  type FixedSizedOptions,
  type PipsOptions,
  baseOptions,
} from './base-options/index.js';

/**
 * Selects a Poisson sample.
 *
 * @param options
 * @returns sample indices.
 */
export function poissonSampling({
  probabilities,
  rand = baseOptions.rand,
}: PipsOptions): number[] {
  const N = probabilities.length;
  const s: number[] = [];
  s.length = N;

  let j = 0;
  probabilities.forEach((value, index) => {
    if (rand.float() <= value) s[j++] = index;
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
  rand = baseOptions.rand,
}: FixedSizedOptions & PipsOptions): number[] {
  // depends on poisson
  // sum(p) should be n or close to n
  let s: number[] = [];
  let run: number = 0;

  while (s.length != n) {
    s = poissonSampling({probabilities, rand});

    run++;
    if (run >= 1e5)
      throw new Error(
        'conditionalPoissonSampling could not find a sample in 1e5 iterations',
      );
  }

  return s;
}
