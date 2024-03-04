import {TArrayLike} from '@envisim/matrix';

import {
  Distribution,
  Interval,
  checkArrayLikeOrNumber,
  checkRandomNumber,
} from './distribution.js';
import {Exponential} from './exponential.js';
import {
  errorFunction,
  stdNormalCDF,
  stdNormalQuantile,
} from './normal-utils.js';
import {
  INormalParams,
  IRandomOptions,
  normalCheck,
  normalDefault,
  normalNormalize,
  randomOptionsDefault,
} from './types.js';
import {EPS, SQRT2PI, SQRTPI} from './utils-consts.js';

class Normal extends Distribution<INormalParams> {
  /** @internal */
  static checkParameters(params: INormalParams): Interval {
    normalCheck(params);
    return new Interval(-Infinity, Infinity, true, true);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: INormalParams = {...normalDefault},
  ): T {
    const support = this.checkParameters(params);
    const c = SQRT2PI * params.sigma;

    const pdf = (y: number) => {
      return (
        support.checkPDF(y) ??
        Math.exp(-0.5 * Math.pow(normalNormalize(y, params), 2)) / c
      );
    };

    return (checkArrayLikeOrNumber(x) ? x.map(pdf) : pdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static cdf<T extends number | TArrayLike>(
    x: T,
    params: INormalParams = {...normalDefault},
  ): T {
    const support = this.checkParameters(params);

    const cdf = (y: number) => {
      return support.checkCDF(y) ?? stdNormalCDF(normalNormalize(y, params));
      // return standardNormalCDF2(locationScaleNormalize(x, this.params));
    };

    return (checkArrayLikeOrNumber(x) ? x.map(cdf) : cdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static quantile<T extends number | TArrayLike>(
    q: T,
    params: INormalParams = {...normalDefault},
  ): T {
    const support = this.checkParameters(params);

    const quantile = (y: number) => {
      return (
        support.checkQuantile(y) ??
        params.mu + stdNormalQuantile(y) * params.sigma
      );
    };

    return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static random(
    n: number = 1,
    params: INormalParams = {...normalDefault},
    {rand = randomOptionsDefault.rand, method = 'inverse'}: IRandomOptions = {},
  ): number[] {
    checkRandomNumber(n);

    if (method === 'box-muller') {
      this.checkParameters(params);
      const n1 = n >> 1;
      const n2 = n1 + (n & 1);

      const c = 2.0 * Math.PI;
      const R = Exponential.random(n2, {rate: 0.5}, {rand}).map(Math.sqrt);
      const T = rand.floatArray(n2).map((e) => e * c);

      const s = new Array<number>(n);
      for (let i = 0; i < n1; i++) {
        s[i] = params.mu + params.sigma * (R[i] * Math.cos(T[i]));
        s[n1 + i] = params.mu + params.sigma * (R[i] * Math.sin(T[i]));
      }
      if (n2 > n1) s[n] = params.mu + params.sigma * (R[n1] * Math.cos(T[n1]));

      return s;
    }

    // if (method === 'inverse')
    const u = rand.floatArray(n);
    return this.quantile(u, params);
  }

  protected params: INormalParams = {...normalDefault};

  /** @see {@link normal} */
  constructor(
    mu: number = normalDefault.mu,
    sigma: number = normalDefault.sigma,
  ) {
    super();
    this.setParameters({mu, sigma});
    return this;
  }

  setParameters(params: INormalParams = {...normalDefault}): void {
    Normal.checkParameters(params);
    this.params.mu = params.mu;
    this.params.sigma = params.sigma;
  }

  mean(): number {
    return this.params.mu;
  }

  variance(): number {
    return Math.pow(this.params.sigma, 2);
  }

  mode(): number {
    return this.params.mu;
  }

  skewness(): number {
    return 0.0;
  }
}

/**
 * The Normal distribution
 * @see {@link INormalParams}
 *
 * @example
 * const params = { mu: 0, sigma: 1 };
 * const x = new Normal(0, 1);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * Normal.pdf(0.1, params);
 * Normal.quantile([0.1, 0.5], params);
 *
 * @param mu - {@link INormalParams.mu}
 * @param sigma - {@link INormalParams.sigma}
 * @returns `new Normal(mu, sigma)`.
 * @group Distributions
 */
const normal = (
  mu: number = normalDefault.mu,
  sigma: number = normalDefault.sigma,
): Normal => {
  return new Normal(mu, sigma);
};

export {Normal, normal};

class LogNormal extends Distribution<INormalParams> {
  /** @internal */
  static checkParameters(params: INormalParams): Interval {
    normalCheck(params);
    return new Interval(0, Infinity, true, true);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: INormalParams = {...normalDefault},
  ): T {
    const support = this.checkParameters(params);
    const c = SQRT2PI * params.sigma;

    const pdf = (y: number) => {
      return (
        support.checkPDF(y) ??
        Math.exp(-0.5 * Math.pow(normalNormalize(Math.log(y), params), 2)) /
          (y * c)
      );
    };

    return (checkArrayLikeOrNumber(x) ? x.map(pdf) : pdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static cdf<T extends number | TArrayLike>(
    x: T,
    params: INormalParams = {...normalDefault},
  ): T {
    const support = this.checkParameters(params);

    const cdf = (y: number) => {
      return (
        support.checkCDF(y) ??
        stdNormalCDF(normalNormalize(Math.log(y), params))
      );
    };

    return (checkArrayLikeOrNumber(x) ? x.map(cdf) : cdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static quantile<T extends number | TArrayLike>(
    q: T,
    params: INormalParams = {...normalDefault},
  ): T {
    const support = this.checkParameters(params);

    const quantile = (y: number) => {
      return (
        support.checkQuantile(y) ??
        Math.exp(params.mu + stdNormalQuantile(y) * params.sigma)
      );
    };

    return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static random(
    n: number = 1,
    params: INormalParams = {...normalDefault},
    options: IRandomOptions = {},
  ): number[] {
    return Normal.random(n, params, options).map(Math.exp);
  }

  protected params: INormalParams = {...normalDefault};

  /** @see {@link logNormal} */
  constructor(
    mu: number = normalDefault.mu,
    sigma: number = normalDefault.sigma,
  ) {
    super();
    this.setParameters({mu, sigma});
    return this;
  }

  setParameters(params: INormalParams = {...normalDefault}): void {
    LogNormal.checkParameters(params);
    this.params.mu = params.mu;
    this.params.sigma = params.sigma;
  }

  mean(): number {
    const {mu, sigma} = this.params;
    return Math.exp(mu + Math.pow(sigma, 2) * 0.5);
  }

  variance(): number {
    const {mu, sigma} = this.params;
    const sig2 = Math.pow(sigma, 2);
    return (Math.exp(sig2) - 1.0) * Math.exp(2.0 * mu + sig2);
  }

  mode(): number {
    const {mu, sigma} = this.params;
    return Math.exp(mu - Math.pow(sigma, 2));
  }

  skewness(): number {
    const {sigma} = this.params;
    const sig2 = Math.pow(sigma, 2);
    return (Math.exp(sig2) + 2.0) * Math.sqrt(Math.exp(sig2) - 1.0);
  }
}

/**
 * The Log-Normal distribution
 * @see {@link INormalParams}
 *
 * @example
 * const params = { mu: 0, sigma: 1 };
 * const x = new LogNormal(0, 1);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * LogNormal.pdf(0.1, params);
 * LogNormal.quantile([0.1, 0.5], params);
 *
 * @param mu - {@link INormalParams.mu}
 * @param sigma - {@link INormalParams.sigma}
 * @returns `new LogNormal(mu, sigma)`.
 * @group Distributions
 */
const logNormal = (
  mu: number = normalDefault.mu,
  sigma: number = normalDefault.sigma,
): LogNormal => {
  return new LogNormal(mu, sigma);
};

export {LogNormal, logNormal};

class FoldedNormal extends Distribution<INormalParams> {
  /** @internal */
  static checkParameters(params: INormalParams): Interval {
    normalCheck(params);
    return new Interval(0, Infinity, false, true);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: INormalParams = {...normalDefault},
  ): T {
    const support = this.checkParameters(params);
    const c = params.sigma * SQRT2PI;

    const pdf = (y: number) => {
      return (
        support.checkPDF(y) ??
        (Math.exp(-Math.pow((y - params.mu) / params.sigma, 2) * 0.5) +
          Math.exp(-Math.pow((y + params.mu) / params.sigma, 2) * 0.5)) /
          c
      );
    };

    return (checkArrayLikeOrNumber(x) ? x.map(pdf) : pdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static cdf<T extends number | TArrayLike>(
    x: T,
    params: INormalParams = {...normalDefault},
  ): T {
    const support = this.checkParameters(params);
    const c = params.sigma * Math.SQRT2;

    const cdf = (y: number) => {
      return (
        support.checkCDF(y) ??
        (errorFunction((y + params.mu) / c) +
          errorFunction((y - params.mu) / c)) *
          0.5
      );
    };

    return (checkArrayLikeOrNumber(x) ? x.map(cdf) : cdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static quantile<T extends number | TArrayLike>(
    q: T,
    params: INormalParams = {...normalDefault},
  ): T {
    const support = this.checkParameters(params);
    const c = params.sigma * SQRT2PI;
    const c2 = 2.0 * Math.pow(params.sigma, 2);
    const denom = params.sigma * Math.SQRT2;

    const quantile = (y: number) => {
      const check = support.checkQuantile(y);
      if (check !== null) return check;

      let x0 = stdNormalQuantile(y);
      if (params.mu === 0.0) return x0 * params.sigma * Math.SQRT1_2;

      if (params.mu > 10.0) {
        const xs = x0 * params.sigma + params.mu;
        return xs < 0.0 ? 0.0 : xs;
      }

      if (x0 < 0.0) x0 = 0.0;

      let f: number;
      let F: number;
      let delta = 1.0;
      F = 0.0;

      while (Math.abs(delta) > EPS) {
        f =
          (Math.exp(-Math.pow(x0 - params.mu, 2) / c2) +
            Math.exp(-Math.pow(x0 + params.mu, 2) / c2)) /
          c;
        if (f < EPS) break;
        F =
          (errorFunction((x0 + params.mu) / denom) +
            errorFunction((x0 - params.mu) / denom)) *
          0.5;
        delta = (F - y) / f;
        x0 -= delta;
      }

      return x0;
    };

    return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static random(
    n: number = 1,
    params: INormalParams = {...normalDefault},
    options: IRandomOptions = {},
  ): number[] {
    return Normal.random(n, params, options).map(Math.abs);
  }

  protected params: INormalParams = {...normalDefault};

  /** @see {@link foldedNormal} */
  constructor(
    mu: number = normalDefault.mu,
    sigma: number = normalDefault.sigma,
  ) {
    super();
    this.setParameters({mu, sigma});
    return this;
  }

  setParameters(params: INormalParams = {...normalDefault}): void {
    FoldedNormal.checkParameters(params);
    this.params.mu = params.mu;
    this.params.sigma = params.sigma;
  }

  mean(): number {
    const {mu, sigma} = this.params;
    const frac = mu / sigma;
    return (
      ((sigma * Math.SQRT2) / SQRTPI) * Math.exp(-Math.pow(frac, 2) * 0.5) +
      mu * (1.0 - 2.0 * stdNormalCDF(-frac))
    );
  }

  variance(): number {
    const {mu, sigma} = this.params;
    return Math.pow(mu, 2) + Math.pow(sigma, 2) - Math.pow(this.mean(), 2);
  }

  mode(): number {
    const {mu, sigma} = this.params;
    if (mu < sigma) return 0.0;
    if (mu > 3 * sigma) return mu;
    return NaN;
  }

  skewness(): number {
    // Not implemented
    return NaN;
  }
}

/**
 * The Folded-Normal distribution
 * @see {@link INormalParams}
 *
 * @example
 * const params = { mu: 0, sigma: 1 };
 * const x = new FoldedNormal(0, 1);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * FoldedNormal.pdf(0.1, params);
 * FoldedNormal.quantile([0.1, 0.5], params);
 *
 * @param mu - {@link INormalParams.mu}
 * @param sigma - {@link INormalParams.sigma}
 * @returns `new FoldedNormal(mu, sigma)`.
 * @group Distributions
 */
const foldedNormal = (
  mu: number = normalDefault.mu,
  sigma: number = normalDefault.sigma,
): FoldedNormal => {
  return new FoldedNormal(mu, sigma);
};

export {FoldedNormal, foldedNormal};
