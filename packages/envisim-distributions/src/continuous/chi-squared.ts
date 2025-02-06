import {
  Distribution,
  Interval,
  type RandomOptions,
  randomOptionsDefault,
} from '../abstract-distribution.js';
import {logGammaFunction, regularizedLowerGammaFunction} from '../gamma-utils.js';
import {
  type ParamsDegreesOfFreedom,
  degreesOfFreedomCheck,
  degreesOfFreedomDefault,
} from '../params.js';
import {assertPositiveInteger} from '../utils.js';
import {gammaQuantile} from './gamma-quantile.js';
import {randomShapeGamma} from './gamma-random.js';

export class ChiSquared extends Distribution<ParamsDegreesOfFreedom> {
  protected params: ParamsDegreesOfFreedom = degreesOfFreedomDefault;

  /**
   * The Chi-squared distribution
   *
   * @example
   * const x = new ChiSquared(10);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(df: number = degreesOfFreedomDefault) {
    super();
    this.setParameters(df);
    return this;
  }

  setParameters(df: ParamsDegreesOfFreedom = degreesOfFreedomDefault): void {
    degreesOfFreedomCheck(df);
    this.support = new Interval(0, Infinity, df === 1, true);
    this.params = df;
  }

  pdf(x: number): number {
    const dfHalf = this.params * 0.5;
    const c = dfHalf * Math.LN2 + logGammaFunction(dfHalf);
    return this.support.checkPDF(x) ?? Math.exp((dfHalf - 1.0) * Math.log(x) - x * 0.5 - c);
  }

  cdf(x: number, eps: number = 1e-12): number {
    const dfHalf = this.params * 0.5;
    return this.support.checkCDF(x) ?? regularizedLowerGammaFunction(dfHalf, x * 0.5, eps);
  }

  quantile(q: number, eps: 1e-12): number {
    const dfHalf = this.params * 0.5;
    return (
      this.support.checkQuantile(q) ??
      gammaQuantile(q, {shape: dfHalf, scale: 2.0}, eps, logGammaFunction(dfHalf))
    );
  }

  override random(n: number = 1, {rand = randomOptionsDefault.rand}: RandomOptions = {}): number[] {
    assertPositiveInteger(n);
    const dfHalf = this.params * 0.5;
    return randomShapeGamma(n, dfHalf, rand, 2.0);
  }

  mean(): number {
    return this.params;
  }

  variance(): number {
    return this.params * 2;
  }

  mode(): number {
    return Math.max(this.params - 2, 0.0);
  }

  skewness(): number {
    return Math.sqrt(8 / this.params);
  }
}
