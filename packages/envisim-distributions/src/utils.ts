import {gammaFunction, logGammaFunction} from './gamma-utils.js';
import {KFAC, LOGKFAC} from './math-constants.js';

/** @internal */
export function assertPositiveInteger(n: number): asserts n is number {
  if (n < 1 || !Number.isInteger(n)) throw new RangeError('n must be a positive integer');
}

/** @deprecated */
export function PQFUN(x: number, q: boolean = false): number {
  return q === true ? 1.0 - x : x;
}

export function pqMultiplied(x: number): number {
  return x * (1.0 - x);
}

export function functionfactorial(x: number): number {
  if (!Number.isInteger(x) || x < 0) return NaN;
  if (x <= 10) return KFAC[x];

  return gammaFunction(x + 1);

  // let res = 1;
  // for (let i = 11; i <= x; i++) res *= i;
  // return res * KFAC[10];
}

export function logFactorial(x: number): number {
  if (!Number.isInteger(x) || x < 0) return NaN;
  if (x <= 10) return LOGKFAC[x];

  return logGammaFunction(x + 1);

  // let res = LOGKFAC[10];
  // for (let i = 11; i <= x; i++) res += Math.log(i);
  // return res;
}

export function logDoubleFactorial(x: number): number {
  if (!Number.isInteger(x) || x < 0) return NaN;
  if (x <= 0) return 0;

  let res = 1.0;
  for (let i = x; i > 1; i -= 2) {
    res += Math.log(i);
  }

  return res;
}

export function binomialCoefficient(n: number, k: number): number {
  if (!Number.isInteger(n) || !Number.isInteger(k) || k > n || k < 0) return NaN;
  if (n - k < k) return binomialCoefficient(n, n - k);

  const nn = n + 1;
  let res = 1;
  for (let i = 1; i <= k; i++) res *= (nn - i) / i;
  return res;
}

export function sech(x: number): number {
  return 2.0 / (Math.exp(x) + Math.exp(-x));
}

export function logBinomialCoefficient(n: number, k: number): number {
  if (!Number.isInteger(n) || !Number.isInteger(k) || k > n || k < 0) return NaN;
  if (n - k < k) return logBinomialCoefficient(n, n - k);

  const nn = n + 1;
  let res = 0.0;
  for (let i = 1; i <= k; i++) res += Math.log((nn - i) / i);
  return res;
}
