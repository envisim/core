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
 * @param prob - a {@link matrix.TArrayLike} of inclusion probabilities. Must have same
 *   size as `y`.
 * @param xm - N*p Matrix of auxilliary variables, where N is equal to size of `prob`.
 * @param sample - A list of sample indices.
 * @returns The voronoi balance.
 */
export const voronoiBalance = (
  prob: TArrayLike,
  xm: Matrix,
  sample: TArrayLike,
  opts: IOptions = {eps: optionsDefaultEps, distfun: optionsDefaultDistfun},
): number => {
  const ps = arrayLikeToColumnVector(prob);
  const sampleArr = arrayLikeToArray(sample);

  if (!Matrix.isMatrix(xm)) throw new TypeError('xm must be of class Matrix');
  if (xm.nrow !== ps.nrow)
    throw new RangeError('xm and prob must have same number of rows');
  if (
    !sampleArr.every(
      (v: number) => Number.isInteger(v) && 0 <= v && v < ps.nrow,
    )
  )
    throw new TypeError(
      'sample must be a vector of integers inside the length of prob',
    );

  const incl = new ColumnVector(0.0, ps.nrow);

  for (let i = 0; i < ps.nrow; i++) {
    const neighbours = nearestNeighbourArray(xm, i, opts);
    for (let j = 0; j < neighbours.length; j++) {
      incl.fnIndex(neighbours[j], (v) => v + ps.atIndex(i) / neighbours.length);
    }
  }

  return (
    incl.subtractScalar(1, true).math('pow', 2, true).sum() / sampleArr.length
  );
};
