import { randomArray } from "@envisim/random";
import { ValidationError } from "@envisim/utils";
import { type RandomOptions, Interval, RANDOM_OPTIONS_DEFAULT } from "../abstract-distribution.js";
import { LocationScale } from "../abstract-location-scale.js";
import { SQRT_PI } from "../math-constants.js";
import { errorFunction, stdNormalCDF, stdNormalQuantile } from "./normal-utils.js";

const SQRT_2_PI = SQRT_PI * Math.SQRT2;

function randomNormalBoxMuller(
  this: Normal,
  n: number,
  { rand }: RandomOptions = RANDOM_OPTIONS_DEFAULT,
): number[] {
  const n1 = n >> 1;
  const n2 = n1 + (n & 1);

  const c = 2.0 * Math.PI;
  const R = randomArray(n2, rand).map((u) => Math.sqrt(-Math.log(1.0 - u) * 2.0));
  const T = randomArray(n2, rand).map((e) => e * c);
  const { location: mu, scale: sigma } = this.params;

  const s = new Array<number>(n);
  for (let i = 0; i < n1; i++) {
    s[i] = mu + sigma * (R[i] * Math.cos(T[i]));
    s[n1 + i] = mu + sigma * (R[i] * Math.sin(T[i]));
  }
  if (n2 > n1) s[n] = mu + sigma * (R[n1] * Math.cos(T[n1]));

  return s;
}

/**
 * @category Continuous distributions
 */
export class Normal extends LocationScale {
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
  constructor(mu?: number, sigma?: number) {
    super(mu, sigma);
  }

  pdf(x: number): number {
    return (
      this.support.checkPDF(x) ??
      Math.exp(-0.5 * Math.pow(this.params.normalize(x), 2)) / (SQRT_2_PI * this.params.scale)
    );
  }

  cdf(x: number): number {
    return this.support.checkCDF(x) ?? stdNormalCDF(this.params.normalize(x));
  }

  quantile(q: number): number {
    return (
      this.support.checkQuantile(q) ??
      this.params.location + stdNormalQuantile(q) * this.params.scale
    );
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    const method = options.method ?? "inverse";
    n |= 0;
    ValidationError.check["number-not-positive"]({ arg: "n" }, n)?.raise();

    switch (method) {
      case "box-muller":
        return randomNormalBoxMuller.call(this, n, options);
      case "inverse":
      default:
        return randomArray(n, options.rand).map((u) => this.quantile(u));
    }
  }

  mean(): number {
    return this.params.location;
  }

  variance(): number {
    return Math.pow(this.params.scale, 2);
  }

  mode(): number {
    return this.params.location;
  }

  skewness(): number {
    return 0.0;
  }
}

/**
 * @category Continuous distributions
 */
export class LogNormal extends LocationScale {
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
  constructor(mu?: number, sigma?: number) {
    super(mu, sigma);
    this.support = new Interval(0, Infinity, true, true);
  }

  pdf(x: number): number {
    return (
      this.support.checkPDF(x) ??
      Math.exp(-0.5 * Math.pow(this.params.normalize(Math.log(x)), 2)) /
        (x * SQRT_2_PI * this.params.scale)
    );
  }

  cdf(x: number): number {
    return this.support.checkCDF(x) ?? stdNormalCDF(this.params.normalize(Math.log(x)));
  }

  quantile(q: number): number {
    return (
      this.support.checkQuantile(q) ??
      Math.exp(this.params.location + stdNormalQuantile(q) * this.params.scale)
    );
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    const method = options.method ?? "inverse";
    n |= 0;
    ValidationError.check["number-not-positive"]({ arg: "n" }, n)?.raise();

    switch (method) {
      case "box-muller":
        return randomNormalBoxMuller.call(this, n, options).map((z) => Math.exp(z));
      case "inverse":
      default:
        return randomArray(n, options.rand).map((u) => this.quantile(u));
    }
  }

  mean(): number {
    const { location: mu, scale: sigma } = this.params;
    return Math.exp(mu + Math.pow(sigma, 2) * 0.5);
  }

  variance(): number {
    const { location: mu, scale: sigma } = this.params;
    const sig2 = Math.pow(sigma, 2);
    return (Math.exp(sig2) - 1.0) * Math.exp(2.0 * mu + sig2);
  }

  mode(): number {
    const { location: mu, scale: sigma } = this.params;
    return Math.exp(mu - Math.pow(sigma, 2));
  }

  skewness(): number {
    const { scale: sigma } = this.params;
    const sig2 = Math.pow(sigma, 2);
    return (Math.exp(sig2) + 2.0) * Math.sqrt(Math.exp(sig2) - 1.0);
  }
}

/**
 * @category Continuous distributions
 */
export class FoldedNormal extends LocationScale {
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
  constructor(mu?: number, sigma?: number) {
    super(mu, sigma);
    this.support = new Interval(0, Infinity, false, true);
  }

  pdf(x: number): number {
    const { location: mu, scale: sigma } = this.params;
    return (
      this.support.checkPDF(x) ??
      (Math.exp(-Math.pow((x - mu) / sigma, 2) * 0.5) +
        Math.exp(-Math.pow((x + mu) / sigma, 2) * 0.5)) /
        (sigma * SQRT_2_PI)
    );
  }

  cdf(x: number): number {
    const { location: mu, scale: sigma } = this.params;
    const c = sigma * Math.SQRT2;
    return (
      this.support.checkCDF(x) ?? (errorFunction((x + mu) / c) + errorFunction((x - mu) / c)) * 0.5
    );
  }

  quantile(q: number, eps: number = 1e-12): number {
    const { location: mu, scale: sigma } = this.params;
    const c = sigma * SQRT_2_PI;
    const c2 = 2.0 * Math.pow(sigma, 2);
    const denom = sigma * Math.SQRT2;

    const check = this.support.checkQuantile(q);
    if (check !== null) return check;

    let x0 = stdNormalQuantile(q);
    if (mu === 0.0) return x0 * sigma * Math.SQRT1_2;

    if (mu > 10.0) {
      const xs = x0 * sigma + mu;
      return xs < 0.0 ? 0.0 : xs;
    }

    if (x0 < 0.0) x0 = 0.0;

    let f: number;
    let F: number;
    let delta = 1.0;
    F = 0.0;

    while (Math.abs(delta) > eps) {
      f = (Math.exp(-Math.pow(x0 - mu, 2) / c2) + Math.exp(-Math.pow(x0 + mu, 2) / c2)) / c;
      if (f < eps) break;
      F = (errorFunction((x0 + mu) / denom) + errorFunction((x0 - mu) / denom)) * 0.5;
      delta = (F - q) / f;
      x0 -= delta;
    }

    return x0;
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    const method = options.method ?? "inverse";
    n |= 0;
    ValidationError.check["number-not-positive"]({ arg: "n" }, n)?.raise();

    switch (method) {
      case "box-muller":
        return randomNormalBoxMuller.call(this, n, options).map((z) => Math.abs(z));
      case "inverse":
      default:
        return randomArray(n, options.rand).map((u) => this.quantile(u));
    }
  }

  mean(): number {
    const { location: mu, scale: sigma } = this.params;
    const frac = mu / sigma;
    return (
      ((sigma * Math.SQRT2) / SQRT_PI) * Math.exp(-Math.pow(frac, 2) * 0.5) +
      mu * (1.0 - 2.0 * stdNormalCDF(-frac))
    );
  }

  variance(): number {
    const { location: mu, scale: sigma } = this.params;
    return Math.pow(mu, 2) + Math.pow(sigma, 2) - Math.pow(this.mean(), 2);
  }

  mode(): number {
    const { location: mu, scale: sigma } = this.params;
    if (mu < sigma) return 0.0;
    if (mu > 3 * sigma) return mu;
    return NaN;
  }

  skewness(): number {
    // Not implemented
    return NaN;
  }
}
