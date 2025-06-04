import { Distribution } from "../abstract-distribution.js";
import { BernoulliParams } from "../params.js";

/**
 * @category Discrete distributions
 */
export class Bernoulli extends Distribution {
  /** @internal */
  #params!: BernoulliParams;

  /**
   * The Bernoulli distribution
   *
   * @example
   * const x = new Bernoulli(0.9);
   * x.pdf(1);
   * x.quantile(0.5)
   */
  constructor(p?: number) {
    super(false);
    this.#params = new BernoulliParams(p);
    this.support = { interval: [0, 1], ends: "closed" };
  }

  /** @internal */
  get params() {
    return this.#params;
  }

  override pdf(x: number): number {
    if (x === 0) {
      return this.params.q;
    } else if (x === 1) {
      return this.params.p;
    } else {
      return 0.0;
    }
  }

  override cdf(x: number): number {
    if (x < 0) {
      return 0.0;
    } else if (x < 1) {
      return this.params.q;
    } else {
      return 1.0;
    }
  }

  override quantile(q: number): number {
    if (q < 0.0 || q > 1.0) {
      return NaN;
    } else if (q <= this.params.q) {
      return 0;
    } else {
      return 1;
    }
  }

  mean(): number {
    return this.params.p;
  }

  variance(): number {
    const { p, q } = this.params;
    return p * q;
  }

  mode(): number {
    const { p } = this.params;
    if (p <= 0.5) return 0;
    return 1;
  }

  skewness(): number {
    const { p, q } = this.params;
    return (q - p) / Math.sqrt(p * q);
  }
}
