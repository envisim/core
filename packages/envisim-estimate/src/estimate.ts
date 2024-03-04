import {ColumnVector, Matrix, TArrayLike} from '@envisim/matrix';
import {NearestNeighbour} from '@envisim/sampling';

import {parseAndCheckSampleArray} from './utils.js';

/**
 * Single count Horvitz-Thompson estimator of the total
 * $$ \hat\{Y\} = \sum_\{i \in S\} \frac\{y_i\}\{\pi_i\} , $$
 * $$ n = |S| . $$
 * @category Estimator
 *
 * @param y - variable of interest of size n, $y_i$.
 * @param prob - inclusion probabilities of size n, $\pi_i$.
 * @returns the Horvitz-Thompson estimate, $\hat\{Y\}$.
 */
export function horvitzThompson(y: TArrayLike, prob: TArrayLike): number {
  const ys = new ColumnVector(y, false);
  const ps = new ColumnVector(prob, true);

  return ys.divide(ps, true).sum();
}

/**
 * Multiple count Hansen-Hurwitz estimator.
 * $$ \hat\{Y\} = \sum_\{i \in S\} \frac\{y_i\}\{\mu_i\}S_i , $$
 * $$ n = |S| . $$
 * @category Estimator
 *
 * @param y - variable of interest of size n, $y_i$.
 * @param expected - expected number of inclusions of size n, $\mu_i$.
 * @param inclusions - number of inclusions of size n, $S_i$.
 * @returns the Hansen-Hurwitz estimate, $\hat\{Y\}$.
 */
export function hansenHurwitz(
  y: TArrayLike,
  expected: TArrayLike,
  inclusions: TArrayLike,
): number {
  const ys = new ColumnVector(y, false);
  const es = new ColumnVector(expected, true);
  const ss = new ColumnVector(inclusions, true);

  return ys.multiply(ss, true).divide(es, true).sum();
}

/**
 * Ratio estimator, where a true total $X$ is available for the population.
 * $$ \hat\{T\} = \frac\{ \hat\{Y\} \}\{ \hat\{X\} \} X , $$
 * where $\hat\{Y\}, \hat\{X\}$ are {@link horvitzThompson | HT-estimators}.
 * @category Estimator
 *
 * @param y - variable of interest of size n.
 * @param x - auxiliary variable of size n.
 * @param totalX - population total, $X$.
 * @param prob - inclusion probabilities of size n.
 * @returns the ratio estimate, $\hat\{T\}$.
 */
export function ratioEstimator(
  y: TArrayLike,
  x: TArrayLike,
  totalX: number,
  prob: TArrayLike,
): number {
  const ys = new ColumnVector(y, false);
  const xs = new ColumnVector(x, false);
  const ps = new ColumnVector(prob, true);

  if (typeof totalX !== 'number') throw new TypeError('totalX must be number');
  if (ys.nrow !== xs.nrow) throw new RangeError('y and x must have same size');

  return totalX * (ys.divide(ps, true).sum() / xs.divide(ps, true).sum());
}

/**
 * $$ \hat\{Y\} = \sum_\{i=1\}^n \frac\{y_i\}\{n p_i\} $$
 * @category Estimator
 *
 * @param y - variable of interest of size n, $y_i$.
 * @param prob - drawing probabilities of size n, $p_i$.
 * @returns the wr estimate, $\hat\{Y\}$.
 */
export function wrEstimator(y: TArrayLike, prob: TArrayLike): number {
  const ys = new ColumnVector(y, false);
  const ps = new ColumnVector(prob, true);

  return ys.divide(ps, true).mean();
}

/**
 * $$ \hat\{Y\} = \sum_\{i \in S\} y_i n_i , $$
 * where $n_i$ is the number of units in the population closer to unit $i$
 * than to any other unit.
 * @category Estimator
 *
 * @param y - variable of interest of size n.
 * @param xm - auxilliary variables of size N*p.
 * @param sample - sample indices, in the same order as the y-values.
 * @returns the nearest neighbour estimate
 */
export function nearestNeighbourEstimator(
  y: TArrayLike,
  xm: Matrix,
  sample: TArrayLike,
): number {
  const N = xm.nrow;
  const sampleArr = parseAndCheckSampleArray(sample, N, true);
  const n = sampleArr.length;

  if (y.length !== n)
    throw new RangeError('y and sample must have the same length');

  const ni = new Array<number>(n).fill(0.0);
  const nn = new NearestNeighbour(xm.extractRows(sampleArr), 10);

  for (let i = 0; i < N; i++) {
    const unit = xm.extractRow(i);
    const neighbours = nn.findNearestNeighbours(unit);
    const part = neighbours.length === 1 ? 1.0 : 1.0 / neighbours.length;
    neighbours.forEach((e) => {
      ni[e] += part;
    });
  }

  return ni.reduce((e, t, i) => t + e * (y.at(i) as number));
}
