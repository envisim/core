import { randomArray } from "@envisim/random";
import {
  Distribution,
  Interval,
  type RandomOptions,
  RANDOM_OPTIONS_DEFAULT,
} from "../abstract-distribution.js";
import { BetaParams } from "../beta-utils.js";
import { HALF_PI } from "../math-constants.js";
import { DegreesOfFreedomParams } from "../params.js";
import { assertPositiveInteger } from "../utils.js";
import { randomShapeGamma } from "./gamma-random.js";
import { stdNormalQuantile } from "./normal-utils.js";

export class StudentsT extends Distribution {
  #params!: DegreesOfFreedomParams;
  #beta!: BetaParams;

  /**
   * The Students-T distribution
   *
   * @example
   * const x = new StudentsT(10);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(df?: number) {
    super();
    this.#params = new DegreesOfFreedomParams(df);
    this.#beta = new BetaParams(this.#params.df * 0.5, 0.5);
    this.support = new Interval(-Infinity, Infinity, true, true);
  }

  get params() {
    return this.#params;
  }

  pdf(x: number): number {
    if (this.params.df === 1) {
      // Cauchy(0, 1)
      return this.support.checkPDF(x) ?? 1.0 / (Math.PI * (1.0 + Math.pow(x, 2)));
    }

    const halfDf = this.params.df * 0.5;
    const c = -0.5 * Math.log(this.params.df) - this.#beta.logBetaFunction();
    const df = halfDf + 0.5;

    return (
      this.support.checkPDF(x) ?? Math.exp(c - df * Math.log1p(Math.pow(x, 2) / this.params.df))
    );
  }

  cdf(x: number, eps: number = 1e-20): number {
    if (this.params.df === 1) {
      // Cauchy(0, 1)
      return this.support.checkCDF(x) ?? 0.5 + Math.atan(x) / Math.PI;
    }

    const check = this.support.checkCDF(x);
    if (check !== null) return check;
    if (x === 0.0) return 0.5;
    const xt = this.params.df / (this.params.df + Math.pow(x, 2));
    const f = this.#beta.regularizedBetaFunction(xt, eps) * 0.5;
    return x < 0 ? f : 1.0 - f;
  }

  /*
   * Hill, G. W. (1970).
   * Algorithm 396: Student's t-quantiles.
   * Communications of the ACM, 13(10), 619-620.
   * https://doi.org/10.1145/355598.355600
   */
  quantile(q: number): number {
    const check = this.support.checkQuantile(q);
    if (check !== null) return check;
    const { df } = this.params;

    if (q === 0.5) {
      return 0.0;
    } else if (df === 1) {
      return Math.tan(Math.PI * (q - 0.5));
    } else if (df === 2) {
      return 2.0 * (q - 0.5) * Math.sqrt(1.0 / (2.0 * q * (1.0 - q)));
    } else if (df === 4) {
      const alpha = Math.sqrt(4.0 * q * (1.0 - q));
      const c = Math.cos(Math.acos(alpha) / 3.0) / alpha;
      const v = 2.0 * Math.sqrt(c - 1.0);
      return q < 0.5 ? -v : v;
    }

    const a = 1.0 / (df - 0.5);
    const b = 48.0 / Math.pow(a, 2);
    const c0 = (((20700.0 * a) / b - 98.0) * a - 16.0) * a + 96.36;
    const d = ((94.5 / (b + c0) - 3.0) / b + 1.0) * Math.sqrt(a * HALF_PI) * df;
    const HALFDFINV = 2.0 / df;
    const dfFrac = (df + 1.0) / (df + 2.0);
    let x1, x2, c: number;

    const y0 = Math.abs(q);

    x1 = d * y0 * 2;
    x2 = Math.pow(x1, HALFDFINV);

    if (x2 > 0.05 + a) {
      x1 = stdNormalQuantile(y0);
      x2 = Math.pow(x1, 2);

      c =
        b +
        (((0.05 * d * x1 - 5.0) * x1 - 7.0) * x1 - 2.0) * x1 +
        (df < 5 ? c0 + 0.3 * (df - 4.5) * (x1 + 0.6) : c0);
      x2 =
        a *
        Math.pow((((((0.4 * x2 + 6.3) * x2 + 36.0) * x2 + 94.5) / c - x2 - 3.0) / b + 1.0) * x1, 2);

      x2 = x2 > 0.002 ? Math.expm1(x2) : 0.5 * Math.pow(x2, 2) + x2;
    } else {
      x2 =
        ((1.0 / (((df + 6.0) / (df * x2) - 0.089 * d - 0.822) * (df + 2.0) * 3.0) +
          0.5 / (df + 4.0)) *
          x2 -
          1.0) *
          dfFrac +
        1.0 / x2;
    }

    const ret = Math.sqrt(df * x2);
    return q < 0.5 ? -ret : ret;
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    assertPositiveInteger(n);

    // Normal(0, 1)
    const x1 = randomArray(n, options.rand).map((u) => stdNormalQuantile(u));
    // Chi2(df)
    const x2 = randomShapeGamma(n, this.params.df * 0.5, options.rand, 2.0);

    return x1.map((e, i) => e / Math.sqrt(x2[i] / this.params.df));
  }

  mean(): number {
    return 0.0;
  }

  variance(): number {
    const { df } = this.params;
    if (df <= 1) return NaN;
    if (df <= 2) return Infinity;
    return df / (df - 2);
  }

  mode(): number {
    return 0;
  }

  skewness(): number {
    const { df } = this.params;
    if (df <= 3) return NaN;
    return 0.0;
  }
}
