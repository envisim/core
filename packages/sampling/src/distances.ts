import {Matrix} from '@envisim/matrix';
import {IDistance} from './types.js';

/**
 * Function that computes the Squared Euclidean distance between units.
 *
 * @param xm - Auxilliary matrix.
 * @param a - The first id (row of xm)
 * @param b - The second id (row of xm)
 * @returns The squared euclidean distance.
 */
export const distanceEuclidean2: IDistance = (
  xm: Matrix,
  a: number,
  b: number,
): number => {
  const N = xm.nrow;
  const p = xm.ncol;

  if (a >= N || b >= N) {
    throw new RangeError('a and b must be smaller than number of rows in xm');
  }

  if (a === b) return 0.0;

  let d = 0.0;
  for (let i = 0; i < p; i++) {
    d += Math.pow(xm.atRC(a, i) - xm.atRC(b, i), 2);
  }

  return d;
};

/**
 * Function that computes the Euclidean distance between units.
 *
 * @param xm - Auxilliary matrix.
 * @param a - The first id (row of xm)
 * @param b - The second id (row of xm)
 * @returns The euclidean distance.
 */
export const distanceEuclidean: IDistance = (
  xm: Matrix,
  a: number,
  b: number,
): number => Math.sqrt(distanceEuclidean2(xm, a, b));

/**
 * Function that computes a variant of the Grafstrom and Schelin distance
 * between two arrays of the same length.
 *
 * @alpha
 * @experimental
 * @param xm - Auxilliary matrix.
 * @param a - The first id (row of xm)
 * @param b - The second id (row of xm)
 * @returns The distance.
 */
export const distanceGS: IDistance = (
  xm: Matrix,
  a: number,
  b: number,
  cat?: number[],
): number => {
  // If there are no categories, GS === euclidean
  if (cat === undefined || !Array.isArray(cat) || cat.length === 0)
    return distanceEuclidean(xm, a, b);

  const N = xm.nrow;
  const p = xm.ncol;

  if (a >= N || b >= N) {
    throw new RangeError('a and b must be smaller than number of rows in xm');
  }

  if (a === b) return 0.0;

  // This won't work in current implementation

  let d1 = 0.0;
  let d2 = 0.0;
  for (let i = 0; i < p; i++) {
    const ae = xm.atRC(a, i);
    const be = xm.atRC(b, i);

    // If the column is not categorical
    if (!cat.includes(i)) {
      d1 += Math.pow(ae - be, 2);
      continue;
    }

    // If the column is categorical and the values are different
    if (ae !== be) {
      d2 += 1.0;
    }
  }

  return Math.sqrt(d1) + d2;
};
