import {Random} from '@envisim/random';

import {assertPositiveInteger} from './utils.js';

export interface RandomOptions {
  /**
   * An instance of {@link random.Random}
   * @defaultValue `new Random()`
   */
  rand?: Random;
  /**
   * Epsilon, used during comparisons of floats
   * @defaultValue `1e-12`
   */
  eps?: number;
  method?: string;
}
/** @internal */
export const randomOptionsDefault: {rand: Random; eps: number} = {
  rand: new Random(),
  eps: 1e-12,
};

/** Base class */
export abstract class Distribution<PAR> {
  /** @internal */
  protected abstract params: PAR;
  protected support!: Interval;

  /** Sets the parameters of the distribution */
  abstract setParameters(params: PAR): void;

  /**
   * The probability density/mass function evaluated at `x`.
   */
  abstract pdf(x: number, eps?: number): number;
  /**
   * The cumulative distribution function evaluated at `x`.
   */
  abstract cdf(x: number, eps?: number): number;
  /**
   * The quantile function evaluated at `q`.
   */
  abstract quantile(q: number, eps?: number): number;

  /**
   * Generate random numbers from the distribution.
   * @param n the number of observations to be generated
   */
  random(n: number = 1, opts: RandomOptions): number[] {
    assertPositiveInteger(n);
    const u = (opts.rand ?? randomOptionsDefault.rand).floatArray(n);
    return u.map((v) => this.quantile(v));
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

  protected cornishFisherExpansion(x: number): number {
    return (
      this.mean() +
      this.standardDeviation() * (x + (this.skewness() * (Math.pow(x, 2) - 1.0)) / 6.0)
    );
  }

  protected quantileCF(q: number, startK: number, startCDF: number): number {
    if (startCDF === q) return startK;

    let cdf = startCDF;
    let k = startK;
    let run = 0;
    if (cdf > q) {
      while (run++ <= 1e5) {
        cdf -= this.pdf(k);
        // cdf -= pmf(k - 1);
        if (cdf === q) return k - 1;
        if (cdf < q || !this.support.isL(k)) return k;
        k--;
      }
    } else {
      while (run++ <= 1e5) {
        cdf += this.pdf(k + 1);
        if (cdf >= q) return k + 1;
        if (!this.support.isR(k)) return k;
        k++;
      }
    }

    console.warn('quantile not found in 1e5 iterations');
    return k;
  }
}

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
