import { ValidationError } from "@envisim/utils";
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
    (
      ValidationError.checkNumber("number-not-positive", "shape", shape) ??
      ValidationError.checkNumber("number-not-positive", "scale", scale)
    )?.cast();
    this.#shape = shape;
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
  /** @internal */
  #params!: ShapeScaleParams;

  constructor(shape?: number, scale?: number) {
    super();
    this.#params = new ShapeScaleParams(shape, scale);
    this.support = new Interval(0, Infinity, true, true);
  }

  /** @internal */
  get params() {
    return this.#params;
  }
}
