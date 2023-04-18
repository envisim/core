import {TArrayLike} from '@envisim/matrix';
import {regularizedBetaFunction} from './beta-utils.js';
import {randomBinomial} from './binomial-random.js';
import {
  checkArrayLikeOrNumber,
  checkRandomNumber,
  Distribution,
  Interval,
  quantileCF,
} from './distribution.js';
import {randomShapeGamma} from './gamma-random.js';
import {stdNormalQuantile} from './normal-utils.js';
import {randomPoisson} from './poisson-random.js';
import {
  binomialCheck,
  binomialDefault,
  IBinomialParams,
  IRandomOptions,
  randomOptionsDefault,
} from './types.js';
import {cornishFisherExpansion, logBinomialCoefficient} from './utils.js';

class Binomial extends Distribution<IBinomialParams> {
  /** @internal */
  static checkParameters(params: IBinomialParams): Interval {
    binomialCheck(params);
    return new Interval(0, params.n, false, false);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: IBinomialParams = {...binomialDefault},
  ): T {
    const support = this.checkParameters(params);
    const p = Math.log(params.p);
    const q = Math.log(1.0 - params.p);

    const pdf = (y: number) => {
      return (
        support.checkPDFInt(y) ??
        Math.exp(
          logBinomialCoefficient(params.n, y) + y * p + (params.n - y) * q,
        )
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
    params: IBinomialParams = {...binomialDefault},
  ): T {
    const support = this.checkParameters(params);
    const q = 1.0 - params.p;

    const cdf = (y: number) => {
      const xl = y | 0;
      return (
        support.checkCDFInt(y) ??
        regularizedBetaFunction(q, params.n - xl, xl + 1)
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
    params: IBinomialParams = {...binomialDefault},
  ): T {
    const support = this.checkParameters(params);
    const pq = 1.0 - params.p;
    const mean = params.n * params.p;
    const sd = Math.sqrt(mean * pq);
    const skew = (pq - params.p) / sd;
    const pdf = (k: number) => this.pdf(k, params);

    const quantile = (y: number) => {
      const check = support.checkQuantile(y);
      if (check !== null) return check;
      const z = stdNormalQuantile(y);
      const x = cornishFisherExpansion(z, mean, sd, skew) | 0;
      const cdf = regularizedBetaFunction(pq, params.n - x, x + 1);
      return quantileCF(y, pdf, x, cdf, support);
    };

    return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
  }

  /**
   * {@inheritDoc Arcsine.random}
   * @group Static methods
   */
  static random(
    n: number = 1,
    params: IBinomialParams = {...binomialDefault},
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    this.checkParameters(params);
    checkRandomNumber(n);
    return randomBinomial(n, params.n, params.p, rand);
  }

  protected params: IBinomialParams = {...binomialDefault};

  /** @see {@link binomial} */
  constructor(n: number = binomialDefault.n, p: number = binomialDefault.p) {
    super();
    this.setParameters({n, p});
    return this;
  }

  setParameters(params: IBinomialParams = {...binomialDefault}): void {
    Binomial.checkParameters(params);
    this.params.n = params.n;
    this.params.p = params.p;
  }

  mean(): number {
    const {n, p} = this.params;
    return n * p;
  }

  variance(): number {
    const {n, p} = this.params;
    return n * p * (1.0 - p);
  }

  mode(): number {
    const {n, p} = this.params;
    return Math.floor((n + 1) * p);
  }

  skewness(): number {
    const {n, p} = this.params;
    const q = 1.0 - p;
    return (q - p) / Math.sqrt(n * p * q);
  }
}

/**
 * The Binomial distribution
 * @see {@link IBinomialParams}
 *
 * @example
 * const params = { n: 10, p: 0.5 };
 * const x = new Binomial(10, 0.5);
 * x.pdf(5);
 * x.cdf(5);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * Binomial.pdf(5, params);
 * Binomial.quantile([0.1, 0.5], params);
 *
 * @param n - {@link IBinomialParams.n}
 * @param p - {@link IBinomialParams.p}
 * @returns `new Binomial(n, p)`.
 * @group Distributions
 */
const binomial = (
  n: number = binomialDefault.n,
  p: number = binomialDefault.p,
): Binomial => {
  return new Binomial(n, p);
};

export {Binomial, binomial};

class NegativeBinomial extends Distribution<IBinomialParams> {
  /** @internal */
  static checkParameters(params: IBinomialParams): Interval {
    binomialCheck(params);
    return new Interval(0, Infinity, false, true);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: IBinomialParams = {...binomialDefault},
  ): T {
    const support = this.checkParameters(params);
    const p = Math.log(params.p);
    const q = Math.log(1.0 - params.p);

    const pdf = (y: number) => {
      return (
        support.checkPDFInt(y) ??
        Math.exp(
          logBinomialCoefficient(y + params.n - 1, y) + y * p + params.n * q,
        )
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
    params: IBinomialParams = {...binomialDefault},
  ): T {
    const support = this.checkParameters(params);

    const cdf = (y: number) => {
      return (
        support.checkCDFInt(y) ??
        1.0 - regularizedBetaFunction(params.p, (y | 0) + 1, params.n)
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
    params: IBinomialParams = {...binomialDefault},
  ): T {
    const support = this.checkParameters(params);
    const pq = 1.0 - params.p;
    const np = params.n * params.p;
    const mean = np / pq;
    const sd = Math.sqrt(mean / pq);
    const skew = (1.0 + params.p) / Math.sqrt(np);
    const pdf = (k: number) => this.pdf(k, params);

    const quantile = (y: number) => {
      const check = support.checkQuantile(y);
      if (check !== null) return check;
      const z = stdNormalQuantile(y);
      const x = cornishFisherExpansion(z, mean, sd, skew) | 0;
      const cdf = 1.0 - regularizedBetaFunction(params.p, x + 1, params.n);
      return quantileCF(y, pdf, x, cdf, support);
    };

    return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
  }

  /**
   * {@inheritDoc Arcsine.random}
   * @group Static methods
   */
  static random(
    n: number = 1,
    params: IBinomialParams = {...binomialDefault},
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    this.checkParameters(params);
    checkRandomNumber(n);

    const c = params.p / (1.0 - params.p);
    const s = randomShapeGamma(n, params.n, rand, c);
    return s.map((e) => randomPoisson(1, e, rand)[0]);
  }

  protected params: IBinomialParams = {...binomialDefault};

  /** @see {@link negativeBinomial} */
  constructor(n: number = binomialDefault.n, p: number = binomialDefault.p) {
    super();
    this.setParameters({n, p});
    return this;
  }

  setParameters(params: IBinomialParams = {...binomialDefault}): void {
    NegativeBinomial.checkParameters(params);
    this.params.n = params.n;
    this.params.p = params.p;
  }

  mean(): number {
    const {n, p} = this.params;
    return (n * p) / (1 - p);
  }

  variance(): number {
    const {n, p} = this.params;
    return (n * p) / Math.pow(1 - p, 2);
  }

  mode(): number {
    const {n, p} = this.params;
    if (n === 1) return 0;
    return Math.floor(((n - 1) * p) / (1 - p));
  }

  skewness(): number {
    const {n, p} = this.params;
    return (1 + p) / Math.sqrt(n * p);
  }
}

/**
 * The Negative Binomial distribution
 * @see {@link IBinomialParams}
 *
 * @example
 * const params = { n: 10, p: 0.5 };
 * const x = new NegativeBinomial(10, 0.5);
 * x.pdf(5);
 * x.cdf(5);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * NegativeBinomial.pdf(5, params);
 * NegativeBinomial.quantile([0.1, 0.5], params);
 *
 * @param n - {@link IBinomialParams.n}
 * @param p - {@link IBinomialParams.p}
 * @returns `new NegativeBinomial(n, p)`.
 * @group Distributions
 */
const negativeBinomial = (
  n: number = binomialDefault.n,
  p: number = binomialDefault.p,
): NegativeBinomial => {
  return new NegativeBinomial(n, p);
};

export {NegativeBinomial, negativeBinomial};
