import { Interval } from "../abstract-distribution.js";
import { ShapeScale } from "../abstract-shape-scale.js";
import { gammaFunction } from "../gamma-utils.js";

export class Weibull extends ShapeScale {
  /**
   * The Weibull distribution
   *
   * @example
   * const x = new Weibull(1, 2);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(shape?: number, scale?: number) {
    super(shape, scale);
    this.support = new Interval(0, Infinity, false, true);
  }

  pdf(x: number): number {
    const check = this.support.checkPDF(x);
    if (check !== null) return check;

    const c1 = Math.log(this.params.shape);
    const c2 = Math.log(this.params.scale) * this.params.shape;
    const shapem1 = this.params.shape - 1.0;
    const zeroval = this.params.shape === 1.0 ? 1.0 : this.params.shape < 1.0 ? Infinity : 0.0;

    if (x === 0.0) return zeroval;
    const ly = Math.log(x);
    return Math.exp(c1 - c2 + ly * shapem1 - Math.exp(this.params.shape * ly - c2));
  }

  cdf(x: number): number {
    return (
      this.support.checkCDF(x) ??
      1.0 - Math.exp(-Math.pow(x / this.params.scale, this.params.shape))
    );
  }

  quantile(q: number): number {
    const check = this.support.checkQuantile(q);
    if (check !== null) return check;

    const c1 = 1.0 / this.params.shape;

    if (q === 0.0) return 0.0;
    return this.params.scale * Math.pow(-Math.log(1.0 - q), c1);
  }

  mean(): number {
    const { scale, shape } = this.params;
    return scale * gammaFunction(1.0 + 1.0 / shape);
  }

  variance(): number {
    const { scale, shape } = this.params;
    return (
      Math.pow(scale, 2) *
      (gammaFunction(1.0 + 2.0 / shape) - Math.pow(gammaFunction(1.0 + 1.0 / shape), 2))
    );
  }

  mode(): number {
    const { scale, shape } = this.params;
    if (shape < 1.0) return 0.0;
    return scale * Math.pow(1.0 - 1.0 / shape, 1 / shape);
  }

  skewness(): number {
    const { scale, shape } = this.params;
    const mean = this.mean();
    const vr = this.variance();
    return (
      (gammaFunction(1.0 + 3.0 / shape) * Math.pow(scale, 3) -
        3.0 * mean * vr -
        Math.pow(mean, 3)) /
      (vr * Math.sqrt(vr))
    );
  }
}
