import {TArrayLike, isVector} from '@envisim/matrix';

import {IRandomOptions} from './types.js';

/* eslint @typescript-eslint/no-unsafe-call: 0 */
/* eslint @typescript-eslint/no-unsafe-member-access: 0 */

/** Base class */
export abstract class Distribution<I> {
  /** @internal */
  protected abstract params: I;
  /** Sets the parameters of the distribution */
  abstract setParameters(params: I): void;

  /**
   * The probability density/mass function evaluated at `x`.
   * @returns a number or a {@link matrix.TArrayLike}, depending on the type of `x`.
   */
  pdf<T extends number | TArrayLike>(x: T): T {
    return (this.constructor as any).pdf(x, this.params) as T;
  }
  /**
   * The cumulative distribution function evaluated at `x`.
   * @returns a number or a {@link matrix.TArrayLike}, depending on the type of `x`.
   */
  cdf<T extends number | TArrayLike>(x: T): T {
    return (this.constructor as any).cdf(x, this.params) as T;
  }
  /**
   * The quantile function evaluated at `q`.
   * @returns a number or a {@link matrix.TArrayLike}, depending on the type of `x`.
   */
  quantile<T extends number | TArrayLike>(q: T): T {
    return (this.constructor as any).quantile(q, this.params) as T;
  }
  /**
   * Generate random numbers from the distribution.
   * @param n - the number of observations to be generated
   */
  random(n: number, opts: IRandomOptions): number[] {
    return (this.constructor as any).random(n, this.params, opts) as number[];
  }

  /** the mean value */
  abstract mean(): number;
  /** the variance */
  abstract variance(): number;
  /** @returns the square root of the variance */
  standardDeviation(): number {
    return Math.sqrt(this.variance());
  }
  /** @returns the mode */
  abstract mode(): number;
  /** @returns the skewness */
  abstract skewness(): number;
}

/**
 * @internal
 * @returns `true` if `x` is {@link matrix.TArrayLike}, `false` if `x` is number
 * @throws `TypeError` if `x` is neither {@link matrix.TArrayLike} nor number
 */
export const checkArrayLikeOrNumber = (
  x: number | TArrayLike,
): x is TArrayLike => {
  // export const checkArrayNumber = (x: number | number[]): boolean => {
  if (Array.isArray(x)) {
    if (x.every((e) => typeof e === 'number')) return true;
    throw new TypeError('every element of x must be a number');
  }

  if (Array.isArray(x) || isVector(x)) return true;

  if (typeof x === 'number') return false;
  throw new TypeError('x must be a number or an array of numbers');
};

/** @internal */
export const checkRandomNumber = (n: number): n is number => {
  if (typeof n !== 'number') throw new TypeError('n must be number');
  if (!Number.isInteger(n)) throw new RangeError('n must be integer valued');
  if (n < 1) throw new RangeError('n must be at least 1');
  return true;
};

/** @internal */
export const quantileCF = (
  quantile: number,
  pmf: (n: number) => number,
  startK: number,
  startCDF: number,
  support: Interval,
): number => {
  if (startCDF === quantile) return startK;

  let cdf = startCDF;
  let k = startK;
  let run = 0;
  if (cdf > quantile) {
    while (run++ <= 1e5) {
      cdf -= pmf(k);
      // cdf -= pmf(k - 1);
      if (cdf === quantile) return k - 1;
      if (cdf < quantile || !support.isL(k)) return k;
      k--;
    }
  } else {
    while (run++ <= 1e5) {
      cdf += pmf(k + 1);
      if (cdf >= quantile) return k + 1;
      if (!support.isR(k)) return k;
      k++;
    }
  }

  console.warn('quantile not found in 1e5 iterations');
  return k;
};

/** @internal */
export class Interval {
  /** Left endpoint */
  l: number = -Infinity;
  /** Right endpoint */
  r: number = Infinity; // Right
  /** Left endpoint is open */
  lo: boolean = true;
  /** Right endpoint is open */
  ro: boolean = true;

  constructor(l: number, r: number, lo: boolean = true, ro: boolean = true) {
    if (l > r) throw new RangeError('l must not be larger than r');
    this.l = l;
    this.r = r;
    this.lo = Number.isFinite(l) ? lo : true;
    this.ro = Number.isFinite(r) ? ro : true;
    return this;
  }

  isIn(x: number) {
    return this.isL(x) && this.isR(x);
  }

  isL(x: number) {
    return this.lo ? this.l < x : this.l <= x;
  }

  isR(x: number) {
    return this.ro ? this.r > x : this.r >= x;
  }

  isInInt(x: number) {
    return Number.isInteger(x) && this.isIn(x);
  }

  isLInt(x: number) {
    return Number.isInteger(x) && this.isL(x);
  }

  isRInt(x: number) {
    return Number.isInteger(x) && this.isR(x);
  }

  checkPDF(x: number): number | null {
    return !this.isIn(x) ? 0.0 : null;
  }

  checkPDFInt(x: number): number | null {
    return !this.isInInt(x) ? 0.0 : null;
  }

  checkCDF(x: number): number | null {
    if (x <= this.l) return 0.0;
    if (this.r <= x) return 1.0;
    return null;
  }

  checkCDFInt(x: number): number | null {
    if (x <= this.l) return !this.lo && x === this.l ? null : 0.0;
    if (this.l >= x) return 0.0;
    if (this.r <= x) return 1.0;
    return null;
  }

  checkQuantile(q: number): number | null {
    if (q < 0.0 || q > 1.0) return NaN;
    if (q === 0.0) return this.l;
    if (q === 1.0) return this.r;
    return null;
  }
}
