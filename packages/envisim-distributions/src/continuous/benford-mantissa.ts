/** @group Parameter interfaces */
import { Distribution } from "../abstract-distribution.js";
import { Interval } from "../abstract-distribution.js";
import { BenfordMantissaParams } from "../params.js";

export class BenfordMantissa extends Distribution {
  /** @internal */
  #params!: BenfordMantissaParams;

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
  constructor(base?: number) {
    super();
    this.#params = new BenfordMantissaParams(base);
    this.support = new Interval(1.0 / this.params.base, 1.0, false, true);
  }

  /** @internal */
  get params() {
    return this.#params;
  }

  pdf(x: number): number {
    const { logBase } = this.params;
    return this.support.checkPDF(x) ?? 1.0 / (x * logBase);
  }

  cdf(x: number): number {
    const { logBase } = this.params;
    return this.support.checkCDF(x) ?? 1 + Math.log(x) / logBase;
  }

  quantile(q: number): number {
    const { base } = this.params;
    return this.support.checkQuantile(q) ?? Math.pow(base, q - 1.0);
  }

  mean(): number {
    const { base } = this.params;
    return (base - 1) / (base * Math.log(base));
  }

  variance(): number {
    const { base, logBase } = this.params;
    return ((base - 1) / (Math.pow(base, 2) * logBase)) * (0.5 + base / 2 - (base - 1) / logBase);
  }

  mode(): number {
    const { base, logBase } = this.params;
    return base / Math.log(logBase);
  }

  /** @deprecated */
  skewness(): number {
    // Not implemented
    return NaN;
  }
}
