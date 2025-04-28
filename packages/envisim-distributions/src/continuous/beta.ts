import {
  Distribution,
  Interval,
  type RandomOptions,
  RANDOM_OPTIONS_DEFAULT,
} from "../abstract-distribution.js";
import { BetaParams } from "../params.js";
import { assertPositiveInteger } from "../utils.js";
import { randomBeta } from "./beta-random.js";

/**
 * @category Continuous distributions
 */
export class Beta extends Distribution {
  /** @internal */
  #params!: BetaParams;

  /**
   * The Beta distribution
   *
   * @example
   * const x = new Beta(1, 1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.1)
   * x.random(10);
   */
  constructor(alpha?: number, beta?: number) {
    super();
    this.#params = new BetaParams(alpha, beta);
    this.support = new Interval(0.0, 1.0, false, false);
  }

  /** @internal */
  get params() {
    return this.#params;
  }

  pdf(x: number): number {
    const alpha = this.params.alpha - 1.0;
    const beta = this.params.beta - 1.0;

    return (
      this.support.checkPDF(x) ??
      Math.exp(alpha * Math.log(x) + beta * Math.log(1.0 - x) - this.params.logBetaFunction())
    );
  }

  cdf(x: number, eps: number = 1e-20): number {
    return this.support.checkCDF(x) ?? this.params.regularizedBetaFunction(x, eps);
  }

  quantile(q: number, eps: number = 1e-20): number {
    return this.support.checkQuantile(q) ?? this.params.inverseRegularizedBetaFunction(q, eps);
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    assertPositiveInteger(n);
    return randomBeta(n, this.params, options.rand);
  }

  mean(): number {
    const { alpha, beta } = this.params;
    return alpha / (alpha + beta);
  }

  variance(): number {
    const { alpha, beta } = this.params;
    return (alpha * beta) / (Math.pow(alpha + beta, 2) * (alpha + beta + 1));
  }

  mode(): number {
    const { alpha, beta } = this.params;
    if (alpha <= 1.0) return 0.0;
    if (alpha > 1.0 && beta <= 1.0) return 1.0;
    return (alpha - 1) / (alpha + beta - 2);
  }

  skewness(): number {
    const { alpha, beta } = this.params;
    return (
      ((2 * (beta - alpha)) / (alpha + beta + 2)) * Math.sqrt((alpha + beta + 1) / (alpha * beta))
    );
  }
}

/**
 * @category Continuous distributions
 */
export class BetaPrime extends Distribution {
  /** @internal */
  #params!: BetaParams;

  /**
   * The Beta Prime distribution
   *
   * @example
   * const x = new BetaPrime(1, 1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.1)
   * x.random(10);
   */
  constructor(alpha?: number, beta?: number) {
    super();
    this.#params = new BetaParams(alpha, beta);
    this.support = new Interval(0.0, Infinity, false, true);
  }

  /** @internal */
  get params() {
    return this.#params;
  }

  pdf(x: number): number {
    const check = this.support.checkPDF(x);
    if (check !== null) return check;

    const beta = this.params.alpha + this.params.beta;
    const alpha = this.params.alpha - 1.0;

    if (x === 0.0)
      return alpha === 0.0 ? Math.exp(-beta * Math.log1p(x) - this.params.logBetaFunction()) : 0.0;

    return Math.exp(alpha * Math.log(x) - beta * Math.log1p(x) - this.params.logBetaFunction());
  }

  cdf(x: number, eps: number = 1e-20): number {
    return this.support.checkCDF(x) ?? this.params.regularizedBetaFunction(x / (1 + x), eps);
  }

  quantile(q: number, eps: number = 1e-20): number {
    const check = this.support.checkQuantile(q);
    if (check !== null) return check;
    const inv = this.params.inverseRegularizedBetaFunction(q, eps);
    return inv / (1.0 - inv);
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    assertPositiveInteger(n);
    return randomBeta(n, this.params, options.rand).map((v) => v / (1.0 - v));
  }

  mean(): number {
    const { alpha, beta } = this.params;
    if (beta <= 1) return Infinity;
    return alpha / (beta - 1);
  }

  variance(): number {
    const { alpha, beta } = this.params;
    if (beta <= 2) return Infinity;
    return (alpha * (alpha + beta - 1)) / ((beta - 2) * Math.pow(beta - 1, 2));
  }

  mode(): number {
    const { alpha, beta } = this.params;
    if (alpha < 1.0) return 0.0;
    return (alpha - 1) / (beta + 1);
  }

  skewness(): number {
    const { alpha, beta } = this.params;
    if (beta <= 3) return Infinity;
    return (
      ((2 * (2 * alpha + beta - 1)) / (beta - 3)) *
      Math.sqrt((beta - 2) / (alpha * (alpha + beta - 1)))
    );
  }
}
