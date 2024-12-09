import {
  Distribution,
  Interval,
  RandomOptions,
  randomOptionsDefault,
} from '../abstract-distribution.js';
import {assertPositiveInteger} from '../utils.js';
import {randomBeta} from './beta-random.js';
import {inverseRegularizedBetaFunction} from './beta-utils.js';

/** @group Parameter interfaces */
type ParamsRadius = number;
const radiusDefault: ParamsRadius = 1.0;
/** @ignore */
function radiusCheck(radius: ParamsRadius): asserts radius is ParamsRadius {
  if (radius <= 0.0) {
    throw new RangeError('rate must be larger than 0');
  }
}

export class Semicircle extends Distribution<ParamsRadius> {
  protected params: ParamsRadius = radiusDefault;
  protected radiusSquared!: number;
  protected denom!: number;

  /**
   * The Semicircle distribution
   *
   * @example
   * const x = new Semicircle(1);
   * x.pdf(0.1);
   * x.cdf(0.1);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(radius: number = radiusDefault) {
    super();
    this.setParameters(radius);
    return this;
  }

  setParameters(radius: ParamsRadius = radiusDefault): void {
    radiusCheck(radius);
    this.support = new Interval(-radius, radius, false, false);
    this.params = radius;
    this.radiusSquared = Math.pow(radius, 2);
    this.denom = 1.0 / (Math.PI * this.radiusSquared);
  }

  pdf(x: number): number {
    return (
      this.support.checkPDF(x) ?? Math.sqrt(this.radiusSquared - Math.pow(x, 2)) * this.denom * 2.0
    );
  }

  cdf(x: number): number {
    return (
      this.support.checkCDF(x) ??
      0.5 +
        x * Math.sqrt(this.radiusSquared - Math.pow(x, 2)) * this.denom +
        Math.asin(x / this.params) / Math.PI
    );
  }

  quantile(q: number, eps: number = 1e-20): number {
    return (
      this.support.checkQuantile(q) ??
      (inverseRegularizedBetaFunction(q, {alpha: 1.5, beta: 1.5}, eps) - 0.5) * 2.0 * this.params
    );
  }

  override random(n: number = 1, {rand = randomOptionsDefault.rand}: RandomOptions = {}): number[] {
    assertPositiveInteger(n);
    const c = this.params * 2.0;
    return randomBeta(n, {alpha: 1.5, beta: 1.5}, rand).map((e) => c * (e - 0.5));
  }

  mean(): number {
    return 0.0;
  }

  variance(): number {
    return Math.pow(this.params * 0.5, 2);
  }

  mode(): number {
    return 0.0;
  }

  skewness(): number {
    return 0;
  }
}
