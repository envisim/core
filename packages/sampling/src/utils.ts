import {
  arrayLikeToColumnVector,
  ColumnVector,
  IIteratorReturn,
  TArrayLike,
} from '@envisim/matrix';

import {IOptions, optionsDefaultEps} from './types.js';

/**
 * Calculation of inclusion probabilities from a positive auxiliary variable.
 *
 * @param arr - positive numbers (sizes)
 * @param n - sample size (sum of inclusion probabilities)
 * @param eps
 * @returns Array of inclusion probabilities.
 */
export const inclusionProbabilities = (
  arr: TArrayLike,
  n: number,
  eps: IOptions['eps'] = optionsDefaultEps,
): ColumnVector => {
  if (!arr.every((e) => e >= 0.0)) {
    throw new RangeError('Every element in arr must be positive');
  }

  const prob = arrayLikeToColumnVector(arr);
  const psum = prob.sum();
  prob.multiplyScalar(n / psum, true);
  let pmax = prob.max();

  let n1: number, sp: number;
  let it = prob.iterator();
  let res: IIteratorReturn;
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

  return prob;
};

export function arrayBack<T>(arr: T[]): T {
  if (arr.length === 0) throw new RangeError('array is empty');
  return arr[arr.length - 1];
}

export function swap<T>(arr: T[], a: number, b: number): void {
  if (a === b) return;

  const t = arr[a];
  arr[a] = arr[b];
  arr[b] = t;
}

export function probability1(p: number, eps: number): boolean {
  return p >= 1.0 - eps;
}

export function probability01(p: number, eps: number): boolean {
  return p <= eps || p >= 1.0 - eps;
}
