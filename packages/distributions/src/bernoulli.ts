import {TArrayLike} from '@envisim/matrix';
import {
  checkArrayLikeOrNumber,
  checkRandomNumber,
  Distribution,
} from './distribution.js';
import {
  bernoulliCheck,
  bernoulliDefault,
  IBernoulliParams,
  IRandomOptions,
  randomOptionsDefault,
} from './types.js';

class Bernoulli extends Distribution<IBernoulliParams> {
  /** @internal */
  static checkParameters(params: IBernoulliParams): void {
    bernoulliCheck(params);
    // return new Interval(0, 1, false, false);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: IBernoulliParams = {...bernoulliDefault},
  ): T {
    this.checkParameters(params);
    const q = 1.0 - params.p;

    const pdf = (y: number) => {
      if (y === 0) return q;
      if (y === 1) return params.p;
      return 0.0;
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
    this.checkParameters(params);
    const q = 1.0 - params.p;

    const cdf = (y: number) => {
      if (y < 0) return 0.0;
      if (y < 1) return q;
      return 1.0;
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
    this.checkParameters(params);
    const q0 = 1.0 - params.p;

    const quantile = (y: number) => {
      if (y < 0.0 || y > 1.0) return NaN;
      if (y <= q0) return 0;
      return 1;
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

  /** @see {@link bernoulli} */
  constructor(p: number = bernoulliDefault.p) {
    super();
    this.setParameters({p});
    return this;
  }

  setParameters(params: IBernoulliParams = {...bernoulliDefault}): void {
    Bernoulli.checkParameters(params);
    this.params.p = params.p;
  }

  mean(): number {
    return this.params.p;
  }

  variance(): number {
    const {p} = this.params;
    return p * (1 - p);
  }

  mode(): number {
    const {p} = this.params;
    if (p <= 0.5) return 0;
    return 1;
  }

  skewness(): number {
    const {p} = this.params;
    const q = 1 - p;
    return (q - p) / Math.sqrt(p * q);
  }
}

/**
 * The Bernoulli distribution
 * @see {@link IBernoulliParams}
 *
 * @example
 * const params = { p: 0.9 };
 * const x = new Bernoulli(0.9);
 * x.pdf(1);
 * x.quantile([0.1, 0.5])
 * Arcsine.pdf(1, params);
 * Arcsine.quantile([0.1, 0.5], params);
 *
 * @param p - {@link IBernoulliParams.p}
 * @returns `new Bernoulli(base)`.
 * @group Distributions
 */
const bernoulli = (p: number = bernoulliDefault.p): Bernoulli => {
  return new Bernoulli(p);
};

export {Bernoulli, bernoulli};
