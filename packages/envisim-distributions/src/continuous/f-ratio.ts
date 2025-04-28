import {
  Distribution,
  Interval,
  type RandomOptions,
  RANDOM_OPTIONS_DEFAULT,
} from "../abstract-distribution.js";
import { BetaParams } from "../beta-utils.js";
import { DegreesOfFreedomParams } from "../params.js";
import { assertPositiveInteger } from "../utils.js";
import { randomBeta } from "./beta-random.js";

/**
 * @category Continuous distributions
 */
export class FRatio extends Distribution {
  /** @internal */
  #params!: [DegreesOfFreedomParams, DegreesOfFreedomParams];
  /** @internal */
  #beta!: BetaParams;

  /**
   * The F distribution
   *
   * @example
   * const x = new FRatio(10, 20);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(df1?: number, df2?: number) {
    super();
    this.#params = [new DegreesOfFreedomParams(df1), new DegreesOfFreedomParams(df2)];
    this.#beta = new BetaParams(this.#params[0].df * 0.5, this.#params[1].df * 0.5);
    this.support = new Interval(0, Infinity, this.#params[0].df === 1, true);
  }

  /** @internal */
  get params() {
    return this.#params;
  }

  pdf(x: number): number {
    const dfFrac = this.params[0].df / this.params[1].df;
    const c = this.#beta.alpha * Math.log(dfFrac) - this.#beta.logBetaFunction();
    const dfHalfSum = this.#beta.alpha + this.#beta.beta;

    return (
      this.support.checkPDF(x) ??
      Math.exp(c + (this.#beta.alpha - 1.0) * Math.log(x) - dfHalfSum * Math.log1p(dfFrac * x))
    );
  }

  cdf(x: number, eps: number = 1e-20): number {
    const dfx = this.params[0].df * x;

    return (
      this.support.checkCDF(x) ??
      this.#beta.regularizedBetaFunction(dfx / (dfx + this.params[1].df), eps)
    );
  }

  quantile(q: number): number {
    const dfFrac = this.params[1].df / this.params[0].df;
    const beta = new BetaParams(this.#params[1].df * 0.5, this.#params[0].df * 0.5);

    return (
      this.support.checkQuantile(q) ??
      (1.0 / beta.inverseRegularizedBetaFunction(1.0 - q, this.#beta.logBetaFunction()) - 1.0) *
        dfFrac
    );
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    assertPositiveInteger(n);
    const dfFrac = this.params[1].df / this.params[0].df;
    return randomBeta(n, this.#beta, options.rand).map((x) => (x / (1.0 - x)) * dfFrac);
  }

  mean(): number {
    const df2 = this.params[1].df;
    if (df2 <= 2) return Infinity;
    return df2 / (df2 - 2);
  }

  variance(): number {
    const df1 = this.params[0].df;
    const df2 = this.params[1].df;
    if (df2 <= 2) return NaN;
    if (df2 <= 4) return Infinity;
    return ((2 * (df1 + df2 - 2)) / (df1 * (df2 - 4))) * Math.pow(df2 / (df2 - 2), 2);
  }

  mode(): number {
    const df1 = this.params[0].df;
    const df2 = this.params[1].df;
    if (df1 <= 2) return 0.0;
    return ((df1 - 2) * df2) / (df1 * (df2 + 2));
  }

  skewness(): number {
    const df1 = this.params[0].df;
    const df2 = this.params[1].df;
    if (df2 <= 6) return NaN;
    return ((2 * df1 + df2 - 2) / (df2 - 6)) * Math.sqrt((8 * (df2 - 4)) / (df1 * (df1 + df2 - 2)));
  }
}
