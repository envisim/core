import { Bounded } from "../abstract-bounded.js";
import { HALF_PI, HALF_PI_INV } from "../math-constants.js";

/**
 * @category Continuous distributions
 */
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
    this.support.ends = "open";
  }

  override pdf(x: number): number {
    return super.pdf(x) ?? 1.0 / (Math.PI * Math.sqrt((x - this.params.a) * (this.params.b - x)));
  }

  override cdf(x: number): number {
    return (
      super.cdf(x) ?? HALF_PI_INV * Math.asin(Math.sqrt((x - this.params.a) / this.params.width))
    );
  }

  override quantile(q: number): number {
    return (
      super.quantile(q) ?? Math.pow(Math.sin(q * HALF_PI), 2) * this.params.width + this.params.a
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
