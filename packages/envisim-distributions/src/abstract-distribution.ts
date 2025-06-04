import { Random, type RandomGenerator, randomArray } from "@envisim/random";
import {
  inInterval,
  type Interval,
  isLeftOfInterval,
  isRightOfInterval,
  ValidationError,
} from "@envisim/utils";

/**
 * @category Interfaces
 */
export interface RandomOptions {
  /**
   * A random generator
   * @defaultValue `new Random()`
   */
  rand: RandomGenerator;
  /**
   * Epsilon, used during comparisons of floats
   * @defaultValue `1e-12`
   */
  eps?: number;
  method?: string;
}
/** @internal */
export const RANDOM_OPTIONS_DEFAULT: RandomOptions = {
  rand: new Random(),
  eps: 1e-12,
} as const;

export abstract class Distribution {
  support: Interval | undefined = undefined;
  /** @internal */
  #continuous: boolean = true;

  constructor(isContinuous: boolean = true) {
    this.#continuous = isContinuous;
  }

  /**
   * The probability density/mass function evaluated at `x`.
   */
  pdf(x: number, _eps?: number): number | null {
    return this.support === undefined || inInterval(x, this.support) ? null : 0.0;
  }
  /**
   * The cumulative distribution function evaluated at `x`.
   */
  cdf(x: number, _eps?: number): number | null {
    if (this.support === undefined) return null;
    if (isLeftOfInterval(x, this.support)) return 0.0;
    if (isRightOfInterval(x, this.support)) return 1.0;
    if (this.#continuous && this.support?.interval[0] === x) return 0.0;
    return null;
  }
  /**
   * The quantile function evaluated at `q`.
   */
  quantile(q: number, _eps?: number): number | null {
    if (q < 0.0 || q > 1.0) return NaN;
    if (q === 0.0) return this.support?.interval[0] ?? -Infinity;
    if (q === 1.0) return this.support?.interval[1] ?? Infinity;
    return null;
  }
  /**
   * Generate random numbers from the distribution.
   * @param n - the number of observations to be generated
   */
  random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    n = Math.trunc(n);
    ValidationError.check["number-not-positive"]({ arg: "n" }, n)?.raise();
    const u = randomArray(n, options.rand);
    return u.map((v) => this.quantile(v) as number);
  }

  /** the mean value */
  abstract mean(): number;
  /** the variance */
  abstract variance(): number;
  /** standard deviation */
  sd(): number {
    return Math.sqrt(this.variance());
  }
  /** @returns the mode */
  abstract mode(): number;
  /** @returns the skewness */
  abstract skewness(): number;
}

/** @internal */
export function cornishFisherExpansion(this: Distribution, x: number): number {
  return this.mean() + this.sd() * (x + (this.skewness() * (Math.pow(x, 2) - 1.0)) / 6.0);
}

/** @internal */
export function quantileCF(
  this: Distribution,
  q: number,
  startK: number,
  startCDF: number,
): number {
  if (startCDF === q) return startK;

  let cdf = startCDF;
  let k = startK;
  let run = 0;
  if (cdf > q) {
    const excludesLeft = (x: number): boolean =>
      this.support !== undefined && isLeftOfInterval(x, this.support);

    while (run++ <= 1e5) {
      cdf -= this.pdf(k) as number;
      // cdf -= pmf(k - 1);
      if (cdf === q) return k - 1;
      if (cdf < q || excludesLeft(k)) return k;
      k--;
    }
  } else {
    const excludesRight = (x: number): boolean =>
      this.support !== undefined && isRightOfInterval(x, this.support);

    while (run++ <= 1e5) {
      cdf += this.pdf(k + 1) as number;
      if (cdf >= q) return k + 1;
      if (excludesRight(k)) return k;
      k++;
    }
  }

  console.warn("quantile not found in 1e5 iterations");
  return k;
}
