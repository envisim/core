import {
  Distribution,
  Interval,
  type RandomOptions,
  randomOptionsDefault,
} from '../abstract-distribution.js';
import {
  inverseRegularizedBetaFunction,
  logBetaFunction,
  regularizedBetaFunction,
} from '../beta-utils.js';
import {type ParamsBeta, betaDefault} from '../params.js';
import {assertPositiveInteger} from '../utils.js';
import {randomBeta} from './beta-random.js';

export class Beta extends Distribution<ParamsBeta> {
  protected params: ParamsBeta = {...betaDefault};
  protected lbf!: number;

  /**
   * The Beta distribution
   *
   * @example
   * const x = new Beta(1, 1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.1)
   * x.random(10);
   */
  constructor(alpha: number = betaDefault.alpha, beta: number = betaDefault.beta) {
    super();
    this.setParameters({alpha, beta});
    return this;
  }

  setParameters(params: ParamsBeta = {...betaDefault}): void {
    if (params.alpha <= 0.0) throw new RangeError('alpha must be larger than 0');
    if (params.beta <= 0.0) throw new RangeError('beta must be larger than 0');
    this.support = new Interval(0.0, 1.0, false, false);
    this.params.alpha = params.alpha;
    this.params.beta = params.beta;
    this.lbf = logBetaFunction(params);
  }

  pdf(x: number): number {
    const alpha = this.params.alpha - 1.0;
    const beta = this.params.beta - 1.0;

    return (
      this.support.checkPDF(x) ??
      Math.exp(alpha * Math.log(x) + beta * Math.log(1.0 - x) - this.lbf)
    );
  }

  cdf(x: number, eps: number = 1e-20): number {
    return this.support.checkCDF(x) ?? regularizedBetaFunction(x, this.params, eps, this.lbf);
  }

  quantile(q: number, eps: number = 1e-20): number {
    return (
      this.support.checkQuantile(q) ?? inverseRegularizedBetaFunction(q, this.params, eps, this.lbf)
    );
  }

  override random(n: number = 1, {rand = randomOptionsDefault.rand}: RandomOptions = {}): number[] {
    assertPositiveInteger(n);
    return randomBeta(n, this.params, rand);
  }

  mean(): number {
    const {alpha, beta} = this.params;
    return alpha / (alpha + beta);
  }

  variance(): number {
    const {alpha, beta} = this.params;
    return (alpha * beta) / (Math.pow(alpha + beta, 2) * (alpha + beta + 1));
  }

  mode(): number {
    const {alpha, beta} = this.params;
    if (alpha <= 1.0) return 0.0;
    if (alpha > 1.0 && beta <= 1.0) return 1.0;
    return (alpha - 1) / (alpha + beta - 2);
  }

  skewness(): number {
    const {alpha, beta} = this.params;
    return (
      ((2 * (beta - alpha)) / (alpha + beta + 2)) * Math.sqrt((alpha + beta + 1) / (alpha * beta))
    );
  }
}

export class BetaPrime extends Distribution<ParamsBeta> {
  protected params: ParamsBeta = {...betaDefault};
  protected lbf!: number;

  /**
   * The Beta Prime distribution
   *
   * @example
   * const x = new BetaPrime(1, 1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.1)
   * x.random(10);
   */
  constructor(alpha: number = betaDefault.alpha, beta: number = betaDefault.beta) {
    super();
    this.setParameters({alpha, beta});
    return this;
  }

  setParameters(params: ParamsBeta = {...betaDefault}): void {
    if (params.alpha <= 0) throw new RangeError('alpha must be larger than 0');
    if (params.beta <= 0) throw new RangeError('beta must be larger than 0');
    this.support = new Interval(0, Infinity, false, true);
    this.params.alpha = params.alpha;
    this.params.beta = params.beta;
    this.lbf = logBetaFunction(params);
  }

  pdf(x: number): number {
    const check = this.support.checkPDF(x);
    if (check !== null) return check;

    const beta = this.params.alpha + this.params.beta;
    const alpha = this.params.alpha - 1.0;

    if (x === 0.0) return alpha === 0.0 ? Math.exp(-beta * Math.log1p(x) - this.lbf) : 0.0;

    return Math.exp(alpha * Math.log(x) - beta * Math.log1p(x) - this.lbf);
  }

  cdf(x: number, eps: number = 1e-20): number {
    return (
      this.support.checkCDF(x) ?? regularizedBetaFunction(x / (1 + x), this.params, eps, this.lbf)
    );
  }

  quantile(q: number, eps: number = 1e-20): number {
    const check = this.support.checkQuantile(q);
    if (check !== null) return check;
    const inv = inverseRegularizedBetaFunction(q, this.params, eps, this.lbf);
    return inv / (1.0 - inv);
  }

  override random(n: number = 1, {rand = randomOptionsDefault.rand}: RandomOptions = {}): number[] {
    assertPositiveInteger(n);
    return randomBeta(n, this.params, rand).map((v) => v / (1.0 - v));
  }

  mean(): number {
    const {alpha, beta} = this.params;
    if (beta <= 1) return Infinity;
    return alpha / (beta - 1);
  }

  variance(): number {
    const {alpha, beta} = this.params;
    if (beta <= 2) return Infinity;
    return (alpha * (alpha + beta - 1)) / ((beta - 2) * Math.pow(beta - 1, 2));
  }

  mode(): number {
    const {alpha, beta} = this.params;
    if (alpha < 1.0) return 0.0;
    return (alpha - 1) / (beta + 1);
  }

  skewness(): number {
    const {alpha, beta} = this.params;
    if (beta <= 3) return Infinity;
    return (
      ((2 * (2 * alpha + beta - 1)) / (beta - 3)) *
      Math.sqrt((beta - 2) / (alpha * (alpha + beta - 1)))
    );
  }
}
