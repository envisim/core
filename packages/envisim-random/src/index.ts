/**
 * @module @envisim/random
 */
import { ValidationError } from "@envisim/utils";
import { Random } from "./random.js";

export { Random };

export interface RandomGenerator {
  random(): number;
}

/**
 * @returns Pseudo-random (uniform) number on the interval `[0.0, 1.0)`
 */
export function randomFloat(generator: RandomGenerator = new Random()): number {
  return generator.random();
}

/**
 * @returns Pseudo-random (uniform) number o nthe interval `(0.0, 1.0)`
 */
export function randomFloatOpen(generator: RandomGenerator = new Random()): number {
  let u: number;
  do {
    u = generator.random();
  } while (u === 0.0);
  return u;
}

/**
 * Returns an array with psudo-random standard uniform elements.
 *
 * @param n - Length of array.
 * @param generator - Seed for random number generator.
 * @returns Pseudo-random (uniform) array with elements on the interval `[0.0, 1.0)`.
 */
export function randomArray(n: number, generator: RandomGenerator = new Random()): number[] {
  return Array.from({ length: n }, () => generator.random());
}

/**
 * @returns A pseudo-random integer on [0, `n`)
 * @throws ValidationError if `n` is not at positive integer.
 */
export function randomInt(n: number = 1, generator: RandomGenerator = new Random()): number {
  n |= 0;
  ValidationError.check["number-not-in-interval"](
    { arg: "n", interval: [1, 0x7fffffff], ends: "right-open" },
    n,
  )?.raise();
  if (n === 1) return 0;
  return (n * generator.random()) | 0;
}
