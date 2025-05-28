import { ValidationError } from "@envisim/utils";
import {
  Distribution,
  Interval,
  type RandomOptions,
  RANDOM_OPTIONS_DEFAULT,
  quantileCF,
  cornishFisherExpansion,
} from "../abstract-distribution.js";
import { stdNormalQuantile } from "../continuous/normal-utils.js";
import { regularizedUpperGammaFunction } from "../gamma-utils.js";
import { RateParams } from "../params.js";
import { logFactorial } from "../utils.js";
import { randomPoisson } from "./poisson-random.js";

/**
 * @category Discrete distributions
 */
export class Poisson extends Distribution {
  /** @internal */
  #params!: RateParams;

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
  constructor(rate?: number) {
    super();
    this.#params = new RateParams(rate);
    this.support = new Interval(0, Infinity, false, true);
  }

  /** @internal */
  get params() {
    return this.#params;
  }

  pdf(x: number): number {
    const lrate = Math.log(this.params.rate);
    return this.support.checkPDFInt(x) ?? Math.exp(x * lrate - this.params.rate - logFactorial(x));
  }

  cdf(x: number, eps: number = 1e-12): number {
    const xl = (x | 0) + 1;
    return this.support.checkCDFInt(x) ?? regularizedUpperGammaFunction(xl, this.params.rate, eps);
  }

  quantile(q: number, eps: number = 1e-12): number {
    const check = this.support.checkQuantile(q);
    if (check !== null) return check;

    const z = stdNormalQuantile(q);
    const x = cornishFisherExpansion.call(this, z) | 0;
    const cdf = regularizedUpperGammaFunction(x + 1, this.params.rate, eps);
    return quantileCF.call(this, q, x, cdf);
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    n |= 0;
    ValidationError.checkNumber("number-not-positive", "n", n)?.cast();
    return randomPoisson(n, this.params.rate, options.rand);
  }

  mean(): number {
    return this.params.rate;
  }

  variance(): number {
    return this.params.rate;
  }

  mode(): number {
    return Math.ceil(this.params.rate) - 1;
  }

  skewness(): number {
    return Math.pow(this.params.rate, -0.5);
  }
}
