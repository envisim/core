import { ValidationError } from "@envisim/utils";
import {
  Distribution,
  Interval,
  type RandomOptions,
  RANDOM_OPTIONS_DEFAULT,
} from "../abstract-distribution.js";
import { BetaParams } from "../beta-utils.js";
import { RadiusParams } from "../params.js";
import { randomBeta } from "./beta-random.js";

/**
 * @category Continuous distributions
 */
export class Semicircle extends Distribution {
  /** @internal */
  #params!: RadiusParams;
  /** @internal */
  #beta = new BetaParams(1.5, 1.5);

  /**
   * The Semicircle distribution
   *
   * @example
   * const x = new Semicircle(1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(radius?: number) {
    super();
    this.#params = new RadiusParams(radius);
    this.support = new Interval(-this.#params.radius, this.#params.radius, false, false);
  }

  /** @internal */
  get params() {
    return this.#params;
  }

  pdf(x: number): number {
    const { radiusSquared, denom } = this.params;
    return this.support.checkPDF(x) ?? Math.sqrt(radiusSquared - Math.pow(x, 2)) * denom * 2.0;
  }

  cdf(x: number): number {
    const { radius, radiusSquared, denom } = this.params;
    return (
      this.support.checkCDF(x) ??
      0.5 + x * Math.sqrt(radiusSquared - Math.pow(x, 2)) * denom + Math.asin(x / radius) / Math.PI
    );
  }

  quantile(q: number, eps: number = 1e-20): number {
    const { radius } = this.params;
    return (
      this.support.checkQuantile(q) ??
      (this.#beta.inverseRegularizedBetaFunction(q, eps) - 0.5) * 2.0 * radius
    );
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    n |= 0;
    ValidationError.checkNumber("number-not-positive", "n", n)?.cast();

    const { radius } = this.params;
    const c = radius * 2.0;
    return randomBeta(n, this.#beta, options.rand).map((e) => c * (e - 0.5));
  }

  mean(): number {
    return 0.0;
  }

  variance(): number {
    const { radiusSquared } = this.params;
    return radiusSquared * 0.25;
  }

  mode(): number {
    return 0.0;
  }

  skewness(): number {
    return 0;
  }
}
