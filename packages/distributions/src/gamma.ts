import {TArrayLike} from '@envisim/matrix';

import {
  checkArrayLikeOrNumber,
  checkRandomNumber,
  Distribution,
  Interval,
} from './distribution.js';
import {randomShapeGamma} from './gamma-random.js';
import {
  gammaQuantile,
  logGammaFunction,
  regularizedLowerGammaFunction,
} from './gamma-utils.js';
import {
  IRandomOptions,
  IShapeScaleParams,
  randomOptionsDefault,
  shapeScaleCheck,
  shapeScaleDefault,
} from './types.js';

class Gamma extends Distribution<IShapeScaleParams> {
  /** @internal */
  static checkParameters(params: IShapeScaleParams): Interval {
    shapeScaleCheck(params);
    return new Interval(0, Infinity, true, true);
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
    let {shape, scale} = params;
    const c = logGammaFunction(shape) + shape * Math.log(scale);
    shape -= 1.0;

    const pdf = (y: number) => {
      return (
        support.checkPDF(y) ?? Math.exp(shape * Math.log(y) - y / scale - c)
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
    const lgf = logGammaFunction(params.shape);

    const cdf = (y: number) => {
      return (
        support.checkCDF(y) ??
        regularizedLowerGammaFunction(params.shape, y / params.scale, lgf)
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
    const lgf = logGammaFunction(params.shape);

    const quantile = (y: number) => {
      return (
        support.checkQuantile(y) ??
        gammaQuantile(y, params.shape, params.scale, lgf)
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
    this.checkParameters(params);
    checkRandomNumber(n);
    const {shape, scale} = params;
    return randomShapeGamma(n, shape, rand, scale);
  }

  protected params: IShapeScaleParams = {...shapeScaleDefault};

  /** @see {@link gamma} */
  constructor(
    shape: number = shapeScaleDefault.shape,
    scale: number = shapeScaleDefault.scale,
  ) {
    super();
    this.setParameters({shape, scale});
    return this;
  }

  setParameters(params: IShapeScaleParams = {...shapeScaleDefault}): void {
    Gamma.checkParameters(params);
    this.params.shape = params.shape;
    this.params.scale = params.scale;
  }

  mean(): number {
    const {shape, scale} = this.params;
    return shape * scale;
  }

  variance(): number {
    const {shape, scale} = this.params;
    return shape * Math.pow(scale, 2);
  }

  mode(): number {
    const {shape, scale} = this.params;
    if (shape < 1.0) return 0.0;
    return (shape - 1.0) * scale;
  }

  skewness(): number {
    return 2 / Math.sqrt(this.params.shape);
  }
}

/**
 * The Gamma distribution
 * @see {@link IShapeScaleParams}
 *
 * @example
 * const params = { shape: 1, scale: 1 };
 * const x = new ChiSquared(1, 1);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * Gamma.pdf(0.1, params);
 * Gamma.quantile([0.1, 0.5], params);
 *
 * @param shape - {@link IShapeScaleParams.shape}
 * @param scale - {@link IShapeScaleParams.scale}
 * @returns `new Gamma(shape, scale)`.
 * @group Distributions
 */
const gamma = (
  shape: number = shapeScaleDefault.shape,
  scale: number = shapeScaleDefault.scale,
): Gamma => {
  return new Gamma(shape, scale);
};

export {Gamma, gamma};
