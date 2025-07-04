import { ValidationError } from "@envisim/utils";
import {
  Distribution,
  type RandomOptions,
  RANDOM_OPTIONS_DEFAULT,
  cornishFisherExpansion,
  quantileCF,
} from "../abstract-distribution.js";
import { randomShapeGamma } from "../continuous/gamma-random.js";
import { stdNormalQuantile } from "../continuous/normal-utils.js";
import { BetaParams, BinomialParams } from "../params.js";
import { logBinomialCoefficient } from "../utils.js";
import { randomBinomial } from "./binomial-random.js";
import { randomPoisson } from "./poisson-random.js";

/**
 * @category Discrete distributions
 */
export class Binomial extends Distribution {
  /** @internal */
  #params!: BinomialParams;

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
  constructor(n?: number, p?: number) {
    super(false);
    this.#params = new BinomialParams(n, p);
    this.support = { interval: [0, this.params.n], ends: "closed" };
  }

  /** @internal */
  get params() {
    return this.#params;
  }

  override pdf(x: number): number {
    const p = Math.log(this.params.p);
    const q = this.params.logq;

    return (
      super.pdf(x) ??
      Math.exp(logBinomialCoefficient(this.params.n, x) + x * p + (this.params.n - x) * q)
    );
  }

  override cdf(x: number, eps: number = 1e-20): number {
    const xl = x | 0;
    return (
      super.cdf(x) ??
      new BetaParams(this.params.n - xl, xl + 1).regularizedBetaFunction(this.params.q, eps)
    );
  }

  override quantile(q: number, eps: number = 1e-20): number {
    const check = super.quantile(q);
    if (check !== null) return check;

    const z = stdNormalQuantile(q);
    const x = cornishFisherExpansion.call(this, z) | 0;
    const cdf = new BetaParams(this.params.n - x, x + 1).regularizedBetaFunction(
      this.params.q,
      eps,
    );

    return quantileCF.call(this, q, x, cdf);
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    n = Math.trunc(n);
    ValidationError.check["number-not-positive"]({ arg: "n" }, n)?.raise();
    return randomBinomial(n, this.params.n, this.params.p, options.rand);
  }

  mean(): number {
    return this.params.n * this.params.p;
  }

  variance(): number {
    const { n, p, q } = this.params;
    return n * p * q;
  }

  mode(): number {
    return Math.floor((this.params.n + 1) * this.params.p);
  }

  skewness(): number {
    const { n, p, q } = this.params;
    return (q - p) / Math.sqrt(n * p * q);
  }
}

/**
 * @category Discrete distributions
 */
export class NegativeBinomial extends Distribution {
  /** @internal */
  #params!: BinomialParams;

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
  constructor(n?: number, p?: number) {
    super(false);
    this.#params = new BinomialParams(n, p);
    this.support = { interval: [0, Infinity], ends: "right-open" };
  }

  /** @internal */
  get params() {
    return this.#params;
  }

  override pdf(x: number): number {
    const p = Math.log(this.params.p);
    const q = this.params.logq;

    return (
      super.pdf(x) ??
      Math.exp(logBinomialCoefficient(x + this.params.n - 1, x) + x * p + this.params.n * q)
    );
  }

  override cdf(x: number, eps: number = 1e-20): number {
    return (
      super.cdf(x) ??
      1.0 - new BetaParams((x | 0) + 1, this.params.n).regularizedBetaFunction(this.params.p, eps)
    );
  }

  override quantile(q: number, eps: number = 1e-20): number {
    const check = super.quantile(q);
    if (check !== null) return check;

    const z = stdNormalQuantile(q);
    const x = cornishFisherExpansion.call(this, z) | 0;
    const cdf =
      1.0 - new BetaParams(x + 1, this.params.n).regularizedBetaFunction(this.params.p, eps);

    return quantileCF.call(this, q, x, cdf);
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    n = Math.trunc(n);
    ValidationError.check["number-not-positive"]({ arg: "n" }, n)?.raise();

    const c = this.params.p / this.params.q;
    const s = randomShapeGamma(n, this.params.n, options.rand, c);
    return s.map((e) => randomPoisson(1, e, options.rand)[0]);
  }

  mean(): number {
    const { n, p, q } = this.params;
    return (n * p) / q;
  }

  variance(): number {
    const { n, p, q } = this.params;
    return (n * p) / Math.pow(q, 2);
  }

  mode(): number {
    const { n, p, q } = this.params;
    if (n === 1) return 0;
    return Math.floor(((n - 1) * p) / q);
  }

  skewness(): number {
    const { n, p } = this.params;
    return (1 + p) / Math.sqrt(n * p);
  }
}
