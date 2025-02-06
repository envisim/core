import {
  Distribution,
  Interval,
  type RandomOptions,
  randomOptionsDefault,
} from '../abstract-distribution.js';
import {
  type ParamsBound,
  type ParamsBoundMid,
  boundCheck,
  boundDefault,
  boundMidCheck,
  boundMidDefault,
} from '../params.js';
import {assertPositiveInteger} from '../utils.js';

export class Uniform extends Distribution<ParamsBound> {
  protected params: ParamsBound = {...boundDefault};
  protected density!: number;

  /**
   * The Uniform (continuous) distribution
   *
   * @example
   * const x = new Uniform(0, 1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(a: number = boundDefault.a, b: number = boundDefault.b) {
    super();
    this.setParameters({a, b});
    return this;
  }

  setParameters(params: ParamsBound = {...boundDefault}): void {
    boundCheck(params);
    this.support = new Interval(params.a, params.b, false, false);
    this.params.a = params.a;
    this.params.b = params.b;
    this.density = 1.0 / (params.b - params.a);
  }

  pdf(x: number): number {
    return this.support.checkPDF(x) ?? this.density;
  }

  cdf(x: number): number {
    return this.support.checkCDF(x) ?? (x - this.params.a) * this.density;
  }

  quantile(q: number): number {
    return this.support.checkQuantile(q) ?? this.params.a + q * (this.params.b - this.params.a);
  }

  override random(n: number = 1, {rand = randomOptionsDefault.rand}: RandomOptions = {}): number[] {
    assertPositiveInteger(n);
    const width = this.params.b - this.params.a;
    return rand.floatArray(n).map((e) => this.params.a + width * e);
  }

  mean(): number {
    const {a, b} = this.params;
    return (a + b) / 2.0;
  }

  variance(): number {
    const {a, b} = this.params;
    return Math.pow(b - a, 2) / 12.0;
  }

  mode(): number {
    return this.params.a;
  }

  skewness(): number {
    return 0.0;
  }
}

export class Triangular extends Distribution<ParamsBoundMid> {
  protected params: ParamsBoundMid = {...boundMidDefault};

  /**
   * The Triangular distribution
   *
   * @example
   * const x = new Triangular(0, 1, 0.5);
   * x.pdf(0.4);
   * x.cdf(0.5);
   * x.quantile(0.1);
   * x.random(10);
   */
  constructor(
    a: number = boundMidDefault.a,
    b: number = boundMidDefault.b,
    mid: number = (a + b) * 0.5,
  ) {
    super();
    this.setParameters({a, b, mid});
    return this;
  }

  setParameters(params: ParamsBoundMid = {...boundMidDefault}): void {
    boundMidCheck(params);
    this.support = new Interval(params.a, params.b, false, false);
    this.params.a = params.a;
    this.params.b = params.b;
    this.params.mid = params.mid;
  }

  pdf(x: number): number {
    const check = this.support.checkPDF(x);
    if (check !== null) return check;

    const c1 = 2.0 / (this.params.b - this.params.a);
    const c2 = c1 / (this.params.mid - this.params.a);
    const c3 = c1 / (this.params.b - this.params.mid);

    if (x === this.params.mid) return c1;
    if (x < this.params.mid) return c2 * (x - this.params.a);
    return c3 * (this.params.b - x);
  }

  cdf(x: number): number {
    const check = this.support.checkCDF(x);
    if (check !== null) return check;

    const width = this.params.b - this.params.a;
    const c1 = 1.0 / ((this.params.mid - this.params.a) * width);
    const c2 = 1.0 / ((this.params.b - this.params.mid) * width);

    if (x <= this.params.mid) return Math.pow(x - this.params.a, 2) * c1;
    return 1.0 - Math.pow(this.params.b - x, 2) * c2;
  }

  quantile(q: number): number {
    const check = this.support.checkQuantile(q);
    if (check !== null) return check;

    const c1 = this.params.b - this.params.a;
    const c2 = this.params.mid - this.params.a;
    const c3 = c1 * c2;
    const c4 = c1 * (this.params.b - this.params.mid);

    if (c2 > 0.0 && q * c1 <= c2) return this.params.a + Math.sqrt(q * c3);
    return this.params.b - Math.sqrt((1.0 - q) * c4);
  }

  mean(): number {
    const {a, b, mid} = this.params;
    return (a + b + mid) / 3.0;
  }

  variance(): number {
    const {a, b} = this.params;
    return Math.pow(b - a, 2) / 12.0;
  }

  mode(): number {
    return this.params.mid;
  }

  skewness(): number {
    const {a, b, mid} = this.params;
    return (
      (Math.SQRT2 * (a + b - 2.0 * mid) * (2.0 * a - b - mid) * (a - 2.0 * b + mid)) /
      (5.0 * Math.pow(a * a + b * b + mid * mid - a * b - a * mid - b * mid, 1.5))
    );
  }
}
