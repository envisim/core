import {TArrayLike} from '@envisim/matrix';
import {
  checkArrayLikeOrNumber,
  checkRandomNumber,
  Distribution,
  Interval,
} from './distribution.js';
import {
  IRandomOptions,
  IShapeScaleParams,
  randomOptionsDefault,
  shapeScaleCheck,
  shapeScaleDefault,
} from './types.js';

class Pareto extends Distribution<IShapeScaleParams> {
  /** @internal */
  static checkParameters(params: IShapeScaleParams): Interval {
    shapeScaleCheck(params);
    return new Interval(params.scale, Infinity, false, true);
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
    const c = Math.log(params.shape) + params.shape * Math.log(params.scale);
    const shape = params.shape + 1.0;

    const pdf = (y: number) => {
      return support.checkPDF(y) ?? Math.exp(c - shape * Math.log(y));
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
        support.checkCDF(y) ?? 1.0 - Math.pow(params.scale / y, params.shape)
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
      return support.checkQuantile(y) ?? params.scale / Math.pow(1.0 - y, c);
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

  /** @see {@link pareto} */
  constructor(
    scale: number = shapeScaleDefault.scale,
    shape: number = shapeScaleDefault.shape,
  ) {
    super();
    this.setParameters({scale, shape});
    return this;
  }

  setParameters(params: IShapeScaleParams = {...shapeScaleDefault}): void {
    Pareto.checkParameters(params);
    this.params.scale = params.scale;
    this.params.shape = params.shape;
  }

  mean(): number {
    const {scale, shape} = this.params;
    if (shape <= 1.0) return Infinity;
    return (shape / (shape - 1.0)) * scale;
  }

  variance(): number {
    const {scale, shape} = this.params;
    if (shape <= 2.0) return Infinity;
    return (Math.pow(scale / (shape - 1.0), 2) * shape) / (shape - 2.0);
  }

  mode(): number {
    return this.params.scale;
  }

  skewness(): number {
    const {shape} = this.params;
    if (shape <= 3.0) return NaN;
    return (
      ((2.0 * (1.0 + shape)) / (shape - 3.0)) * Math.sqrt((shape - 2.0) / shape)
    );
  }
}

/**
 * The Pareto distribution
 * @see {@link IShapeScaleParams}
 *
 * @example
 * const params = { scale: 1, shape: 2 };
 * const x = new Pareto(1, 2);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * Pareto.pdf(0.1, params);
 * Pareto.quantile([0.1, 0.5], params);
 *
 * @param scale - {@link IShapeScaleParams.scale}
 * @param shape - {@link IShapeScaleParams.shape}
 * @returns `new Pareto(base)`.
 * @group Distributions
 */
const pareto = (
  scale: number = shapeScaleDefault.scale,
  shape: number = shapeScaleDefault.shape,
): Pareto => {
  return new Pareto(scale, shape);
};

export {Pareto, pareto};
