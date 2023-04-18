import {TArrayLike} from '@envisim/matrix';
import {
  inverseRegularizedBetaFunction,
  logBetaFunction,
  regularizedBetaFunction,
} from './beta-utils.js';
import {Beta} from './beta.js';
import {
  checkArrayLikeOrNumber,
  Distribution,
  Interval,
} from './distribution.js';
import {
  df2Check,
  df2Default,
  IDf2Params,
  IRandomOptions,
  randomOptionsDefault,
} from './types.js';

class FRatio extends Distribution<IDf2Params> {
  /** @internal */
  static checkParameters(params: IDf2Params): Interval {
    df2Check(params);
    return new Interval(0, Infinity, params.df1 === 1, true);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: IDf2Params = {...df2Default},
  ): T {
    const support = this.checkParameters(params);
    const dfFrac = params.df1 / params.df2;
    let df1Half = params.df1 * 0.5;
    const df2Half = params.df2 * 0.5;
    const c = df1Half * Math.log(dfFrac) - logBetaFunction(df1Half, df2Half);
    const dfHalfSum = df1Half + df2Half;
    df1Half -= 1.0;

    const pdf = (y: number) => {
      return (
        support.checkPDF(y) ??
        Math.exp(c + df1Half * Math.log(y) - dfHalfSum * Math.log1p(dfFrac * y))
      );
    };

    return (checkArrayLikeOrNumber(x) ? x.map(pdf) : pdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.cdf}
   * @group Static methods
   */
  static cdf<T extends number | TArrayLike>(
    x: T,
    params: IDf2Params = {...df2Default},
  ): T {
    const support = this.checkParameters(params);
    const df1Half = params.df1 * 0.5;
    const df2Half = params.df2 * 0.5;

    const cdf = (y: number) => {
      const dfx = params.df1 * y;
      return (
        support.checkCDF(y) ??
        regularizedBetaFunction(dfx / (dfx + params.df2), df1Half, df2Half)
      );
    };

    return (checkArrayLikeOrNumber(x) ? x.map(cdf) : cdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.quantile}
   * @group Static methods
   */
  static quantile<T extends number | TArrayLike>(
    q: T,
    params: IDf2Params = {...df2Default},
  ): T {
    const support = this.checkParameters(params);
    const dfFrac = params.df2 / params.df1;
    const df1Half = params.df1 * 0.5;
    const df2Half = params.df2 * 0.5;
    const lbf = logBetaFunction(df2Half, df1Half);

    const quantile = (y: number) => {
      return (
        support.checkQuantile(y) ??
        (1.0 / inverseRegularizedBetaFunction(1.0 - y, df2Half, df1Half, lbf) -
          1.0) *
          dfFrac
      );
    };

    return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
  }

  /**
   * {@inheritDoc Arcsine.random}
   * @group Static methods
   */
  static random(
    n: number = 1,
    params: IDf2Params = {...df2Default},
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    this.checkParameters(params);
    // checkRandomNumber(n);
    const dfFrac = params.df2 / params.df1;
    const x = Beta.random(
      n,
      {alpha: params.df1 / 2.0, beta: params.df2 / 2.0},
      {rand},
    );
    return x.map((e) => (e / (1.0 - e)) * dfFrac);
  }

  protected params: IDf2Params = {...df2Default};

  /** @see {@link fRatio} */
  constructor(df1: number = df2Default.df1, df2: number = df2Default.df2) {
    super();
    this.setParameters({df1, df2});
    return this;
  }

  setParameters(params: IDf2Params = {...df2Default}): void {
    FRatio.checkParameters(params);
    this.params.df1 = params.df1;
    this.params.df2 = params.df2;
  }

  mean(): number {
    const {df2} = this.params;
    if (df2 <= 2) return Infinity;
    return df2 / (df2 - 2);
  }

  variance(): number {
    const {df1, df2} = this.params;
    if (df2 <= 2) return NaN;
    if (df2 <= 4) return Infinity;
    return (
      ((2 * (df1 + df2 - 2)) / (df1 * (df2 - 4))) * Math.pow(df2 / (df2 - 2), 2)
    );
  }

  mode(): number {
    const {df1, df2} = this.params;
    if (df1 <= 2) return 0.0;
    return ((df1 - 2) * df2) / (df1 * (df2 + 2));
  }

  skewness(): number {
    const {df1, df2} = this.params;
    if (df2 <= 6) return NaN;
    return (
      ((2 * df1 + df2 - 2) / (df2 - 6)) *
      Math.sqrt((8 * (df2 - 4)) / (df1 * (df1 + df2 - 2)))
    );
  }
}

/**
 * The F distribution
 * @see {@link IDf2Params}
 *
 * @example
 * const params = { df1: 10, df2: 20 };
 * const x = new FRatio(10, 20);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * FRatio.pdf(0.1, params);
 * FRatio.quantile([0.1, 0.5], params);
 *
 * @param df1 - {@link IDf2Params.df1}
 * @param df2 - {@link IDf2Params.df2}
 * @returns `new FRatio(df1, df2)`.
 * @group Distributions
 */
const fRatio = (
  df1: number = df2Default.df1,
  df2: number = df2Default.df2,
): FRatio => {
  return new FRatio(df1, df2);
};

export {FRatio, fRatio};
