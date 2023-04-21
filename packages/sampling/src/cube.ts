import {arrayLikeToArray, Matrix, TArrayLike} from '@envisim/matrix';
import {Cube, CubeMethod} from './sampling-classes/Cube.js';
import {
  IOptions,
  optionsDefaultEps,
  optionsDefaultRand,
  optionsDefaultTreeBucketSize,
  PartialPick,
} from './types.js';

/**
 * Selects a balanced (pips) sample using the cube method.
 *
 * @param prob - inclusion probabilities of size N.
 * @param xm - matrix of balancing variables of size N*p.
 * @param options
 * @returns sample indices.
 */
export function cube(
  prob: TArrayLike,
  xm: Matrix,
  {
    rand = optionsDefaultRand,
    eps = optionsDefaultEps,
  }: PartialPick<IOptions, 'rand' | 'eps'> = {},
): number[] {
  if (!Matrix.isMatrix(xm)) throw new TypeError('xm must be Matrix');

  const N = xm.nrow;
  const p = arrayLikeToArray(prob);

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
  if (!Matrix.isMatrix(xb)) throw new TypeError('xb must be Matrix');
  if (!Matrix.isMatrix(xs)) throw new TypeError('xs must be Matrix');

  const N = xb.nrow;
  const p = arrayLikeToArray(prob);

  if (p.length !== N)
    throw new RangeError('Rows in xb must match length of prob');
  if (xs.nrow !== N) throw new RangeError('Rows in xb must match rows in xs');

  const cb = new Cube(CubeMethod.CUBE, p, xb, N, xs, treeBucketSize, eps, rand);
  cb.run();

  return cb.sample;
}
