import {
  Distribution,
  Interval,
  type RandomOptions,
  randomOptionsDefault,
} from '../abstract-distribution.js';
import {
  type ParamsDegreesOfFreedom2,
  degreesOfFreedomCheck,
  degreesOfFreedomDefault,
} from '../params.js';
import {assertPositiveInteger} from '../utils.js';
import {randomBeta} from './beta-random.js';
import {
  inverseRegularizedBetaFunction,
  logBetaFunction,
  regularizedBetaFunction,
} from './beta-utils.js';

export class FRatio extends Distribution<ParamsDegreesOfFreedom2> {
  protected params: ParamsDegreesOfFreedom2 = [degreesOfFreedomDefault, degreesOfFreedomDefault];

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
  constructor(df1: number = degreesOfFreedomDefault, df2: number = degreesOfFreedomDefault) {
    super();
    this.setParameters([df1, df2]);
    return this;
  }

  setParameters(
    params: ParamsDegreesOfFreedom2 = [degreesOfFreedomDefault, degreesOfFreedomDefault],
  ): void {
    degreesOfFreedomCheck(params[0]);
    degreesOfFreedomCheck(params[1]);
    this.support = new Interval(0, Infinity, params[0] === 1, true);
    this.params[0] = params[0];
    this.params[1] = params[1];
  }

  pdf(x: number): number {
    const dfFrac = this.params[0] / this.params[1];
    const df1Half = this.params[0] * 0.5;
    const df2Half = this.params[1] * 0.5;
    const c = df1Half * Math.log(dfFrac) - logBetaFunction({alpha: df1Half, beta: df2Half});
    const dfHalfSum = df1Half + df2Half;

    return (
      this.support.checkPDF(x) ??
      Math.exp(c + (df1Half - 1.0) * Math.log(x) - dfHalfSum * Math.log1p(dfFrac * x))
    );
  }

  cdf(x: number, eps: number = 1e-20): number {
    const df1Half = this.params[0] * 0.5;
    const df2Half = this.params[1] * 0.5;
    const dfx = this.params[0] * x;

    return (
      this.support.checkCDF(x) ??
      regularizedBetaFunction(dfx / (dfx + this.params[1]), {alpha: df1Half, beta: df2Half}, eps)
    );
  }

  quantile(q: number): number {
    const dfFrac = this.params[1] / this.params[0];
    const df1Half = this.params[0] * 0.5;
    const df2Half = this.params[1] * 0.5;
    const betaParams = {alpha: df2Half, beta: df1Half};
    const lbf = logBetaFunction(betaParams);

    return (
      this.support.checkQuantile(q) ??
      (1.0 / inverseRegularizedBetaFunction(1.0 - q, betaParams, lbf) - 1.0) * dfFrac
    );
  }

  override random(n: number = 1, {rand = randomOptionsDefault.rand}: RandomOptions = {}): number[] {
    assertPositiveInteger(n);
    const dfFrac = this.params[1] / this.params[0];
    const betaParams = {alpha: this.params[0] * 0.5, beta: this.params[1] * 0.5};
    return randomBeta(n, betaParams, rand).map((x) => (x / (1.0 - x)) * dfFrac);
  }

  mean(): number {
    const df2 = this.params[1];
    if (df2 <= 2) return Infinity;
    return df2 / (df2 - 2);
  }

  variance(): number {
    const [df1, df2] = this.params;
    if (df2 <= 2) return NaN;
    if (df2 <= 4) return Infinity;
    return ((2 * (df1 + df2 - 2)) / (df1 * (df2 - 4))) * Math.pow(df2 / (df2 - 2), 2);
  }

  mode(): number {
    const [df1, df2] = this.params;
    if (df1 <= 2) return 0.0;
    return ((df1 - 2) * df2) / (df1 * (df2 + 2));
  }

  skewness(): number {
    const [df1, df2] = this.params;
    if (df2 <= 6) return NaN;
    return ((2 * df1 + df2 - 2) / (df2 - 6)) * Math.sqrt((8 * (df2 - 4)) / (df1 * (df1 + df2 - 2)));
  }
}
