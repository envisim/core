import {type Matrix, vectorToArrayOfLength} from '@envisim/matrix';

import {
  type AuxiliaryOptions,
  BASE_OPTIONS,
  type PipsOptions,
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
  rand = BASE_OPTIONS.rand,
  eps = BASE_OPTIONS.eps,
}: CubeOptions): number[] {
  const N = balancing.nrow;
  const p = vectorToArrayOfLength(probabilities, N, true, 'probabilities');

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
  rand = BASE_OPTIONS.rand,
  eps = BASE_OPTIONS.eps,
  treeBucketSize = BASE_OPTIONS.treeBucketSize,
}: LocalCubeOptions): number[] {
  const N = balancing.nrow;
  const p = vectorToArrayOfLength(probabilities, N, true, 'probabilities');

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
