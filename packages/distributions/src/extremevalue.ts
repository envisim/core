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
import {EULERSCONSTANT, RIEMANNZETAFUN3} from './utils-consts.js';

class ExtremeValue extends Distribution<ILocationScaleParams> {
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

    const pdf = (y: number) => {
      const exp = Math.exp(-locationScaleNormalize(y, params));
      return support.checkPDF(y) ?? (exp * Math.exp(-exp)) / params.scale;
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
    this.checkParameters(params);
    const support = this.checkParameters(params);

    const cdf = (y: number) => {
      return (
        support.checkCDF(y) ??
        Math.exp(-Math.exp(-locationScaleNormalize(y, params)))
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
        params.location - Math.log(-Math.log(y)) * params.scale
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

  /** @see {@link extremeValue} */
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
    ExtremeValue.checkParameters(params);
    this.params.scale = params.scale;
    this.params.location = params.location;
  }

  mean(): number {
    const {location, scale} = this.params;
    return location + scale * EULERSCONSTANT;
  }

  variance(): number {
    const {scale} = this.params;
    return Math.pow(scale * Math.PI, 2) / 6.0;
  }

  mode(): number {
    return this.params.location;
  }

  skewness(): number {
    return (12 * Math.sqrt(6) * RIEMANNZETAFUN3) / Math.pow(Math.PI, 3);
  }
}

/**
 * The Extreme Value distribution
 * @see {@link ILocationScaleParams}
 *
 * @example
 * const params = { location: 0, scale: 1 };
 * const x = new ExtremeValue(0, 1);
 * x.pdf(1);
 * x.quantile([0.1, 0.5])
 * ExtremeValue.pdf(1, params);
 * ExtremeValue.quantile([0.1, 0.5], params);
 *
 * @param location - {@link ILocationScaleParams.location}
 * @param scale - {@link ILocationScaleParams.scale}
 * @returns `new ExtremeValue(location, scale)`.
 * @group Distributions
 */
const extremeValue = (
  location: number = locationScaleDefault.location,
  scale: number = locationScaleDefault.scale,
): ExtremeValue => {
  return new ExtremeValue(location, scale);
};

export {ExtremeValue, extremeValue};
