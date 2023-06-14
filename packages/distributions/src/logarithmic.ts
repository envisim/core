import {TArrayLike} from '@envisim/matrix';

import {betaContinuedFraction} from './beta-utils.js';
import {
  checkArrayLikeOrNumber,
  checkRandomNumber,
  Distribution,
  Interval,
  quantileCF,
} from './distribution.js';
import {randomLogarithmic} from './logarithmic-random.js';
import {stdNormalQuantile} from './normal-utils.js';
import {
  bernoulliCheck,
  bernoulliDefault,
  IBernoulliParams,
  IRandomOptions,
  randomOptionsDefault,
} from './types.js';
import {cornishFisherExpansion} from './utils.js';

class Logarithmic extends Distribution<IBernoulliParams> {
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
    const c = Math.log(1.0 - params.p);

    const pdf = (y: number) => {
      return support.checkPDFInt(y) ?? -Math.pow(params.p, y) / (y * c);
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
    const c1 = Math.log(1.0 - params.p);
    const c2 = Math.log(params.p);

    const cdf = (y: number) => {
      const xl = (y | 0) + 1;

      return (
        support.checkCDFInt(y) ??
        1.0 +
          ((betaContinuedFraction(params.p, xl, 0) / c1) * Math.exp(xl * c2)) /
            xl
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
    params: IBernoulliParams = {...bernoulliDefault},
  ): T {
    const support = this.checkParameters(params);
    const pq = 1.0 - params.p;
    const logp = Math.log(pq);
    const denom = pq * logp;
    const mean = -params.p / denom;
    const sd = Math.sqrt((-params.p / logp) * (1.0 + params.p / logp)) / pq;

    const mom3 = (-2.0 / logp) * Math.pow(params.p / pq, 3);
    const skew =
      (mom3 - 3 * mean * Math.pow(sd, 2) - Math.pow(mean, 3)) / Math.pow(sd, 3);
    const pdf = (k: number) => -Math.pow(params.p, k) / (k * logp);

    const quantile = (y: number) => {
      const check = support.checkQuantile(y);
      if (check !== null) return check;
      const z = stdNormalQuantile(y);
      const x = Math.max(cornishFisherExpansion(z, mean, sd, skew) | 0, 1);
      const cdf = this.cdf(x, params);
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
    params: IBernoulliParams = {...bernoulliDefault},
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    this.checkParameters(params);
    checkRandomNumber(n);
    const s = new Array<number>(n);
    for (let i = 0; i < n; i++) s[i] = randomLogarithmic(params.p, rand);
    return s;
  }

  protected params: IBernoulliParams = {...bernoulliDefault};

  /** @see {@link logarithmic} */
  constructor(p: number = bernoulliDefault.p) {
    super();
    this.setParameters({p});
    return this;
  }

  setParameters(params: IBernoulliParams = {...bernoulliDefault}): void {
    Logarithmic.checkParameters(params);
    this.params.p = params.p;
  }

  mean(): number {
    const {p} = this.params;
    return -p / ((1 - p) * Math.log(1 - p));
  }

  variance(): number {
    const {p} = this.params;
    const lnp = Math.log(1 - p);
    return (-p * (p + lnp)) / Math.pow((1 - p) * lnp, 2);
  }

  mode(): number {
    return 1;
  }

  skewness(): number {
    const {p} = this.params;
    const lnp = Math.log(1 - p);
    const plnp = p + lnp;
    return (
      (2 * Math.pow(p, 2) + 3 * p * lnp + (1 + p) * Math.pow(lnp, 2)) /
      (plnp * Math.sqrt(-p * plnp))
    );

    // e(x^3) - 3 mean var - mean^3 / sd^3
    // e(x^3) = -2/ln(1-p)*(p/1-p)^3
    // mean = -1/ln(1-p)*(p/1-p)
    // sd = sqrt(-p(p+ln(1-p)))/(1-p)ln(1-p)
  }
}

/**
 * The Logarithmic distribution
 * @see {@link IBernoulliParams}
 *
 * @example
 * const params = { p: 0.3 };
 * const x = new Logarithmic(0.3);
 * x.pdf(4);
 * x.cdf(4);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * Logarithmic.pdf(4, params);
 * Logarithmic.quantile([0.1, 0.5], params);
 *
 * @param p - {@link IBernoulliParams.p}
 * @returns `new Logarithmic(p)`.
 * @group Distributions
 */
const logarithmic = (p: number = bernoulliDefault.p): Logarithmic => {
  return new Logarithmic(p);
};

export {Logarithmic, logarithmic};
