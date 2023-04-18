import {arrayLikeToColumnVector, Matrix, TArrayLike} from '@envisim/matrix';
import {
  IOptions,
  optionsDefaultDistfun,
  optionsDefaultEps,
} from '@envisim/sampling';
import {nearestNeighbourArray} from './utils.js';

/**
 * @param y - a {@link matrix.TArrayLike} of values.
 * @param prob - a {@link matrix.TArrayLike} of inclusion probabilities. Must have same
 *   size as `y`.
 * @returns Deville's HT variance estimate.
 */
export const htVarianceDeville = (y: TArrayLike, prob: TArrayLike): number => {
  const ps = arrayLikeToColumnVector(prob);
  const yps = arrayLikeToColumnVector(y).divide(ps, true);

  ps.mapInPlace((e) => 1.0 - e);
  const s1mp = ps.sum();
  const del = yps.multiply(ps).sum();

  const sak2 = ps.divideScalar(s1mp).math('pow', 2).sum();

  const dsum = yps
    .subtractScalar(s1mp / del)
    .math('pow', 2)
    .multiply(ps)
    .sum();

  return (1.0 / (1.0 - sak2)) * dsum;
};

/**
 * @param y - a {@link matrix.TArrayLike} of values.
 * @param prob - a {@link matrix.TArrayLike} of inclusion.
 * @param xm - Matrix of auxilliary variables. probabilities. Must have same size as `y`.
 * @returns GS's HT variance estimate.
 */
export const htVarianceGS = (
  y: TArrayLike,
  prob: TArrayLike,
  xm: Matrix,
  opts: IOptions = {eps: optionsDefaultEps, distfun: optionsDefaultDistfun},
): number => {
  const ps = arrayLikeToColumnVector(prob);
  const yps = arrayLikeToColumnVector(y).divide(ps, true);

  if (!Matrix.isMatrix(xm)) throw new TypeError('xm must be of class Matrix');
  // if (ys.nrow !== ps.nrow)
  //   throw new RangeError('y and prob must have same size');

  let res = 0.0;

  for (let i = 0; i < yps.nrow; i++) {
    const neighbours = nearestNeighbourArray(xm, i, opts);
    const lht =
      neighbours.reduce((t, i) => t + yps.atIndex(i), 0.0) / neighbours.length;

    res +=
      (neighbours.length / (neighbours.length - 1)) *
      Math.pow(yps.atIndex(i) - lht, 2);
  }

  return res;
};

/**
 * @param y - a {@link matrix.TArrayLike} of values.
 * @param prob - a {@link matrix.TArrayLike} of inclusion probabilities. Must have same
 *   size as `y`.
 * @returns The wr variance estimate.
 */
export const wrVariance = (y: TArrayLike, prob: TArrayLike): number => {
  const ps = arrayLikeToColumnVector(prob);
  const yps = arrayLikeToColumnVector(y).divide(ps, true);

  // if (ys.nrow !== ps.nrow)
  //   throw new RangeError('y and prob must have same size');

  const est = yps.mean();

  return (
    yps.subtractScalar(est, true).math('pow', 2, true).sum() /
    (ps.nrow - 1) /
    ps.nrow
  );
};
