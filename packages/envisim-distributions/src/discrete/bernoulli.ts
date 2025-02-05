import {Distribution, Interval} from '../abstract-distribution.js';
import {type ParamsBernoulli, bernoulliCheck, bernoulliDefault} from '../params.js';

export class Bernoulli extends Distribution<ParamsBernoulli> {
  protected params: ParamsBernoulli = bernoulliDefault;

  /**
   * The Bernoulli distribution
   *
   * @example
   * const x = new Bernoulli(0.9);
   * x.pdf(1);
   * x.quantile(0.5)
   */
  constructor(p: number = bernoulliDefault) {
    super();
    this.setParameters(p);
    return this;
  }

  setParameters(p: ParamsBernoulli = bernoulliDefault): void {
    bernoulliCheck(p);
    this.support = new Interval(0, 1, false, false);
    this.params = p;
  }

  pdf(x: number): number {
    if (x === 0) {
      return 1.0 - this.params;
    } else if (x === 1) {
      return this.params;
    } else {
      return 0.0;
    }
  }

  cdf(x: number): number {
    if (x < 0) {
      return 0.0;
    } else if (x < 1) {
      return 1.0 - this.params;
    } else {
      return 1.0;
    }
  }

  quantile(q: number): number {
    const q0 = 1.0 - this.params;

    if (q < 0.0 || q > 1.0) {
      return NaN;
    } else if (q <= q0) {
      return 0;
    } else {
      return 1;
    }
  }

  mean(): number {
    return this.params;
  }

  variance(): number {
    const p = this.params;
    return p * (1 - p);
  }

  mode(): number {
    const p = this.params;
    if (p <= 0.5) return 0;
    return 1;
  }

  skewness(): number {
    const p = this.params;
    const q = 1 - p;
    return (q - p) / Math.sqrt(p * q);
  }
}
