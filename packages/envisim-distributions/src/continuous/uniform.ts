import { randomArray } from "@envisim/random";
import { ValidationError } from "@envisim/utils";
import { Bounded } from "../abstract-bounded.js";
import { BoundedMid } from "../abstract-bounded.js";
import { type RandomOptions, RANDOM_OPTIONS_DEFAULT } from "../abstract-distribution.js";

/**
 * @category Continuous distributions
 */
export class Uniform extends Bounded {
  /**
   * The Uniform (continuous) distribution
   *
   * @example
   * const x = new Uniform(0, 1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(a?: number, b?: number) {
    super(a, b);
  }

  pdf(x: number): number {
    return this.support.checkPDF(x) ?? 1.0 / this.params.width;
  }

  cdf(x: number): number {
    return this.support.checkCDF(x) ?? (x - this.params.a) / this.params.width;
  }

  quantile(q: number): number {
    return this.support.checkQuantile(q) ?? this.params.a + q * this.params.width;
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    n |= 0;
    ValidationError.check["number-not-positive"]({ arg: "n" }, n)?.raise();
    const width = this.params.width;
    return randomArray(n, options.rand).map((e) => this.params.a + width * e);
  }

  mean(): number {
    const { a, b } = this.params;
    return (a + b) / 2.0;
  }

  variance(): number {
    const { a, b } = this.params;
    return Math.pow(b - a, 2) / 12.0;
  }

  mode(): number {
    return this.params.a;
  }

  skewness(): number {
    return 0.0;
  }
}

/**
 * @category Continuous distributions
 */
export class Triangular extends BoundedMid {
  /**
   * The Triangular distribution
   *
   * @example
   * const x = new Triangular(0, 1, 0.5);
   * x.pdf(0.4);
   * x.cdf(0.5);
   * x.quantile(0.1);
   * x.random(10);
   */
  constructor(a?: number, b?: number, mid?: number) {
    super(a, b, mid);
  }

  pdf(x: number): number {
    const check = this.support.checkPDF(x);
    if (check !== null) return check;

    const c1 = 2.0 / this.params.width;
    const c2 = c1 / this.params.awidth;
    const c3 = c1 / this.params.bwidth;

    if (x === this.params.mid) return c1;
    if (x < this.params.mid) return c2 * (x - this.params.a);
    return c3 * (this.params.b - x);
  }

  cdf(x: number): number {
    const check = this.support.checkCDF(x);
    if (check !== null) return check;

    const c1 = 1.0 / (this.params.awidth * this.params.width);
    const c2 = 1.0 / (this.params.bwidth * this.params.width);

    if (x <= this.params.mid) return Math.pow(x - this.params.a, 2) * c1;
    return 1.0 - Math.pow(this.params.b - x, 2) * c2;
  }

  quantile(q: number): number {
    const check = this.support.checkQuantile(q);
    if (check !== null) return check;

    const c1 = this.params.width;
    const c2 = this.params.awidth;
    const c3 = c1 * c2;
    const c4 = c1 * this.params.bwidth;

    if (c2 > 0.0 && q * c1 <= c2) return this.params.a + Math.sqrt(q * c3);
    return this.params.b - Math.sqrt((1.0 - q) * c4);
  }

  mean(): number {
    const { a, b, mid } = this.params;
    return (a + b + mid) / 3.0;
  }

  variance(): number {
    return Math.pow(this.params.width, 2) / 12.0;
  }

  mode(): number {
    return this.params.mid;
  }

  skewness(): number {
    const { a, b, mid } = this.params;
    return (
      (Math.SQRT2 * (a + b - 2.0 * mid) * (2.0 * a - b - mid) * (a - 2.0 * b + mid)) /
      (5.0 * Math.pow(a * a + b * b + mid * mid - a * b - a * mid - b * mid, 1.5))
    );
  }
}
