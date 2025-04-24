import { type Matrix, Vector } from "@envisim/matrix";
import { NearestNeighbour } from "@envisim/sampling";

/**
 * $$\hat\{V\}(\hat\{Y\}) = \sum_\{i \in S\} \sum_\{j \in S\} \frac\{y_i y_j\}\{\pi_i \pi_j\} \frac\{\pi_\{ij\} - \pi_i \pi_j\}\{\pi_\{ij\}\}$$
 *
 * @param y - variable of interest of size n, $y_i$.
 * @param prob - inclusion probabilities of size n, $\pi_i$.
 * @param prob2m - second order inclusion probabilities of size n*n,
 *   upper triangular matrix, $\pi_\{ij\}$.
 * @returns the Horvitz-Thompson variance estimate.
 * @category Variance estimators
 */
export function htVariance(y: number[] | Vector, prob: number[] | Vector, prob2m: Matrix): number {
  const pi = new Vector(prob, true);
  const ypi = new Vector(y, false).divide(pi, true);
  const n = pi.length;

  if (prob2m.nrow !== n || prob2m.ncol !== n)
    throw new TypeError("prob2m must be a matrix of size n*n");

  let variance = 0.0;

  for (let i = 0; i < n; i++) {
    const ypi_i = ypi.at(i);
    const pi_i = pi.at(i);
    variance += ypi_i * ypi_i * (1.0 - pi_i);

    for (let j = i + 1; j < n; j++) {
      variance += 2.0 * ypi_i * ypi.at(j) * (1.0 - (pi_i * pi.at(j)) / prob2m.atDim([i, j]));
    }
  }

  return variance;
}

/**
 * Sen-Yates-Grundy HT-variance estimator of a fixed sample size
 *
 * $$\hat\{V\}(\hat\{Y\}) = -\frac\{1\}\{2\} \sum_\{i \in S\} \sum_\{j \in S\} (y_i / \pi_i - y_j / \pi_j)^2 \frac\{\pi_\{ij\} - \pi_i \pi_j\}\{\pi_\{ij\}\}$$
 *
 * @param y - variable of interest of size n, $y_i$.
 * @param prob - inclusion probabilities of size n, $\pi_i$.
 * @param prob2m - second order inclusion probabilities of size n*n,
 *   upper triangular matrix, $\pi_\{ij\}$.
 * @returns the Horvitz-Thompson variance estimate.
 * @category Variance estimators
 */
export function htVarianceSYG(
  y: number[] | Vector,
  prob: number[] | Vector,
  prob2m: Matrix,
): number {
  const pi = new Vector(prob, true);
  const ypi = new Vector(y, false).divide(pi, true);
  const n = pi.length;

  if (prob2m.nrow !== n || prob2m.ncol !== n)
    throw new TypeError("prob2m must be a matrix of size n*n");

  let variance = 0.0;

  for (let i = 0; i < n; i++) {
    const ypi_i = ypi.at(i);
    const pi_i = pi.at(i);

    for (let j = i + 1; j < n; j++) {
      const temp = ypi_i - ypi.at(j);
      variance -= temp * temp * (1.0 - (pi_i * pi.at(j)) / prob2m.atDim([i, j]));
    }
  }

  return variance;
}

/**
 * @param y variable of interest of size n, $y_i$.
 * @param prob inclusion probabilities of size n, $\pi_i$.
 * @returns Deville's HT variance estimate.
 * @category Variance estimators
 */
export function htVarianceD(y: number[] | Vector, prob: number[] | Vector): number {
  const ps = new Vector(prob, true);
  const yps = new Vector(y, false).divide(ps, true);

  ps.map((e) => 1.0 - e, true);
  const s1mp = ps.sum();
  const del = yps.multiply(ps).sum();

  const sak2 = ps
    .divide(s1mp)
    .map((v) => Math.pow(v, 2))
    .sum();

  const dsum = yps
    .subtract(s1mp / del, true)
    .map((v) => Math.pow(v, 2), true)
    .multiply(ps, true)
    .sum();

  return (1.0 / (1.0 - sak2)) * dsum;
}

/**
 * @param y - variable of interest of size n, $y_i$.
 * @param prob - inclusion probabilities of size n, $\pi_i$.
 * @param xm - auxilliary variables of size n*p.
 * @returns GS's HT variance estimate.
 * @category Variance estimators
 */
export function htVarianceGS(y: number[] | Vector, prob: number[] | Vector, xm: Matrix): number {
  const ps = new Vector(prob, true);
  const yps = new Vector(y, false).divide(ps, true);
  const n = yps.length;

  const nn = new NearestNeighbour(xm, 30);
  let res = 0.0;

  for (let i = 0; i < n; i++) {
    const neighbours = nn.findNearestNeighbours(i);
    const lht = neighbours.reduce((t, i) => t + yps.at(i), 0.0) / neighbours.length;
    const temp = yps.at(i) - lht;

    res += (neighbours.length / (neighbours.length - 1)) * temp * temp;
  }

  return res;
}

/**
 * $$\hat\{V\}(\hat\{Y\}) = \sum_\{i \in S\} \sum_\{j \in S\} \frac\{y_i y_j\}\{\mu_i \mu_j\} S_i S_j \frac\{\mu_\{ij\} - \mu_i \mu_j\}\{\mu_\{ij\}\}$$
 *
 * @param y - variable of interest of size n, $y_i$.
 * @param expected - expected number of inclusions of size n, $\mu_i$.
 * @param inclusions - number of inclusions of size n, $S_i$.
 * @param mu2m - second order expected number of inclusions of size n*n,
 *   upper triangular matrix, $\mu_\{ij\}$.
 * @returns the Hansen-Hurwitz variance estimate.
 * @category Variance estimators
 */
export function hhVariance(
  y: number[] | Vector,
  expected: number[] | Vector,
  inclusions: number[] | Vector,
  mu2m: Matrix,
): number {
  const mu = new Vector(expected, true);
  const ymu = new Vector(y, false).multiply(new Vector(inclusions), true).divide(mu, true);
  const n = mu.length;

  if (mu2m.nrow !== n || mu2m.ncol !== n)
    throw new TypeError("prob2m must be a matrix of size n*n");

  let variance = 0.0;

  for (let i = 0; i < n; i++) {
    const ymu_i = ymu.at(i);
    const mu_i = mu.at(i);
    variance += ymu_i * ymu_i * (1.0 - (mu_i * mu_i) / mu2m.atDim([i, i]));

    for (let j = i + 1; j < n; j++) {
      variance += 2.0 * ymu_i * ymu.at(j) * (1.0 - (mu_i * mu.at(j)) / mu2m.atDim([i, j]));
    }
  }

  return variance;
}

/**
 * @param y - variable of interest of size n, $y_i$.
 * @param prob - inclusion probabilities of size n, $\pi_i$.
 * @returns the wr variance estimate.
 * @category Variance estimators
 */
export function wrVariance(y: number[] | Vector, prob: number[] | Vector): number {
  const ps = new Vector(prob, true);
  const yps = new Vector(y, false).divide(ps, true);

  const est = yps.mean();

  return (
    yps
      .subtract(est, true)
      .map((v) => Math.pow(v, 2), true)
      .sum() /
    (ps.nrow - 1) /
    ps.nrow
  );
}
