import { LocationScale } from "../abstract-location-scale.js";

/**
 * @category Continuous distributions
 */
export class Laplace extends LocationScale {
  /**
   * The Laplace distribution
   *
   * @example
   * const x = new Laplace(1, 1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(location?: number, scale?: number) {
    super(location, scale);
  }

  override pdf(x: number): number {
    return (Math.exp(-Math.abs(this.params.normalize(x))) * 0.5) / this.params.scale;
  }

  override cdf(x: number): number {
    const z = this.params.normalize(x);
    if (x <= this.params.location) return Math.exp(z) * 0.5;
    return 1 - Math.exp(-z) * 0.5;
  }

  override quantile(q: number): number {
    const check = super.quantile(q);
    if (check !== null) return check;
    if (q <= 0.5) return this.params.location + this.params.scale * Math.log(2.0 * q);
    return this.params.location - this.params.scale * Math.log(2.0 * (1.0 - q));
  }

  mean(): number {
    return this.params.location;
  }

  variance(): number {
    return 2 * Math.pow(this.params.scale, 2);
  }

  mode(): number {
    return this.params.location;
  }

  skewness(): number {
    return 0.0;
  }
}
