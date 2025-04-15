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
 * @throws `RangeError` if `n` is not at positive integer.
 */
export function randomInt(n: number = 1, generator: RandomGenerator = new Random()): number {
  n = Math.round(n);
  if (n < 1) throw new RangeError("n must be a positive integer");
  if (n === 1) return 0;
  return (n * generator.random()) | 0;
}
