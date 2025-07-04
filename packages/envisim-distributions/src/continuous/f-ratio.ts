import { ValidationError } from "@envisim/utils";
import {
  Distribution,
  type RandomOptions,
  RANDOM_OPTIONS_DEFAULT,
} from "../abstract-distribution.js";
import { BetaParams } from "../beta-utils.js";
import { DegreesOfFreedomParams } from "../params.js";
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
    this.support = {
      interval: [0, Infinity],
      ends: this.#params[0].df === 1 ? "open" : "right-open",
    };
  }

  /** @internal */
  get params() {
    return this.#params;
  }

  override pdf(x: number): number {
    const dfFrac = this.params[0].df / this.params[1].df;
    const c = this.#beta.alpha * Math.log(dfFrac) - this.#beta.logBetaFunction();
    const dfHalfSum = this.#beta.alpha + this.#beta.beta;

    return (
      super.pdf(x) ??
      Math.exp(c + (this.#beta.alpha - 1.0) * Math.log(x) - dfHalfSum * Math.log1p(dfFrac * x))
    );
  }

  override cdf(x: number, eps: number = 1e-20): number {
    const dfx = this.params[0].df * x;

    return super.cdf(x) ?? this.#beta.regularizedBetaFunction(dfx / (dfx + this.params[1].df), eps);
  }

  override quantile(q: number): number {
    const dfFrac = this.params[1].df / this.params[0].df;
    const beta = new BetaParams(this.#params[1].df * 0.5, this.#params[0].df * 0.5);

    return (
      super.quantile(q) ??
      (1.0 / beta.inverseRegularizedBetaFunction(1.0 - q, this.#beta.logBetaFunction()) - 1.0) *
        dfFrac
    );
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    n |= 0;
    ValidationError.check["number-not-positive"]({ arg: "n" }, n)?.raise();
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
