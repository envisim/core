import { type Matrix, Vector } from "@envisim/matrix";
import { NearestNeighbour } from "@envisim/sampling";
import { ValidationError } from "@envisim/utils";
import { checkSampleArray } from "./utils.js";

/**
 * Single count Horvitz-Thompson estimator of the total
 *
 * $$\hat\{Y\} = \sum_\{i \in S\} \frac\{y_i\}\{\pi_i\} ,$$
 *
 * $$n = |S| .$$
 *
 *
 * @param y - variable of interest of size n, $y_i$.
 * @param prob - inclusion probabilities of size n, $\pi_i$.
 * @returns the Horvitz-Thompson estimate, $\hat\{Y\}$.
 * @category Estimators
 */
export function horvitzThompson(y: number[] | Vector, prob: number[] | Vector): number {
  const ys = new Vector(y, false);
  const ps = new Vector(prob, true);

  return ys.divide(ps, true).sum();
}

/**
 * Multiple count Hansen-Hurwitz estimator.
 *
 * $$\hat\{Y\} = \sum_\{i \in S\} \frac\{y_i\}\{\mu_i\}S_i ,$$
 *
 * $$n = |S| .$$
 *
 * @param y - variable of interest of size n, $y_i$.
 * @param expected - expected number of inclusions of size n, $\mu_i$.
 * @param inclusions - number of inclusions of size n, $S_i$.
 * @returns the Hansen-Hurwitz estimate, $\hat\{Y\}$.
 * @category Estimators
 */
export function hansenHurwitz(
  y: number[] | Vector,
  expected: number[] | Vector,
  inclusions: number[] | Vector,
): number {
  const ys = new Vector(y, false);
  const es = new Vector(expected, true);
  const ss = new Vector(inclusions, true);

  return ys.multiply(ss, true).divide(es, true).sum();
}

/**
 * Ratio estimator, where a true total $X$ is available for the population.
 *
 * $$\hat\{T\} = \frac\{ \hat\{Y\} \}\{ \hat\{X\} \} X ,$$
 *
 * where $\hat\{Y\}, \hat\{X\}$ are {@link horvitzThompson | HT-estimators}.
 *
 * @param y - variable of interest of size n.
 * @param x - auxiliary variable of size n.
 * @param totalX - population total, $X$.
 * @param prob - inclusion probabilities of size n.
 * @returns the ratio estimate, $\hat\{T\}$.
 * @category Estimators
 */
export function ratioEstimator(
  y: number[] | Vector,
  x: number[] | Vector,
  totalX: number,
  prob: number[] | Vector,
): number {
  const ys = new Vector(y, false);
  const xs = new Vector(x, false);
  const ps = new Vector(prob, true);

  if (ys.length !== xs.length)
    throw ValidationError.create["array-incorrect-length"]({
      arg: "x",
      length: ys.length,
      shape: "y",
    });

  return totalX * (ys.divide(ps, true).sum() / xs.divide(ps, true).sum());
}

/**
 * $$\hat\{Y\} = \sum_\{i=1\}^n \frac\{y_i\}\{n p_i\}$$
 *
 * @param y - variable of interest of size n, $y_i$.
 * @param prob - drawing probabilities of size n, $p_i$.
 * @returns the wr estimate, $\hat\{Y\}$.
 * @category Estimators
 */
export function wrEstimator(y: number[] | Vector, prob: number[] | Vector): number {
  const ys = new Vector(y, false);
  const ps = new Vector(prob, true);

  return ys.divide(ps, true).mean();
}

/**
 * $$\hat\{Y\} = \sum_\{i \in S\} y_i n_i ,$$
 *
 * where $n_i$ is the number of units in the population closer to unit $i$
 * than to any other unit.
 *
 * @param y - variable of interest of size n.
 * @param xm - auxilliary variables of size N*p.
 * @param sample - sample indices, in the same order as the y-values.
 * @returns the nearest neighbour estimate
 * @category Estimators
 */
export function nearestNeighbourEstimator(
  y: number[] | Vector,
  xm: Matrix,
  sample: number[] | Vector,
): number {
  const N = xm.nrow;
  checkSampleArray(sample, N);
  const n = sample.length;

  if (y.length !== n)
    throw ValidationError.create["array-incorrect-length"]({
      arg: "y",
      length: n,
      shape: "sample",
    });

  const ni = new Array<number>(n).fill(0.0);
  const nn = new NearestNeighbour(xm.extractRows(sample), 10);

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
