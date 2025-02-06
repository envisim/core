import {
  Distribution,
  Interval,
  type RandomOptions,
  randomOptionsDefault,
} from '../abstract-distribution.js';
import {stdNormalQuantile} from '../continuous/normal-utils.js';
import {regularizedUpperGammaFunction} from '../gamma-utils.js';
import {type ParamsRate, rateCheck, rateDefault} from '../params.js';
import {assertPositiveInteger, logFactorial} from '../utils.js';
import {randomPoisson} from './poisson-random.js';

export class Poisson extends Distribution<ParamsRate> {
  protected params: ParamsRate = rateDefault;

  /**
   * The Poisson distribution
   *
   * @example
   * const x = new Poisson(1);
   * x.pdf(2);
   * x.cdf(2);
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
    const lrate = Math.log(this.params);
    return this.support.checkPDFInt(x) ?? Math.exp(x * lrate - this.params - logFactorial(x));
  }

  cdf(x: number, eps: number = 1e-12): number {
    const xl = (x | 0) + 1;
    return this.support.checkCDFInt(x) ?? regularizedUpperGammaFunction(xl, this.params, eps);
  }

  quantile(q: number, eps: number = 1e-12): number {
    const check = this.support.checkQuantile(q);
    if (check !== null) return check;

    const z = stdNormalQuantile(q);
    const x = this.cornishFisherExpansion(z) | 0;
    const cdf = regularizedUpperGammaFunction(x + 1, this.params, eps);
    return this.quantileCF(q, x, cdf);
  }

  override random(n: number = 1, {rand = randomOptionsDefault.rand}: RandomOptions = {}): number[] {
    assertPositiveInteger(n);
    return randomPoisson(n, this.params, rand);
  }

  mean(): number {
    return this.params;
  }

  variance(): number {
    return this.params;
  }

  mode(): number {
    return Math.ceil(this.params) - 1;
  }

  skewness(): number {
    return Math.pow(this.params, -0.5);
  }
}
