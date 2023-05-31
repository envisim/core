import {TArrayLike} from '@envisim/matrix';

import {
  checkArrayLikeOrNumber,
  checkRandomNumber,
  Distribution,
  Interval,
} from './distribution.js';
import {
  boundCheck,
  boundDefault,
  IBoundParams,
  IRandomOptions,
  randomOptionsDefault,
} from './types.js';

class UQuadratic extends Distribution<IBoundParams> {
  /** @internal */
  static checkParameters(params: IBoundParams): Interval {
    boundCheck(params);
    return new Interval(params.a, params.b, false, false);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: IBoundParams = {...boundDefault},
  ): T {
    const support = this.checkParameters(params);
    const alpha = 12.0 / Math.pow(params.b - params.a, 3);
    const beta = (params.a + params.b) * 0.5;

    const pdf = (y: number) => {
      return support.checkPDF(y) ?? alpha * Math.pow(y - beta, 2);
    };

    return (checkArrayLikeOrNumber(x) ? x.map(pdf) : pdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.cdf}
   * @group Static methods
   */
  static cdf<T extends number | TArrayLike>(
    x: T,
    params: IBoundParams = {...boundDefault},
  ): T {
    const support = this.checkParameters(params);
    const beta = (params.a + params.b) * 0.5;
    const c1 = 4.0 / Math.pow(params.b - params.a, 3);
    const c2 = Math.pow(beta - params.a, 3);

    const cdf = (y: number) => {
      return support.checkCDF(y) ?? c1 * (c2 + Math.pow(y - beta, 3));
    };

    return (checkArrayLikeOrNumber(x) ? x.map(cdf) : cdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.quantile}
   * @group Static methods
   */
  static quantile<T extends number | TArrayLike>(
    q: T,
    params: IBoundParams = {...boundDefault},
  ): T {
    const support = this.checkParameters(params);
    const c1 = Math.pow(params.b - params.a, 3) * 0.25;
    const beta = (params.a + params.b) * 0.5;
    const c2 = Math.pow(beta - params.a, 3);

    const quantile = (y: number) => {
      const check = support.checkQuantile(y);
      if (check !== null) return check;
      const diff = y * c1 - c2;
      return beta + (diff >= 0.0 ? Math.cbrt(diff) : -Math.cbrt(-diff));
    };

    return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
  }

  /**
   * {@inheritDoc Arcsine.random}
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

  /** @see {@link uQuadratic} */
  constructor(a: number = boundDefault.a, b: number = boundDefault.b) {
    super();
    this.setParameters({a, b});
    return this;
  }

  setParameters(params: IBoundParams = {...boundDefault}): void {
    UQuadratic.checkParameters(params);
    this.params.a = params.a;
    this.params.b = params.b;
  }

  mean(): number {
    const {a, b} = this.params;
    return (a + b) * 0.5;
  }

  variance(): number {
    const {a, b} = this.params;
    return (3.0 * Math.pow(b - a, 2)) / 20.0;
  }

  mode(): number {
    return this.params.a;
  }

  skewness(): number {
    return 0.0;
  }
}

/**
 * The U-Quadratic distribution
 * @see {@link IBoundParams}
 *
 * @example
 * const params = { a: 0, b: 1 };
 * const x = new UQuadratic(0, 1);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * UQuadratic.pdf(0.1, params);
 * UQuadratic.quantile([0.1, 0.5], params);
 *
 * @param a - {@link IBoundParams.a}
 * @param b - {@link IBoundParams.b}
 * @returns `new Uquadratic(a, b)`.
 * @group Distributions
 */
const uQuadratic = (
  a: number = boundDefault.a,
  b: number = boundDefault.b,
): UQuadratic => {
  return new UQuadratic(a, b);
};

export {UQuadratic, uQuadratic};
