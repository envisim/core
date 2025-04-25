import { Distribution, Interval } from "./abstract-distribution.js";

export class ShapeScaleParams {
  static DEFAULTS = { shape: 0.0, scale: 1.0 } as const;
  #shape: number;
  #scale: number;

  /**
   * @category Parameters
   */
  constructor(
    shape: number = ShapeScaleParams.DEFAULTS.shape,
    scale: number = ShapeScaleParams.DEFAULTS.scale,
  ) {
    if (shape <= 0.0) throw new RangeError("shape must be > 0.0");
    this.#shape = shape;
    if (scale <= 0.0) throw new RangeError("scale must be > 0.0");
    this.#scale = scale;
  }

  get shape() {
    return this.#shape;
  }
  get scale() {
    return this.#scale;
  }
}

export abstract class ShapeScale extends Distribution {
  #params!: ShapeScaleParams;

  constructor(shape?: number, scale?: number) {
    super();
    this.#params = new ShapeScaleParams(shape, scale);
    this.support = new Interval(0, Infinity, true, true);
  }

  get params() {
    return this.#params;
  }
}
