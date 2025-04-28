import { Bounded } from "../abstract-bounded.js";

/**
 * @category Continuous distributions
 */
export class UQuadratic extends Bounded {
  #alpha!: number;
  #beta!: number;

  /**
   * The U-Quadratic distribution
   *
   * @example
   * const x = new UQuadratic(0, 1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(a?: number, b?: number) {
    super(a, b);
    this.#alpha = 12.0 / Math.pow(this.params.width, 3);
    this.#beta = (this.params.a + this.params.b) * 0.5;
  }

  override get params() {
    return super.params;
  }

  pdf(x: number): number {
    return this.support.checkPDF(x) ?? this.#alpha * Math.pow(x - this.#beta, 2);
  }

  cdf(x: number): number {
    const c1 = this.#alpha / 3.0;
    const c2 = Math.pow(this.#beta - this.params.a, 3);

    return this.support.checkCDF(x) ?? c1 * (c2 + Math.pow(x - this.#beta, 3));
  }

  quantile(q: number): number {
    const check = this.support.checkQuantile(q);
    if (check !== null) return check;

    const c1 = Math.pow(this.params.b - this.params.a, 3) * 0.25;
    const c2 = Math.pow(this.#beta - this.params.a, 3);

    const diff = q * c1 - c2;
    return this.#beta + (diff >= 0.0 ? Math.cbrt(diff) : -Math.cbrt(-diff));
  }

  mean(): number {
    const { a, b } = this.params;
    return (a + b) * 0.5;
  }

  variance(): number {
    const { a, b } = this.params;
    return (3.0 * Math.pow(b - a, 2)) / 20.0;
  }

  mode(): number {
    return this.params.a;
  }

  skewness(): number {
    return 0.0;
  }
}
