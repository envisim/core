import { Vector } from "@envisim/matrix";
import { ValidationError } from "@envisim/utils";
import { type AuxiliaryOptions, BASE_OPTIONS } from "./base-options/index.js";
import { CorrelatedPoisson } from "./sampling-classes/index.js";

/**
 * Selects a Spatially Correlated Poisson Sample (SCPS)
 *
 * @param options -
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

  if (p.length !== N)
    throw ValidationError.create["other-incorrect-shape"]({
      arg: "probabilities",
      shape: "auxiliaries rows",
    });

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

export interface ScpsCoordinatedOptions extends AuxiliaryOptions {
  /**
   * Array of random values of size N
   */
  random: Vector | number[];
}

/**
 * Selects a coordinated Spatially Correlated Poisson Sample (SCPSCOORD)
 *
 * @param options -
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

  (
    ValidationError.check["array-incorrect-length"](
      { arg: "probabilities", shape: "auxiliaries.nrow", length: N },
      p,
    ) ??
    ValidationError.check["array-incorrect-length"](
      { arg: "random", shape: "auxiliaries.nrow", length: N },
      randvals,
    )
  )?.raise();

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
 * @param options -
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

  ValidationError.check["array-incorrect-length"](
    { arg: "probabilities", shape: "auxiliaries.nrow", length: N },
    p,
  )?.raise();

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
