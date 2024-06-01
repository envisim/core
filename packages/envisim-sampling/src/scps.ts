import {type ColumnVector, vectorToArrayOfLength} from '@envisim/matrix';

import {type AuxiliaryOptions, baseOptions} from './base-options/index.js';
import {
  CorrelatedPoisson,
  CorrelatedPoissonMethod,
} from './sampling-classes/index.js';

/**
 * Selects a Spatially Correlated Poisson Sample (SCPS)
 *
 * @param options
 * @returns sample indices.
 */
export function scps({
  probabilities,
  auxiliaries,
  rand = baseOptions.rand,
  eps = baseOptions.eps,
  treeBucketSize = baseOptions.treeBucketSize,
}: AuxiliaryOptions): number[] {
  const N = auxiliaries.nrow;
  const p = vectorToArrayOfLength(probabilities, N, true, 'probabilities');

  const cps = new CorrelatedPoisson(
    CorrelatedPoissonMethod.SCPS,
    p,
    auxiliaries,
    N,
    treeBucketSize,
    eps,
    rand,
  );
  cps.run();

  return cps.sample;
}

interface ScpsCoordinatedOptions extends AuxiliaryOptions {
  /**
   * Array of random values of size N
   */
  random: ColumnVector | number[];
}

/**
 * Selects a coordinated Spatially Correlated Poisson Sample (SCPSCOORD)
 *
 * @param options
 * @returns sample indices.
 */
export function scpsCoordinated({
  probabilities,
  auxiliaries,
  random,
  rand = baseOptions.rand,
  eps = baseOptions.eps,
  treeBucketSize = baseOptions.treeBucketSize,
}: ScpsCoordinatedOptions): number[] {
  const N = auxiliaries.nrow;
  const p = vectorToArrayOfLength(probabilities, N, true, 'probabilities');
  const randvals = vectorToArrayOfLength(random, N, true, 'random');

  const cps = new CorrelatedPoisson(
    CorrelatedPoissonMethod.LCPS,
    p,
    auxiliaries,
    N,
    treeBucketSize,
    eps,
    rand,
  );
  cps.setRandomArr(randvals);
  cps.run();

  return cps.sample;
}

/**
 * Selects a Locally Correlated Poisson Sample (LCPS)
 *
 * @param options
 * @returns sample indices.
 */
export function lcps({
  probabilities,
  auxiliaries,
  rand = baseOptions.rand,
  eps = baseOptions.eps,
  treeBucketSize = baseOptions.treeBucketSize,
}: AuxiliaryOptions): number[] {
  const N = auxiliaries.nrow;
  const p = vectorToArrayOfLength(probabilities, N, true, 'probabilities');

  const cps = new CorrelatedPoisson(
    CorrelatedPoissonMethod.LCPS,
    p,
    auxiliaries,
    N,
    treeBucketSize,
    eps,
    rand,
  );
  cps.run();

  return cps.sample;
}
