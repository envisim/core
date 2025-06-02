import { type RandomGenerator } from "@envisim/random";
import { ValidationError } from "@envisim/utils";
import {
  Interval,
  type RandomOptions,
  RANDOM_OPTIONS_DEFAULT,
  cornishFisherExpansion,
  quantileCF,
} from "../abstract-distribution.js";
import { stdNormalQuantile } from "../continuous/normal-utils.js";
import { BetaParams } from "../params.js";
import { Bernoulli } from "./bernoulli.js";

/**
 * @category Discrete distributions
 */
export class Logarithmic extends Bernoulli {
  /**
   * The Logarithmic distribution
   *
   * @example
   * const x = new Logarithmic(0.3);
   * x.pdf(4);
   * x.cdf(4);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(p?: number) {
    super(p);
    this.support = new Interval(1, Infinity, false, true);
  }

  override pdf(x: number): number {
    return this.support.checkPDFInt(x) ?? -Math.pow(this.params.p, x) / (x * this.params.logq);
  }

  override cdf(x: number, eps: number = 1e-20): number {
    const c = Math.log(this.params.p);
    const xl = (x | 0) + 1;

    return (
      this.support.checkCDFInt(x) ??
      1.0 +
        ((new BetaParams(xl, 0).betaContinuedFraction(this.params.p, eps) / this.params.logq) *
          Math.exp(xl * c)) /
          xl
    );
  }

  override quantile(q: number): number {
    const check = this.support.checkQuantile(q);
    if (check !== null) return check;

    const z = stdNormalQuantile(q);
    const x = Math.max(cornishFisherExpansion.call(this, z) | 0, 1);
    return quantileCF.call(this, q, x, this.cdf(x));
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    n = Math.trunc(n);
    ValidationError.check["number-not-positive"]({ arg: "n" }, n)?.raise();
    const s = Array.from<number>({ length: n });
    for (let i = 0; i < n; i++) {
      s[i] = randomLogarithmic(this.params.p, options.rand);
    }
    return s;
  }

  override mean(): number {
    const { p, q, logq } = this.params;
    return -p / (q * logq);
  }

  override variance(): number {
    const { p, q, logq } = this.params;
    return (-p * (p + logq)) / Math.pow(q * logq, 2);
  }

  override mode(): number {
    return 1;
  }

  override skewness(): number {
    const { p, logq } = this.params;
    const plnp = p + logq;
    return (
      (2 * Math.pow(p, 2) + 3 * p * logq + (1 + p) * Math.pow(logq, 2)) /
      (plnp * Math.sqrt(-p * plnp))
    );

    // e(x^3) - 3 mean var - mean^3 / sd^3
    // e(x^3) = -2/ln(1-p)*(p/1-p)^3
    // mean = -1/ln(1-p)*(p/1-p)
    // sd = sqrt(-p(p+ln(1-p)))/(1-p)ln(1-p)
  }
}

/*
 * Kemp, A. W. (1981).
 * Efficient generation of logarithmically distributed pseudo‐random variables.
 * Journal of the Royal Statistical Society: Series C (Applied Statistics), 30(3), 249-253.
 * https://doi.org/10.2307/2346348
 */
function randomLogarithmic(p: number, rand: RandomGenerator): number {
  // LK
  if (p >= 0.95) {
    const h = Math.log(1 - p);
    const u2 = rand.random();
    if (u2 > p) return 1;
    const u1 = rand.random();
    const q = 1 - Math.exp(u1 * h);
    if (u2 < Math.pow(q, 2)) return (1 + Math.log(u2) / Math.log(q)) | 0;
    if (u2 > q) return 1;
    return 2;
  }

  // LS
  let u = rand.random();
  let x = 1;
  let f = -p / Math.log(1.0 - p);

  while (u > f) {
    x++;
    u -= f;
    f *= (p * (x - 1)) / x;
  }

  return x;
}
