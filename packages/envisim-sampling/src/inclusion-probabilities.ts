import {ColumnVector, type MatrixIteratorReturn} from '@envisim/matrix';

import {type FixedSizedOptions, baseOptions} from './base-options/index.js';

interface InclusionProbabilitiesOptions extends FixedSizedOptions {
  /**
   * positive numbers (sizes)
   */
  auxiliary: ColumnVector | number[];
}

/**
 * Calculation of inclusion probabilities from a positive auxiliary variable.
 *
 * @param options.n sample size (sum of inclusion probabilities)
 * @param eps
 * @returns Array of inclusion probabilities.
 */
export function inclusionProbabilities({
  auxiliary,
  n,
  eps = baseOptions.eps,
}: InclusionProbabilitiesOptions): number[] {
  if (!auxiliary.every((e) => e >= 0.0)) {
    throw new RangeError('Every element in arr must be positive');
  }

  const prob = new ColumnVector(auxiliary, false);
  const psum = prob.sum();
  prob.multiply(n / psum, true);
  let pmax = prob.max();

  let n1: number, sp: number;
  const it = prob.iterator();
  let res: MatrixIteratorReturn;
  while (pmax > 1.0) {
    n1 = 0;
    sp = 0;

    it.reset();
    for (res = it.next(); !res.done; res = it.next()) {
      if (res.value < 1.0) {
        sp += res.value;
        continue;
      }

      sp += prob.ed(res.index, 1.0);
      n1++;
    }

    pmax = 1.0;
    it.reset();
    const frac = (n - n1) / (sp - n1);
    for (res = it.next(); !res.done; res = it.next()) {
      if (res.value >= 1.0) continue;

      // Edit value in place and update pmax
      pmax = Math.max(
        pmax,
        prob.fn(res.index, (e) => e * frac),
      );
    }
  }

  prob.forEach((e, i) => {
    if (e > 1.0 - eps) prob.ed(i, 1.0);
  });

  return prob.toArray();
}
