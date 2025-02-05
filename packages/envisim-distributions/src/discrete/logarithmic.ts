import {type Random} from '@envisim/random';

import {
  Distribution,
  Interval,
  type RandomOptions,
  randomOptionsDefault,
} from '../abstract-distribution.js';
import {betaContinuedFraction} from '../beta-utils.js';
import {stdNormalQuantile} from '../continuous/normal-utils.js';
import {type ParamsBernoulli, bernoulliCheck, bernoulliDefault} from '../params.js';
import {assertPositiveInteger} from '../utils.js';

export class Logarithmic extends Distribution<ParamsBernoulli> {
  protected params: ParamsBernoulli = bernoulliDefault;
  protected logq!: number;

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
  constructor(p: number = bernoulliDefault) {
    super();
    this.setParameters(p);
    return this;
  }

  setParameters(p: ParamsBernoulli = bernoulliDefault): void {
    bernoulliCheck(p);
    this.support = new Interval(1, Infinity, false, true);
    this.params = p;
    this.logq = Math.log(1.0 - p);
  }

  pdf(x: number): number {
    return this.support.checkPDFInt(x) ?? -Math.pow(this.params, x) / (x * this.logq);
  }

  cdf(x: number, eps: number = 1e-20): number {
    const c = Math.log(this.params);
    const xl = (x | 0) + 1;

    return (
      this.support.checkCDFInt(x) ??
      1.0 +
        ((betaContinuedFraction(this.params, {alpha: xl, beta: 0}, eps) / this.logq) *
          Math.exp(xl * c)) /
          xl
    );
  }

  quantile(q: number): number {
    const check = this.support.checkQuantile(q);
    if (check !== null) return check;

    const z = stdNormalQuantile(q);
    const x = Math.max(this.cornishFisherExpansion(z) | 0, 1);
    return this.quantileCF(q, x, this.cdf(x));
  }

  override random(n: number = 1, {rand = randomOptionsDefault.rand}: RandomOptions = {}): number[] {
    assertPositiveInteger(n);
    const s = Array.from<number>({length: n});
    for (let i = 0; i < n; i++) {
      s[i] = randomLogarithmic(this.params, rand);
    }
    return s;
  }

  mean(): number {
    const p = this.params;
    return -p / ((1 - p) * Math.log(1 - p));
  }

  variance(): number {
    const p = this.params;
    const lnp = Math.log(1 - p);
    return (-p * (p + lnp)) / Math.pow((1 - p) * lnp, 2);
  }

  mode(): number {
    return 1;
  }

  skewness(): number {
    const p = this.params;
    const lnp = Math.log(1 - p);
    const plnp = p + lnp;
    return (
      (2 * Math.pow(p, 2) + 3 * p * lnp + (1 + p) * Math.pow(lnp, 2)) /
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
function randomLogarithmic(p: number, rand: Random): number {
  // LK
  if (p >= 0.95) {
    const h = Math.log(1 - p);
    const u2 = rand.float();
    if (u2 > p) return 1;
    const u1 = rand.float();
    const q = 1 - Math.exp(u1 * h);
    if (u2 < Math.pow(q, 2)) return (1 + Math.log(u2) / Math.log(q)) | 0;
    if (u2 > q) return 1;
    return 2;
  }

  // LS
  let u = rand.float();
  let x = 1;
  let f = -p / Math.log(1.0 - p);

  while (u > f) {
    x++;
    u -= f;
    f *= (p * (x - 1)) / x;
  }

  return x;
}
