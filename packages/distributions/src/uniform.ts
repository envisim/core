import {TArrayLike} from '@envisim/matrix';

import {
  checkArrayLikeOrNumber,
  checkRandomNumber,
  Distribution,
  Interval,
} from './distribution.js';
import {
  boundCheck,
  boundDefault,
  boundMidCheck,
  boundMidDefault,
  IBoundMidParams,
  IBoundParams,
  IRandomOptions,
  randomOptionsDefault,
} from './types.js';

class Uniform extends Distribution<IBoundParams> {
  /** @internal */
  static checkParameters(params: IBoundParams): Interval {
    boundCheck(params);
    return new Interval(params.a, params.b, false, false);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: IBoundParams = {...boundDefault},
  ): T {
    const support = this.checkParameters(params);
    const c = 1.0 / (params.b - params.a);

    const pdf = (y: number) => {
      return support.checkPDF(y) ?? c;
    };

    return (checkArrayLikeOrNumber(x) ? x.map(pdf) : pdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.cdf}
   * @group Static methods
   */
  static cdf<T extends number | TArrayLike>(
    x: T,
    params: IBoundParams = {...boundDefault},
  ): T {
    const support = this.checkParameters(params);
    const c = 1.0 / (params.b - params.a);

    const cdf = (y: number) => {
      return support.checkCDF(y) ?? (y - params.a) * c;
    };

    return (checkArrayLikeOrNumber(x) ? x.map(cdf) : cdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.quantile}
   * @group Static methods
   */
  static quantile<T extends number | TArrayLike>(
    q: T,
    params: IBoundParams = {...boundDefault},
  ): T {
    const support = this.checkParameters(params);
    const c = params.b - params.a;

    const quantile = (y: number) => {
      return support.checkQuantile(y) ?? params.a + y * c;
    };

    return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
  }

  /**
   * {@inheritDoc Arcsine.random}
   * @group Static methods
   */
  static random(
    n: number = 1,
    params: IBoundParams = {...boundDefault},
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    this.checkParameters(params);
    checkRandomNumber(n);
    const c = params.b - params.a;
    return rand.floatArray(n).map((e) => params.a + c * e);
  }

  protected params: IBoundParams = {...boundDefault};

  /** @see {@link uniform} */
  constructor(a: number = boundDefault.a, b: number = boundDefault.b) {
    super();
    this.setParameters({a, b});
    return this;
  }

  setParameters(params: IBoundParams = {...boundDefault}): void {
    Uniform.checkParameters(params);
    this.params.a = params.a;
    this.params.b = params.b;
  }

  mean(): number {
    const {a, b} = this.params;
    return (a + b) / 2.0;
  }

  variance(): number {
    const {a, b} = this.params;
    return Math.pow(b - a, 2) / 12.0;
  }

  mode(): number {
    return this.params.a;
  }

  skewness(): number {
    return 0.0;
  }
}

/**
 * The Uniform (continuous) distribution
 * @see {@link IBoundParams}
 *
 * @example
 * const params = { a: 0, b: 1 };
 * const x = new Uniform(0, 1);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * Uniform.pdf(0.1, params);
 * Uniform.quantile([0.1, 0.5], params);
 *
 * @param a - {@link IBoundParams.a}
 * @param b - {@link IBoundParams.b}
 * @returns `new Uniform(a, b)`.
 * @group Distributions
 */
const uniform = (
  a: number = boundDefault.a,
  b: number = boundDefault.b,
): Uniform => {
  return new Uniform(a, b);
};

export {Uniform, uniform};

class UniformDiscrete extends Distribution<IBoundParams> {
  /** @internal */
  static checkParameters(params: IBoundParams): Interval {
    boundCheck(params);
    if (!Number.isInteger(params.a)) throw new RangeError('a must be integer');
    if (!Number.isInteger(params.b)) throw new RangeError('b must be integer');
    return new Interval(params.a, params.b, false, false);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: IBoundParams = {...boundDefault},
  ): T {
    const support = this.checkParameters(params);
    const c = 1.0 / (params.b - params.a + 1);

    const pdf = (y: number) => {
      return support.checkPDFInt(y) ?? c;
    };

    return (checkArrayLikeOrNumber(x) ? x.map(pdf) : pdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.cdf}
   * @group Static methods
   */
  static cdf<T extends number | TArrayLike>(
    x: T,
    params: IBoundParams = {...boundDefault},
  ): T {
    const support = this.checkParameters(params);
    const c1 = 1 - params.a;
    const c2 = 1.0 / (params.b + c1);

    const cdf = (y: number) => {
      return support.checkCDFInt(y) ?? (Math.floor(y) + c1) * c2;
    };

    return (checkArrayLikeOrNumber(x) ? x.map(cdf) : cdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.quantile}
   * @group Static methods
   */
  static quantile<T extends number | TArrayLike>(
    q: T,
    params: IBoundParams = {...boundDefault},
  ): T {
    const support = this.checkParameters(params);
    const c1 = 1 - params.a;
    const c2 = params.b + c1;

    const quantile = (y: number) => {
      return support.checkQuantile(y) ?? Math.ceil(y * c2) - c1;
    };

    return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
  }

  /**
   * {@inheritDoc Arcsine.random}
   * @group Static methods
   */
  static random(
    n: number = 1,
    params: IBoundParams = {...boundDefault},
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    this.checkParameters(params);
    checkRandomNumber(n);
    const c = params.b - params.a + 1;
    return rand.floatArray(n).map((e) => params.a + Math.floor(c * e));
  }

  protected params: IBoundParams = {...boundDefault};

  /** @see {@link uniformDiscrete} */
  constructor(a: number = boundDefault.a, b: number = boundDefault.b) {
    super();
    this.setParameters({a, b});
    return this;
  }

  setParameters(params: IBoundParams = {...boundDefault}): void {
    UniformDiscrete.checkParameters(params);
    this.params.a = params.a;
    this.params.b = params.b;
  }

  mean(): number {
    const {a, b} = this.params;
    return (a + b) / 2;
  }

  variance(): number {
    const {a, b} = this.params;
    return (Math.pow(b - a + 1, 2) - 1) / 12;
  }

  mode(): number {
    return this.params.a;
  }

  skewness(): number {
    return 0;
  }
}

/**
 * The Uniform (discrete) distribution
 * @see {@link IBoundParams}
 *
 * @example
 * const params = { a: 0, b: 10 };
 * const x = new UniformDiscrete(0, 10);
 * x.pdf(4);
 * x.cdf(5);
 * x.quantile([0.1, 0.5]);
 * x.random(10);
 * UniformDiscrete.pdf(5, params);
 * UniformDiscrete.quantile([0.1, 0.5], params);
 *
 * @param a - {@link IBoundParams.a}
 * @param b - {@link IBoundParams.b}
 * @returns `new UniformDiscrete(a, b)`.
 * @group Distributions
 */
const uniformDiscrete = (
  a: number = boundDefault.a,
  b: number = boundDefault.b,
): UniformDiscrete => {
  return new UniformDiscrete(a, b);
};

export {UniformDiscrete, uniformDiscrete};

class Triangular extends Distribution<IBoundMidParams> {
  /** @internal */
  static checkParameters(params: IBoundMidParams): Interval {
    boundMidCheck(params);
    return new Interval(params.a, params.b, false, false);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: IBoundMidParams = {...boundMidDefault},
  ): T {
    const support = this.checkParameters(params);
    const c1 = 2.0 / (params.b - params.a);
    const c2 = c1 / (params.mid - params.a);
    const c3 = c1 / (params.b - params.mid);

    const pdf = (y: number) => {
      const check = support.checkPDF(y);
      if (check !== null) return check;
      if (y === params.mid) return c1;
      if (y < params.mid) return c2 * (y - params.a);
      return c3 * (params.b - y);
    };

    return (checkArrayLikeOrNumber(x) ? x.map(pdf) : pdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.cdf}
   * @group Static methods
   */
  static cdf<T extends number | TArrayLike>(
    x: T,
    params: IBoundMidParams = {...boundMidDefault},
  ): T {
    const support = this.checkParameters(params);
    const range = params.b - params.a;
    const c1 = 1.0 / ((params.mid - params.a) * range);
    const c2 = 1.0 / ((params.b - params.mid) * range);

    const cdf = (y: number) => {
      const check = support.checkCDF(y);
      if (check !== null) return check;
      if (y <= params.mid) return Math.pow(y - params.a, 2) * c1;
      return 1.0 - Math.pow(params.b - y, 2) * c2;
    };

    return (checkArrayLikeOrNumber(x) ? x.map(cdf) : cdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.quantile}
   * @group Static methods
   */
  static quantile<T extends number | TArrayLike>(
    q: T,
    params: IBoundMidParams = {...boundMidDefault},
  ): T {
    const support = this.checkParameters(params);
    const c1 = params.b - params.a;
    const c2 = params.mid - params.a;
    const c3 = c1 * c2;
    const c4 = c1 * (params.b - params.mid);

    const quantile = (y: number) => {
      const check = support.checkQuantile(y);
      if (check !== null) return check;
      if (c2 > 0.0 && y * c1 <= c2) return params.a + Math.sqrt(y * c3);
      return params.b - Math.sqrt((1.0 - y) * c4);
    };

    return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
  }

  /**
   * {@inheritDoc Arcsine.random}
   * @group Static methods
   */
  static random(
    n: number = 1,
    params: IBoundMidParams = {...boundMidDefault},
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    checkRandomNumber(n);
    const u = rand.floatArray(n);
    return this.quantile(u, params);
  }

  protected params: IBoundMidParams = {...boundMidDefault};

  /** @see {@link triangular} */
  constructor(
    a: number = boundMidDefault.a,
    b: number = boundMidDefault.b,
    mid: number = (a + b) * 0.5,
  ) {
    super();
    this.setParameters({a, b, mid});
    return this;
  }

  setParameters(params: IBoundMidParams = {...boundMidDefault}): void {
    Triangular.checkParameters(params);
    this.params.a = params.a;
    this.params.b = params.b;
    this.params.mid = params.mid;
  }

  mean(): number {
    const {a, b, mid} = this.params;
    return (a + b + mid) / 3.0;
  }

  variance(): number {
    const {a, b} = this.params;
    return Math.pow(b - a, 2) / 12.0;
  }

  mode(): number {
    return this.params.mid;
  }

  skewness(): number {
    const {a, b, mid} = this.params;
    return (
      (Math.SQRT2 *
        (a + b - 2.0 * mid) *
        (2.0 * a - b - mid) *
        (a - 2.0 * b + mid)) /
      (5.0 *
        Math.pow(a * a + b * b + mid * mid - a * b - a * mid - b * mid, 1.5))
    );
  }
}

/**
 * The Triangular distribution
 * @see {@link IBoundMidParams}
 *
 * @example
 * const params = { a: 0, b: 1, mid: 0.5 };
 * const x = new Triangular(0, 1, 0.5);
 * x.pdf(0.4);
 * x.cdf(0.5);
 * x.quantile([0.1, 0.5]);
 * x.random(10);
 * Triangular.pdf(0.5, params);
 * Triangular.quantile([0.1, 0.5], params);
 *
 * @param a - {@link IBoundMidParams.a}
 * @param b - {@link IBoundMidParams.b}
 * @param mid - {@link IBoundMidParams.mid}
 * @returns `new Triangular(a, b, mid)`.
 * @group Distributions
 */
const triangular = (
  a: number = boundMidDefault.a,
  b: number = boundMidDefault.b,
  mid: number = (a + b) * 0.5,
): Triangular => {
  return new Triangular(a, b, mid);
};

export {Triangular, triangular};
