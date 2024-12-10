import {
  Distribution,
  Interval,
  RandomOptions,
  randomOptionsDefault,
} from '../abstract-distribution.js';
import {regularizedBetaFunction} from '../beta-utils.js';
import {randomShapeGamma} from '../continuous/gamma-random.js';
import {stdNormalQuantile} from '../continuous/normal-utils.js';
import {ParamsBinomial, binomialCheck, binomialDefault} from '../params.js';
import {assertPositiveInteger, logBinomialCoefficient} from '../utils.js';
import {randomBinomial} from './binomial-random.js';
import {randomPoisson} from './poisson-random.js';

export class Binomial extends Distribution<ParamsBinomial> {
  protected params: ParamsBinomial = {...binomialDefault};

  /**
   * The Binomial distribution
   *
   * @example
   * const params = { n: 10, p: 0.5 };
   * const x = new Binomial(10, 0.5);
   * x.pdf(5);
   * x.cdf(5);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(n: number = binomialDefault.n, p: number = binomialDefault.p) {
    super();
    this.setParameters({n, p});
    return this;
  }

  setParameters(params: ParamsBinomial = {...binomialDefault}): void {
    binomialCheck(params);
    this.support = new Interval(0, params.n, false, false);
    this.params.n = params.n;
    this.params.p = params.p;
  }

  pdf(x: number): number {
    const p = Math.log(this.params.p);
    const q = Math.log(1.0 - this.params.p);

    return (
      this.support.checkPDFInt(x) ??
      Math.exp(logBinomialCoefficient(this.params.n, x) + x * p + (this.params.n - x) * q)
    );
  }

  cdf(x: number, eps: number = 1e-20): number {
    const q = 1.0 - this.params.p;

    const xl = x | 0;
    return (
      this.support.checkCDFInt(x) ??
      regularizedBetaFunction(q, {alpha: this.params.n - xl, beta: xl + 1}, eps)
    );
  }

  quantile(q: number, eps: number = 1e-20): number {
    const check = this.support.checkQuantile(q);
    if (check !== null) return check;

    const z = stdNormalQuantile(q);
    const x = this.cornishFisherExpansion(z) | 0;
    const cdf = regularizedBetaFunction(
      1.0 - this.params.p,
      {alpha: this.params.n - x, beta: x + 1},
      eps,
    );

    return this.quantileCF(q, x, cdf);
  }

  override random(n: number = 1, {rand = randomOptionsDefault.rand}: RandomOptions = {}): number[] {
    assertPositiveInteger(n);
    return randomBinomial(n, this.params.n, this.params.p, rand);
  }

  mean(): number {
    return this.params.n * this.params.p;
  }

  variance(): number {
    const {n, p} = this.params;
    return n * p * (1.0 - p);
  }

  mode(): number {
    return Math.floor((this.params.n + 1) * this.params.p);
  }

  skewness(): number {
    const {p} = this.params;
    const q = 1.0 - p;
    return (q - p) / Math.sqrt(this.params.n * p * q);
  }
}

export class NegativeBinomial extends Distribution<ParamsBinomial> {
  protected params: ParamsBinomial = {...binomialDefault};

  /**
   * The Negative Binomial distribution
   *
   * @example
   * const x = new NegativeBinomial(10, 0.5);
   * x.pdf(5);
   * x.cdf(5);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(n: number = binomialDefault.n, p: number = binomialDefault.p) {
    super();
    this.setParameters({n, p});
    return this;
  }

  setParameters(params: ParamsBinomial = {...binomialDefault}): void {
    binomialCheck(params);
    this.support = new Interval(0, Infinity, false, true);
    this.params.n = params.n;
    this.params.p = params.p;
  }

  pdf(x: number): number {
    const p = Math.log(this.params.p);
    const q = Math.log(1.0 - this.params.p);

    return (
      this.support.checkPDFInt(x) ??
      Math.exp(logBinomialCoefficient(x + this.params.n - 1, x) + x * p + this.params.n * q)
    );
  }

  cdf(x: number, eps: number = 1e-20): number {
    return (
      this.support.checkCDFInt(x) ??
      1.0 - regularizedBetaFunction(this.params.p, {alpha: (x | 0) + 1, beta: this.params.n}, eps)
    );
  }

  quantile(q: number, eps: number = 1e-20): number {
    const check = this.support.checkQuantile(q);
    if (check !== null) return check;

    const z = stdNormalQuantile(q);
    const x = this.cornishFisherExpansion(z) | 0;
    const cdf =
      1.0 - regularizedBetaFunction(this.params.p, {alpha: x + 1, beta: this.params.n}, eps);

    return this.quantileCF(q, x, cdf);
  }

  override random(n: number = 1, {rand = randomOptionsDefault.rand}: RandomOptions = {}): number[] {
    assertPositiveInteger(n);

    const c = this.params.p / (1.0 - this.params.p);
    const s = randomShapeGamma(n, this.params.n, rand, c);
    return s.map((e) => randomPoisson(1, e, rand)[0]);
  }

  mean(): number {
    const {n, p} = this.params;
    return (n * p) / (1 - p);
  }

  variance(): number {
    const {n, p} = this.params;
    return (n * p) / Math.pow(1 - p, 2);
  }

  mode(): number {
    const {n, p} = this.params;
    if (n === 1) return 0;
    return Math.floor(((n - 1) * p) / (1 - p));
  }

  skewness(): number {
    const {n, p} = this.params;
    return (1 + p) / Math.sqrt(n * p);
  }
}
