import {TArrayLike} from '@envisim/matrix';

import {
  Distribution,
  Interval,
  checkArrayLikeOrNumber,
} from './distribution.js';
import {
  IRandomOptions,
  IRateParams,
  randomOptionsDefault,
  rateCheck,
  rateDefault,
} from './types.js';

class Exponential extends Distribution<IRateParams> {
  /** @internal */
  static checkParameters(params: IRateParams): Interval {
    rateCheck(params);
    return new Interval(0, Infinity, false, true);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: IRateParams = {...rateDefault},
  ): T {
    const support = this.checkParameters(params);

    const pdf = (y: number) => {
      return support.checkPDF(y) ?? params.rate * Math.exp(-params.rate * y);
    };

    return (checkArrayLikeOrNumber(x) ? x.map(pdf) : pdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.cdf}
   * @group Static methods
   */
  static cdf<T extends number | TArrayLike>(
    x: T,
    params: IRateParams = {...rateDefault},
  ): T {
    const support = this.checkParameters(params);

    const cdf = (y: number) => {
      return support.checkCDF(y) ?? 1.0 - Math.exp(-params.rate * y);
    };

    return (checkArrayLikeOrNumber(x) ? x.map(cdf) : cdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.quantile}
   * @group Static methods
   */
  static quantile<T extends number | TArrayLike>(
    q: T,
    params: IRateParams = {...rateDefault},
  ): T {
    const support = this.checkParameters(params);

    const quantile = (y: number) => {
      return support.checkQuantile(y) ?? -Math.log(1.0 - y) / params.rate;
    };

    return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
  }

  /**
   * {@inheritDoc Arcsine.random}
   * @group Static methods
   */
  static random(
    n: number = 1,
    params: IRateParams = {...rateDefault},
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    this.checkParameters(params);
    return rand.floatArray(n).map((e) => -Math.log(1.0 - e) / params.rate);
  }

  protected params: IRateParams = {...rateDefault};

  /** @see {@link exponential} */
  constructor(rate: number = rateDefault.rate) {
    super();
    this.setParameters({rate});
    return this;
  }

  setParameters(params: IRateParams = {...rateDefault}): void {
    Exponential.checkParameters(params);
    this.params.rate = params.rate;
  }

  mean(): number {
    return 1.0 / this.params.rate;
  }

  variance(): number {
    return 1.0 / Math.pow(this.params.rate, 2);
  }

  mode(): number {
    return 0.0;
  }

  skewness(): number {
    return 2;
  }
}

/**
 * The Exponential distribution
 * @see {@link IRateParams}
 *
 * @example
 * const params = { rate: 1 };
 * const x = new Exponential(1);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * Exponential.pdf(0.1, params);
 * Exponential.quantile([0.1, 0.5], params);
 *
 * @param rate - {@link IRateParams.rate}
 * @returns `new Exponential(rate)`.
 * @group Distributions
 */
const exponential = (rate = rateDefault.rate): Exponential => {
  return new Exponential(rate);
};

export {Exponential, exponential};
