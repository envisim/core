import {Matrix, TArrayLike, arrayLikeToArray} from '@envisim/matrix';

import {
  AuxiliaryOptions,
  BaseOptions,
  baseOptions,
} from './base-options/index.js';
import {Cube, CubeMethod} from './sampling-classes/index.js';

/**
 * Selects a balanced (pips) sample using the cube method.
 *
 * @param options
 * @returns sample indices.
 */
export function cube({
  probabilities,
  auxiliaries,
  rand = baseOptions.rand,
  eps = baseOptions.eps,
}: AuxiliaryOptions): number[] {
  if (!Matrix.isMatrix(xm)) throw new TypeError('xm must be Matrix');

  const N = xm.nrow;
  const p = arrayLikeToArray(prob, true);

  if (p.length !== N)
    throw new RangeError('Rows in xm must match length of prob');

  const cb = new Cube(CubeMethod.CUBE, p, xm, N, undefined, 40, eps, rand);
  cb.run();

  return cb.sample;
}

/**
 * Selects a doubly balanced sample using the local cube method.
 *
 * @param prob - inclusion probabilities of size N.
 * @param xb - matrix of balancing variables of size N*p,
 * @param xm - matrix of auxilliary variables of size N*q,
 * @param options
 * @returns sample indices.
 */
export function lcube(
  prob: TArrayLike,
  xb: Matrix,
  xs: Matrix,
  {
    rand = optionsDefaultRand,
    eps = optionsDefaultEps,
    treeBucketSize = optionsDefaultTreeBucketSize,
  }: IOptions = {},
): number[] {
  Matrix.assert(xb);
  Matrix.assert(xs);

  const N = xb.nrow;
  const p = arrayLikeToArray(prob, true);

  if (p.length !== N)
    throw new RangeError('Rows in xb must match length of prob');
  if (xs.nrow !== N) throw new RangeError('Rows in xb must match rows in xs');

  const cb = new Cube(
    CubeMethod.LCUBE,
    p,
    xb,
    N,
    xs,
    treeBucketSize,
    eps,
    rand,
  );
  cb.run();

  return cb.sample;
}
