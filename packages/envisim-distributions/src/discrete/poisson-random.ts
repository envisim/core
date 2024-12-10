import {Random} from '@envisim/random';

import {LOGKFAC, SQRT_PI} from '../math-constants.js';

export const LOG_SQRT_2_PI = Math.log(Math.SQRT2 * SQRT_PI);

interface RandomSmall {
  rate0: number;
  pdf0: number;
}

interface RandomLarge {
  rate0: number;
  smu: number;
  b: number;
  a: number;
  alphainv: number;
  vr: number;
}

function randomSmall(n: number, rate0: number, rand: Random): number[] {
  const constants: RandomSmall = {
    rate0,
    pdf0: Math.exp(-rate0),
  };

  const rv = Array.from<number>({length: n});
  for (let i = 0; i < n; i++) rv[i] = randomSmall_inner(rand, constants);
  return rv;
}

function randomSmall_inner(rand: Random, {rate0, pdf0}: RandomSmall): number {
  const u = rand.float();
  let k = 0;
  let cdf = 0.0;
  let pdf = pdf0;

  while (k <= 45) {
    cdf += pdf;
    if (cdf >= u) return k;
    k++;
    pdf *= rate0 / k;
  }

  return k;
}

/*
 * Hörmann, W. (1993).
 * The transformed rejection method for generating Poisson random variables.
 * Insurance: Mathematics and Economics, 12(1), 39-45.
 * https://doi.org/10.1016/0167-6687(93)90997-4
 */
function randomLarge(n: number, rate0: number, rand: Random): number[] {
  // PTRD 0
  const smu = Math.sqrt(rate0);
  const b = 0.931 + 2.53 * smu;
  const a = -0.059 + 0.02483 * b;
  const alphainv = 1.1239 + 1.1328 / (b - 3.4);
  const vr = 0.9277 - 3.6224 / (b - 2.0);

  const constants: RandomLarge = {
    rate0,
    smu,
    b,
    a,
    alphainv,
    vr,
  };

  const rv = Array.from<number>({length: n});
  for (let i = 0; i < n; i++) rv[i] = randomLarge_inner(rand, constants);
  return rv;
}

function randomLarge_inner(rand: Random, {rate0, smu, b, a, alphainv, vr}: RandomLarge): number {
  let k: number;
  let u: number;
  let us: number;
  let v: number;
  let run = 0;

  while (run++ <= 1e5) {
    v = rand.float();

    // PTRD 1
    if (v <= 0.86 * vr) {
      u = v / vr - 0.43;
      return (((a + a) / (0.5 - Math.abs(u)) + b) * u + rate0 + 0.445) | 0;
    }

    // PTRD 2
    if (v >= vr) {
      u = rand.floate() - 0.5;
    } else {
      u = v / vr - 0.93;
      u = u >= 0.0 ? 0.5 - u : -0.5 - u;
      v = rand.floate() * vr;
    }

    // PTRD 3.0
    us = 0.5 - Math.abs(u);
    if (us < 0.013 && v > us) continue;

    // PTRD 3.1
    k = (((a + a) / us + b) * u + rate0 + 0.445) | 0;
    v = (v * alphainv) / (a / Math.pow(us, 2) + b);
    if (
      k >= 10 &&
      Math.log(v * smu) <=
        (k + 0.5) * Math.log(rate0 / k) -
          rate0 -
          LOG_SQRT_2_PI +
          k -
          (1 / 12 - 1 / (360 * Math.pow(k, 2))) / k
    )
      return k;

    // PTRD 3.2
    if (0 <= k && k <= 9 && Math.log(v) <= k * Math.log(rate0) - rate0 - LOGKFAC[k]) return k;
  }

  console.warn('poisson (randomLarge) didnt resolve in 1e5 iterations');
  return NaN;
}

export function randomPoisson(n: number, rate0: number, rand: Random): number[] {
  if (rate0 <= 10) return randomSmall(n, rate0, rand);
  return randomLarge(n, rate0, rand);
}
