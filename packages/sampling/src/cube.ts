import {arrayLikeToArray, Matrix, TArrayLike} from '@envisim/matrix';
import {Cube, CubeMethod} from './sampling-classes/Cube.js';
import {
  IOptions,
  optionsDefaultEps,
  optionsDefaultRand,
  optionsDefaultTreeBucketSize,
} from './types.js';

/**
 * Selects a balanced (pips) sample using the cube method.
 *
 * @param prob - an {@link @envisim/matrix.TArrayLike} of inclusion probabilities,
 *   or a number `n` indicating equal inclusion probabilities `n / N`.
 * @param xm - N*p Matrix of balancing variables,
 *   where N is equal to size of `prob`.
 * @param options - See {@link IOptions}
 * @returns An array of indices of the sample.
 */
export function cube(
  prob: TArrayLike,
  xm: Matrix,
  {
    rand = optionsDefaultRand,
    eps = optionsDefaultEps,
  }: Omit<IOptions, 'treeBucketSize'> = {},
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
 * - opts.distfun defaults to [euclideanSquared]{@link sampling.euclideanSquared}.
 * - opts.eps defaults to 1e-9.
 *
 * @param prob - an {@link @envisim/matrix.TArrayLike} of inclusion probabilities,
 *   or a number `n` indicating equal inclusion probabilities `n / N`.
 * @param xb - N*p Matrix of balancing variables,
 *   where N is equal to size of `prob`.
 * @param xm - N*p Matrix of auxilliary variables,
 *   where N is equal to size of `prob`.
 * @param options - See {@link IOptions}
 * @returns An array of indices of the sample.
 * @returns An array of indices of the sample.
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
