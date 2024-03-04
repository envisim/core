import {TArrayLike} from '@envisim/matrix';

import {
  Distribution,
  Interval,
  checkArrayLikeOrNumber,
  checkRandomNumber,
} from './distribution.js';
import {
  ILocationScaleParams,
  IRandomOptions,
  IShapeScaleParams,
  locationScaleCheck,
  locationScaleDefault,
  locationScaleNormalize,
  randomOptionsDefault,
  shapeScaleCheck,
  shapeScaleDefault,
} from './types.js';

class Logistic extends Distribution<ILocationScaleParams> {
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
      const check = support.checkPDF(y);
      if (check !== null) return check;
      const exp = Math.exp(-locationScaleNormalize(y, params));
      return exp / (params.scale * Math.pow(exp + 1.0, 2));
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
        1.0 / (1.0 + Math.exp(-locationScaleNormalize(y, params)))
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
        params.location - params.scale * Math.log(1.0 / y - 1.0)
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

  /** @see {@link logistic} */
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
    Logistic.checkParameters(params);
    this.params.scale = params.scale;
    this.params.location = params.location;
  }

  mean(): number {
    return this.params.location;
  }

  variance(): number {
    const {scale} = this.params;
    return Math.pow(scale * Math.PI, 2) / 3.0;
  }

  mode(): number {
    return this.params.location;
  }

  skewness(): number {
    return 0.0;
  }
}

/**
 * The Logistic distribution
 * @see {@link ILocationScaleParams}
 *
 * @example
 * const params = { location: 2, scale: 1 };
 * const x = new Logistic(2, 1);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * Logistic.pdf(0.1, params);
 * Logistic.quantile([0.1, 0.5], params);
 *
 * @param location - {@link ILocationScaleParams.location}
 * @param scale - {@link ILocationScaleParams.scale}
 * @returns `new Logistic(location, scale)`.
 * @group Distributions
 */
const logistic = (
  location: number = locationScaleDefault.location,
  scale: number = locationScaleDefault.scale,
): Logistic => {
  return new Logistic(location, scale);
};

export {Logistic, logistic};

class LogLogistic extends Distribution<IShapeScaleParams> {
  /** @internal */
  static checkParameters(params: IShapeScaleParams): Interval {
    shapeScaleCheck(params);
    return new Interval(0.0, Infinity, false, true);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: IShapeScaleParams = {...shapeScaleDefault},
  ): T {
    const support = this.checkParameters(params);
    const c = params.shape / params.scale;
    const shapem1 = params.shape - 1.0;

    const pdf = (y: number) => {
      const frac = y / params.scale;
      const pow = Math.pow(frac, shapem1);
      return support.checkPDF(y) ?? (c * pow) / Math.pow(1.0 + pow * frac, 2);
    };

    return (checkArrayLikeOrNumber(x) ? x.map(pdf) : pdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.cdf}
   * @group Static methods
   */
  static cdf<T extends number | TArrayLike>(
    x: T,
    params: IShapeScaleParams = {...shapeScaleDefault},
  ): T {
    const support = this.checkParameters(params);

    const cdf = (y: number) => {
      return (
        support.checkCDF(y) ??
        1.0 / (1.0 + Math.pow(y / params.scale, -params.shape))
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
    params: IShapeScaleParams = {...shapeScaleDefault},
  ): T {
    const support = this.checkParameters(params);
    const c = 1.0 / params.shape;

    const quantile = (y: number) => {
      return (
        support.checkQuantile(y) ?? params.scale * Math.pow(y / (1.0 - y), c)
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
    params: IShapeScaleParams = {...shapeScaleDefault},
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    checkRandomNumber(n);
    const u = rand.floatArray(n);
    return this.quantile(u, params);
  }

  protected params: IShapeScaleParams = {...shapeScaleDefault};

  /** @see {@link logLogistic} */
  constructor(
    scale: number = shapeScaleDefault.scale,
    shape: number = shapeScaleDefault.shape,
  ) {
    super();
    this.setParameters({scale, shape});
    return this;
  }

  setParameters(params: IShapeScaleParams = {...shapeScaleDefault}): void {
    LogLogistic.checkParameters(params);
    this.params.scale = params.scale;
    this.params.shape = params.shape;
  }

  mean(): number {
    const {scale, shape} = this.params;
    if (shape <= 1) return NaN;
    const frac = Math.PI / shape;
    return (scale * frac) / Math.sin(frac);
  }

  variance(): number {
    const {scale, shape} = this.params;
    if (shape <= 2) return NaN;
    const frac = Math.PI / shape;
    return (
      Math.pow(scale, 2) *
      frac *
      (2 / Math.sin(2 * frac) - frac / Math.pow(Math.sin(frac), 2))
    );
  }

  mode(): number {
    const {scale, shape} = this.params;
    if (shape <= 1.0) return 0.0;
    return scale * Math.pow((shape - 1) / (shape + 1), 1 / shape);
  }

  skewness(): number {
    // Not implemented
    return NaN;
  }
}

/**
 * The Log-Logistic distribution
 * @see {@link IShapeScaleParams}
 *
 * @example
 * const params = { scale: 1, shape: 2 };
 * const x = new LogLogistic(1, 2);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * LogLogistic.pdf(0.1, params);
 * LogLogistic.quantile([0.1, 0.5], params);
 *
 * @param scale - {@link IShapeScaleParams.scale}
 * @param shape - {@link IShapeScaleParams.shape}
 * @returns `new LogLogistic(scale, shape)`.
 * @group Distributions
 */
const logLogistic = (
  scale: number = shapeScaleDefault.scale,
  shape: number = shapeScaleDefault.shape,
): LogLogistic => {
  return new LogLogistic(scale, shape);
};

export {LogLogistic, logLogistic};
