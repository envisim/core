import {chiSquaredQuantile91} from './chisquared-utils.js';
import {
  EPS,
  KFAC,
  LOGKFAC,
  LOGSQRTPI,
  SQRTEBYPI,
  SQRTPI,
} from './utils-consts.js';
import {doubleFactorial} from './utils.js';

const LOGGAMMACOEFS = {
  c0: 2.48574089138753565546e-5,
  c: [
    1.0514237858172197421, -3.45687097222016235469, 4.512277094668948237,
    -2.98285225323576655721, 1.05639711577126713077, -1.95428773191645869583e-1,
    1.70970543404441224307e-2, -5.71926117404305781283e-4,
    4.63399473359905636708e-6, -2.7199490848860770391e-9,
  ],
};

/*
 * logGammaFunctionInternal, based on ALG 4 in (however an error is in alg.)
 * Abergel, R., & Moisan, L. (2020).
 * Algorithm 1006: Fast and Accurate Evaluation of a Generalized Incomplete
 * Gamma Function. ACM Transactions on Mathematical Software (TOMS), 46(1),
 * 1-24.
 * https://doi.org/10.1145/3365983
 */
const logGammaFunctionInternal = (x: number): number => {
  const p = x - 0.5;
  const csum = LOGGAMMACOEFS.c.reduce(
    (t, c, i) => t + c / (x + i),
    LOGGAMMACOEFS.c0,
  );
  return Math.log(2.0 * SQRTEBYPI * csum) - p + p * Math.log(p + 10.900511);
};

export const logGammaFunction = (x: number): number => {
  if (x < 0.0) return NaN;
  if (x === 0.0) return Infinity;
  if (x === 0.5) return LOGSQRTPI;
  if (Number.isInteger(x) && x > 0 && x <= 11) return LOGKFAC[x - 1];
  return logGammaFunctionInternal(x);
};

export const gammaFunction = (x: number): number => {
  if (x <= 0) return NaN;
  if (x === 0.5) return SQRTPI;
  if (Number.isInteger(x) && x > 0 && x <= 11) return KFAC[x - 1];
  if (Number.isInteger(x - 0.5) && x > 0 && x <= 10) {
    const n = x | 0; // truncate
    return (doubleFactorial((n << 1) - 1) / Math.pow(2, n)) * SQRTPI;
  }

  return Math.exp(logGammaFunctionInternal(x));
};

const pLim = (x: number): number => {
  if (x < -9.0) return 5.0 * Math.sqrt(-x) - 5.0;
  if (x <= 0.0) return 0.0;
  return x;
};

interface gSeries {
  (s: number, x: number, n: number): {a: number; b: number};
}
const gSeries15 = (s: number, x: number, n: number): {a: number; b: number} => {
  const ret = {
    a: 1.0,
    b: s - 1.0 + n,
  };
  if (n === 1) return ret;

  // Divide by two, rounded down
  const ns = n >> 1;
  ret.a = n % 2 === 0 ? -(s - 1.0 + ns) * x : ns * x;
  return ret;
};

const gSeries16 = (s: number, x: number, n: number): {a: number; b: number} => {
  const ret = {
    a: 1.0,
    b: x + (n << 1) - s - 1,
  };
  if (n > 1) ret.a = -(n - 1) * (n - s - 1);
  return ret;
};

const gFunction1 = (s: number, x: number, fun: gSeries): number => {
  const dm = 1e-100;
  let {a: a1, b: b1} = fun(s, x, 1);
  let f = a1 / b1;
  let c = a1 / dm;
  let d = 1.0 / b1;
  let delta = 0.0;

  for (let n = 2; Math.abs(delta - 1.0) >= EPS; n++) {
    let {a, b} = fun(s, x, n);
    d = d * a + b;
    if (d === 0.0) d = dm;
    c = b + a / c;
    if (c === 0.0) c = dm;
    d = 1.0 / d;
    delta = c * d;
    f *= delta;
  }

  return f;
};

const gFunction2_17 = (s: number, x: number, logGammaFn: number): number => {
  // x is negative, thus s is integer
  const t = -x;
  let c = 1.0 / t;
  let d = s - 1;
  let z = c * (t - d);
  let delta = 1e10;

  for (let l = 1; l <= (s - 2) >> 1 && delta >= z * EPS; l++) {
    c = (d * (d - 1.0)) / Math.pow(t, 2);
    d = d - 2.0;
    delta = c * (t - d);
    z += delta;
  }

  let neg = 1.0;
  if (s % 2 !== 0) {
    neg = -1.0;
    if (delta >= z * EPS) z += (d * c) / t;
  }

  return (neg * Math.exp(-t + logGammaFn - (s - 1) * Math.log(t)) + z) / t;
};

/*
 * gFunction, based on Alg. 3
 * Abergel, R., & Moisan, L. (2020).
 * Algorithm 1006: Fast and Accurate Evaluation of a Generalized Incomplete Gamma Function.
 * ACM Transactions on Mathematical Software (TOMS), 46(1), 1-24.
 * https://doi.org/10.1145/3365983
 */
const gFunction = (a: number, x: number, logGammaFn: number): number => {
  if (a <= 0.0) return NaN;
  if (x < 0 && !Number.isInteger(a)) return NaN;
  const alim = pLim(x);
  if (a >= alim) return gFunction1(a, x, gSeries15);
  if (x >= 0.0) return gFunction1(a, x, gSeries16);
  // a must be integer
  return gFunction2_17(a, x, logGammaFn);
};

export const lowerGammaFunction = (
  a: number,
  x: number,
  lgammaFn?: number,
): number => {
  if (a < 0 || x < 0.0) return NaN;
  if (a === 1) return 1.0 - Math.exp(-x);

  const lgf = lgammaFn ?? logGammaFunction(a);
  const ge = gFunction(a, x, lgf) * Math.exp(-x + a * Math.log(x));

  return x > a ? Math.exp(lgf) - ge : ge;
};

export const upperGammaFunction = (
  a: number,
  x: number,
  lgammaFn?: number,
): number => {
  if (a < 0 || x < 0.0) return NaN;
  if (a === 1) return Math.exp(-x);

  const lgf = lgammaFn ?? logGammaFunction(a);
  const ge = gFunction(a, x, lgf) * Math.exp(-x + a * Math.log(x));

  return x <= a ? Math.exp(lgf) - ge : ge;
};

export const regularizedLowerGammaFunction = (
  a: number,
  x: number,
  lgammaFn?: number,
): number => {
  if (a < 0.0 || x < 0.0) return NaN;
  if (x === 0) return 0.0;
  if (a === 0) return x === a ? 0.0 : 1.0;
  const lgf = lgammaFn ?? logGammaFunction(a);
  const ge = gFunction(a, x, lgf) * Math.exp(-x + a * Math.log(x) - lgf);
  return x <= a ? ge : 1.0 - ge;
};

export const regularizedUpperGammaFunction = (
  a: number,
  x: number,
  lgammaFn?: number,
): number => {
  return 1.0 - regularizedLowerGammaFunction(a, x, lgammaFn);
};

/*
 * Newton's method on chi square
 * Inspired by R: https://bugs.r-project.org/show_bug.cgi?id=2214
 */
export const gammaQuantile = (
  p: number,
  shape: number,
  scale: number,
  lgammaFn?: number,
): number => {
  const ch0 = chiSquaredQuantile91(p, 2.0 * shape);

  let x0 = 0.5 * scale * ch0;
  let F: number;
  let D: number;
  let f: number;
  const lgf = lgammaFn ?? logGammaFunction(shape);
  const gammac = lgf + shape * Math.log(scale);

  for (let i = 0; i < 20; i++) {
    F = regularizedLowerGammaFunction(shape, x0 / scale, lgf);
    D = F - p;
    if (Math.abs(D) < EPS * p) break;

    f = Math.exp(gammac + (shape - 1.0) * Math.log(x0) - x0 / scale);
    x0 -= D / f;
  }

  return x0;
};
