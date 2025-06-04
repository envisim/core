import { ShapeScale } from "../abstract-shape-scale.js";

/**
 * @category Continuous distributions
 */
export class Pareto extends ShapeScale {
  /**
   * The Pareto distribution
   *
   * @example
   * const x = new Pareto(1, 2);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(shape?: number, scale?: number) {
    super(shape, scale);
    this.support = { interval: [this.params.scale, Infinity], ends: "right-open" };
  }

  override pdf(x: number): number {
    const c = Math.log(this.params.shape) + this.params.shape * Math.log(this.params.scale);
    const shape = this.params.shape + 1.0;
    return super.pdf(x) ?? Math.exp(c - shape * Math.log(x));
  }

  override cdf(x: number): number {
    return super.cdf(x) ?? 1.0 - Math.pow(this.params.scale / x, this.params.shape);
  }

  override quantile(q: number): number {
    const c = 1.0 / this.params.shape;
    return super.quantile(q) ?? this.params.scale / Math.pow(1.0 - q, c);
  }

  mean(): number {
    const { scale, shape } = this.params;
    if (shape <= 1.0) return Infinity;
    return (shape / (shape - 1.0)) * scale;
  }

  variance(): number {
    const { scale, shape } = this.params;
    if (shape <= 2.0) return Infinity;
    return (Math.pow(scale / (shape - 1.0), 2) * shape) / (shape - 2.0);
  }

  mode(): number {
    return this.params.scale;
  }

  skewness(): number {
    const { shape } = this.params;
    if (shape <= 3.0) return NaN;
    return ((2.0 * (1.0 + shape)) / (shape - 3.0)) * Math.sqrt((shape - 2.0) / shape);
  }
}
