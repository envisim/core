import { LocationScale } from "../abstract-location-scale.js";
import { EULERSCONSTANT } from "../math-constants.js";

/* eslint-disable-next-line no-loss-of-precision */
export const RIEMANN_ZETA_FUN_3 = 1.202056903159594285399;

/**
 * @category Continuous distributions
 */
export class ExtremeValue extends LocationScale {
  /**
   * The Extreme Value distribution
   *
   * @example
   * const x = new ExtremeValue(0, 1);
   * x.pdf(1);
   * x.quantile(0.5)
   */
  constructor(location?: number, scale?: number) {
    super(location, scale);
  }

  override pdf(x: number): number {
    const exp = Math.exp(-this.params.normalize(x));
    return (exp * Math.exp(-exp)) / this.params.scale;
  }

  override cdf(x: number): number {
    return Math.exp(-Math.exp(-this.params.normalize(x)));
  }

  override quantile(q: number): number {
    return super.quantile(q) ?? this.params.location - Math.log(-Math.log(q)) * this.params.scale;
  }

  mean(): number {
    const { location, scale } = this.params;
    return location + scale * EULERSCONSTANT;
  }

  variance(): number {
    const { scale } = this.params;
    return Math.pow(scale * Math.PI, 2) / 6.0;
  }

  mode(): number {
    return this.params.location;
  }

  skewness(): number {
    return (12 * Math.sqrt(6) * RIEMANN_ZETA_FUN_3) / Math.pow(Math.PI, 3);
  }
}
