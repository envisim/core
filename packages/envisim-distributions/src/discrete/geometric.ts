import { Interval } from "../abstract-distribution.js";
import { Bernoulli } from "./bernoulli.js";

export class Geometric extends Bernoulli {
  /**
   * The Geometric distribution
   *
   * @example
   * const x = new Geometric(0.8);
   * x.pdf(1);
   * x.cdf(1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(p?: number) {
    super(p);
    this.support = new Interval(1, Infinity, false, true);
  }

  override pdf(x: number): number {
    return this.support.checkPDFInt(x) ?? Math.exp((x - 1) * this.params.logq) * this.params.p;
  }

  override cdf(x: number): number {
    return this.support.checkCDFInt(x) ?? 1.0 - Math.exp((x | 0) * this.params.logq);
  }

  override quantile(q: number): number {
    return this.support.checkQuantile(q) ?? Math.ceil(Math.log(1.0 - q) / this.params.logq);
  }

  override mean(): number {
    return 1.0 / this.params.p;
  }

  override variance(): number {
    return this.params.q / Math.pow(this.params.p, 2);
  }

  override mode(): number {
    return 1.0;
  }

  override skewness(): number {
    return (1.0 + this.params.q) / Math.sqrt(this.params.q);
  }
}
