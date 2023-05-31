import {TArrayLike} from '@envisim/matrix';

import {
  checkArrayLikeOrNumber,
  checkRandomNumber,
  Distribution,
  Interval,
} from './distribution.js';
import {randomHypergeometric} from './hypergeometric-random.js';
import {
  hypergeometricCDF,
  hypergeometricQuantile,
} from './hypergeometric-utils.js';
import {
  hypergeometricDefault,
  IHypergeometricParams,
  IRandomOptions,
  randomOptionsDefault,
} from './types.js';
import {logBinomialCoefficient} from './utils.js';

class Hypergeometric extends Distribution<IHypergeometricParams> {
  /** @internal */
  static checkParameters({N, K, n}: IHypergeometricParams): Interval {
    if (!Number.isInteger(N)) throw new TypeError('N must be integer');
    if (!Number.isInteger(K)) throw new TypeError('K must be integer');
    if (!Number.isInteger(n)) throw new TypeError('n must be integer');
    if (N <= 0) throw new RangeError('N must be larger than 0');
    if (K < 0 || K > N) throw new RangeError('K must be in [0,N]');
    if (n < 0 || n > N) throw new RangeError('n must be in [0,N]');
    return new Interval(Math.max(0, n + K - N), Math.min(n, K), false, false);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: IHypergeometricParams = {...hypergeometricDefault},
  ): T {
    const support = this.checkParameters(params);
    const degenerate = params.n === 0 || params.K === 0;
    const c = logBinomialCoefficient(params.N, params.n);

    const pdf = (y: number) => {
      const check = support.checkPDFInt(y);
      if (check !== null) return check;
      if (degenerate) return y === 0 ? 1.0 : 0.0;

      return Math.exp(
        logBinomialCoefficient(params.K, y) +
          logBinomialCoefficient(params.N - params.K, params.n - y) -
          c,
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
    params: IHypergeometricParams = {...hypergeometricDefault},
  ): T {
    const support = this.checkParameters(params);
    const isArr = checkArrayLikeOrNumber(x);
    const c = logBinomialCoefficient(params.N, params.n);
    const pmf = (y: number, NK: number, KN: number): number =>
      Math.exp(
        logBinomialCoefficient(NK, y) +
          logBinomialCoefficient(KN, params.n - y) -
          c,
      );

    const cdf = (y: number) => {
      return (
        support.checkCDF(y) ??
        hypergeometricCDF(y, params.N, params.K, params.n, pmf)
      );
    };

    return (isArr ? x.map(cdf) : cdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.quantile}
   * @group Static methods
   */
  static quantile<T extends number | TArrayLike>(
    q: T,
    params: IHypergeometricParams = {...hypergeometricDefault},
  ): T {
    const support = this.checkParameters(params);

    const quantile = (y: number) => {
      return (
        support.checkQuantile(y) ??
        hypergeometricQuantile(y, params.N, params.K, params.n)
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
    params: IHypergeometricParams = {...hypergeometricDefault},
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    this.checkParameters(params);
    checkRandomNumber(n);
    return randomHypergeometric(n, params, rand);
    // const s = new Array(n);
    // for (let i = 0; i < n; i++) s[i] = hypergeometricRandom(params, rand);
    // return s;
  }

  protected params: IHypergeometricParams = {...hypergeometricDefault};

  /** @see {@link hypergeometric} */
  constructor(
    N: number = hypergeometricDefault.N,
    K: number = hypergeometricDefault.K,
    n: number = hypergeometricDefault.n,
  ) {
    super();
    this.setParameters({N, K, n});
    return this;
  }

  setParameters(
    params: IHypergeometricParams = {...hypergeometricDefault},
  ): void {
    Hypergeometric.checkParameters(params);
    this.params.N = params.N;
    this.params.K = params.K;
    this.params.n = params.n;
  }

  mean(): number {
    const {N, K, n} = this.params;
    return (n * K) / N;
  }

  variance(): number {
    const {N, K, n} = this.params;
    return (this.mean() * (N - K) * (N - n)) / (N * (N - 1));
  }

  mode(): number {
    const {N, K, n} = this.params;
    return Math.ceil(((n + 1) * (K + 1)) / (N + 2)) - 1;
  }

  skewness(): number {
    const {N, K, n} = this.params;
    return (
      (((N - 2 * K) * (N - 2 * n)) / (N - 2)) *
      Math.sqrt((N - 1) / (n * K * (N - K) * (N - n)))
    );
  }
}

/**
 * The Hypergeometric distribution
 * @see {@link IHypergeometricParams}
 *
 * @example
 * const params = { N: 10, K: 5, n: 2 };
 * const x = new Hypergeometric(10, 5, 2);
 * x.pdf(1);
 * x.cdf(2);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * Hypergeometric.pdf(0, params);
 * Hypergeometric.quantile([0.1, 0.5], params);
 *
 * @param N - Population size
 * @param K - Size of marked population
 * @param n - Sample size
 * @returns `new Hypergeometric(N, K, n)`.
 * @group Distributions
 */
const hypergeometric = (
  N: number = hypergeometricDefault.N,
  K: number = hypergeometricDefault.K,
  n: number = hypergeometricDefault.n,
): Hypergeometric => {
  return new Hypergeometric(N, K, n);
};

export {Hypergeometric, hypergeometric};
