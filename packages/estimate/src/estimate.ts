import {
  arrayLikeToArray,
  arrayLikeToColumnVector,
  ColumnVector,
  Matrix,
  TArrayLike,
} from '@envisim/matrix';
import {
  IOptions,
  optionsDefaultDistfun,
  optionsDefaultEps,
} from '@envisim/sampling';
import {nearestNeighbourArray} from './utils.js';

/**
 * Single count Horvitz-Thompson estimator
 * $$ \sum_\{i \in S\} \frac\{y_i\}\{\pi_i\} $$
 *
 * @param y - a {@link matrix.TArrayLike} of values in $S$.
 * @param prob - a {@link matrix.TArrayLike} of inclusion probabilities $\pi$.
 * Must have same size as `y`.
 * @returns the Horvitz-Thompson estimate.
 */
export const horvitzThompson = (y: TArrayLike, prob: TArrayLike): number => {
  const ys = arrayLikeToColumnVector(y);
  const ps = arrayLikeToColumnVector(prob);

  return ys.divide(ps, true).sum();
};

/** {@inheritDoc horvitzThompson} */
export const ht = horvitzThompson;

/**
 * Multiple count Hansen-Hurwitz estimator.
 * $$ \sum_\{i \in S\} \frac\{y_i\}\{\E_i\}S_i $$
 *
 * @param y - a {@link matrix.TArrayLike} of values.
 * @param expected - a {@link matrix.TArrayLike} of expected number of inclusions $E_i = E(S_i)$
 * Must have same size as `y`.
 * @param inclusions - a {@link matrix.TArrayLike} of number of inclusions for each value of `y`.
 * Must have same size as `y`.
 * @returns the Hansen-Hurwitz estimate.
 */
export const hansenHurwitz = (
  y: TArrayLike,
  expected: TArrayLike,
  inclusions: TArrayLike,
): number => {
  const ys = arrayLikeToColumnVector(y);
  const es = arrayLikeToColumnVector(expected);
  const ss = arrayLikeToColumnVector(inclusions);

  return ys.multiply(ss, true).divide(es, true).sum();
};

/**
 * @param y - a {@link matrix.TArrayLike} of values.
 * @param x - a {@link matrix.TArrayLike} of values. Must have same size as `y`.
 * @param totalX - Population total of x.
 * @param prob - a {@link matrix.TArrayLike} of inclusion probabilities. Must have same
 *   size as `y`.
 * @returns the ratio estimate.
 */
export const ratioEstimator = (
  y: TArrayLike,
  x: TArrayLike,
  totalX: number,
  prob: TArrayLike,
): number => {
  const ys = arrayLikeToColumnVector(y);
  const xs = arrayLikeToColumnVector(x);
  const ps = arrayLikeToColumnVector(prob);

  if (typeof totalX !== 'number') throw new TypeError('totalX must be number');
  // if (ys.nrow !== xs.nrow || ys.nrow !== ps.nrow)
  //   throw new RangeError('y, x and prob must have same size');

  return totalX * (ys.divide(ps, true).sum() / xs.divide(ps, true).sum());
};

/**
 * @param y - a {@link matrix.TArrayLike} of values.
 * @param prob - a {@link matrix.TArrayLike} of inclusion probabilities. Must have same
 *   size as `y`.
 * @returns the wr estimate.
 */
export const wrEstimator = (y: TArrayLike, prob: TArrayLike): number => {
  const ys = arrayLikeToColumnVector(y);
  const ps = arrayLikeToColumnVector(prob);

  // if (ys.nrow !== ps.nrow)
  //   throw new RangeError('y and prob must have same size');

  return ys.divide(ps, true).mean();
};

/**
 * @param y - a {@link matrix.TArrayLike} of values.
 * @param xm - a {@link matrix.Matrix} of auxilliary variables. Must have same size as `y`.
 * @param sample - A list of sample indices, in the same order as the y-values.
 * @returns the nearest neighbour estimate
 */
export const nearestNeighbourEstimator = (
  y: TArrayLike,
  xm: Matrix,
  sample: TArrayLike,
  opts: IOptions = {
    eps: optionsDefaultEps,
    distfun: optionsDefaultDistfun,
  },
): number => {
  const ys = arrayLikeToColumnVector(y);
  const sampleArr = arrayLikeToArray(sample);

  if (!Matrix.isMatrix(xm)) throw new TypeError('xm must be of class Matrix');
  if (ys.nrow !== sample.length)
    throw new RangeError(
      'y must have same number of rows as the length of sample',
    );
  if (
    !sampleArr.every(
      (v: number) => Number.isInteger(v) && 0 <= v && v < xm.nrow,
    )
  )
    throw new TypeError(
      'sample must be a vector of integers inside the length of prob',
    );

  const ni = new ColumnVector(0.0, sample.length);

  for (let i = 0; i < xm.nrow; i++) {
    const neighbours = nearestNeighbourArray(xm, i, opts);
    for (let j = 0; j < neighbours.length; j++) {
      ni.fnIndex(neighbours[j], (v: number) => v + 1.0 / neighbours.length);
    }
  }

  return ni.multiply(ys, true).sum();
};
