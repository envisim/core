import {Random} from '@envisim/random';

import {EPS} from './utils-consts.js';

export interface IRandomOptions {
  /**
   * An instance of {@link random.Random}
   * @defaultValue `new Random()`
   */
  rand?: Random;
  /**
   * Epsilon, used during comparisons of floats
   * @defaultValue `1e-12`
   */
  eps?: number;
  method?: string;
}
/** @internal */
export const randomOptionsDefault: {rand: Random; eps: number} = {
  rand: new Random(),
  eps: EPS,
};

/** @group Parameter interfaces */
export interface IBenfordMantissaParams {
  /** @defaultValue 10 */
  base: number;
}
export const benfordMantissaDefault: IBenfordMantissaParams = {base: 10};

/** @group Parameter interfaces */
export interface IBernoulliParams {
  /** @defaultValue 0.0 */
  p: number;
}
export const bernoulliDefault: IBernoulliParams = {p: 0.5};
/** @ignore */
export const bernoulliCheck = (params: IBernoulliParams): void => {
  if (params.p <= 0.0 || 1.0 <= params.p)
    throw new RangeError('p must be in (0,1)');
};

/** @group Parameter interfaces */
export interface IBetaParams {
  /** @defaultValue 1.0 */
  alpha: number;
  /** @defaultValue 1.0 */
  beta: number;
}
export const betaDefault = {alpha: 1.0, beta: 1.0};

/** @group Parameter interfaces */
export interface IBinomialParams extends IBernoulliParams {
  /** @defaultValue 10 */
  n: number;
}
export const binomialDefault: IBinomialParams = {n: 10, ...bernoulliDefault};
/** @ignore */
export const binomialCheck = (params: IBinomialParams): void => {
  bernoulliCheck({p: params.p});
  if (!Number.isInteger(params.n)) throw new TypeError('n must be integer');
  if (params.n < 1) throw new RangeError('n must be at least 1');
};

/** @group Parameter interfaces */
export interface IBoundParams {
  /**
   * Left bound
   * @defaultValue 0.0
   */
  a: number;
  /**
   * Right bound
   * @defaultValue 1.0
   */
  b: number;
}
export const boundDefault: IBoundParams = {a: 0.0, b: 1.0};
/** @ignore */
export const boundCheck = (params: IBoundParams): void => {
  if (params.b <= params.a) throw new RangeError('a must be smaller than b');
  if (!Number.isFinite(params.a) || !Number.isFinite(params.a))
    throw new RangeError('a and b must be finite');
};

/** @group Parameter interfaces */
export interface IBoundMidParams extends IBoundParams {
  /**
   * Mid point
   * @defaultValue 0.5
   */
  mid: number;
}
export const boundMidDefault: IBoundMidParams = {mid: 0.5, ...boundDefault};
/** @ignore */
export const boundMidCheck = (params: IBoundMidParams): void => {
  boundCheck({a: params.a, b: params.b});
  if (params.mid < params.a || params.b < params.mid)
    throw new RangeError('mid must be in [a, b]');
};

/** @group Parameter interfaces */
export interface IDf1Params {
  /** @defaultValue 2 */
  df: number;
}
export const df1Default = {df: 2};
/** @ignore */
export const df1Check = (params: IDf1Params): void => {
  if (!Number.isInteger(params.df) || params.df < 1)
    throw new RangeError('df must be an integer larger than 0');
};

/** @group Parameter interfaces */
export interface IDf2Params {
  /** @defaultValue 2 */
  df1: number;
  /** @defaultValue 2 */
  df2: number;
}
export const df2Default = {df1: 2, df2: 2};
/** @ignore */
export const df2Check = (params: IDf2Params): void => {
  if (!Number.isInteger(params.df1) || params.df1 < 1)
    throw new RangeError('df1 must be an integer larger than 0');
  if (!Number.isInteger(params.df2) || params.df2 < 1)
    throw new RangeError('df1 must be an integer larger than 0');
};

/** @group Parameter interfaces */
export interface IHypergeometricParams {
  /**
   * Population size
   *   @defaultValue 20
   */
  N: number;
  /**
   * Size of marked population
   * @defaultValue 5
   */
  K: number;
  /**
   * Sample size
   * @defaultValue 10
   */
  n: number;
}
export const hypergeometricDefault: IHypergeometricParams = {
  N: 20,
  K: 5,
  n: 10,
};

/** @group Parameter interfaces */
export interface ILocationScaleParams {
  /** @defaultValue 0.0 */
  location: number;
  /** @defaultValue 1.0 */
  scale: number;
}
export const locationScaleDefault: ILocationScaleParams = {
  location: 0.0,
  scale: 1.0,
};
/** @ignore */
export const locationScaleNormalize = (
  x: number,
  params: ILocationScaleParams,
): number => {
  return (x - params.location) / params.scale;
};
/** @ignore */
export const locationScaleCheck = (params: ILocationScaleParams): void => {
  if (!Number.isFinite(params.location))
    throw new RangeError('location must be finite');
  if (!Number.isFinite(params.scale) || params.scale <= 0)
    throw new RangeError('scale must be in (0,Inf)');
};

/** @group Parameter interfaces */
export interface INormalParams {
  /** @defaultValue 0.0 */
  mu: number;
  /** @defaultValue 1.0 */
  sigma: number;
}
/** @ignore */
const normalToLocation = (params: INormalParams): ILocationScaleParams => {
  return {location: params.mu, scale: params.sigma};
};
export const normalDefault: INormalParams = {
  mu: 0.0,
  sigma: 1.0,
};
/** @ignore */
export const normalNormalize = (x: number, params: INormalParams) =>
  locationScaleNormalize(x, normalToLocation(params));
/** @ignore */
export const normalCheck = (params: INormalParams): void =>
  locationScaleCheck(normalToLocation(params));

/** @group Parameter interfaces */
export interface IRateParams {
  /** @defaultValue 1.0 */
  rate: number;
}
export const rateDefault: IRateParams = {rate: 1.0};
/** @ignore */
export const rateCheck = (params: IRateParams): void => {
  if (params.rate <= 0.0 || !Number.isFinite(params.rate))
    throw new RangeError('rate must be larger than 0');
};

/** @group Parameter interfaces */
export interface IRadiusParams {
  /** @defaultValue 1.0 */
  radius: number;
}
export const radiusDefault: IRadiusParams = {radius: 1.0};
/** @ignore */
export const radiusCheck = (params: IRadiusParams): void => {
  if (params.radius <= 0.0 || !Number.isFinite(params.radius))
    throw new RangeError('rate must be larger than 0');
};

/** @group Parameter interfaces */
export interface IShapeScaleParams {
  /** @defaultValue 1.0 */
  shape: number;
  /** @defaultValue 1.0 */
  scale: number;
}
export const shapeScaleDefault: IShapeScaleParams = {
  shape: 1.0,
  scale: 1.0,
};
/** @ignore */
export const shapeScaleCheck = ({shape, scale}: IShapeScaleParams): void => {
  if (!Number.isFinite(shape) || shape <= 0)
    throw new RangeError('shape must be in (0, Inf)');
  if (!Number.isFinite(scale) || scale <= 0)
    throw new RangeError('scale must be in (0, Inf)');
};
