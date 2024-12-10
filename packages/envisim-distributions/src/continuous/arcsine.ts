import {Distribution, Interval} from '../abstract-distribution.js';
import {HALF_PI, HALF_PI_INV} from '../math-constants.js';
import {ParamsBound, boundCheck, boundDefault} from '../params.js';

export class Arcsine extends Distribution<ParamsBound> {
  protected params = {...boundDefault};
  protected range!: number;

  /**
   * The Arcsine distribution
   *
   * @example
   * const x = new Arcsine(1, 1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   */
  constructor(a: number = boundDefault.a, b: number = boundDefault.b) {
    super();
    this.setParameters({a, b});
    return this;
  }

  setParameters(params = {...boundDefault}): void {
    boundCheck(params);
    this.support = new Interval(params.a, params.b, false, false);
    this.params.a = params.a;
    this.params.b = params.b;
    this.range = params.b - params.a;
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
      HALF_PI_INV * Math.asin(Math.sqrt((x - this.params.a) / this.range))
    );
  }

  quantile(q: number): number {
    return (
      this.support.checkQuantile(q) ??
      Math.pow(Math.sin(q * HALF_PI), 2) * this.range + this.params.a
    );
  }

  mean(): number {
    const {a, b} = this.params;
    return (a + b) / 2.0;
  }

  variance(): number {
    const {a, b} = this.params;
    return Math.pow(b - a, 2) * 0.125;
  }

  mode(): number {
    return this.params.a;
  }

  skewness(): number {
    return 0.0;
  }
}
