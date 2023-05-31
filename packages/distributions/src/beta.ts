import {TArrayLike} from '@envisim/matrix';

import {randomBeta} from './beta-random.js';
import {
  inverseRegularizedBetaFunction,
  logBetaFunction,
  regularizedBetaFunction,
} from './beta-utils.js';
import {
  checkArrayLikeOrNumber,
  checkRandomNumber,
  Distribution,
  Interval,
} from './distribution.js';
import {
  betaDefault,
  IBetaParams,
  IRandomOptions,
  randomOptionsDefault,
} from './types.js';

class Beta extends Distribution<IBetaParams> {
  /** @internal */
  static checkParameters(params: IBetaParams): Interval {
    if (params.alpha <= 0.0)
      throw new RangeError('alpha must be larger than 0');
    if (params.beta <= 0.0) throw new RangeError('beta must be larger than 0');
    return new Interval(0.0, 1.0, false, false);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: IBetaParams = {...betaDefault},
  ): T {
    const support = this.checkParameters(params);
    let {alpha, beta} = params;
    const c = logBetaFunction(alpha, beta);
    alpha -= 1.0;
    beta -= 1.0;

    const pdf = (y: number) => {
      return (
        support.checkPDF(y) ??
        Math.exp(alpha * Math.log(y) + beta * Math.log(1.0 - y) - c)
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
    params: IBetaParams = {...betaDefault},
  ): T {
    const support = this.checkParameters(params);
    const {alpha, beta} = params;
    const lbf = logBetaFunction(alpha, beta);

    const cdf = (y: number) => {
      return (
        support.checkCDF(y) ?? regularizedBetaFunction(y, alpha, beta, lbf)
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
    params: IBetaParams = {...betaDefault},
  ): T {
    const support = this.checkParameters(params);
    const {alpha, beta} = params;
    const lbf = logBetaFunction(alpha, beta);

    const quantile = (y: number) => {
      return (
        support.checkQuantile(y) ??
        inverseRegularizedBetaFunction(y, alpha, beta, lbf)
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
    params: IBetaParams = {...betaDefault},
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    this.checkParameters(params);
    checkRandomNumber(n);
    // const { alpha, beta } = params;
    return randomBeta(n, params.alpha, params.beta, rand);
    // const s = new Array(n);
    // for (let i = 0; i < n; i++) s[i] = randomBeta(alpha, beta, rand);
    // return s;
  }

  protected params: IBetaParams = {...betaDefault};

  /** @see {@link beta} */
  constructor(
    alpha: number = betaDefault.alpha,
    beta: number = betaDefault.beta,
  ) {
    super();
    this.setParameters({alpha, beta});
    return this;
  }

  setParameters(params: IBetaParams = {...betaDefault}): void {
    Beta.checkParameters(params);
    this.params.alpha = params.alpha;
    this.params.beta = params.beta;
  }

  mean(): number {
    const {alpha, beta} = this.params;
    return alpha / (alpha + beta);
  }

  variance(): number {
    const {alpha, beta} = this.params;
    return (alpha * beta) / (Math.pow(alpha + beta, 2) * (alpha + beta + 1));
  }

  mode(): number {
    const {alpha, beta} = this.params;
    if (alpha <= 1.0) return 0.0;
    if (alpha > 1.0 && beta <= 1.0) return 1.0;
    return (alpha - 1) / (alpha + beta - 2);
  }

  skewness(): number {
    const {alpha, beta} = this.params;
    return (
      ((2 * (beta - alpha)) / (alpha + beta + 2)) *
      Math.sqrt((alpha + beta + 1) / (alpha * beta))
    );
  }
}

/**
 * The Beta distribution
 * @see {@link IBetaParams}
 *
 * @example
 * const params = { alpha: 1, beta: 1 };
 * const x = new Beta(1, 1);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * Beta.pdf(0.1, params);
 * Beta.quantile([0.1, 0.5], params);
 *
 * @param alpha - {@link IBetaParams.alpha}
 * @param beta - {@link IBetaParams.beta}
 * @returns `new Beta(alpha, beta)`.
 * @group Distributions
 */
const beta = (
  alpha: number = betaDefault.alpha,
  beta: number = betaDefault.beta,
): Beta => {
  return new Beta(alpha, beta);
};

export {Beta, beta};

class BetaPrime extends Distribution<IBetaParams> {
  /** @internal */
  static checkParameters(params: IBetaParams): Interval {
    if (params.alpha <= 0) throw new RangeError('alpha must be larger than 0');
    if (params.beta <= 0) throw new RangeError('beta must be larger than 0');
    return new Interval(0, Infinity, false, true);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: IBetaParams = {...betaDefault},
  ): T {
    const support = this.checkParameters(params);
    let {alpha, beta} = params;
    const c = logBetaFunction(alpha, beta);
    beta += alpha;
    alpha -= 1.0;

    const pdf = (y: number) => {
      const check = support.checkPDF(y);
      if (check !== null) return check;

      if (y === 0.0)
        return alpha === 0.0 ? Math.exp(-beta * Math.log1p(y) - c) : 0.0;

      return Math.exp(alpha * Math.log(y) - beta * Math.log1p(y) - c);
    };

    return (checkArrayLikeOrNumber(x) ? x.map(pdf) : pdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.cdf}
   * @group Static methods
   */
  static cdf<T extends number | TArrayLike>(
    x: T,
    params: IBetaParams = {...betaDefault},
  ): T {
    const support = this.checkParameters(params);
    const {alpha, beta} = params;
    const lbf = logBetaFunction(alpha, beta);

    const cdf = (y: number) => {
      return (
        support.checkCDF(y) ??
        regularizedBetaFunction(y / (1 + y), alpha, beta, lbf)
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
    params: IBetaParams = {...betaDefault},
  ): T {
    const support = this.checkParameters(params);
    const {alpha, beta} = params;
    const lbf = logBetaFunction(alpha, beta);

    const quantile = (y: number) => {
      const check = support.checkQuantile(y);
      if (check !== null) return check;
      const inv = inverseRegularizedBetaFunction(y, alpha, beta, lbf);
      return inv / (1.0 - inv);
    };

    return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
  }

  /**
   * {@inheritDoc Arcsine.random}
   * @group Static methods
   */
  static random(
    n: number = 1,
    params: IBetaParams = {...betaDefault},
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    return Beta.random(n, params, {rand}).map((e) => e / (1.0 - e));
  }

  protected params: IBetaParams = {...betaDefault};

  /** @see {@link betaPrime} */
  constructor(
    alpha: number = betaDefault.alpha,
    beta: number = betaDefault.beta,
  ) {
    super();
    this.setParameters({alpha, beta});
    return this;
  }

  setParameters(params: IBetaParams = {...betaDefault}): void {
    BetaPrime.checkParameters(params);
    this.params.alpha = params.alpha;
    this.params.beta = params.beta;
  }

  mean(): number {
    const {alpha, beta} = this.params;
    if (beta <= 1) return Infinity;
    return alpha / (beta - 1);
  }

  variance(): number {
    const {alpha, beta} = this.params;
    if (beta <= 2) return Infinity;
    return (alpha * (alpha + beta - 1)) / ((beta - 2) * Math.pow(beta - 1, 2));
  }

  mode(): number {
    const {alpha, beta} = this.params;
    if (alpha < 1.0) return 0.0;
    return (alpha - 1) / (beta + 1);
  }

  skewness(): number {
    const {alpha, beta} = this.params;
    if (beta <= 3) return Infinity;
    return (
      ((2 * (2 * alpha + beta - 1)) / (beta - 3)) *
      Math.sqrt((beta - 2) / (alpha * (alpha + beta - 1)))
    );
  }
}

/**
 * The Beta Prime distribution
 * @see {@link IBetaParams}
 *
 * @example
 * const params = { alpha: 1, beta: 1 };
 * const x = new BetaPrime(1, 1);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * BetaPrime.pdf(0.1, params);
 * BetaPrime.quantile([0.1, 0.5], params);
 *
 * @param alpha - {@link IBetaParams.alpha}
 * @param beta - {@link IBetaParams.beta}
 * @returns `new BetaPrime(alpha, beta)`.
 * @group Distributions
 */
const betaPrime = (
  alpha: number = betaDefault.alpha,
  beta: number = betaDefault.beta,
): BetaPrime => {
  return new BetaPrime(alpha, beta);
};

export {BetaPrime, betaPrime};
