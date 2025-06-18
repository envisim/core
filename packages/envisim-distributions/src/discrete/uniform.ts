import { randomArray } from "@envisim/random";
import { ValidationError } from "@envisim/utils";
import { Bounded } from "../abstract-bounded.js";
import { type RandomOptions, RANDOM_OPTIONS_DEFAULT } from "../abstract-distribution.js";

/**
 * @category Discrete distributions
 */
export class UniformDiscrete extends Bounded {
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
    super(Math.trunc(a), Math.trunc(b), false);
  }

  override pdf(x: number): number {
    return super.pdf(x) ?? 1.0 / (this.params.width + 1);
  }

  override cdf(x: number): number {
    const c1 = 1 - this.params.a;
    const c2 = 1.0 / (this.params.b + c1);

    return super.cdf(x) ?? (Math.floor(x) + c1) * c2;
  }

  override quantile(q: number): number {
    const c1 = 1 - this.params.a;
    const c2 = this.params.b + c1;

    return super.quantile(q) ?? Math.ceil(q * c2) - c1;
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    n = Math.trunc(n);
    ValidationError.check["number-not-positive"]({ arg: "n" }, n)?.raise();
    const c = this.params.width + 1;
    return randomArray(n, options.rand).map((e) => this.params.a + Math.floor(c * e));
  }

  mean(): number {
    const { a, b } = this.params;
    return (a + b) / 2.0;
  }
  variance(): number {
    const { a, b } = this.params;
    return (Math.pow(b - a + 1, 2) - 1) / 12;
  }
  mode(): number {
    return this.params.a;
  }
  skewness(): number {
    return 0.0;
  }
}
