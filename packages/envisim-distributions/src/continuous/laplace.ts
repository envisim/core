import {Distribution, Interval} from '../abstract-distribution.js';
import {
  ParamsLocationScale,
  locationScaleCheck,
  locationScaleDefault,
  locationScaleNormalize,
} from '../params.js';

export class Laplace extends Distribution<ParamsLocationScale> {
  protected params: ParamsLocationScale = {...locationScaleDefault};

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
  constructor(
    location: number = locationScaleDefault.location,
    scale: number = locationScaleDefault.scale,
  ) {
    super();
    this.setParameters({location, scale});
    return this;
  }

  setParameters(params: ParamsLocationScale = {...locationScaleDefault}): void {
    locationScaleCheck(params);
    this.support = new Interval(-Infinity, Infinity, true, true);
    this.params.scale = params.scale;
    this.params.location = params.location;
  }

  pdf(x: number): number {
    return (
      this.support.checkPDF(x) ??
      (Math.exp(-Math.abs(locationScaleNormalize(x, this.params))) * 0.5) / this.params.scale
    );
  }

  cdf(x: number): number {
    const check = this.support.checkCDF(x);
    if (check !== null) return check;
    const z = locationScaleNormalize(x, this.params);
    if (x <= this.params.location) return Math.exp(z) * 0.5;
    return 1 - Math.exp(-z) * 0.5;
  }

  quantile(q: number): number {
    const check = this.support.checkQuantile(q);
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
