import {Random} from '@envisim/random';
import {Exponential} from './exponential.js';
import {Normal} from './normal.js';
import {SQRT32} from './utils-consts.js';

interface IRandomShapeSmall {
  shape0: number;
  shape0inv: number;
  z: number;
  b: number;
}

interface IRandomShapeLarge {
  s2: number;
  s: number;
  d: number;
  q0: number;
  b: number;
  sigma: number;
  c: number;
}

/*
 * Acceptande/rejection for shape in (0,1].
 *
 * Best, D. J. (1983).
 * A note on gamma variate generators with shape parameter less than unity.
 * Computing, 30(2), 185-188.
 * https://doi.org/10.1007/BF02280789
 */
const randomShapeSmall = (
  n: number,
  shape0: number,
  rand: Random,
  scale0: number = 1.0,
): number[] => {
  const z = 0.07 + 0.75 * Math.sqrt(1.0 - shape0);
  const b = 1.0 + (Math.exp(-z) * shape0) / z;

  const constants: IRandomShapeSmall = {shape0, shape0inv: 1.0 / shape0, b, z};

  const rv = new Array(n);
  if (scale0 === 1.0) {
    for (let i = 0; i < n; i++) rv[i] = randomShapeSmall_inner(rand, constants);
  } else {
    for (let i = 0; i < n; i++)
      rv[i] = randomShapeSmall_inner(rand, constants) * scale0;
  }
  return rv;
};

const randomShapeSmall_inner = (
  rand: Random,
  {shape0, shape0inv, b, z}: IRandomShapeSmall,
): number => {
  let u: number, p: number, x: number, y: number;
  let run = 1;

  while (run++ <= 1e5) {
    // RGS 1
    u = rand.float();
    p = b * u;

    if (p <= 1.0) {
      // RGS 2
      x = z * Math.pow(p, shape0inv);
      u = rand.float();
      // RGS 3
      if (u <= (2.0 - x) / (2.0 + x) || u <= Math.exp(-x)) return x;
      continue;
    }

    // RGS 4
    x = -Math.log(z * (b - p) * shape0inv);
    y = x / z;
    u = rand.float();
    if (u * (shape0 + y - shape0 * y) < 1.0) return x;
    // RGS 5
    if (u <= Math.pow(y, shape0 - 1.0)) return x;
  }

  // Should not happen, solution is found in (max) average 1.28 iter.
  console.warn('gamma (randomShapeSmall) did not resolve in 1e5 iterations');
  return NaN;
};

const GAMMACOEFS = [
  [
    0.04166669, 0.02083148, 0.00801191, 0.00144121, -7.388e-5, 2.4511e-4,
    2.424e-4,
  ],
  [
    0.3333333, -0.250003, 0.2000062, -0.1662921, 0.1423657, -0.1367177,
    0.1233795,
  ],
];

/*
 * Returns a random Gamma(shape, 1)
 *
 * Second part of below:
 * Acceptande/rejection for shape in (1,Inf].
 *
 * Ahrens, J. H., & Dieter, U. (1982).
 * Generating gamma variates by a modified rejection technique.
 * Communications of the ACM, 25(1), 47-54.
 * https://doi.org/10.1145/358315.358390
 */
const randomShapeLarge = (
  n: number,
  shape0: number,
  rand: Random,
  scale0: number = 1.0,
): number[] => {
  const shape0inv = 1.0 / shape0;

  // GD 1
  const s2 = shape0 - 0.5;
  const s = Math.sqrt(s2);
  const d = SQRT32 - 12 * s;

  // GD 4
  const q0 = GAMMACOEFS[0].reduceRight(
    (prev, curr) => (prev + curr) * shape0inv,
    0.0,
  );

  let b: number, sigma: number, c: number;
  if (shape0 <= 3.686) {
    b = 0.463 + s + 0.178 * s2;
    sigma = 1.235;
    c = 0.195 / s - 0.079 + 0.16 * s;
  } else if (shape0 <= 13.022) {
    b = 1.654 + 0.0076 * s2;
    sigma = 1.68 / s + 0.275;
    c = 0.062 / s + 0.024;
  } else {
    b = 1.77;
    sigma = 0.75;
    c = 0.1515 / s;
  }

  const constants: IRandomShapeLarge = {s2, s, d, q0, b, sigma, c};

  const rv = new Array(n);
  if (scale0 === 1.0) {
    for (let i = 0; i < n; i++) rv[i] = randomShapeLarge_inner(rand, constants);
  } else {
    for (let i = 0; i < n; i++)
      rv[i] = randomShapeLarge_inner(rand, constants) * scale0;
  }
  return rv;
};

const randomShapeLarge_inner = (
  rand: Random,
  {s2, s, d, q0, b, sigma, c}: IRandomShapeLarge,
): number => {
  // GD 2
  let t = Normal.random(1, {mu: 0.0, sigma: 1.0}, {rand})[0];
  const x = s + t * 0.5;
  if (t >= 0.0) return Math.pow(x, 2);

  // GD 3
  let u = rand.float();
  if (d * u <= Math.pow(t, 3)) return Math.pow(x, 2);

  // GD 4
  let v: number, q: number;
  if (x > 0.0) {
    // GD 6
    v = t / (s + s);
    q =
      v <= 0.25
        ? q0 +
          Math.pow(t, 2) *
            0.5 *
            GAMMACOEFS[1].reduceRight((prev, curr) => (prev + curr) * v)
        : q0 + t * (t * 0.25 - s) + (s2 + s2) * Math.log1p(v);
    // GD 7
    if (Math.log(1 - u) <= q) return Math.pow(x, 2);
  }

  let e: number;
  let run = 1;

  while (run++ <= 1e4) {
    // GD 8
    e = Exponential.random(1, {rate: 1.0}, {rand})[0];
    u = rand.float() * 2 - 1;
    t = b + e * sigma * (u < 0.0 ? -1 : 1);
    // GD 9
    if (t <= -0.71874483771719) continue;
    // GD 10
    v = t / (s + s);
    q =
      v <= 0.25
        ? q0 +
          Math.pow(t, 2) *
            0.5 *
            GAMMACOEFS[1].reduceRight((prev, curr) => (prev + curr) * v)
        : q0 + t * (t * 0.25 - s) + (s2 + s2) * Math.log1p(v);

    if (
      q > 0 &&
      c * Math.abs(u) <= Math.expm1(q) * Math.exp(e - Math.pow(t, 2) * 0.5)
    )
      return Math.pow(s + t * 0.5, 2);
  }

  // Should not happen, solution is found in average 1.36 iter.
  console.warn('gamma (randomShapeLarge) did not resolve in 1e5 iterations');
  return NaN;
};

export const randomShapeGamma = (
  n: number,
  shape0: number,
  rand: Random,
  scale0: number = 1.0,
): number[] => {
  if (shape0 < 1.0) return randomShapeSmall(n, shape0, rand, scale0);
  return randomShapeLarge(n, shape0, rand, scale0);
};
