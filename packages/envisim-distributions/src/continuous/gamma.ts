import { type RandomOptions, RANDOM_OPTIONS_DEFAULT } from "../abstract-distribution.js";
import { ShapeScale } from "../abstract-shape-scale.js";
import { logGammaFunction, regularizedLowerGammaFunction } from "../gamma-utils.js";
import { assertPositiveInteger } from "../utils.js";
import { gammaQuantile } from "./gamma-quantile.js";
import { randomShapeGamma } from "./gamma-random.js";

/**
 * @category Continuous distributions
 */
export class Gamma extends ShapeScale {
  /** @internal */
  #lgf!: number;

  /**
   * The Gamma distribution
   *
   * @example
   * const x = new ChiSquared(1, 1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(shape?: number, scale?: number) {
    super(shape, scale);
    this.#lgf = logGammaFunction(this.params.shape);
  }

  pdf(x: number): number {
    const scale = this.params.scale;
    const c = this.#lgf + this.params.shape * Math.log(scale);
    const shape = this.params.shape - 1.0;

    return this.support.checkPDF(x) ?? Math.exp(shape * Math.log(x) - x / scale - c);
  }

  cdf(x: number, eps: number = 1e-12): number {
    return (
      this.support.checkCDF(x) ??
      regularizedLowerGammaFunction(this.params.shape, x / this.params.scale, eps, this.#lgf)
    );
  }

  quantile(q: number, eps: number = 1e-12): number {
    return this.support.checkQuantile(q) ?? gammaQuantile.call(this.params, q, eps, this.#lgf);
  }

  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    assertPositiveInteger(n);
    return randomShapeGamma(n, this.params.shape, options.rand, this.params.scale);
  }

  mean(): number {
    const { shape, scale } = this.params;
    return shape * scale;
  }

  variance(): number {
    const { shape, scale } = this.params;
    return shape * Math.pow(scale, 2);
  }

  mode(): number {
    const { shape, scale } = this.params;
    if (shape < 1.0) return 0.0;
    return (shape - 1.0) * scale;
  }

  skewness(): number {
    return 2 / Math.sqrt(this.params.shape);
  }
}
