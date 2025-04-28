import { LocationScale } from "../abstract-location-scale.js";

/**
 * @category Continuous distributions
 */
export class Cauchy extends LocationScale {
  /**
   * The Cauchy distribution
   *
   * @example
   * const x = new Cauchy(1, 1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.1)
   * x.random(10);
   */
  constructor(location?: number, scale?: number) {
    super(location, scale);
  }

  pdf(x: number): number {
    const c = Math.PI * this.params.scale;

    return this.support.checkPDF(x) ?? 1.0 / (c * (1.0 + Math.pow(this.params.normalize(x), 2)));
  }

  cdf(x: number): number {
    return this.support.checkCDF(x) ?? 0.5 + Math.atan(this.params.normalize(x)) / Math.PI;
  }

  quantile(q: number): number {
    return (
      this.support.checkQuantile(q) ??
      this.params.location + this.params.scale * Math.tan(Math.PI * (q - 0.5))
    );
  }

  mean(): number {
    return NaN;
  }

  variance(): number {
    return NaN;
  }

  mode(): number {
    return this.params.location;
  }

  skewness(): number {
    return NaN;
  }
}
