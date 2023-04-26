import {arrayLikeToColumnVector, Matrix, TArrayLike} from '@envisim/matrix';
import {NearestNeighbour} from '@envisim/sampling';

/**
 * $$ \hat\{V\}(\hat\{Y\}) = \sum_\{i \in S\} \sum_\{j \in S\} \frac\{y_i y_j\}\{\pi_i \pi_j\} \frac\{\pi_\{ij\} - \pi_i \pi_j\}\{\pi_\{ij\}\} $$
 * @category Variance estimator
 *
 * @param y - variable of interest of size n, $y_i$.
 * @param prob - inclusion probabilities of size n, $\pi_i$.
 * @param prob2m - second order inclusion probabilities of size n*n,
 *   upper triangular matrix, $\pi_\{ij\}$.
 * @returns the Horvitz-Thompson variance estimate.
 */
export function htVariance(
  y: TArrayLike,
  prob: TArrayLike,
  prob2m: Matrix,
): number {
  const pi = arrayLikeToColumnVector(prob);
  const ypi = arrayLikeToColumnVector(y).divide(pi, true);
  const n = pi.length;

  if (prob2m.nrow !== n || prob2m.ncol !== n)
    throw new TypeError('prob2m must be a matrix of size n*n');

  let variance = 0.0;

  for (let i = 0; i < n; i++) {
    const ypi_i = ypi.atIndex(i);
    const pi_i = pi.atIndex(i);
    variance += ypi_i * ypi_i * (1.0 - pi_i);

    for (let j = i + 1; j < n; j++) {
      variance +=
        2.0 *
        ypi_i *
        ypi.atIndex(j) *
        (1.0 - (pi_i * pi.atIndex(j)) / prob2m.atRC(i, j));
    }
  }

  return variance;
}

/**
 * Sen-Yates-Grundy HT-variance estimator of a fixed sample size
 *
 * $$ \hat\{V\}(\hat\{Y\}) = -\frac\{1\}\{2\} \sum_\{i \in S\} \sum_\{j \in S\} (y_i / \pi_i - y_j / \pi_j)^2 \frac\{\pi_\{ij\} - \pi_i \pi_j\}\{\pi_\{ij\}\} $$
 * @category Variance estimator
 *
 * @param y - variable of interest of size n, $y_i$.
 * @param prob - inclusion probabilities of size n, $\pi_i$.
 * @param prob2m - second order inclusion probabilities of size n*n,
 *   upper triangular matrix, $\pi_\{ij\}$.
 * @returns the Horvitz-Thompson variance estimate.
 */
export function htVarianceSYG(
  y: TArrayLike,
  prob: TArrayLike,
  prob2m: Matrix,
): number {
  const pi = arrayLikeToColumnVector(prob);
  const ypi = arrayLikeToColumnVector(y).divide(pi, true);
  const n = pi.length;

  if (prob2m.nrow !== n || prob2m.ncol !== n)
    throw new TypeError('prob2m must be a matrix of size n*n');

  let variance = 0.0;

  for (let i = 0; i < n; i++) {
    const ypi_i = ypi.atIndex(i);
    const pi_i = pi.atIndex(i);

    for (let j = i + 1; j < n; j++) {
      const temp = ypi_i - ypi.atIndex(j);
      variance -=
        temp * temp * (1.0 - (pi_i * pi.atIndex(j)) / prob2m.atRC(i, j));
    }
  }

  return variance;
}

/**
 * @category Variance estimator
 * @param y - variable of interest of size n, $y_i$.
 * @param prob - inclusion probabilities of size n, $\pi_i$.
 * @returns Deville's HT variance estimate.
 */
export function htVarianceD(y: TArrayLike, prob: TArrayLike): number {
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
}

/**
 * @category Variance estimator
 * @param y - variable of interest of size n, $y_i$.
 * @param prob - inclusion probabilities of size n, $\pi_i$.
 * @param xm - auxilliary variables of size n*p.
 * @returns GS's HT variance estimate.
 */
export function htVarianceGS(
  y: TArrayLike,
  prob: TArrayLike,
  xm: Matrix,
): number {
  const ps = arrayLikeToColumnVector(prob);
  const yps = arrayLikeToColumnVector(y).divide(ps, true);
  const n = yps.length;

  const nn = new NearestNeighbour(xm, 30);
  let res = 0.0;

  for (let i = 0; i < n; i++) {
    const neighbours = nn.findNearestNeighbours(i);
    const lht =
      neighbours.reduce((t, i) => t + yps.atIndex(i), 0.0) / neighbours.length;
    const temp = yps.atIndex(i) - lht;

    res += (neighbours.length / (neighbours.length - 1)) * temp * temp;
  }

  return res;
}

/**
 * $$ \hat\{V\}(\hat\{Y\}) = \sum_\{i \in S\} \sum_\{j \in S\} \frac\{y_i y_j\}\{\mu_i \mu_j\} S_i S_j \frac\{\mu_\{ij\} - \mu_i \mu_j\}\{\mu_\{ij\}\} $$
 * @category Variance estimator
 *
 * @param y - variable of interest of size n, $y_i$.
 * @param expected - expected number of inclusions of size n, $\mu_i$.
 * @param inclusions - number of inclusions of size n, $S_i$.
 * @param mu2m - second order expected number of inclusions of size n*n,
 *   upper triangular matrix, $\mu_\{ij\}$.
 * @returns the Hansen-Hurwitz variance estimate.
 */
export function hhVariance(
  y: TArrayLike,
  expected: TArrayLike,
  inclusions: TArrayLike,
  mu2m: Matrix,
): number {
  const mu = arrayLikeToColumnVector(expected);
  const ymu = arrayLikeToColumnVector(y)
    .multiply(arrayLikeToColumnVector(inclusions), true)
    .divide(mu, true);
  const n = mu.length;

  if (mu2m.nrow !== n || mu2m.ncol !== n)
    throw new TypeError('prob2m must be a matrix of size n*n');

  let variance = 0.0;

  for (let i = 0; i < n; i++) {
    const ymu_i = ymu.atIndex(i);
    const mu_i = mu.atIndex(i);
    variance += ymu_i * ymu_i * (1.0 - (mu_i * mu_i) / mu2m.atRC(i, i));

    for (let j = i + 1; j < n; j++) {
      variance +=
        2.0 *
        ymu_i *
        ymu.atIndex(j) *
        (1.0 - (mu_i * mu.atIndex(j)) / mu2m.atRC(i, j));
    }
  }

  return variance;
}

/**
 * @category Variance estimator
 * @param y - variable of interest of size n, $y_i$.
 * @param prob - inclusion probabilities of size n, $\pi_i$.
 * @returns the wr variance estimate.
 */
export function wrVariance(y: TArrayLike, prob: TArrayLike): number {
  const ps = arrayLikeToColumnVector(prob);
  const yps = arrayLikeToColumnVector(y).divide(ps, true);

  const est = yps.mean();

  return (
    yps.subtractScalar(est, true).math('pow', 2, true).sum() /
    (ps.nrow - 1) /
    ps.nrow
  );
}
