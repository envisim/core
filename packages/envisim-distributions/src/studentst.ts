import {TArrayLike} from '@envisim/matrix';

import {logBetaFunction, regularizedBetaFunction} from './beta-utils.js';
import {Cauchy} from './cauchy.js';
import {ChiSquared} from './chisquared.js';
import {
  Distribution,
  Interval,
  checkArrayLikeOrNumber,
} from './distribution.js';
import {stdNormalQuantile} from './normal-utils.js';
import {Normal} from './normal.js';
import {
  IDf1Params,
  IRandomOptions,
  df1Check,
  df1Default,
  randomOptionsDefault,
} from './types.js';
import {HALFPI} from './utils-consts.js';

class StudentsT extends Distribution<IDf1Params> {
  /** @internal */
  static checkParameters(params: IDf1Params): Interval {
    df1Check(params);
    return new Interval(-Infinity, Infinity, true, true);
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

    if (params.df === 1) return Cauchy.pdf(x, {location: 0.0, scale: 1.0});

    const halfDf = params.df * 0.5;
    const c = -0.5 * Math.log(params.df) - logBetaFunction(0.5, halfDf);
    const df = halfDf + 0.5;

    const pdf = (y: number): number => {
      return (
        support.checkPDF(y) ??
        Math.exp(c - df * Math.log1p(Math.pow(y, 2) / params.df))
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

    if (params.df === 1) return Cauchy.cdf(x, {location: 0.0, scale: 1.0});

    const halfDf = params.df * 0.5;
    const logBeta = logBetaFunction(halfDf, 0.5);

    const cdf = (y: number): number => {
      const check = support.checkCDF(y);
      if (check !== null) return check;
      if (y === 0.0) return 0.5;
      const xt = params.df / (params.df + Math.pow(y, 2));
      const f = regularizedBetaFunction(xt, halfDf, 0.5, logBeta) * 0.5;
      return y < 0 ? f : 1.0 - f;
    };

    return (checkArrayLikeOrNumber(x) ? x.map(cdf) : cdf(x)) as T;
  }

  /*
   * Hill, G. W. (1970).
   * Algorithm 396: Student's t-quantiles.
   * Communications of the ACM, 13(10), 619-620.
   * https://doi.org/10.1145/355598.355600
   */
  /**
   * {@inheritDoc Arcsine.quantile}
   * @group Static methods
   */
  static quantile<T extends number | TArrayLike>(
    q: T,
    params: IDf1Params = {...df1Default},
  ): T {
    const support = this.checkParameters(params);

    if (params.df === 1) {
      const quantile = (y: number) => {
        const x = y * HALFPI;
        return support.checkQuantile(y) ?? Math.cos(x) / Math.sin(x);
      };

      return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
    }

    if (params.df === 2) {
      const quantile = (y: number) => {
        return (
          support.checkQuantile(y) ?? Math.sqrt(2.0 / (y * (2.0 - y)) - 2.0)
        );
      };

      return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
    }

    const a = 1.0 / (params.df - 0.5);
    const b = 48.0 / Math.pow(a, 2);
    const c0 = (((20700.0 * a) / b - 98.0) * a - 16.0) * a + 96.36;
    const d =
      ((94.5 / (b + c0) - 3.0) / b + 1.0) * Math.sqrt(a * HALFPI) * params.df;
    const HALFDFINV = 2.0 / params.df;
    const dfFrac = (params.df + 1.0) / (params.df + 2.0);
    let x1, x2, c: number;

    const quantile = (y: number) => {
      const check = support.checkQuantile(y);
      if (check !== null) return check;
      const y0 = Math.abs(y);

      x1 = d * y0 * 2;
      x2 = Math.pow(x1, HALFDFINV);

      if (x2 > 0.05 + a) {
        x1 = stdNormalQuantile(y0);
        x2 = Math.pow(x1, 2);

        c =
          b +
          (((0.05 * d * x1 - 5.0) * x1 - 7.0) * x1 - 2.0) * x1 +
          (params.df < 5 ? c0 + 0.3 * (params.df - 4.5) * (x1 + 0.6) : c0);
        x2 =
          a *
          Math.pow(
            (((((0.4 * x2 + 6.3) * x2 + 36.0) * x2 + 94.5) / c - x2 - 3.0) / b +
              1.0) *
              x1,
            2,
          );

        x2 = x2 > 0.002 ? Math.expm1(x2) : 0.5 * Math.pow(x2, 2) + x2;
      } else {
        x2 =
          ((1.0 /
            (((params.df + 6.0) / (params.df * x2) - 0.089 * d - 0.822) *
              (params.df + 2.0) *
              3.0) +
            0.5 / (params.df + 4.0)) *
            x2 -
            1.0) *
            dfFrac +
          1.0 / x2;
      }

      const ret = Math.sqrt(params.df * x2);
      return y < 0.5 ? -ret : ret;
    };

    return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
  }

  /**
   * {@inheritDoc Arcsine.random}
   * @group Static methods
   */
  static random(
    n: number = 1,
    params: IDf1Params = {...df1Default},
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    this.checkParameters(params);
    // checkRandomNumber(n);

    const x1 = Normal.random(n, {mu: 0.0, sigma: 1.0}, {rand});
    const x2 = ChiSquared.random(n, params, {rand});

    return x1.map((e, i) => e / Math.sqrt(x2[i] / params.df));
  }

  protected params: IDf1Params = {...df1Default};

  /** @see {@link studentsT} */
  constructor(df: number = df1Default.df) {
    super();
    this.setParameters({df});
    return this;
  }

  setParameters(params: IDf1Params = {...df1Default}): void {
    StudentsT.checkParameters(params);
    this.params.df = params.df;
  }

  mean(): number {
    return 0.0;
  }

  variance(): number {
    const df = this.params.df;
    if (df <= 1) return NaN;
    if (df <= 2) return Infinity;
    return df / (df - 2);
  }

  mode(): number {
    return 0;
  }

  skewness(): number {
    const df = this.params.df;
    if (df <= 3) return NaN;
    return 0.0;
  }
}

/**
 * The Students-T distribution
 * @see {@link IDf1Params}
 *
 * @example
 * const params = { df: 10 };
 * const x = new StudentsT(10);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * StudentsT.pdf(0.1, params);
 * StudentsT.quantile([0.1, 0.5], params);
 *
 * @param df - {@link IDf1Params.df}
 * @returns `new StudentsT(df)`.
 * @group Distributions
 */
const studentsT = (df: number = df1Default.df): StudentsT => {
  return new StudentsT(df);
};

export {StudentsT, studentsT};
