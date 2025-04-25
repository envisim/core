import { Distribution, Interval } from "../abstract-distribution.js";
import { HALF_PI } from "../math-constants.js";
import { sech } from "../utils.js";

/**
 * @category Continuous distributions
 */
export class HyperbolicSecant extends Distribution {
  /**
   * The Hyperbolic Secant distribution
   *
   * @example
   * const x = new HyperbolicSecant();
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile( 0.5)
   * x.random(10);
   */
  constructor() {
    super();
    this.support = new Interval(-Infinity, Infinity, true, true);
  }

  pdf(x: number): number {
    return this.support.checkPDF(x) ?? sech(HALF_PI * x) * 0.5;
  }

  cdf(x: number): number {
    return this.support.checkCDF(x) ?? Math.atan(Math.exp(HALF_PI * x)) / HALF_PI;
  }

  quantile(q: number): number {
    return this.support.checkQuantile(q) ?? Math.log(Math.tan(q * HALF_PI)) / HALF_PI;
  }

  mean(): number {
    return 0.0;
  }

  variance(): number {
    return 1.0;
  }

  mode(): number {
    return 0.0;
  }

  skewness(): number {
    return 0.0;
  }
}
