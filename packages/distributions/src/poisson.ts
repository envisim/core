import {TArrayLike} from '@envisim/matrix';
import {
  checkArrayLikeOrNumber,
  checkRandomNumber,
  Distribution,
  Interval,
  quantileCF,
} from './distribution.js';
import {regularizedUpperGammaFunction} from './gamma-utils.js';
import {stdNormalQuantile} from './normal-utils.js';
import {randomPoisson} from './poisson-random.js';
import {
  IRandomOptions,
  IRateParams,
  randomOptionsDefault,
  rateCheck,
  rateDefault,
} from './types.js';
import {cornishFisherExpansion, logFactorial} from './utils.js';

class Poisson extends Distribution<IRateParams> {
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
    const lrate = Math.log(params.rate);

    const pdf = (y: number) => {
      return (
        support.checkPDFInt(y) ??
        Math.exp(y * lrate - params.rate - logFactorial(y))
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
    params: IRateParams = {...rateDefault},
  ): T {
    const support = this.checkParameters(params);

    const cdf = (y: number) => {
      const xl = (y | 0) + 1;
      return (
        support.checkCDFInt(y) ?? regularizedUpperGammaFunction(xl, params.rate)
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
    params: IRateParams = {...rateDefault},
  ): T {
    const support = this.checkParameters(params);
    const mean = params.rate;
    const sd = Math.sqrt(params.rate);
    const skew = 1.0 / sd;
    const pdf = (k: number) => this.pdf(k, params);

    const quantile = (y: number) => {
      const check = support.checkQuantile(y);
      if (check !== null) return check;
      const z = stdNormalQuantile(y);
      const x = cornishFisherExpansion(z, mean, sd, skew) | 0;
      const cdf = regularizedUpperGammaFunction(x + 1, params.rate);
      return quantileCF(y, pdf, x, cdf, support);
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
    checkRandomNumber(n);
    return randomPoisson(n, params.rate, rand);
    // const s = new Array(n);
    // for (let i = 0; i < n; i++) s[i] = randomPoisson(params.rate, rand);
    // return s;
  }

  protected params: IRateParams = {...rateDefault};

  /** @see {@link poisson} */
  constructor(rate: number = rateDefault.rate) {
    super();
    this.setParameters({rate});
    return this;
  }

  setParameters(params: IRateParams = {...rateDefault}): void {
    Poisson.checkParameters(params);
    this.params.rate = params.rate;
  }

  mean(): number {
    return this.params.rate;
  }

  variance(): number {
    return this.params.rate;
  }

  mode(): number {
    return Math.ceil(this.params.rate) - 1;
  }

  skewness(): number {
    return Math.pow(this.params.rate, -0.5);
  }
}

/**
 * The Poisson distribution
 * @see {@link IRateParams}
 *
 * @example
 * const params = { rate: 1 };
 * const x = new Poisson(1);
 * x.pdf(2);
 * x.cdf(2);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * Poisson.pdf(0.1, params);
 * Poisson.quantile([0.1, 0.5], params);
 *
 * @param rate - {@link IRateParams.rate}
 * @returns `new Poisson(rate)`.
 * @group Distributions
 */
const poisson = (rate: number = rateDefault.rate): Poisson => {
  return new Poisson(rate);
};

export {Poisson, poisson};
