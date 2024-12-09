/** @group Parameter interfaces */
export type ParamsBernoulli = number;
export const bernoulliDefault: ParamsBernoulli = 0.5;
/** @ignore */
export function bernoulliCheck(p: ParamsBernoulli): asserts p is ParamsBernoulli {
  if (p <= 0.0 || 1.0 <= p) {
    throw new RangeError('p must be in (0,1)');
  }
}

/** @group Parameter interfaces */
export interface ParamsBeta {
  /** @defaultValue 1.0 */
  alpha: number;
  /** @defaultValue 1.0 */
  beta: number;
}
export const betaDefault = {alpha: 1.0, beta: 1.0};

/** @group Parameter interfaces */
export interface ParamsBinomial {
  /** @defaultValue 0.5 */
  p: number;
  /** @defaultValue 10 */
  n: number;
}
export const binomialDefault: ParamsBinomial = {p: 0.5, n: 10};
/** @ignore */
export function binomialCheck(params: ParamsBinomial): asserts params is ParamsBinomial {
  if (params.p <= 0.0 || 1.0 <= params.p) {
    throw new RangeError('p must be in (0,1)');
  } else if (!Number.isInteger(params.n)) {
    throw new RangeError('n must be integer');
  } else if (params.n < 1) {
    throw new RangeError('n must be at least 1');
  }
}

/** @group Parameter interfaces */
export interface ParamsBound {
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
export const boundDefault: ParamsBound = {a: 0.0, b: 1.0};
/** @ignore */
export function boundCheck(params: ParamsBound): asserts params is ParamsBound {
  if (params.b <= params.a) {
    throw new RangeError('a must be smaller than b');
  }
}

/** @group Parameter interfaces */
export interface ParamsBoundMid extends ParamsBound {
  /**
   * Mid point
   * @defaultValue 0.5
   */
  mid: number;
}
export const boundMidDefault: ParamsBoundMid = {mid: 0.5, ...boundDefault};
/** @ignore */
export function boundMidCheck(params: ParamsBoundMid): asserts params is ParamsBoundMid {
  boundCheck(params);
  if (params.mid < params.a || params.b < params.mid) {
    throw new RangeError('mid must be in [a, b]');
  }
}

export type ParamsDegreesOfFreedom = number;
export type ParamsDegreesOfFreedom2 = [ParamsDegreesOfFreedom, ParamsDegreesOfFreedom];
export const degreesOfFreedomDefault = 2;
/** @ignore */
export function degreesOfFreedomCheck(
  df: ParamsDegreesOfFreedom,
): asserts df is ParamsDegreesOfFreedom {
  if (!Number.isInteger(df) || df < 1) {
    throw new RangeError('df must be an integer larger than 0');
  }
}

/** @group Parameter interfaces */
export interface ParamsLocationScale {
  /** @defaultValue 0.0 */
  location: number;
  /** @defaultValue 1.0 */
  scale: number;
}
export const locationScaleDefault: ParamsLocationScale = {
  location: 0.0,
  scale: 1.0,
};
/** @ignore */
export function locationScaleNormalize(x: number, params: ParamsLocationScale): number {
  return (x - params.location) / params.scale;
}
/** @ignore */
export function locationScaleCheck(
  params: ParamsLocationScale,
): asserts params is ParamsLocationScale {
  if (params.scale <= 0.0) {
    throw new RangeError('scale must be in (0, Inf)');
  }
}

/** @group Parameter interfaces */
export type ParamsRate = number;
export const rateDefault: ParamsRate = 1.0;
/** @ignore */
export function rateCheck(rate: ParamsRate): asserts rate is ParamsRate {
  if (rate <= 0.0) {
    throw new RangeError('rate must be larger than 0');
  }
}

/** @group Parameter interfaces */
export interface ParamsShapeScale {
  /** @defaultValue 1.0 */
  shape: number;
  /** @defaultValue 1.0 */
  scale: number;
}
export const shapeScaleDefault: ParamsShapeScale = {
  shape: 1.0,
  scale: 1.0,
};
/** @ignore */
export function shapeScaleCheck(params: ParamsShapeScale): asserts params is ParamsShapeScale {
  if (params.shape <= 0) {
    throw new RangeError('shape must be in (0, Inf)');
  } else if (params.scale <= 0) {
    throw new RangeError('scale must be in (0, Inf)');
  }
}
