import {Random} from '@envisim/random';
import {LOGKFAC, LOGSQRT2PI} from './utils-consts.js';

interface IRandomSmall {
  rate0: number;
  pdf0: number;
}

interface IRandomLarge {
  rate0: number;
  smu: number;
  b: number;
  a: number;
  alphainv: number;
  vr: number;
}

const randomSmall = (n: number, rate0: number, rand: Random): number[] => {
  const constants: IRandomSmall = {
    rate0,
    pdf0: Math.exp(-rate0),
  };

  const rv = new Array(n);
  for (let i = 0; i < n; i++) rv[i] = randomSmall_inner(rand, constants);
  return rv;
};

const randomSmall_inner = (
  rand: Random,
  {rate0, pdf0}: IRandomSmall,
): number => {
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
};

// const randomPoissonSmall = (rate: number, rand: Random): number => {
//   const u = rand.float();
//   let k = 0;
//   let cdf = 0.0;
//   let pdf = Math.exp(-rate);

//   while (k <= 45) {
//     cdf += pdf;
//     if (cdf >= u) return k;
//     k++;
//     pdf *= rate / k;
//   }

//   return k;
// };

/*
 * Hörmann, W. (1993).
 * The transformed rejection method for generating Poisson random variables.
 * Insurance: Mathematics and Economics, 12(1), 39-45.
 * https://doi.org/10.1016/0167-6687(93)90997-4
 */
const randomLarge = (n: number, rate0: number, rand: Random): number[] => {
  // PTRD 0
  const smu = Math.sqrt(rate0);
  const b = 0.931 + 2.53 * smu;
  const a = -0.059 + 0.02483 * b;
  const alphainv = 1.1239 + 1.1328 / (b - 3.4);
  const vr = 0.9277 - 3.6224 / (b - 2.0);

  const constants: IRandomLarge = {
    rate0,
    smu,
    b,
    a,
    alphainv,
    vr,
  };

  const rv = new Array(n);
  for (let i = 0; i < n; i++) rv[i] = randomLarge_inner(rand, constants);
  return rv;
};

const randomLarge_inner = (
  rand: Random,
  {rate0, smu, b, a, alphainv, vr}: IRandomLarge,
): number => {
  let k: number, u: number, us: number, v: number;
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
          LOGSQRT2PI +
          k -
          (1 / 12 - 1 / (360 * Math.pow(k, 2))) / k
    )
      return k;

    // PTRD 3.2
    if (
      0 <= k &&
      k <= 9 &&
      Math.log(v) <= k * Math.log(rate0) - rate0 - LOGKFAC[k]
    )
      return k;
  }

  console.warn('poisson (randomLarge) didnt resolve in 1e5 iterations');
  return NaN;
};

// const randomPoissonLarge = (rate: number, rand: Random): number => {
//   // PTRD 0
//   const smu = Math.sqrt(rate);
//   const b = 0.931 + 2.53 * smu;
//   const a = 0.059 + 0.02483 * b;
//   const alphainv = 1.1239 + 1.1328 / (b - 3.4);
//   const vr = 0.9277 - 3.6224 / (b - 2.0);

//   let k: number;
//   let u: number;
//   let us: number;
//   let v: number;
//   let run = 0;
//   while (run++ <= 1e5) {
//     v = rand.float();

//     // PTRD 1
//     if (v <= 0.86 * vr) {
//       u = v / vr - 0.43;
//       return (((a + a) / (0.5 - Math.abs(u)) + b) * u + rate + 0.445) | 0;
//     }

//     // PTRD 2
//     if (v >= vr) {
//       u = rand.float() - 0.5;
//     } else {
//       u = v / vr - 0.93;
//       u = -u + u >= 0 ? 0.5 : -0.5;
//       v = rand.float() * vr;
//     }

//     // PTRD 3.0
//     us = 0.5 - Math.abs(u);
//     if (us < 0.013 && v > us) continue;

//     // PTRD 3.1
//     k = (((a + a) / us + b) * u + rate + 0.445) | 0;
//     v = (v * alphainv) / (a / Math.pow(us, 2) + b);
//     if (
//       k >= 10 &&
//       Math.log(v * smu) <=
//       (k + 0.5) * Math.log(rate / k) -
//       rate -
//       LOGSQRT2PI +
//       k -
//       (1 / 12 - 1 / (360 * Math.pow(k, 2))) / k
//     )
//       return k;

//     // PTRD 3.2
//     if (
//       0 <= k &&
//       k <= 9 &&
//       Math.log(v) <= k * Math.log(rate) - rate - LOGKFAC[k]
//     )
//       return k;
//   }

//   console.warn('poisson didnt resolve');
//   return NaN;
// };

export const randomPoisson = (
  n: number,
  rate0: number,
  rand: Random,
): number[] => {
  if (rate0 <= 10) return randomSmall(n, rate0, rand);
  return randomLarge(n, rate0, rand);
};

// export const randomPoisson = (rate: number, rand: Random): number => {
//   if (rate <= 10) return randomPoissonSmall(rate, rand);
//   return randomPoissonLarge(rate, rand);
// };
