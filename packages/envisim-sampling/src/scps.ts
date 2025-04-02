import { Vector } from "@envisim/matrix";
import { type AuxiliaryOptions, BASE_OPTIONS } from "./base-options/index.js";
import { CorrelatedPoisson } from "./sampling-classes/index.js";

/**
 * Selects a Spatially Correlated Poisson Sample (SCPS)
 *
 * @param options
 * @returns sample indices.
 */
export function scps({
  probabilities,
  auxiliaries,
  rand = BASE_OPTIONS.rand,
  eps = BASE_OPTIONS.eps,
  treeBucketSize = BASE_OPTIONS.treeBucketSize,
}: AuxiliaryOptions): number[] {
  const N = auxiliaries.nrow;
  const p = Vector.borrow(probabilities);

  if (p.length !== N) {
    throw new RangeError("length of probabilities does not match size of auxiliaries");
  }

  const cps = new CorrelatedPoisson(
    CorrelatedPoisson.SCPS,
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
  random: Vector | number[];
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
  rand = BASE_OPTIONS.rand,
  eps = BASE_OPTIONS.eps,
  treeBucketSize = BASE_OPTIONS.treeBucketSize,
}: ScpsCoordinatedOptions): number[] {
  const N = auxiliaries.nrow;
  const p = Vector.borrow(probabilities);
  const randvals = Vector.borrow(random);

  if (p.length !== N) {
    throw new RangeError("length of probabilities does not match size of auxiliaries");
  } else if (randvals.length !== N) {
    throw new RangeError("length of randvals does not match size of auxiliaries");
  }

  const cps = new CorrelatedPoisson(
    CorrelatedPoisson.LCPS,
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
  rand = BASE_OPTIONS.rand,
  eps = BASE_OPTIONS.eps,
  treeBucketSize = BASE_OPTIONS.treeBucketSize,
}: AuxiliaryOptions): number[] {
  const N = auxiliaries.nrow;
  const p = Vector.borrow(probabilities);

  if (p.length !== N) {
    throw new RangeError("length of probabilities does not match size of auxiliaries");
  }

  const cps = new CorrelatedPoisson(
    CorrelatedPoisson.LCPS,
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
