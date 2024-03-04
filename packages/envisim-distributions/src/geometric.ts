import {TArrayLike} from '@envisim/matrix';

import {
  Distribution,
  Interval,
  checkArrayLikeOrNumber,
  checkRandomNumber,
} from './distribution.js';
import {
  IBernoulliParams,
  IRandomOptions,
  bernoulliCheck,
  bernoulliDefault,
  randomOptionsDefault,
} from './types.js';

class Geometric extends Distribution<IBernoulliParams> {
  /** @internal */
  static checkParameters(params: IBernoulliParams): Interval {
    bernoulliCheck(params);
    return new Interval(1, Infinity, false, true);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: IBernoulliParams = {...bernoulliDefault},
  ): T {
    const support = this.checkParameters(params);
    const lq = Math.log(1.0 - params.p);

    const pdf = (y: number) => {
      return support.checkPDFInt(y) ?? Math.exp((y - 1) * lq) * params.p;
    };

    return (checkArrayLikeOrNumber(x) ? x.map(pdf) : pdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.cdf}
   * @group Static methods
   */
  static cdf<T extends number | TArrayLike>(
    x: T,
    params: IBernoulliParams = {...bernoulliDefault},
  ): T {
    const support = this.checkParameters(params);
    const lq = Math.log(1.0 - params.p);

    const cdf = (y: number) => {
      return support.checkCDFInt(y) ?? 1.0 - Math.exp((y | 0) * lq);
    };

    return (checkArrayLikeOrNumber(x) ? x.map(cdf) : cdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.quantile}
   * @group Static methods
   */
  static quantile<T extends number | TArrayLike>(
    q: T,
    params: IBernoulliParams = {...bernoulliDefault},
  ): T {
    const support = this.checkParameters(params);
    const lq = Math.log(1.0 - params.p);

    const quantile = (y: number) => {
      return support.checkQuantile(y) ?? Math.ceil(Math.log(1.0 - y) / lq);
    };

    return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
  }

  /**
   * {@inheritDoc Arcsine.random}
   * @group Static methods
   */
  static random(
    n: number = 1,
    params: IBernoulliParams = {...bernoulliDefault},
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    checkRandomNumber(n);
    const u = rand.floatArray(n);
    return this.quantile(u, params);
  }

  protected params: IBernoulliParams = {...bernoulliDefault};
  /** @see {@link geometric} */
  constructor(p: number = bernoulliDefault.p) {
    super();
    this.setParameters({p});
    return this;
  }

  setParameters(params: IBernoulliParams = {...bernoulliDefault}): void {
    Geometric.checkParameters(params);
    this.params.p = params.p;
  }

  mean(): number {
    return 1 / this.params.p;
  }

  variance(): number {
    const {p} = this.params;
    return (1 - p) / Math.pow(p, 2);
  }

  mode(): number {
    return 1;
  }

  skewness(): number {
    const {p} = this.params;
    return (2 - p) / Math.sqrt(1 - p);
  }
}

/**
 * The Geometric distribution
 * @see {@link IBernoulliParams}
 *
 * @example
 * const params = { p: 0.8 };
 * const x = new Geometric(0.8);
 * x.pdf(1);
 * x.cdf(1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * Geometric.pdf(1, params);
 * Geometric.quantile([0.1, 0.5], params);
 *
 * @param p - {@link IBernoulliParams.p}
 * @returns `new Geometric(p)`.
 * @group Distributions
 */
const geometric = (p: number = bernoulliDefault.p): Geometric => {
  return new Geometric(p);
};

export {Geometric, geometric};
