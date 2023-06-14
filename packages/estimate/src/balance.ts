import {Matrix, TArrayLike} from '@envisim/matrix';
import {NearestNeighbour} from '@envisim/sampling';

import {BaseVector} from '../../matrix/dist/es/BaseVector.js';
import {parseAndCheckSampleArray} from './utils.js';

/**
 * @category Spatial balance measure
 * @param sample - sample indices.
 * @param xm - Matrix of auxilliary variables of size N*p.
 * @param prob - inclusion probabilities of size N.
 * @returns spatial balance based on the voronoi balance measure.
 */
export function spatialBalanceVO(
  sample: TArrayLike,
  xm: Matrix,
  prob: TArrayLike,
): number {
  const N = xm.nrow;
  const sampleArr = parseAndCheckSampleArray(sample, N, true);

  if (prob.length !== N)
    throw new RangeError('xm and prob must have same number of rows');

  const incl = new Array<number>(sampleArr.length).fill(0.0);
  const nn = new NearestNeighbour(xm.extractRows(sampleArr), 10);

  for (let i = 0; i < N; i++) {
    const unit = xm.extractRow(i);
    const neighbours = nn.findNearestNeighbours(unit);

    const ppart =
      neighbours.length === 1
        ? (prob.at(i) as number)
        : (prob.at(i) as number) / neighbours.length;
    neighbours.forEach((e) => {
      incl[e] += ppart;
    });
  }

  // sum (incl_i - 1.0)^2
  const result = incl.reduce((e) => {
    const temp = e - 1.0;
    return temp * temp;
  }, 0.0);

  return result / sampleArr.length;
}

/**
 * @category Spatial balance measure
 * @param sample - sample indices.
 * @param xm - Matrix of auxilliary variables of size N*p.
 * @param prob - inclusion probabilities of size N.
 * @returns spatial balance based on the sum of squares balance measure.
 */
export function spatialBalanceSS(
  sample: TArrayLike,
  xm: Matrix,
  prob?: TArrayLike,
): number {
  const N = xm.nrow;
  const p = xm.ncol;
  const sampleArr = parseAndCheckSampleArray(sample, N, true);

  let mat = xm;
  if (Array.isArray(prob) || BaseVector.isBaseVector(prob)) {
    if (prob.length !== N)
      throw new RangeError('xm and prob must have same number of rows');
    mat = xm.copy();

    mat.map((e: number, i: number): number => {
      const r = mat.rowOfIndex(i);
      return e / (prob.at(r) as number);
    }, true);
  }

  const means = new Array(p).fill(0.0);
  let total = 0.0;
  let result = 0.0;
  const nn = new NearestNeighbour(mat.extractRows(sampleArr), 10);

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

  return (result * sampleArr.length) / total;
}
