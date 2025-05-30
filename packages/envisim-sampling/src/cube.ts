import { type Matrix, Vector } from "@envisim/matrix";
import { ValidationError } from "@envisim/utils";
import { type AuxiliaryOptions, BASE_OPTIONS, type PipsOptions } from "./base-options/index.js";
import { Cube } from "./sampling-classes/index.js";

export interface CubeOptions extends PipsOptions {
  /**
   * Matrix of balancing auxiliary variables
   */
  balancing: Matrix;
}

/**
 * Selects a balanced (pips) sample using the cube method.
 *
 * @param options -
 * @returns sample indices.
 */
export function cube({
  probabilities,
  balancing,
  rand = BASE_OPTIONS.rand,
  eps = BASE_OPTIONS.eps,
}: CubeOptions): number[] {
  const N = balancing.nrow;
  const p = Vector.borrow(probabilities);

  if (p.length !== N)
    throw ValidationError.create["other-incorrect-shape"]({
      arg: "probabilities",
      shape: "balancing rows",
    });

  const cb = new Cube(Cube.CUBE, p, balancing, N, undefined, 40, eps, rand);
  cb.run();

  return cb.sample;
}

/**
 * @interface
 */
export type LocalCubeOptions = CubeOptions & AuxiliaryOptions;

/**
 * Selects a doubly balanced sample using the local cube method.
 *
 * @param options -
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
  const p = Vector.borrow(probabilities);

  if (p.length !== N)
    throw ValidationError.create["other-incorrect-shape"]({
      arg: "probabilities",
      shape: "balancing rows",
    });
  if (auxiliaries.nrow !== N)
    throw ValidationError.create["other-incorrect-shape"]({
      arg: "auxiliaries",
      shape: "balancing rows",
    });

  const cb = new Cube(Cube.LCUBE, p, balancing, N, auxiliaries, treeBucketSize, eps, rand);
  cb.run();

  return cb.sample;
}
