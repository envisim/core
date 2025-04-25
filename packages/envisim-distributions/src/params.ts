import { logBinomialCoefficient } from "./utils.js";

export { BetaParams } from "./beta-utils.js";
export { BoundedParams, BoundedMidParams } from "./abstract-bounded.js";
export { LocationScaleParams } from "./abstract-location-scale.js";
export { ShapeScaleParams } from "./abstract-shape-scale.js";

export class BenfordMantissaParams {
  static DEFAULTS = { base: 10 } as const;
  #base: number;

  #logBase: number;

  constructor(base: number = BenfordMantissaParams.DEFAULTS.base) {
    if (base <= 1.0) throw new RangeError("base must be larger than 1");
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
    if (p <= 0.0 || 1.0 <= p) throw new RangeError("p must be in (0,1)");
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
    if (!Number.isInteger(n) || n < 1) throw new RangeError("n must be an integer > 0");
    this.#n = n;
  }

  get n() {
    return this.#n;
  }
}

export class DegreesOfFreedomParams {
  static DEFAULTS = { df: 2 } as const;
  #df: number;

  constructor(df: number = DegreesOfFreedomParams.DEFAULTS.df) {
    if (!Number.isInteger(df) || df < 1) throw new RangeError("df must be an integer > 0");
    this.#df = df;
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
    if (!Number.isInteger(N) || !Number.isInteger(K) || !Number.isInteger(n))
      throw new RangeError("N, K, n must be integer");

    if (N <= 0) throw new RangeError("N must be > 0");
    this.#N = N;

    if (K < 0 || N < K) throw new RangeError("K must be in [0,N]");
    this.#K = K;

    if (n < 0 || N < n) throw new RangeError("n must be in [0,N]");
    this.#n = n;
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
    if (radius < 0.0) throw new RangeError("radius must be > 0.0");
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
    if (rate < 0.0) throw new RangeError("rate must be > 0.0");
    this.#rate = rate;
  }

  get rate() {
    return this.#rate;
  }
}
