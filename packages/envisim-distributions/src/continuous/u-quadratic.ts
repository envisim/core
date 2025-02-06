import {Distribution, Interval} from '../abstract-distribution.js';
import {type ParamsBound, boundCheck, boundDefault} from '../params.js';

export class UQuadratic extends Distribution<ParamsBound> {
  protected params: ParamsBound = {...boundDefault};
  protected alpha!: number;
  protected beta!: number;

  /**
   * The U-Quadratic distribution
   *
   * @example
   * const x = new UQuadratic(0, 1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(a: number = boundDefault.a, b: number = boundDefault.b) {
    super();
    this.setParameters({a, b});
    return this;
  }

  setParameters(params: ParamsBound = {...boundDefault}): void {
    boundCheck(params);
    this.support = new Interval(params.a, params.b, false, false);
    this.params.a = params.a;
    this.params.b = params.b;
    this.alpha = 12.0 / Math.pow(params.b - params.a, 3);
    this.beta = (params.a + params.b) * 0.5;
  }

  pdf(x: number): number {
    return this.support.checkPDF(x) ?? this.alpha * Math.pow(x - this.beta, 2);
  }

  cdf(x: number): number {
    const c1 = this.alpha / 3.0;
    const c2 = Math.pow(this.beta - this.params.a, 3);

    return this.support.checkCDF(x) ?? c1 * (c2 + Math.pow(x - this.beta, 3));
  }

  quantile(q: number): number {
    const check = this.support.checkQuantile(q);
    if (check !== null) return check;

    const c1 = Math.pow(this.params.b - this.params.a, 3) * 0.25;
    const c2 = Math.pow(this.beta - this.params.a, 3);

    const diff = q * c1 - c2;
    return this.beta + (diff >= 0.0 ? Math.cbrt(diff) : -Math.cbrt(-diff));
  }

  mean(): number {
    const {a, b} = this.params;
    return (a + b) * 0.5;
  }

  variance(): number {
    const {a, b} = this.params;
    return (3.0 * Math.pow(b - a, 2)) / 20.0;
  }

  mode(): number {
    return this.params.a;
  }

  skewness(): number {
    return 0.0;
  }
}
