import {Distribution, Interval} from '../abstract-distribution.js';
import {
  type ParamsLocationScale,
  locationScaleCheck,
  locationScaleDefault,
  locationScaleNormalize,
} from '../params.js';

export class Cauchy extends Distribution<ParamsLocationScale> {
  protected params: ParamsLocationScale = {...locationScaleDefault};

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
    const c = Math.PI * this.params.scale;

    return (
      this.support.checkPDF(x) ??
      1.0 / (c * (1.0 + Math.pow(locationScaleNormalize(x, this.params), 2)))
    );
  }

  cdf(x: number): number {
    return (
      this.support.checkCDF(x) ?? 0.5 + Math.atan(locationScaleNormalize(x, this.params)) / Math.PI
    );
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
