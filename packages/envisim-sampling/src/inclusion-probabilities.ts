import { Vector } from "@envisim/matrix";
import { ValidationError } from "@envisim/utils";
import { BASE_OPTIONS, type FixedSizedOptions } from "./base-options/index.js";

export interface InclusionProbabilitiesOptions extends FixedSizedOptions {
  /**
   * positive numbers (sizes)
   */
  auxiliary: Vector | number[];
}

/**
 * Calculation of inclusion probabilities from a positive auxiliary variable.
 *
 * @param options -
 * @returns Array of inclusion probabilities.
 */
export function inclusionProbabilities({
  auxiliary,
  n,
  eps = BASE_OPTIONS.eps,
}: InclusionProbabilitiesOptions): number[] {
  auxiliary.forEach((e) =>
    ValidationError.check["number-not-nonnegative"]({ arg: "auxiliary" }, e)?.raise(),
  );

  const prob = new Vector(auxiliary, false);
  const psum = prob.sum();
  prob.multiply(n / psum, true);
  let pmax = prob.max();

  let n1: number, sp: number;
  while (pmax > 1.0) {
    n1 = 0;
    sp = 0;

    for (let i = 0; i < prob.length; i++) {
      if (prob.at(i) < 1.0) {
        sp += prob.at(i);
        continue;
      }

      sp += prob.ed(i, 1.0);
      n1 += 1;
    }

    pmax = 1.0;
    const frac = (n - n1) / (sp - n1);

    for (let i = 0; i < prob.length; i++) {
      if (prob.at(i) >= 1.0) continue;

      // Edit value in place and update pmax
      pmax = Math.max(
        pmax,
        prob.fn(i, (e) => e * frac),
      );
    }
  }

  prob.forEach((e, i) => {
    if (e > 1.0 - eps) prob.ed(i, 1.0);
  });

  return prob.slice();
}
