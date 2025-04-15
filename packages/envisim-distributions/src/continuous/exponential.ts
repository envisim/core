import { randomArray } from "@envisim/random";
import {
  Distribution,
  Interval,
  type RandomOptions,
  randomOptionsDefault,
} from "../abstract-distribution.js";
import { type ParamsRate, rateCheck, rateDefault } from "../params.js";

export class Exponential extends Distribution<ParamsRate> {
  protected params = rateDefault;

  /**
   * The Exponential distribution
   *
   * @example
   * const x = new Exponential(1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(rate: number = rateDefault) {
    super();
    this.setParameters(rate);
    return this;
  }

  setParameters(rate: ParamsRate = rateDefault): void {
    rateCheck(rate);
    this.support = new Interval(0, Infinity, false, true);
    this.params = rate;
  }

  pdf(x: number): number {
    return this.support.checkPDF(x) ?? this.params * Math.exp(-this.params * x);
  }

  cdf(x: number): number {
    return this.support.checkCDF(x) ?? 1.0 - Math.exp(-this.params * x);
  }

  quantile(q: number): number {
    return this.support.checkQuantile(q) ?? -Math.log(1.0 - q) / this.params;
  }

  override random(
    n: number = 1,
    { rand = randomOptionsDefault.rand }: RandomOptions = randomOptionsDefault,
  ): number[] {
    return randomArray(n, rand).map((e) => -Math.log(1.0 - e) / this.params);
  }

  mean(): number {
    return 1.0 / this.params;
  }

  variance(): number {
    return 1.0 / Math.pow(this.params, 2);
  }

  mode(): number {
    return 0.0;
  }

  skewness(): number {
    return 2;
  }
}
