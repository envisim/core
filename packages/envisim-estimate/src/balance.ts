import {type Matrix, type Vector} from '@envisim/matrix';
import {NearestNeighbour} from '@envisim/sampling';

import {checkSampleArray} from './utils.js';

/**
 * @category Spatial balance measure
 * @param sample - sample indices.
 * @param xm - Matrix of auxilliary variables of size N*p.
 * @param prob - inclusion probabilities of size N.
 * @returns spatial balance based on the voronoi balance measure.
 */
export function spatialBalanceVO(
  sample: number[] | Vector,
  xm: Matrix,
  prob: number[] | Vector,
): number {
  const N = xm.nrow;
  checkSampleArray(sample, N);

  if (prob.length !== N) throw new RangeError('xm and prob must have same number of rows');

  const incl = new Array<number>(sample.length).fill(0.0);
  const nn = new NearestNeighbour(xm.extractRows(sample), 10);

  for (let i = 0; i < N; i++) {
    const unit = xm.extractRow(i);
    const neighbours = nn.findNearestNeighbours(unit);

    const ppart =
      neighbours.length === 1 ? (prob.at(i) as number) : (prob.at(i) as number) / neighbours.length;
    neighbours.forEach((e) => {
      incl[e] += ppart;
    });
  }

  // sum (incl_i - 1.0)^2
  const result = incl.reduce((e) => {
    const temp = e - 1.0;
    return temp * temp;
  }, 0.0);

  return result / sample.length;
}

/**
 * @category Spatial balance measure
 * @param sample - sample indices.
 * @param xm - Matrix of auxilliary variables of size N*p.
 * @param prob - inclusion probabilities of size N.
 * @returns spatial balance based on the sum of squares balance measure.
 */
export function spatialBalanceSS(
  sample: number[] | Vector,
  xm: Matrix,
  prob?: number[] | Vector,
): number {
  const N = xm.nrow;
  const p = xm.ncol;
  checkSampleArray(sample, N);

  let mat = xm;
  if (prob !== undefined) {
    if (prob.length !== N) throw new RangeError('xm and prob must have same number of rows');
    mat = xm.clone();

    mat.map((e: number, i: number): number => {
      const r = mat.rowOfIndex(i);
      return e / (prob.at(r) as number);
    }, true);
  }

  const means = new Array<number>(p).fill(0.0);
  let total = 0.0;
  let result = 0.0;
  const nn = new NearestNeighbour(mat.extractRows(sample), 10);

  // Find the distance to the closest unit
  for (let i = 0; i < N; i++) {
    const unit = mat.extractRow(i);
    result += nn.findNearestDistance(unit);
    unit.forEach((e, k) => {
      total += e * e;
      means[k] += e;
    });
  }

  total -= means.reduce((e, t) => (e * e) / N + t, 0.0);

  return (result * sample.length) / total;
}
