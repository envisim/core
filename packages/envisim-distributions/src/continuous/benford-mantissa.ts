import {Distribution, Interval} from '../abstract-distribution.js';

/** @group Parameter interfaces */
interface ParamsBenfordMantissa {
  /** @defaultValue 10 */
  base: number;
}
const benfordMantissaDefault: ParamsBenfordMantissa = {base: 10};

export class BenfordMantissa extends Distribution<ParamsBenfordMantissa> {
  protected params: ParamsBenfordMantissa = {...benfordMantissaDefault};
  protected logBase!: number;

  /**
   * The Benford Mantissa distribution
   *
   * @example
   * const x = new BenfordMantissa(1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.1)
   * x.random(10);
   */
  constructor(base: number = benfordMantissaDefault.base) {
    super();
    this.setParameters({base});
    return this;
  }

  setParameters(params: ParamsBenfordMantissa = {...benfordMantissaDefault}): void {
    if (params.base <= 1.0) throw new RangeError('base must be larger than 1');
    this.support = new Interval(1.0 / params.base, 1.0, false, true);
    this.params.base = params.base;
    this.logBase = Math.log(params.base);
  }

  pdf(x: number): number {
    return this.support.checkPDF(x) ?? 1.0 / (x * this.logBase);
  }

  cdf(x: number): number {
    return this.support.checkCDF(x) ?? 1 + Math.log(x) / this.logBase;
  }

  quantile(q: number): number {
    return this.support.checkQuantile(q) ?? Math.pow(this.params.base, q - 1.0);
  }

  mean(): number {
    const {base} = this.params;
    return (base - 1) / (base * Math.log(base));
  }

  variance(): number {
    const {base} = this.params;
    const logb = Math.log(base);
    return ((base - 1) / (Math.pow(base, 2) * logb)) * (0.5 + base / 2 - (base - 1) / logb);
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
