import { ValidationError } from "@envisim/utils";
import { Distribution, Interval } from "./abstract-distribution.js";

export class BoundedParams {
  static DEFAULTS = { a: 0.0, b: 1.0 } as const;
  #a: number;
  #b: number;

  #range: number;

  /**
   * @category Parameters
   */
  constructor(a: number = BoundedParams.DEFAULTS.a, b: number = BoundedParams.DEFAULTS.b) {
    ValidationError.check["number-not-in-interval"](
      { arg: "b", interval: [a], ends: "open" },
      b,
    )?.raise();
    this.#a = a;
    this.#b = b;

    this.#range = b - a;
  }

  get a() {
    return this.#a;
  }
  get b() {
    return this.#b;
  }

  get width() {
    return this.#range;
  }
}

export class BoundedMidParams extends BoundedParams {
  #mid: number;

  /**
   * @category Parameters
   */
  constructor(
    a: number = BoundedParams.DEFAULTS.a,
    b: number = BoundedParams.DEFAULTS.b,
    mid: number = (a + b) * 0.5,
  ) {
    super(a, b);
    ValidationError.check["number-not-in-interval"](
      { arg: "mid", interval: [a, b], ends: "open" },
      mid,
    )?.raise();
    this.#mid = mid;
  }

  get mid() {
    return this.#mid;
  }

  get awidth() {
    return this.#mid - this.a;
  }
  get bwidth() {
    return this.b - this.#mid;
  }
}

export abstract class Bounded extends Distribution {
  /** @internal */
  #params!: BoundedParams;

  constructor(a?: number, b?: number) {
    super();
    this.#params = new BoundedParams(a, b);
    this.support = new Interval(this.#params.a, this.#params.b, false, false);
  }

  /** @internal */
  get params() {
    return this.#params;
  }
}

export abstract class BoundedMid extends Distribution {
  /** @internal */
  #params!: BoundedMidParams;

  constructor(a?: number, b?: number, mid?: number) {
    super();
    this.#params = new BoundedMidParams(a, b, mid);
    this.support = new Interval(this.#params.a, this.#params.b, false, false);
  }

  /** @internal */
  get params() {
    return this.#params;
  }
}
