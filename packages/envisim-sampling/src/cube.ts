import {type Matrix, arrayLikeToArray} from '@envisim/matrix';

import {
  type AuxiliaryOptions,
  type PipsOptions,
  baseOptions,
} from './base-options/index.js';
import {Cube, CubeMethod} from './sampling-classes/index.js';

interface CubeOptions extends PipsOptions {
  /**
   * Matrix of balancing auxiliary variables
   */
  balancing: Matrix;
}

/**
 * Selects a balanced (pips) sample using the cube method.
 *
 * @param options
 * @returns sample indices.
 */
export function cube({
  probabilities,
  balancing,
  rand = baseOptions.rand,
  eps = baseOptions.eps,
}: CubeOptions): number[] {
  const N = balancing.nrow;
  const p = arrayLikeToArray(probabilities, true);

  if (p.length !== N)
    throw new RangeError('Rows in xm must match length of prob');

  const cb = new Cube(
    CubeMethod.CUBE,
    p,
    balancing,
    N,
    undefined,
    40,
    eps,
    rand,
  );
  cb.run();

  return cb.sample;
}

type LocalCubeOptions = CubeOptions & AuxiliaryOptions;

/**
 * Selects a doubly balanced sample using the local cube method.
 *
 * @param options
 * @returns sample indices.
 */
export function localCube({
  probabilities,
  balancing,
  auxiliaries,
  rand = baseOptions.rand,
  eps = baseOptions.eps,
  treeBucketSize = baseOptions.treeBucketSize,
}: LocalCubeOptions): number[] {
  const N = balancing.nrow;
  const p = arrayLikeToArray(probabilities, true);

  if (p.length !== N)
    throw new RangeError('Rows in xb must match length of prob');
  if (auxiliaries.nrow !== N)
    throw new RangeError('Rows in xb must match rows in xs');

  const cb = new Cube(
    CubeMethod.LCUBE,
    p,
    balancing,
    N,
    auxiliaries,
    treeBucketSize,
    eps,
    rand,
  );
  cb.run();

  return cb.sample;
}
