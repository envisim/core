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

class Cauchy extends Distribution<ILocationScaleParams> {
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
    const c = Math.PI * params.scale;

    const pdf = (y: number) => {
      return (
        support.checkPDF(y) ??
        1.0 / (c * (1.0 + Math.pow(locationScaleNormalize(y, params), 2)))
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
      return (
        support.checkCDF(y) ??
        0.5 + Math.atan(locationScaleNormalize(y, params)) / Math.PI
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
    params: ILocationScaleParams = {...locationScaleDefault},
  ): T {
    const support = this.checkParameters(params);

    const quantile = (y: number) => {
      return (
        support.checkQuantile(y) ??
        params.location + params.scale * Math.tan(Math.PI * (y - 0.5))
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
    params: ILocationScaleParams = {...locationScaleDefault},
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    checkRandomNumber(n);
    const u = rand.floatArray(n);
    return this.quantile(u, params);
  }

  protected params: ILocationScaleParams = {...locationScaleDefault};

  /** @see {@link cauchy} */
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
    Cauchy.checkParameters(params);
    this.params.scale = params.scale;
    this.params.location = params.location;
  }

  mean(): number {
    return NaN;
  }

  variance(): number {
    return NaN;
  }

  mode(): number {
    return this.params.location;
  }

  skewness(): number {
    return NaN;
  }
}

/**
 * The Cauchy distribution
 * @see {@link ILocationScaleParams}
 *
 * @example
 * const params = { location: 1, scale: 1 };
 * const x = new Cauchy(1, 1);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * Cauchy.pdf(0.1, params);
 * Cauchy.quantile([0.1, 0.5], params);
 *
 * @param location - {@link ILocationScaleParams.location}
 * @param scale - {@link ILocationScaleParams.scale}
 * @returns `new Cauchy(location, scale)`.
 * @group Distributions
 */
const cauchy = (
  location: number = locationScaleDefault.location,
  scale: number = locationScaleDefault.scale,
): Cauchy => {
  return new Cauchy(location, scale);
};

export {Cauchy, cauchy};
