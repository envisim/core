import {TArrayLike} from '@envisim/matrix';

import {
  checkArrayLikeOrNumber,
  checkRandomNumber,
  Distribution,
  Interval,
} from './distribution.js';
import {
  benfordMantissaDefault,
  IBenfordMantissaParams,
  IRandomOptions,
  randomOptionsDefault,
} from './types.js';

class BenfordMantissa extends Distribution<IBenfordMantissaParams> {
  /** @internal */
  static checkParameters(params: IBenfordMantissaParams): Interval {
    if (params.base <= 1) throw new RangeError('base must be larger than 1');
    return new Interval(1.0 / params.base, 1.0, false, true);
  }

  /**
   * {@inheritDoc Arcsine.pdf}
   * @group Static methods
   */
  static pdf<T extends number | TArrayLike>(
    x: T,
    params: IBenfordMantissaParams = {...benfordMantissaDefault},
  ): T {
    const support = this.checkParameters(params);
    const c = 1.0 / Math.log(params.base);

    const pdf = (y: number) => {
      return support.checkPDF(y) ?? c / y;
    };

    return (checkArrayLikeOrNumber(x) ? x.map(pdf) : pdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.cdf}
   * @group Static methods
   */
  static cdf<T extends number | TArrayLike>(
    x: T,
    params: IBenfordMantissaParams = {...benfordMantissaDefault},
  ): T {
    const support = this.checkParameters(params);
    const c = Math.log(params.base);

    const cdf = (y: number) => {
      return support.checkCDF(y) ?? 1 + Math.log(y) / c;
    };

    return (checkArrayLikeOrNumber(x) ? x.map(cdf) : cdf(x)) as T;
  }

  /**
   * {@inheritDoc Arcsine.quantile}
   * @group Static methods
   */
  static quantile<T extends number | TArrayLike>(
    q: T,
    params: IBenfordMantissaParams = {...benfordMantissaDefault},
  ): T {
    const support = this.checkParameters(params);

    const quantile = (y: number) => {
      return support.checkQuantile(y) ?? Math.pow(params.base, y - 1.0);
    };

    return (checkArrayLikeOrNumber(q) ? q.map(quantile) : quantile(q)) as T;
  }

  /**
   * {@inheritDoc Arcsine.random}
   * @group Static methods
   */
  static random(
    n: number = 1,
    params: IBenfordMantissaParams = {...benfordMantissaDefault},
    {rand = randomOptionsDefault.rand}: IRandomOptions = {},
  ): number[] {
    // this.checkParameters(params);
    checkRandomNumber(n);
    // const u = rand.floatArray(n).map(e => e - 1.0);
    const u = rand.floatArray(n);
    return this.quantile(u, params);
  }

  protected params: IBenfordMantissaParams = {...benfordMantissaDefault};

  /** @see {@link benfordMantissa} */
  constructor(base: number = benfordMantissaDefault.base) {
    super();
    this.setParameters({base});
    return this;
  }

  setParameters(
    params: IBenfordMantissaParams = {...benfordMantissaDefault},
  ): void {
    BenfordMantissa.checkParameters(params);
    this.params.base = params.base;
  }

  mean(): number {
    const {base} = this.params;
    return (base - 1) / (base * Math.log(base));
  }

  variance(): number {
    const {base} = this.params;
    const logb = Math.log(base);
    return (
      ((base - 1) / (Math.pow(base, 2) * logb)) *
      (0.5 + base / 2 - (base - 1) / logb)
    );
  }

  mode(): number {
    const {base} = this.params;
    return base / Math.log(base);
  }

  skewness(): number {
    // Not implemented
    return NaN;
  }
}

/**
 * The Benford Mantissa distribution
 * @see {@link IBenfordMantissaParams}
 *
 * @example
 * const params = { base: 1 };
 * const x = new BenfordMantissa(1);
 * x.pdf(0.1);
 * x.cdf(0.1);
 * x.quantile([0.1, 0.5])
 * x.random(10);
 * BenfordMantissa.pdf(0.1, params);
 * BenfordMantissa.quantile([0.1, 0.5], params);
 *
 * @param base - {@link IBenfordMantissaParams.base}
 * @returns `new BenfordMantissa(base)`.
 * @group Distributions
 */
const benfordMantissa = (
  base = benfordMantissaDefault.base,
): BenfordMantissa => {
  return new BenfordMantissa(base);
};

export {BenfordMantissa, benfordMantissa};
