import { ValidationError } from "@envisim/utils";
import { logBinomialCoefficient } from "./utils.js";

export { BetaParams } from "./beta-utils.js";
export { BoundedParams, BoundedMidParams } from "./abstract-bounded.js";
export { LocationScaleParams } from "./abstract-location-scale.js";
export { ShapeScaleParams } from "./abstract-shape-scale.js";

export class BenfordMantissaParams {
  static DEFAULTS = {
    /**
     * The
     */
    base: 10,
  } as const;
  #base: number;

  #logBase: number;

  constructor(base: number = BenfordMantissaParams.DEFAULTS.base) {
    if (base <= 1.0)
      throw ValidationError.createNumber("number-not-in-interval", "base", "1 < base");
    this.#base = base;
    this.#logBase = Math.log(base);
  }

  get base() {
    return this.#base;
  }

  get logBase() {
    return this.#logBase;
  }
}

export class BernoulliParams {
  static DEFAULTS = { p: 0.5 } as const;
  #p: number;

  constructor(p: number = BernoulliParams.DEFAULTS.p) {
    if (p <= 0.0 || 1.0 <= p)
      throw ValidationError.createNumber("number-not-in-interval", "p", "0 < p < 1");
    this.#p = p;
  }

  get p() {
    return this.#p;
  }

  get q() {
    return 1.0 - this.#p;
  }

  #logq?: number;
  get logq() {
    return this.#logq ?? (this.#logq = Math.log(this.q));
  }
}

export class BinomialParams extends BernoulliParams {
  static override DEFAULTS = { p: 0.5, n: 1 } as const;
  #n: number;

  constructor(n: number = BinomialParams.DEFAULTS.n, p: number = BinomialParams.DEFAULTS.p) {
    super(p);
    this.#n = n | 0;
    ValidationError.checkNumber("number-not-positive", "n", this.#n)?.cast();
  }

  get n() {
    return this.#n;
  }
}

export class DegreesOfFreedomParams {
  static DEFAULTS = { df: 2 } as const;
  #df: number;

  constructor(df: number = DegreesOfFreedomParams.DEFAULTS.df) {
    this.#df = df | 0;
    ValidationError.checkNumber("number-not-positive", "df", this.#df);
  }

  get df() {
    return this.#df;
  }
}

export class HypergeometricParams {
  static DEFAULTS = { N: 20, K: 5, n: 10 };
  #N: number;
  #K: number;
  #n: number;

  /**
   * @param N - population size
   * @param K - size of marked population
   * @param n - Sample size
   */
  constructor(
    N: number = HypergeometricParams.DEFAULTS.N,
    K: number = HypergeometricParams.DEFAULTS.K,
    n: number = HypergeometricParams.DEFAULTS.n,
  ) {
    this.#N = N | 0;
    ValidationError.checkNumber("number-not-positive", "N", this.#N)?.cast();

    this.#K = K | 0;
    if (this.#K < 0 || this.#N < this.#K)
      throw ValidationError.createNumber("number-not-in-interval", "K", "0 <= K <= N");

    this.#n = n | 0;
    if (this.#n < 0 || this.#N < this.#n)
      throw ValidationError.createNumber("number-not-in-interval", "n", "0 <= n <= N");
  }

  get N() {
    return this.#N;
  }
  get K() {
    return this.#K;
  }
  get n() {
    return this.#n;
  }

  #lbc?: number;
  get lbc() {
    return this.#lbc ?? (this.#lbc = logBinomialCoefficient(this.#N, this.#n));
  }
}

export class RadiusParams {
  static DEFAULTS = { radius: 1.0 } as const;
  #radius: number;

  #radiusSquared: number;
  #denom: number;

  constructor(radius: number = RadiusParams.DEFAULTS.radius) {
    ValidationError.checkNumber("number-not-positive", "radius", radius)?.cast();
    this.#radius = radius;

    this.#radiusSquared = Math.pow(radius, 2);
    this.#denom = 1.0 / (Math.PI * this.#radiusSquared);
  }

  get radius() {
    return this.#radius;
  }

  get radiusSquared() {
    return this.#radiusSquared;
  }
  get denom() {
    return this.#denom;
  }
}

export class RateParams {
  static DEFAULTS = { rate: 1.0 } as const;
  #rate: number;

  constructor(rate: number = RateParams.DEFAULTS.rate) {
    ValidationError.checkNumber("number-not-positive", "rate", rate)?.cast();
    this.#rate = rate;
  }

  get rate() {
    return this.#rate;
  }
}
