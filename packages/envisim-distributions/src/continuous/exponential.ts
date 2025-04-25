import { randomArray } from "@envisim/random";
import {
  Distribution,
  Interval,
  type RandomOptions,
  RANDOM_OPTIONS_DEFAULT,
} from "../abstract-distribution.js";
import { RateParams } from "../params.js";

export class Exponential extends Distribution {
  #params!: RateParams;

  /**
   * The Exponential distribution
   * @see {@link ParamsRate}
   *
   * @example
   * const x = new Exponential(1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(rate?: number) {
    super();
    this.#params = new RateParams(rate);
    this.support = new Interval(0, Infinity, false, true);
  }

  get params() {
    return this.#params;
  }

  pdf(x: number): number {
    return this.support.checkPDF(x) ?? this.params.rate * Math.exp(-this.params.rate * x);
  }

  cdf(x: number): number {
    return this.support.checkCDF(x) ?? 1.0 - Math.exp(-this.params.rate * x);
  }

  quantile(q: number): number {
    return this.support.checkQuantile(q) ?? -Math.log(1.0 - q) / this.params.rate;
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    return randomArray(n, options.rand).map((e) => -Math.log(1.0 - e) / this.params.rate);
  }

  mean(): number {
    return 1.0 / this.params.rate;
  }

  variance(): number {
    return 1.0 / Math.pow(this.params.rate, 2);
  }

  mode(): number {
    return 0.0;
  }

  skewness(): number {
    return 2;
  }
}
