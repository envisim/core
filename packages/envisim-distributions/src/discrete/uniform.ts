import { randomArray } from "@envisim/random";
import { ValidationError } from "@envisim/utils";
import { type RandomOptions, RANDOM_OPTIONS_DEFAULT } from "../abstract-distribution.js";
import { Uniform } from "../continuous/uniform.js";

/**
 * @category Discrete distributions
 */
export class UniformDiscrete extends Uniform {
  /**
   * The Uniform (discrete) distribution
   *
   * @example
   * const x = new UniformDiscrete(0, 10);
   * x.pdf(4);
   * x.cdf(5);
   * x.quantile(0.5);
   * x.random(10);
   */
  constructor(a: number, b: number) {
    a |= 0;
    b |= 0;
    super(a, b);
  }

  override pdf(x: number): number {
    const c = 1.0 / (this.params.width + 1);
    return this.support.checkPDFInt(x) ?? c;
  }

  override cdf(x: number): number {
    const c1 = 1 - this.params.a;
    const c2 = 1.0 / (this.params.b + c1);

    return this.support.checkCDFInt(x) ?? (Math.floor(x) + c1) * c2;
  }

  override quantile(q: number): number {
    const c1 = 1 - this.params.a;
    const c2 = this.params.b + c1;

    return this.support.checkQuantile(q) ?? Math.ceil(q * c2) - c1;
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    n |= 0;
    ValidationError.checkNumber("number-not-positive", "n", n)?.cast();
    const c = this.params.width + 1;
    return randomArray(n, options.rand).map((e) => this.params.a + Math.floor(c * e));
  }

  override variance(): number {
    const { a, b } = this.params;
    return (Math.pow(b - a + 1, 2) - 1) / 12;
  }
}
