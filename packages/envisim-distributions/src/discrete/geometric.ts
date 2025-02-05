import {Distribution, Interval} from '../abstract-distribution.js';
import {type ParamsBernoulli, bernoulliCheck, bernoulliDefault} from '../params.js';

export class Geometric extends Distribution<ParamsBernoulli> {
  protected params: ParamsBernoulli = bernoulliDefault;
  protected logq!: number;

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
  constructor(p: number = bernoulliDefault) {
    super();
    this.setParameters(p);
    return this;
  }

  setParameters(p: ParamsBernoulli = bernoulliDefault): void {
    bernoulliCheck(p);
    this.support = new Interval(1, Infinity, false, true);
    this.params = p;
    this.logq = Math.log(1.0 - p);
  }

  pdf(x: number): number {
    return this.support.checkPDFInt(x) ?? Math.exp((x - 1) * this.logq) * this.params;
  }

  cdf(x: number): number {
    return this.support.checkCDFInt(x) ?? 1.0 - Math.exp((x | 0) * this.logq);
  }

  quantile(q: number): number {
    return this.support.checkQuantile(q) ?? Math.ceil(Math.log(1.0 - q) / this.logq);
  }

  mean(): number {
    return 1.0 / this.params;
  }

  variance(): number {
    return (1.0 - this.params) / Math.pow(this.params, 2);
  }

  mode(): number {
    return 1.0;
  }

  skewness(): number {
    return (2.0 - this.params) / Math.sqrt(1.0 - this.params);
  }
}
