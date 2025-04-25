import { Interval } from "../abstract-distribution.js";
import { LocationScale } from "../abstract-location-scale.js";
import { ShapeScale } from "../abstract-shape-scale.js";

export class Logistic extends LocationScale {
  /**
   * The Logistic distribution
   *
   * @example
   * const x = new Logistic(2, 1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(location?: number, scale?: number) {
    super(location, scale);
  }

  pdf(x: number): number {
    const check = this.support.checkPDF(x);
    if (check !== null) return check;
    const exp = Math.exp(-this.params.normalize(x));
    return exp / (this.params.scale * Math.pow(exp + 1.0, 2));
  }

  cdf(x: number): number {
    return this.support.checkCDF(x) ?? 1.0 / (1.0 + Math.exp(-this.params.normalize(x)));
  }

  quantile(q: number): number {
    return (
      this.support.checkQuantile(q) ??
      this.params.location - this.params.scale * Math.log(1.0 / q - 1.0)
    );
  }

  mean(): number {
    return this.params.location;
  }

  variance(): number {
    const { scale } = this.params;
    return Math.pow(scale * Math.PI, 2) / 3.0;
  }

  mode(): number {
    return this.params.location;
  }

  skewness(): number {
    return 0.0;
  }
}

export class LogLogistic extends ShapeScale {
  /**
   * The Log-Logistic distribution
   *
   * @example
   * const x = new LogLogistic(1, 2);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile([0.1, 0.5])
   * x.random(10);
   */
  constructor(shape?: number, scale?: number) {
    super(shape, scale);
    this.support = new Interval(0.0, Infinity, false, true);
  }

  pdf(x: number): number {
    const c = this.params.shape / this.params.scale;
    const shapem1 = this.params.shape - 1.0;
    const frac = x / this.params.scale;
    const pow = Math.pow(frac, shapem1);

    return this.support.checkPDF(x) ?? (c * pow) / Math.pow(1.0 + pow * frac, 2);
  }

  cdf(x: number): number {
    return (
      this.support.checkCDF(x) ?? 1.0 / (1.0 + Math.pow(x / this.params.scale, -this.params.shape))
    );
  }

  quantile(q: number): number {
    const c = 1.0 / this.params.shape;

    return this.support.checkQuantile(q) ?? this.params.scale * Math.pow(q / (1.0 - q), c);
  }

  mean(): number {
    const { scale, shape } = this.params;
    if (shape <= 1) return NaN;
    const frac = Math.PI / shape;
    return (scale * frac) / Math.sin(frac);
  }

  variance(): number {
    const { scale, shape } = this.params;
    if (shape <= 2) return NaN;
    const frac = Math.PI / shape;
    return (
      Math.pow(scale, 2) * frac * (2 / Math.sin(2 * frac) - frac / Math.pow(Math.sin(frac), 2))
    );
  }

  mode(): number {
    const { scale, shape } = this.params;
    if (shape <= 1.0) return 0.0;
    return scale * Math.pow((shape - 1) / (shape + 1), 1 / shape);
  }

  /** @deprecated */
  skewness(): number {
    // Not implemented
    return NaN;
  }
}
