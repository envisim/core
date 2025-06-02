import { type Vector } from "@envisim/matrix";
import { ValidationError } from "@envisim/utils";

/** @internal */
export function checkSampleArray(sample: number[] | Vector, N: number): void {
  sample.forEach((e) => {
    (
      ValidationError.check["number-not-integer"]({ arg: "sample" }, e) ??
      ValidationError.check["number-not-in-interval"](
        { arg: "sample", interval: [0, N], ends: "right-open" },
        e,
      )
    )?.raise();
  });
}
