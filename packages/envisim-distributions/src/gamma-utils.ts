import {KFAC, LOGKFAC, LOG_SQRT_PI, SQRT_PI} from './math-constants.js';

const SQRT_E_OVER_PI = Math.sqrt(Math.E / Math.PI);

/* eslint-disable no-loss-of-precision */
const LOGGAMMACOEFS = {
  c0: 2.48574089138753565546e-5,
  c: [
    1.0514237858172197421, -3.45687097222016235469, 4.512277094668948237, -2.98285225323576655721,
    1.05639711577126713077, -1.95428773191645869583e-1, 1.70970543404441224307e-2,
    -5.71926117404305781283e-4, 4.63399473359905636708e-6, -2.7199490848860770391e-9,
  ],
} as const;
/* eslint-enable no-loss-of-precision */

function doubleFactorial(x: number): number {
  if (!Number.isInteger(x) || x < 0) return NaN;
  if (x <= 0) return 1;

  let res = 1.0;
  for (let i = x; i > 1; i -= 2) {
    res *= i;
  }

  return res;
}

/*
 * logGammaFunctionInternal, based on ALG 4 in (however an error is in alg.)
 * Abergel, R., & Moisan, L. (2020).
 * Algorithm 1006: Fast and Accurate Evaluation of a Generalized Incomplete
 * Gamma Function. ACM Transactions on Mathematical Software (TOMS), 46(1),
 * 1-24.
 * https://doi.org/10.1145/3365983
 */
function logGammaFunctionInternal(x: number): number {
  const p = x - 0.5;
  const csum = LOGGAMMACOEFS.c.reduce((t, c, i) => t + c / (x + i), LOGGAMMACOEFS.c0 as number);
  return Math.log(2.0 * SQRT_E_OVER_PI * csum) - p + p * Math.log(p + 10.900511);
}

export function logGammaFunction(x: number): number {
  if (x < 0.0) return NaN;
  if (x === 0.0) return Infinity;
  if (x === 0.5) return LOG_SQRT_PI;
  if (Number.isInteger(x) && x > 0 && x <= 11) return LOGKFAC[x - 1];
  return logGammaFunctionInternal(x);
}

export function gammaFunction(x: number): number {
  if (x <= 0) return NaN;
  if (x === 0.5) return SQRT_PI;
  if (Number.isInteger(x) && x > 0 && x <= 11) return KFAC[x - 1];
  if (Number.isInteger(x - 0.5) && x > 0 && x <= 10) {
    const n = x | 0; // truncate
    return (doubleFactorial((n << 1) - 1) / Math.pow(2, n)) * SQRT_PI;
  }

  return Math.exp(logGammaFunctionInternal(x));
}

function pLim(x: number): number {
  if (x < -9.0) return 5.0 * Math.sqrt(-x) - 5.0;
  if (x <= 0.0) return 0.0;
  return x;
}

interface GammaSeries {
  (s: number, x: number, n: number): {a: number; b: number};
}

function gSeries15(s: number, x: number, n: number): {a: number; b: number} {
  const ret = {
    a: 1.0,
    b: s - 1.0 + n,
  };
  if (n === 1) return ret;

  // Divide by two, rounded down
  const ns = n >> 1;
  ret.a = n % 2 === 0 ? -(s - 1.0 + ns) * x : ns * x;
  return ret;
}

function gSeries16(s: number, x: number, n: number): {a: number; b: number} {
  const ret = {
    a: 1.0,
    b: x + (n << 1) - s - 1,
  };
  if (n > 1) ret.a = -(n - 1) * (n - s - 1);
  return ret;
}

function gFunction1(s: number, x: number, eps: number, fun: GammaSeries): number {
  const dm = 1e-100;
  const {a: a1, b: b1} = fun(s, x, 1);
  let f = a1 / b1;
  let c = a1 / dm;
  let d = 1.0 / b1;
  let delta = 0.0;

  for (let n = 2; Math.abs(delta - 1.0) >= eps; n++) {
    const {a, b} = fun(s, x, n);
    d = d * a + b;
    if (d === 0.0) d = dm;
    c = b + a / c;
    if (c === 0.0) c = dm;
    d = 1.0 / d;
    delta = c * d;
    f *= delta;
  }

  return f;
}

function gFunction2_17(s: number, x: number, eps: number, logGammaFn: number): number {
  // x is negative, thus s is integer
  const t = -x;
  let c = 1.0 / t;
  let d = s - 1;
  let z = c * (t - d);
  let delta = 1e10;

  for (let l = 1; l <= (s - 2) >> 1 && delta >= z * eps; l++) {
    c = (d * (d - 1.0)) / Math.pow(t, 2);
    d = d - 2.0;
    delta = c * (t - d);
    z += delta;
  }

  let neg = 1.0;
  if (s % 2 !== 0) {
    neg = -1.0;
    if (delta >= z * eps) z += (d * c) / t;
  }

  return (neg * Math.exp(-t + logGammaFn - (s - 1) * Math.log(t)) + z) / t;
}

/*
 * gFunction, based on Alg. 3
 * Abergel, R., & Moisan, L. (2020).
 * Algorithm 1006: Fast and Accurate Evaluation of a Generalized Incomplete Gamma Function.
 * ACM Transactions on Mathematical Software (TOMS), 46(1), 1-24.
 * https://doi.org/10.1145/3365983
 */
function gFunction(a: number, x: number, eps: number, logGammaFn: number): number {
  if (a <= 0.0) return NaN;
  if (x < 0 && !Number.isInteger(a)) return NaN;
  const alim = pLim(x);
  if (a >= alim) return gFunction1(a, x, eps, gSeries15);
  if (x >= 0.0) return gFunction1(a, x, eps, gSeries16);
  // a must be integer
  return gFunction2_17(a, x, eps, logGammaFn);
}

export function lowerGammaFunction(
  a: number,
  x: number,
  eps: number,
  lgammaFn: number = logGammaFunction(a),
): number {
  if (a < 0 || x < 0.0) return NaN;
  if (a === 1) return 1.0 - Math.exp(-x);

  const ge = gFunction(a, x, eps, lgammaFn) * Math.exp(-x + a * Math.log(x));

  return x > a ? Math.exp(lgammaFn) - ge : ge;
}

export function upperGammaFunction(
  a: number,
  x: number,
  eps: number,
  lgammaFn: number = logGammaFunction(a),
): number {
  if (a < 0 || x < 0.0) return NaN;
  if (a === 1) return Math.exp(-x);

  const ge = gFunction(a, x, eps, lgammaFn) * Math.exp(-x + a * Math.log(x));

  return x <= a ? Math.exp(lgammaFn) - ge : ge;
}

export function regularizedLowerGammaFunction(
  a: number,
  x: number,
  eps: number,
  lgammaFn: number = logGammaFunction(a),
): number {
  if (a < 0.0 || x < 0.0) return NaN;
  if (x === 0) return 0.0;
  if (a === 0) return x === a ? 0.0 : 1.0;
  const ge = gFunction(a, x, eps, lgammaFn) * Math.exp(-x + a * Math.log(x) - lgammaFn);
  return x <= a ? ge : 1.0 - ge;
}

export function regularizedUpperGammaFunction(
  a: number,
  x: number,
  eps: number,
  lgammaFn?: number,
): number {
  return 1.0 - regularizedLowerGammaFunction(a, x, eps, lgammaFn);
}
