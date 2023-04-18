import {TArrayLike} from '@envisim/matrix';
import {
  checkArrayLikeOrNumber,
  Distribution,
  Interval,
} from './distribution.js';
import {
  logGammaFunction,
  regularizedLowerGammaFunction,
} from './gamma-utils.js';
import {Gamma} from './gamma.js';
import {df1Check, df1Default, IDf1Params, IRandomOptions} from './types.js';

class ChiSquared extends Distribution<IDf1Params> {
  /** @internal */
  static checkParameters(params: IDf1Params): Interval {
    df1Check(params);
    return new Interval(0, Infinity, params.df === 1, true);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: IDf1Params = {...df1Default},
  ): T {
    const support = this.checkParameters(params);
    let dfHalf = params.df * 0.5;
    const c = dfHalf * Math.LN2 + logGammaFunction(dfHalf);
    dfHalf -= 1.0;

    const pdf = (y: number) => {
      return (
        support.checkPDF(y) ?? Math.exp(dfHalf * Math.log(y) - y * 0.5 - c)
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
    params: IDf1Params = {...df1Default},
  ): T {
    const support = this.checkParameters(params);
    const dfHalf = params.df * 0.5;

    const cdf = (y: number) => {
      return (
        support.checkCDF(y) ?? regularizedLowerGammaFunction(dfHalf, y * 0.5)
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
    params: IDf1Params = {...df1Default},
  ): T {
    this.checkParameters(params);
    return Gamma.quantile(q, {shape: params.df * 0.5, scale: 2.0});
  }

  /**
   * {@inheritDoc Arcsine.random}
   * @group Static methods
   */
  static random(
    n: number = 1,
    params: IDf1Params = {...df1Default},
    options: IRandomOptions = {},
  ): number[] {
    this.checkParameters(params);
    return Gamma.random(n, {shape: params.df * 0.5, scale: 2.0}, options);
  }

  protected params: IDf1Params = {...df1Default};

  /** @see {@link chiSquared} */
  constructor(df: number = df1Default.df) {
    super();
    this.setParameters({df});
    return this;
  }

  setParameters(params: IDf1Params = {...df1Default}): void {
    ChiSquared.checkParameters(params);
    this.params.df = params.df;
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

/**
 * The Chi-squared distribution
 * @see {@link IDf1Params}
 *
 * @example
 * const params = { df: 10 };
 * const x = new ChiSquared(10);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * ChiSquared.pdf(0.1, params);
 * ChiSquared.quantile([0.1, 0.5], params);
 *
 * @param df - {@link IDf1Params.df}
 * @returns `new ChiSquared(df)`.
 * @group Distributions
 */
const chiSquared = (df: number = df1Default.df): ChiSquared => {
  return new ChiSquared(df);
};

export {ChiSquared, chiSquared};
