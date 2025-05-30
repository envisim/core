import { ValidationError } from "@envisim/utils";
import {
  Distribution,
  Interval,
  type RandomOptions,
  RANDOM_OPTIONS_DEFAULT,
} from "../abstract-distribution.js";
import { logGammaFunction, regularizedLowerGammaFunction } from "../gamma-utils.js";
import { DegreesOfFreedomParams, ShapeScaleParams } from "../params.js";
import { gammaQuantile } from "./gamma-quantile.js";
import { randomShapeGamma } from "./gamma-random.js";

/**
 * @category Continuous distributions
 */
export class ChiSquared extends Distribution {
  /** @internal */
  #params!: DegreesOfFreedomParams;
  /** @internal */
  #gamma!: ShapeScaleParams;

  /**
   * The Chi-squared distribution
   *
   * @example
   * const x = new ChiSquared(10);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(df?: number) {
    super();
    this.#params = new DegreesOfFreedomParams(df);
    this.#gamma = new ShapeScaleParams(this.#params.df * 0.5, 2.0);
    this.support = new Interval(0, Infinity, this.#params.df === 1, true);
  }

  /** @internal */
  get params() {
    return this.#params;
  }

  pdf(x: number): number {
    const dfHalf = this.params.df * 0.5;
    const c = dfHalf * Math.LN2 + logGammaFunction(dfHalf);
    return this.support.checkPDF(x) ?? Math.exp((dfHalf - 1.0) * Math.log(x) - x * 0.5 - c);
  }

  cdf(x: number, eps: number = 1e-12): number {
    const dfHalf = this.params.df * 0.5;
    return this.support.checkCDF(x) ?? regularizedLowerGammaFunction(dfHalf, x * 0.5, eps);
  }

  quantile(q: number, eps: 1e-12): number {
    const dfHalf = this.params.df * 0.5;
    return (
      this.support.checkQuantile(q) ??
      gammaQuantile.call(this.#gamma, q, eps, logGammaFunction(dfHalf))
    );
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    n |= 0;
    ValidationError.check["number-not-positive"]({ arg: "n" }, n)?.raise();
    return randomShapeGamma(n, this.#gamma.shape, options.rand, this.#gamma.scale);
  }

  mean(): number {
    return this.params.df;
  }

  variance(): number {
    return this.params.df * 2;
  }

  mode(): number {
    return Math.max(this.params.df - 2, 0.0);
  }

  skewness(): number {
    return Math.sqrt(8 / this.params.df);
  }
}
