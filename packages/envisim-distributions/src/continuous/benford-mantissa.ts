/** @group Parameter interfaces */
import { Distribution } from "../abstract-distribution.js";
import { BenfordMantissaParams } from "../params.js";

/**
 * @category Continuous distributions
 */
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
    this.support = { interval: [1.0 / this.params.base, 1.0], ends: "right-open" };
  }

  /** @internal */
  get params() {
    return this.#params;
  }

  override pdf(x: number): number {
    const { logBase } = this.params;
    return super.pdf(x) ?? 1.0 / (x * logBase);
  }

  override cdf(x: number): number {
    const { logBase } = this.params;
    return super.cdf(x) ?? 1 + Math.log(x) / logBase;
  }

  override quantile(q: number): number {
    const { base } = this.params;
    return super.quantile(q) ?? Math.pow(base, q - 1.0);
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
