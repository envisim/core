import { Distribution } from "../abstract-distribution.js";
import { BernoulliParams } from "../params.js";

/**
 * @category Discrete distributions
 */
export class Geometric extends Distribution {
  /** @internal */
  #params!: BernoulliParams;

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
    super(false);
    this.#params = new BernoulliParams(p);
    this.support = { interval: [1, Infinity], ends: "right-open" };
  }

  /** @internal */
  get params() {
    return this.#params;
  }

  override pdf(x: number): number {
    return super.pdf(x) ?? Math.exp((x - 1) * this.params.logq) * this.params.p;
  }

  override cdf(x: number): number {
    return super.cdf(x) ?? 1.0 - Math.exp((x | 0) * this.params.logq);
  }

  override quantile(q: number): number {
    return super.quantile(q) ?? Math.ceil(Math.log(1.0 - q) / this.params.logq);
  }

  mean(): number {
    return 1.0 / this.params.p;
  }

  variance(): number {
    return this.params.q / Math.pow(this.params.p, 2);
  }

  mode(): number {
    return 1.0;
  }

  skewness(): number {
    return (1.0 + this.params.q) / Math.sqrt(this.params.q);
  }
}
