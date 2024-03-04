import {TArrayLike} from '@envisim/matrix';

import {
  Distribution,
  Interval,
  checkArrayLikeOrNumber,
  checkRandomNumber,
} from './distribution.js';
import {
  IBoundParams,
  IRandomOptions,
  boundCheck,
  boundDefault,
  randomOptionsDefault,
} from './types.js';

class Arcsine extends Distribution<IBoundParams> {
  /** @internal */
  static checkParameters(params: IBoundParams): Interval {
    boundCheck(params);
    return new Interval(params.a, params.b, false, false);
  }

  /**
   * The probability density/mass function evaluated at `x`.
   * @param x - the argument of the pdf.
   * @param params - parameters of the distribution.
   * @returns a number or array of numbers, type dependent on the input of `x`.
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: IBoundParams = {...boundDefault},
  ): T {
    const support = this.checkParameters(params);

    const pdf = (y: number) => {
      const check = support.checkPDF(y);
      if (check !== null) return check;
      if (y === params.a || y === params.b) return Infinity;

      return 1.0 / (Math.PI * Math.sqrt((y - params.a) * (params.b - y)));
    };

    return (checkArrayLikeOrNumber(x) ? x.map(pdf) : pdf(x)) as T;
  }

  /**
   * The cumulative distribution function evaluated at `x`.
   * @param x - the argument of the cdf.
   * @param params - parameters of the distribution.
   * @returns a number or array of numbers, type dependent on the input of `x`.
   * @group Static methods
   */
  static cdf<T extends number | TArrayLike>(
    x: T,
    params: IBoundParams = {...boundDefault},
  ): T {
    const support = this.checkParameters(params);
    const c = 2.0 / Math.PI;
    const range = params.b - params.a;

    const cdf = (y: number) => {
      return (
        support.checkCDF(y) ?? c * Math.asin(Math.sqrt((y - params.a) / range))
      );
    };

    return (checkArrayLikeOrNumber(x) ? x.map(cdf) : cdf(x)) as T;
  }

  /**
   * The quantile function evaluated at `q`.
   * @param q - the argument of the quantile function.
   * @param params - parameters of the distribution.
   * @returns a number or array of numbers, type dependent on the input of `x`.
   * @group Static methods
   */
  static quantile<T extends number | TArrayLike>(
    q: T,
    params: IBoundParams = {...boundDefault},
  ): T {
    const support = this.checkParameters(params);
    const c = Math.PI * 0.5;
    const range = params.b - params.a;

    const quantile = (y: number) => {
      return (
        support.checkQuantile(y) ??
        Math.pow(Math.sin(y * c), 2) * range + params.a
      );
    };

    return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
  }

  /**
   * Random values of the distribution.
   * @param n - the number of observations to be generated.
   * @param params - parameters of the distribution.
   * @param options - Available: `rand`
   * @returns the random values.
   * @group Static methods
   */
  static random(
    n: number = 1,
    params: IBoundParams = {...boundDefault},
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    checkRandomNumber(n);
    const u = rand.floatArray(n);
    return this.quantile(u, params);
  }

  protected params: IBoundParams = {...boundDefault};

  /** @see {@link arcsine} */
  constructor(a: number = boundDefault.a, b: number = boundDefault.b) {
    super();
    this.setParameters({a, b});
    return this;
  }

  setParameters(params: IBoundParams = {...boundDefault}): void {
    Arcsine.checkParameters(params);
    this.params.a = params.a;
    this.params.b = params.b;
  }

  mean(): number {
    const {a, b} = this.params;
    return (a + b) / 2.0;
  }

  variance(): number {
    const {a, b} = this.params;
    return Math.pow(b - a, 2) * 0.125;
  }

  mode(): number {
    return this.params.a;
  }

  skewness(): number {
    return 0.0;
  }
}

/**
 * The Arcsine distribution
 * @see {@link IBoundParams}
 *
 * @example
 * const params = { a: 1, b: 1 };
 * const x = new Arcsine(1, 1);
 * x.pdf(0.1);
 * x.quantile([0.1, 0.5])
 * Arcsine.pdf(0.1, params);
 * Arcsine.quantile([0.1, 0.5], params);
 *
 * @param a - {@link IBoundParams.a}
 * @param b - {@link IBoundParams.b}
 * @returns `new Arcsine(a, b)`.
 * @group Distributions
 */
const arcsine = (
  a: number = boundDefault.a,
  b: number = boundDefault.b,
): Arcsine => {
  return new Arcsine(a, b);
};

export {Arcsine, arcsine};
