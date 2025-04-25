import { Distribution, Interval } from "./abstract-distribution.js";

export class LocationScaleParams {
  static DEFAULTS = { location: 0.0, scale: 1.0 } as const;
  #location: number;
  #scale: number;

  /**
   * @category Parameters
   */
  constructor(
    location: number = LocationScaleParams.DEFAULTS.location,
    scale: number = LocationScaleParams.DEFAULTS.scale,
  ) {
    this.#location = location;
    if (scale <= 0.0) throw new RangeError("scale must be > 0.0");
    this.#scale = scale;
  }

  get location() {
    return this.#location;
  }
  get scale() {
    return this.#scale;
  }

  normalize(x: number): number {
    return (x - this.#location) / this.#scale;
  }
}

export abstract class LocationScale extends Distribution {
  #params!: LocationScaleParams;

  constructor(location?: number, scale?: number) {
    super();
    this.#params = new LocationScaleParams(location, scale);
    this.support = new Interval(-Infinity, Infinity, true, true);
  }

  get params() {
    return this.#params;
  }
}
