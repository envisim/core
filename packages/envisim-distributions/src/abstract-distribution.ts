import { Random, type RandomGenerator, randomArray } from "@envisim/random";
import { assertPositiveInteger } from "./utils.js";

/**
 * @category Interfaces
 */
export interface RandomOptions {
  /**
   * A random generator
   * @defaultValue `new Random()`
   */
  rand: RandomGenerator;
  /**
   * Epsilon, used during comparisons of floats
   * @defaultValue `1e-12`
   */
  eps?: number;
  method?: string;
}
/** @internal */
export const RANDOM_OPTIONS_DEFAULT: RandomOptions = {
  rand: new Random(),
  eps: 1e-12,
} as const;

export abstract class Distribution {
  support!: Interval;

  constructor() {}

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
   * @param n - the number of observations to be generated
   */
  random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    assertPositiveInteger(n);
    const u = randomArray(n, options.rand);
    return u.map((v) => this.quantile(v));
  }

  /** the mean value */
  abstract mean(): number;
  /** the variance */
  abstract variance(): number;
  /** standard deviation */
  sd(): number {
    return Math.sqrt(this.variance());
  }
  /** @returns the mode */
  abstract mode(): number;
  /** @returns the skewness */
  abstract skewness(): number;
}

/** @internal */
export function cornishFisherExpansion(this: Distribution, x: number): number {
  return this.mean() + this.sd() * (x + (this.skewness() * (Math.pow(x, 2) - 1.0)) / 6.0);
}

/** @internal */
export function quantileCF(
  this: Distribution,
  q: number,
  startK: number,
  startCDF: number,
): number {
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

  console.warn("quantile not found in 1e5 iterations");
  return k;
}

/**
 * @category Classes
 */
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
    if (l > r) throw new RangeError("l must not be larger than r");
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
    if (x < this.l || (this.lo && x === this.l)) return 0.0;
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
