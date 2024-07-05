import {ColumnVector, vectorToArray} from '@envisim/matrix';

import {BASE_OPTIONS, type PipsOptions} from './base-options/index.js';
import {conditionalPoissonSampling} from './poisson.js';
import {discrete} from './pps.js';

/**
 * Selects a Sampford (pips) sample using the rejective method.
 *
 * @param options
 * @returns sample indices.
 */
export function sampford({
  probabilities,
  rand = BASE_OPTIONS.rand,
}: PipsOptions): number[] {
  const p = new ColumnVector(probabilities, false);
  const psum = p.sum();
  const q = p.divide(psum);
  const n = Math.round(psum);

  if (n <= 1) {
    return [discrete({probabilities: q, rand})];
  }

  let found = false;
  let found2 = false;
  let nr1;
  let s: number[] = [];

  while (found === false) {
    nr1 = discrete({probabilities: q, rand});

    s = conditionalPoissonSampling({n: n - 1, probabilities, rand});
    found2 = false;

    for (let i = 0; i < s.length; i++) {
      if (s[i] === nr1) {
        found2 = true;
      }
    }

    if (found2 === false) {
      found = true;
      s.push(nr1);
    }
  }

  return s.sort((a, b) => a - b);
}

/**
 * Selects a Pareto (pips) sample without replacement.
 *
 * @param options
 * @returns sample indices.
 */
export function pareto({
  probabilities,
  rand = BASE_OPTIONS.rand,
  eps = BASE_OPTIONS.eps,
}: PipsOptions): number[] {
  const p = vectorToArray(probabilities, true);
  const psum = p.reduce((t: number, c: number) => t + c);
  const n = Math.round(psum);

  return p
    .map((e: number, i: number): [number, number] => {
      const u = rand.float();
      if (eps < e && e < 1 - eps) return [i, u / (1 - u) / (p[i] / (1 - p[i]))];
      if (e <= eps) return [i, Infinity];
      return [i, 0];
    })
    .sort((a: [number, number], b: [number, number]) => a[1] - b[1])
    .slice(0, n)
    .map((e: [number, number]) => e[0])
    .sort((a: number, b: number) => a - b);
}

/**
 * Selects a (pips) sample without replacement using Brewers method.
 *
 * @param options
 * @returns sample indices.
 */
export function brewer({
  probabilities,
  rand = BASE_OPTIONS.rand,
  eps = BASE_OPTIONS.eps,
}: PipsOptions): number[] {
  const pr = vectorToArray(probabilities, false);
  const N = pr.length;

  const s = [];
  const I: number[] = [];
  I.length = N;
  let psum = pr.reduce((t: number, c: number) => t + c);
  let n = Math.round(psum);

  for (let i = 0; i < N; i++) {
    if (pr[i] > 1 - eps) {
      pr[i] = 0;
      I[i] = 1;
      n--;
      s.push(i + 1);
    } else {
      I[i] = 0;
    }
  }

  const pk = new Array(N);
  let del1 = 0.0;
  let u: number;

  for (let i = 1; i <= n; i++) {
    psum = 0.0;
    pr.forEach((e: number, j: number) => {
      pk[j] = ((1 - I[j]) * e * (n - del1 - e)) / (n - del1 - e * (n - i + 1));
      psum += pk[j];
    });

    pk.forEach((_: any, j: number) => {
      pk[j] /= psum;
    });

    u = discrete({probabilities: pk, rand});
    s.push(u);
    I[u - 1] = 1;
    del1 += pr[u - 1];
  }

  return s.sort((a, b) => a - b);
}
