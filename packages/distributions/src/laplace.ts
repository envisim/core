import {TArrayLike} from '@envisim/matrix';
import {
  checkArrayLikeOrNumber,
  checkRandomNumber,
  Distribution,
  Interval,
} from './distribution.js';
import {
  ILocationScaleParams,
  IRandomOptions,
  locationScaleCheck,
  locationScaleDefault,
  locationScaleNormalize,
  randomOptionsDefault,
} from './types.js';

class Laplace extends Distribution<ILocationScaleParams> {
  /** @internal */
  static checkParameters(params: ILocationScaleParams): Interval {
    locationScaleCheck(params);
    return new Interval(-Infinity, Infinity, true, true);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: ILocationScaleParams = {...locationScaleDefault},
  ): T {
    const support = this.checkParameters(params);
    const c = 0.5 / params.scale;

    const pdf = (y: number) => {
      return (
        support.checkPDF(y) ??
        Math.exp(-Math.abs(locationScaleNormalize(y, params))) * c
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
    params: ILocationScaleParams = {...locationScaleDefault},
  ): T {
    const support = this.checkParameters(params);

    const cdf = (y: number) => {
      const check = support.checkCDF(y);
      if (check !== null) return check;
      const z = locationScaleNormalize(y, params);
      if (y <= params.location) return Math.exp(z) * 0.5;
      return 1 - Math.exp(-z) * 0.5;
    };

    return (checkArrayLikeOrNumber(x) ? x.map(cdf) : cdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.quantile}
   * @group Static methods
   */
  static quantile<T extends number | TArrayLike>(
    q: T,
    params: ILocationScaleParams = {...locationScaleDefault},
  ): T {
    const support = this.checkParameters(params);

    const quantile = (y: number) => {
      const check = support.checkQuantile(y);
      if (check !== null) return check;
      if (y <= 0.5) return params.location + params.scale * Math.log(2.0 * y);
      return params.location - params.scale * Math.log(2.0 * (1.0 - y));
    };

    return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
  }

  /**
   * {@inheritDoc Arcsine.random}
   * @group Static methods
   */
  static random(
    n: number = 1,
    params: ILocationScaleParams = {...locationScaleDefault},
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    checkRandomNumber(n);
    const u = rand.floatArray(n);
    return this.quantile(u, params);
  }

  protected params: ILocationScaleParams = {...locationScaleDefault};

  /** @see {@link laplace} */
  constructor(
    location: number = locationScaleDefault.location,
    scale: number = locationScaleDefault.scale,
  ) {
    super();
    this.setParameters({location, scale});
    return this;
  }

  setParameters(
    params: ILocationScaleParams = {...locationScaleDefault},
  ): void {
    Laplace.checkParameters(params);
    this.params.scale = params.scale;
    this.params.location = params.location;
  }

  mean(): number {
    return this.params.location;
  }

  variance(): number {
    return 2 * Math.pow(this.params.scale, 2);
  }

  mode(): number {
    return this.params.location;
  }

  skewness(): number {
    return 0.0;
  }
}

/**
 * The Laplace distribution
 * @see {@link ILocationScaleParams}
 *
 * @example
 * const params = { location: 1, scale: 1 };
 * const x = new Laplace(1, 1);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * Laplace.pdf(0.1, params);
 * Laplace.quantile([0.1, 0.5], params);
 *
 * @param location - {@link ILocationScaleParams.location}
 * @param scale - {@link ILocationScaleParams.scale}
 * @returns `new Laplace(location, scale)`.
 * @group Distributions
 */
const laplace = (
  location: number = locationScaleDefault.location,
  scale: number = locationScaleDefault.scale,
): Laplace => {
  return new Laplace(location, scale);
};

export {Laplace, laplace};
