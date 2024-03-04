import {TArrayLike} from '@envisim/matrix';

import {
  Distribution,
  Interval,
  checkArrayLikeOrNumber,
  checkRandomNumber,
} from './distribution.js';
import {gammaFunction} from './gamma-utils.js';
import {
  IRandomOptions,
  IShapeScaleParams,
  randomOptionsDefault,
  shapeScaleCheck,
  shapeScaleDefault,
} from './types.js';

class Weibull extends Distribution<IShapeScaleParams> {
  /** @internal */
  static checkParameters(params: IShapeScaleParams): Interval {
    shapeScaleCheck(params);
    return new Interval(0, Infinity, false, true);
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
    const c1 = Math.log(params.shape);
    const c2 = Math.log(params.scale) * params.shape;
    const shapem1 = params.shape - 1.0;
    const zeroval =
      params.shape === 1.0 ? 1.0 : params.shape < 1.0 ? Infinity : 0.0;

    const pdf = (y: number) => {
      const check = support.checkPDF(y);
      if (check !== null) return check;
      if (y === 0.0) return zeroval;
      const ly = Math.log(y);
      return Math.exp(
        c1 - c2 + ly * shapem1 - Math.exp(params.shape * ly - c2),
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
    params: IShapeScaleParams = {...shapeScaleDefault},
  ): T {
    const support = this.checkParameters(params);

    const cdf = (y: number) => {
      return (
        support.checkCDF(y) ??
        1.0 - Math.exp(-Math.pow(y / params.scale, params.shape))
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
    const c1 = 1.0 / params.shape;

    const quantile = (y: number) => {
      const check = support.checkQuantile(y);
      if (check !== null) return check;
      if (y === 0.0) return 0.0;
      return params.scale * Math.pow(-Math.log(1.0 - y), c1);
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

  /** @see {@link weibull} */
  constructor(
    scale: number = shapeScaleDefault.scale,
    shape: number = shapeScaleDefault.shape,
  ) {
    super();
    this.setParameters({scale, shape});
    return this;
  }

  setParameters(params: IShapeScaleParams = {...shapeScaleDefault}): void {
    Weibull.checkParameters(params);
    this.params.scale = params.scale;
    this.params.shape = params.shape;
  }

  mean(): number {
    const {scale, shape} = this.params;
    return scale * gammaFunction(1.0 + 1.0 / shape);
  }

  variance(): number {
    const {scale, shape} = this.params;
    return (
      Math.pow(scale, 2) *
      (gammaFunction(1.0 + 2.0 / shape) -
        Math.pow(gammaFunction(1.0 + 1.0 / shape), 2))
    );
  }

  mode(): number {
    const {scale, shape} = this.params;
    if (shape < 1.0) return 0.0;
    return scale * Math.pow(1.0 - 1.0 / shape, 1 / shape);
  }

  skewness(): number {
    const {scale, shape} = this.params;
    const mean = this.mean();
    const vr = this.variance();
    return (
      (gammaFunction(1.0 + 3.0 / shape) * Math.pow(scale, 3) -
        3.0 * mean * vr -
        Math.pow(mean, 3)) /
      (vr * Math.sqrt(vr))
    );
  }
}

/**
 * The Weibull distribution
 * @see {@link IShapeScaleParams}
 *
 * @example
 * const params = { scale: 1, shape: 2 };
 * const x = new Weibull(1, 2);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * Weibull.pdf(0.1, params);
 * Weibull.quantile([0.1, 0.5], params);
 *
 * @param scale - {@link IShapeScaleParams.scale}
 * @param shape - {@link IShapeScaleParams.shape}
 * @returns `new Weibull(scale, shape)`.
 * @group Distributions
 */
const weibull = (
  scale: number = shapeScaleDefault.scale,
  shape: number = shapeScaleDefault.shape,
): Weibull => {
  return new Weibull(scale, shape);
};

export {Weibull, weibull};
