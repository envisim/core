import {Random} from '@envisim/random';

import {LOG4, LOG5P1} from './utils-consts.js';
import {PQMULTFUN} from './utils.js';

interface ISakasegawaB00 {
  a0: number;
  b0: number;
  t: number;
  s: number;
  r: number;
  p: number;
  q: number;
  c: number;
}

interface IRandomBetaLarge {
  a0small: boolean;
  alpha: number;
  beta: number;
  gamma: number;
  a: number;
  b: number;
}

interface IRandomBetaSmall {
  a0small: boolean;
  alpha: number;
  beta: number;
  kappa1: number;
  kappa2: number;
  a: number;
  b: number;
}

// alpha, beta < 1
const sakasegawaB00 = (
  n: number,
  a0: number,
  b0: number,
  rand: Random,
): number[] => {
  let t = (1.0 - a0) / (2.0 - a0 - b0);
  let s = (b0 - a0) * (1.0 - a0 - b0);
  let r = PQMULTFUN(a0);
  t -= ((s * t + r + r) * t - r) / (2.0 * (s * t + r));
  // ambiguous, might not be paranthesis on above denom
  const p = t / a0;
  const q = (1.0 - t) / b0;
  s = Math.pow(1.0 - t, b0 - 1.0);
  const c = Math.pow(t, a0 - 1.0);
  r = (c - 1.0) / (t - 1.0);

  const constants: ISakasegawaB00 = {a0, b0, t, s, r, p, q, c};

  const rv = new Array(n);
  for (let i = 0; i < n; i++) rv[i] = sakasegawaB00_inner(rand, constants);
  return rv;
};

const sakasegawaB00_inner = (
  rand: Random,
  {a0, b0, t, s, r, p, q, c}: ISakasegawaB00,
): number => {
  let u1: number, u2: number, x: number;

  let run = 1;
  while (run++ <= 1e5) {
    // S1
    u1 = rand.float() * (p + q);
    u2 = rand.float();

    if (u1 <= p) {
      // S2
      x = t * Math.pow(u1 / p, 1.0 / a0);
      u2 *= s;
      if (u2 < (1.0 - b0) * x + 1.0) return x;
      else if (
        u2 > ((s - 1.0) * x) / t + 1.0 ||
        u2 > Math.pow(1.0 - x, b0 - 1.0)
      )
        continue;
      return x;
    }

    // S3
    x = 1.0 - (1.0 - t) * Math.pow((u1 - p) / q, 1.0 / b0);
    u2 *= c;
    if (u2 < (a0 - 1.0) * (x - 1.0) + 1.0) return x;
    else if (u2 > r * (x - 1.0) + 1.0 || u2 > Math.pow(x, a0 - 1.0)) continue;
    return x;
  }

  // Should not happen, solution is found in average 1.36 iter.
  console.warn('beta (sakasegawaB00) did not resolve in 1e5 iterations');
  return NaN;
};

const randomBetaLarge = (
  n: number,
  a0: number,
  b0: number,
  rand: Random,
): number[] => {
  const alpha = a0 + b0;
  const beta = Math.sqrt((alpha - 2.0) * (2 * a0 * b0 - alpha));

  const constants: IRandomBetaLarge = {
    alpha,
    beta,
    a0small: true,
    a: a0,
    b: b0,
    gamma: 1.0 / beta,
  };

  if (a0 > b0) {
    constants.a0small = false;
    constants.a = b0;
    constants.b = a0;
  }

  constants.gamma += constants.a;

  const rv = new Array(n);
  for (let i = 0; i < n; i++) rv[i] = randomBetaLarge_inner(rand, constants);
  return rv;
};

const randomBetaLarge_inner = (
  rand: Random,
  {a0small, alpha, beta, gamma, a, b}: IRandomBetaLarge,
): number => {
  let u: number, v: number, w: number, z: number;
  let r: number, s: number, t: number;
  let run = 1;

  while (run++ <= 1e5) {
    // BB 1
    u = rand.float();
    v = beta * Math.log(u / (1 - u));
    w = a * Math.exp(v);
    z = u * u * rand.float();
    r = gamma * v - LOG4;
    s = a + r - w;
    // BB 2
    if (s + LOG5P1 < 5 * z) {
      // BB 3
      t = Math.log(z);
      // BB 4
      if (s < t && r + alpha * Math.log(alpha / (b + w)) < t) continue;
    }
    // BB 5
    return (a0small ? w : b) / (b + w);
  }

  // Should not happen, solution is found in (max) average 4 iter.
  console.warn('beta (randomBetaLarge) did not resolve in 1e5 iterations');
  return NaN;
};

const randomBetaSmall = (
  n: number,
  a0: number,
  b0: number,
  rand: Random,
): number[] => {
  const a0small: boolean = a0 <= b0;
  let a: number, b: number;

  // BC 0
  if (a0small) {
    a = b0;
    b = a0;
  } else {
    a = a0;
    b = b0;
  }

  const alpha = a0 + b0;
  const beta = 1.0 / b;
  const delta = 1.0 + a - b;
  const kappa1 = (delta * (0.0138889 + 0.0416667 * b)) / (a * beta - 0.777778);
  const kappa2 = 0.25 + (0.5 + 0.25 / delta) * b;

  const constants: IRandomBetaSmall = {
    a0small,
    alpha,
    beta,
    kappa1,
    kappa2,
    a,
    b,
  };

  const rv = new Array(n);
  for (let i = 0; i < n; i++) rv[i] = randomBetaSmall_inner(rand, constants);
  return rv;
};

const randomBetaSmall_inner = (
  rand: Random,
  {a0small, alpha, beta, kappa1, kappa2, a, b}: IRandomBetaSmall,
): number => {
  let u1: number, u2: number, v: number, y: number, z: number;
  let w: number = 0.0;

  let runs = 1;
  while (runs++ <= 1e5) {
    // BC 1
    u1 = rand.float();
    u2 = rand.float();
    y = u1 * u2;
    z = u1 * y;

    if (u1 < 0.5) {
      // BC 2
      if (0.25 * u2 + z - y >= kappa1) continue;
    } else {
      // BC 3
      if (z <= 0.25) {
        v = beta * Math.log(u1 / (1 - u1));
        w = v <= 700 ? a * Math.exp(v) : Number.MAX_VALUE;
        if (!Number.isFinite(w)) w = Number.MAX_VALUE - b;
        break;
      }

      // BC 4
      if (z >= kappa2) continue;
    }

    // BC5
    v = beta * Math.log(u1 / (1 - u1));
    w = v <= 700 ? a * Math.exp(v) : Number.MAX_VALUE;
    if (!Number.isFinite(w)) w = Number.MAX_VALUE - b;
    if (alpha * (Math.log(alpha / (b + w)) + v) - LOG4 >= Math.log(z)) break;
  }

  if (runs >= 1e5) {
    console.warn('beta (randomBetaSmall) did not resolve in 1e5 iterations');
    return NaN;
  }

  return (a0small ? b : w) / (b + w);
};

/*
 * Returns a random Beta(alpha, beta)
 *
 * Acceptance rejection
 *
 * Hung, Y. C., Balakrishnan, N., & Lin, Y. T. (2009).
 * Evaluation of beta generation algorithms.
 * Communications in Statistics-Simulation and Computation, 38(4), 750-770.
 * https://doi.org/10.1080/03610910802645347
 *
 * Cheng, R. C. H. (1978).
 * Generating Beta Variates with Nonintegral Shape Parameters
 * Communications of the ACM 21(4), 317-322.
 * https://doi.org/10.1145/359460.359482
 */
export const randomBeta = (
  n: number,
  alpha: number,
  beta: number,
  rand: Random,
): number[] => {
  if (alpha === 1.0 && beta === 1.0) return rand.floatArray(n);
  if (alpha === 1.0) {
    const pow = 1.0 / beta;
    return rand.floatArray(n).map((e) => 1.0 - Math.pow(e, pow));
  }
  if (beta === 1.0) {
    const pow = 1.0 / alpha;
    return rand.floatArray(n).map((e) => Math.pow(e, pow));
  }

  if (alpha <= 1.0 || beta <= 1.0) {
    if (alpha < 1.0 && beta < 1.0) return sakasegawaB00(n, alpha, beta, rand);
    return randomBetaSmall(n, alpha, beta, rand);
  }
  return randomBetaLarge(n, alpha, beta, rand);
};
