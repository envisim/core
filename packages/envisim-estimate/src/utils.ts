import { type Vector } from "@envisim/matrix";
import { ValidationError } from "@envisim/utils";

/** @internal */
export function checkSampleArray(sample: number[] | Vector, N: number): void {
  sample.forEach((e) => {
    (
      ValidationError.checkNumber("number-not-integer", "sample", e) ??
      (0 <= e && e < N
        ? undefined
        : ValidationError.createNumber("number-not-in-interval", "sample", "0 <= sample < N"))
    )?.cast();
  });
}
