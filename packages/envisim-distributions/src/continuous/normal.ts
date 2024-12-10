import {
  Distribution,
  Interval,
  type RandomOptions,
  randomOptionsDefault,
} from '../abstract-distribution.js';
import {SQRT_PI} from '../math-constants.js';
import {assertPositiveInteger} from '../utils.js';
import {errorFunction, stdNormalCDF, stdNormalQuantile} from './normal-utils.js';

const SQRT_2_PI = SQRT_PI * Math.SQRT2;

/** @group Parameter interfaces */
export interface ParamsNormal {
  /** @defaultValue 0.0 */
  mu: number;
  /** @defaultValue 1.0 */
  sigma: number;
}
export const normalDefault: ParamsNormal = {
  mu: 0.0,
  sigma: 1.0,
};
/** @ignore */
export function normalNormalize(x: number, params: ParamsNormal) {
  return (x - params.mu) / params.sigma;
}
/** @ignore */
export function normalCheck(params: ParamsNormal): asserts params is ParamsNormal {
  if (params.sigma <= 0.0) {
    throw new RangeError('sigma must be in (0, Inf)');
  }
}

function randomNormalBoxMuller(
  {mu, sigma}: ParamsNormal,
  n: number,
  {rand = randomOptionsDefault.rand}: RandomOptions = {},
): number[] {
  const n1 = n >> 1;
  const n2 = n1 + (n & 1);

  const c = 2.0 * Math.PI;
  const R = rand.floatArray(n2).map((u) => Math.sqrt(-Math.log(1.0 - u) * 2.0));
  const T = rand.floatArray(n2).map((e) => e * c);

  const s = new Array<number>(n);
  for (let i = 0; i < n1; i++) {
    s[i] = mu + sigma * (R[i] * Math.cos(T[i]));
    s[n1 + i] = mu + sigma * (R[i] * Math.sin(T[i]));
  }
  if (n2 > n1) s[n] = mu + sigma * (R[n1] * Math.cos(T[n1]));

  return s;
}

export class Normal extends Distribution<ParamsNormal> {
  protected params: ParamsNormal = {...normalDefault};

  /**
   * The Normal distribution
   *
   * @example
   * const x = new Normal(0, 1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(mu: number = normalDefault.mu, sigma: number = normalDefault.sigma) {
    super();
    this.setParameters({mu, sigma});
    return this;
  }

  setParameters(params: ParamsNormal = {...normalDefault}): void {
    normalCheck(params);
    this.support = new Interval(-Infinity, Infinity, true, true);
    this.params.mu = params.mu;
    this.params.sigma = params.sigma;
  }

  pdf(x: number): number {
    return (
      this.support.checkPDF(x) ??
      Math.exp(-0.5 * Math.pow(normalNormalize(x, this.params), 2)) /
        (SQRT_2_PI * this.params.sigma)
    );
  }

  cdf(x: number): number {
    return this.support.checkCDF(x) ?? stdNormalCDF(normalNormalize(x, this.params));
  }

  quantile(q: number): number {
    return (
      this.support.checkQuantile(q) ?? this.params.mu + stdNormalQuantile(q) * this.params.sigma
    );
  }

  override random(
    n: number = 1,
    {rand = randomOptionsDefault.rand, method = 'inverse'}: RandomOptions = {},
  ): number[] {
    assertPositiveInteger(n);

    switch (method) {
      case 'box-muller':
        return randomNormalBoxMuller(this.params, n, {rand});
      case 'inverse':
      default:
        return rand.floatArray(n).map((u) => this.quantile(u));
    }
  }

  mean(): number {
    return this.params.mu;
  }

  variance(): number {
    return Math.pow(this.params.sigma, 2);
  }

  mode(): number {
    return this.params.mu;
  }

  skewness(): number {
    return 0.0;
  }
}

export class LogNormal extends Distribution<ParamsNormal> {
  protected params: ParamsNormal = {...normalDefault};

  /**
   * The Log-Normal distribution
   *
   * @example
   * const x = new LogNormal(0, 1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(mu: number = normalDefault.mu, sigma: number = normalDefault.sigma) {
    super();
    this.setParameters({mu, sigma});
    return this;
  }

  setParameters(params: ParamsNormal = {...normalDefault}): void {
    normalCheck(params);
    this.support = new Interval(0, Infinity, true, true);
    this.params.mu = params.mu;
    this.params.sigma = params.sigma;
  }

  pdf(x: number): number {
    return (
      this.support.checkPDF(x) ??
      Math.exp(-0.5 * Math.pow(normalNormalize(Math.log(x), this.params), 2)) /
        (x * SQRT_2_PI * this.params.sigma)
    );
  }

  cdf(x: number): number {
    return this.support.checkCDF(x) ?? stdNormalCDF(normalNormalize(Math.log(x), this.params));
  }

  quantile(q: number): number {
    return (
      this.support.checkQuantile(q) ??
      Math.exp(this.params.mu + stdNormalQuantile(q) * this.params.sigma)
    );
  }

  override random(
    n: number = 1,
    {rand = randomOptionsDefault.rand, method = 'inverse'}: RandomOptions = {},
  ): number[] {
    assertPositiveInteger(n);

    switch (method) {
      case 'box-muller':
        return randomNormalBoxMuller(this.params, n, {rand}).map((z) => Math.exp(z));
      case 'inverse':
      default:
        return rand.floatArray(n).map((u) => this.quantile(u));
    }
  }

  mean(): number {
    const {mu, sigma} = this.params;
    return Math.exp(mu + Math.pow(sigma, 2) * 0.5);
  }

  variance(): number {
    const {mu, sigma} = this.params;
    const sig2 = Math.pow(sigma, 2);
    return (Math.exp(sig2) - 1.0) * Math.exp(2.0 * mu + sig2);
  }

  mode(): number {
    const {mu, sigma} = this.params;
    return Math.exp(mu - Math.pow(sigma, 2));
  }

  skewness(): number {
    const {sigma} = this.params;
    const sig2 = Math.pow(sigma, 2);
    return (Math.exp(sig2) + 2.0) * Math.sqrt(Math.exp(sig2) - 1.0);
  }
}

export class FoldedNormal extends Distribution<ParamsNormal> {
  protected params: ParamsNormal = {...normalDefault};

  /**
   * The Folded-Normal distribution
   *
   * @example
   * const x = new FoldedNormal(0, 1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(mu: number = normalDefault.mu, sigma: number = normalDefault.sigma) {
    super();
    this.setParameters({mu, sigma});
    return this;
  }

  setParameters(params: ParamsNormal = {...normalDefault}): void {
    this.support = new Interval(0, Infinity, false, true);
    this.params.mu = params.mu;
    this.params.sigma = params.sigma;
  }

  pdf(x: number): number {
    return (
      this.support.checkPDF(x) ??
      (Math.exp(-Math.pow((x - this.params.mu) / this.params.sigma, 2) * 0.5) +
        Math.exp(-Math.pow((x + this.params.mu) / this.params.sigma, 2) * 0.5)) /
        (this.params.sigma * SQRT_2_PI)
    );
  }

  cdf(x: number): number {
    const c = this.params.sigma * Math.SQRT2;
    return (
      this.support.checkCDF(x) ??
      (errorFunction((x + this.params.mu) / c) + errorFunction((x - this.params.mu) / c)) * 0.5
    );
  }

  quantile(q: number, eps: number = 1e-12): number {
    const c = this.params.sigma * SQRT_2_PI;
    const c2 = 2.0 * Math.pow(this.params.sigma, 2);
    const denom = this.params.sigma * Math.SQRT2;

    const check = this.support.checkQuantile(q);
    if (check !== null) return check;

    let x0 = stdNormalQuantile(q);
    if (this.params.mu === 0.0) return x0 * this.params.sigma * Math.SQRT1_2;

    if (this.params.mu > 10.0) {
      const xs = x0 * this.params.sigma + this.params.mu;
      return xs < 0.0 ? 0.0 : xs;
    }

    if (x0 < 0.0) x0 = 0.0;

    let f: number;
    let F: number;
    let delta = 1.0;
    F = 0.0;

    while (Math.abs(delta) > eps) {
      f =
        (Math.exp(-Math.pow(x0 - this.params.mu, 2) / c2) +
          Math.exp(-Math.pow(x0 + this.params.mu, 2) / c2)) /
        c;
      if (f < eps) break;
      F =
        (errorFunction((x0 + this.params.mu) / denom) +
          errorFunction((x0 - this.params.mu) / denom)) *
        0.5;
      delta = (F - q) / f;
      x0 -= delta;
    }

    return x0;
  }

  override random(
    n: number = 1,
    {rand = randomOptionsDefault.rand, method = 'inverse'}: RandomOptions = {},
  ): number[] {
    assertPositiveInteger(n);

    switch (method) {
      case 'box-muller':
        return randomNormalBoxMuller(this.params, n, {rand}).map((z) => Math.abs(z));
      case 'inverse':
      default:
        return rand.floatArray(n).map((u) => this.quantile(u));
    }
  }

  mean(): number {
    const {mu, sigma} = this.params;
    const frac = mu / sigma;
    return (
      ((sigma * Math.SQRT2) / SQRT_PI) * Math.exp(-Math.pow(frac, 2) * 0.5) +
      mu * (1.0 - 2.0 * stdNormalCDF(-frac))
    );
  }

  variance(): number {
    const {mu, sigma} = this.params;
    return Math.pow(mu, 2) + Math.pow(sigma, 2) - Math.pow(this.mean(), 2);
  }

  mode(): number {
    const {mu, sigma} = this.params;
    if (mu < sigma) return 0.0;
    if (mu > 3 * sigma) return mu;
    return NaN;
  }

  skewness(): number {
    // Not implemented
    return NaN;
  }
}
