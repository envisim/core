import {
  arrayLikeToColumnVector,
  ColumnVector,
  IIteratorReturn,
  TArrayLike,
} from '@envisim/matrix';
import type {Random} from '@envisim/random';
import {optionsDefaultEps} from './types.js';

/**
 * Calculation of inclusion probabilities from a positive auxiliary variable.
 *
 * @param arr - {@link matrix.TArrayLike} of positive numbers (sizes)
 * @param n - The sample size (sum of inclusion probabilities)
 * @param eps - Epsilon.
 * @returns Array of inclusion probabilities.
 */
export const inclusionProbabilities = (
  arr: TArrayLike,
  n: number,
  eps: number = optionsDefaultEps,
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

      sp += prob.edIndex(res.index, 1.0);
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
        prob.fnIndex(res.index, (e) => e * frac),
      );
    }
  }

  prob.forEach((e, i) => {
    if (e > 1.0 - eps) prob.edIndex(i, 1.0);
  });

  return prob;
};

/**
 * @internal
 * @returns `true` if `x` is in (eps, 1-eps)
 */
export const numberInOpen01 = (
  x: number,
  eps: number = optionsDefaultEps,
): boolean => {
  return eps < x && x < 1.0 - eps;
};

/**
 * Calculates the maximum weight of a unit (2) when deciding a unit (1).
 *
 * @ignore
 * @param p1 - Probability 1.
 * @param p2 - Probability 2.
 * @returns The maximum weight which can be provided by p2 to p1.
 */
export const maxWeight = (p1: number, p2: number): number => {
  if (p1 <= 0.0 || 1.0 <= p1) {
    return 0.0;
  }

  if (p1 + p2 <= 1.0) {
    return p2 / (1.0 - p1);
  }

  return (1.0 - p2) / p1;
};

/**
 * Randomly returns `o1` or `o2`, proportionally
 * @ignore
 */
export const selectOneOfTwo = (
  rand: Random,
  o1: number,
  o2: number,
): number => {
  if (rand.float() * (o1 + o2) < o1) return o1;
  return o2;
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
