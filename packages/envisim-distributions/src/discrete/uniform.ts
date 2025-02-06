import {
  Distribution,
  Interval,
  type RandomOptions,
  randomOptionsDefault,
} from '../abstract-distribution.js';
import {type ParamsBound, boundCheck, boundDefault} from '../params.js';
import {assertPositiveInteger} from '../utils.js';

export class UniformDiscrete extends Distribution<ParamsBound> {
  protected params: ParamsBound = {...boundDefault};

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
  constructor(a: number = boundDefault.a, b: number = boundDefault.b) {
    super();
    this.setParameters({a, b});
    return this;
  }

  setParameters(params: ParamsBound = {...boundDefault}): void {
    boundCheck(params);
    if (!Number.isInteger(params.a)) {
      throw new RangeError('a must be integer');
    } else if (!Number.isInteger(params.b)) {
      throw new RangeError('b must be integer');
    }
    this.support = new Interval(params.a, params.b, false, false);
    this.params.a = params.a;
    this.params.b = params.b;
  }

  pdf(x: number): number {
    const c = 1.0 / (this.params.b - this.params.a + 1);

    return this.support.checkPDFInt(x) ?? c;
  }

  cdf(x: number): number {
    const c1 = 1 - this.params.a;
    const c2 = 1.0 / (this.params.b + c1);

    return this.support.checkCDFInt(x) ?? (Math.floor(x) + c1) * c2;
  }

  quantile(q: number): number {
    const c1 = 1 - this.params.a;
    const c2 = this.params.b + c1;

    return this.support.checkQuantile(q) ?? Math.ceil(q * c2) - c1;
  }

  override random(n: number = 1, {rand = randomOptionsDefault.rand}: RandomOptions = {}): number[] {
    assertPositiveInteger(n);
    const c = this.params.b - this.params.a + 1;
    return rand.floatArray(n).map((e) => this.params.a + Math.floor(c * e));
  }

  mean(): number {
    const {a, b} = this.params;
    return (a + b) / 2;
  }

  variance(): number {
    const {a, b} = this.params;
    return (Math.pow(b - a + 1, 2) - 1) / 12;
  }

  mode(): number {
    return this.params.a;
  }

  skewness(): number {
    return 0;
  }
}
