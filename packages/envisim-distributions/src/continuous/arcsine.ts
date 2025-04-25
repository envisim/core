import { Bounded } from "../abstract-bounded.js";
import { HALF_PI, HALF_PI_INV } from "../math-constants.js";

export class Arcsine extends Bounded {
  /**
   * The Arcsine distribution
   *
   * @example
   * const x = new Arcsine(1, 1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   */
  constructor(a?: number, b?: number) {
    super(a, b);
  }

  pdf(x: number): number {
    const check = this.support.checkPDF(x);
    if (check !== null) return check;
    if (x === this.params.a || x === this.params.b) return Infinity;

    return 1.0 / (Math.PI * Math.sqrt((x - this.params.a) * (this.params.b - x)));
  }

  cdf(x: number): number {
    return (
      this.support.checkCDF(x) ??
      HALF_PI_INV * Math.asin(Math.sqrt((x - this.params.a) / this.params.width))
    );
  }

  quantile(q: number): number {
    return (
      this.support.checkQuantile(q) ??
      Math.pow(Math.sin(q * HALF_PI), 2) * this.params.width + this.params.a
    );
  }

  mean(): number {
    const { a, b } = this.params;
    return (a + b) / 2.0;
  }

  variance(): number {
    const { a, b } = this.params;
    return Math.pow(b - a, 2) * 0.125;
  }

  mode(): number {
    return this.params.a;
  }

  skewness(): number {
    return 0.0;
  }
}
