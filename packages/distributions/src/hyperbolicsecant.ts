import {TArrayLike} from '@envisim/matrix';

import {
  checkArrayLikeOrNumber,
  checkRandomNumber,
  Distribution,
  Interval,
} from './distribution.js';
import {IEmptyParams, IRandomOptions, randomOptionsDefault} from './types.js';
import {sech} from './utils.js';

class HyperbolicSecant extends Distribution<IEmptyParams> {
  /** @internal */
  static checkParameters = new Interval(-Infinity, Infinity, true, true);

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(x: T): T {
    const support = this.checkParameters;
    const c = Math.PI * 0.5;

    const pdf = (y: number) => {
      return support.checkPDF(y) ?? sech(c * y) * 0.5;
    };

    return (checkArrayLikeOrNumber(x) ? x.map(pdf) : pdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.cdf}
   * @group Static methods
   */
  static cdf<T extends number | TArrayLike>(x: T): T {
    const support = this.checkParameters;
    const c = Math.PI * 0.5;

    const cdf = (y: number) => {
      return support.checkCDF(y) ?? Math.atan(Math.exp(c * y)) / c;
    };

    return (checkArrayLikeOrNumber(x) ? x.map(cdf) : cdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.quantile}
   * @group Static methods
   */
  static quantile<T extends number | TArrayLike>(q: T): T {
    const support = this.checkParameters;
    const c = Math.PI * 0.5;

    const quantile = (y: number) => {
      return support.checkQuantile(y) ?? Math.log(Math.tan(y * c)) / c;
    };

    return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
  }

  /**
   * {@inheritDoc Arcsine.random}
   * @group Static methods
   */
  static random(
    n: number = 1,
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    checkRandomNumber(n);
    const u = rand.floatArray(n);
    return this.quantile(u);
  }

  protected params: IEmptyParams = {};

  /** @see {@link hyperbolicSecant} */
  constructor() {
    super();
    return this;
  }

  setParameters(): void {
    return;
  }

  mean(): number {
    return 0.0;
  }

  variance(): number {
    return 1.0;
  }

  mode(): number {
    return 0.0;
  }

  skewness(): number {
    return 0.0;
  }
}

/**
 * The Hyperbolic Secant distribution
 *
 * @example
 * const x = new HyperbolicSecant();
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * BenfordMantissa.pdf(0.1);
 * BenfordMantissa.quantile([0.1, 0.5]);
 *
 * @returns `new HyperbolicSecant()`.
 * @group Distributions
 */
const hyperbolicSecant = (): HyperbolicSecant => {
  return new HyperbolicSecant();
};

export {HyperbolicSecant, hyperbolicSecant};
