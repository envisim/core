import {TArrayLike} from '@envisim/matrix';

import {inverseRegularizedBetaFunction} from './beta-utils.js';
import {Beta} from './beta.js';
import {
  // checkRandomNumber,
  Distribution,
  Interval, // IDistributionRandomOptions,
  checkArrayLikeOrNumber,
} from './distribution.js';
import {
  IRadiusParams,
  IRandomOptions,
  radiusCheck,
  radiusDefault,
} from './types.js';

class Semicircle extends Distribution<IRadiusParams> {
  /** @internal */
  static checkParameters(params: IRadiusParams): Interval {
    radiusCheck(params);
    return new Interval(-params.radius, params.radius, false, false);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: IRadiusParams = {...radiusDefault},
  ): T {
    const support = this.checkParameters(params);
    const rsq = Math.pow(params.radius, 2);
    const c = 2.0 / (Math.PI * rsq);

    const pdf = (y: number) => {
      return support.checkPDF(y) ?? Math.sqrt(rsq - Math.pow(y, 2)) * c;
    };

    return (checkArrayLikeOrNumber(x) ? x.map(pdf) : pdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.cdf}
   * @group Static methods
   */
  static cdf<T extends number | TArrayLike>(
    x: T,
    params: IRadiusParams = {...radiusDefault},
  ): T {
    const support = this.checkParameters(params);
    const rsq = Math.pow(params.radius, 2);
    const c = 1.0 / (Math.PI * rsq);

    const cdf = (y: number) => {
      return (
        support.checkCDF(y) ??
        0.5 +
          y * Math.sqrt(rsq - Math.pow(y, 2)) * c +
          Math.asin(y / params.radius) / Math.PI
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
    params: IRadiusParams = {...radiusDefault},
  ): T {
    const support = this.checkParameters(params);
    const c = 2.0 * params.radius;

    const quantile = (y: number) => {
      return (
        support.checkQuantile(y) ??
        (inverseRegularizedBetaFunction(y, 1.5, 1.5) - 0.5) * c
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
    params: IRadiusParams = {...radiusDefault},
    options: IRandomOptions = {},
  ): number[] {
    this.checkParameters(params);
    // checkRandomNumber(n);
    const c = params.radius * 2.0;
    return Beta.random(n, {alpha: 1.5, beta: 1.5}, options).map(
      (e) => c * (e - 0.5),
    );
  }

  protected params: IRadiusParams = {...radiusDefault};

  /** @see {@link semicircle} */
  constructor(radius: number = radiusDefault.radius) {
    super();
    this.setParameters({radius});
    return this;
  }

  setParameters(params: IRadiusParams = {...radiusDefault}): void {
    Semicircle.checkParameters(params);
    this.params.radius = params.radius;
  }

  mean(): number {
    return 0.0;
  }

  variance(): number {
    const {radius} = this.params;
    return Math.pow(radius * 0.5, 2);
  }

  mode(): number {
    return 0.0;
  }

  skewness(): number {
    return 0;
  }
}

/**
 * The Semicircle distribution
 * @see {@link IRadiusParams}
 *
 * @example
 * const params = { radius: 1 };
 * const x = new Semicircle(1);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * Semicircle.pdf(0.1, params);
 * Semicircle.quantile([0.1, 0.5], params);
 *
 * @param radius - {@link IRadiusParams.radius}
 * @returns `new Semicircle(radius)`.
 * @group Distributions
 */
const semicircle = (radius = radiusDefault.radius): Semicircle => {
  return new Semicircle(radius);
};

export {Semicircle, semicircle};
