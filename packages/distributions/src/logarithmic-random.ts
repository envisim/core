import {Random} from '@envisim/random';

/*
 * Kemp, A. W. (1981).
 * Efficient generation of logarithmically distributed pseudo‐random variables.
 * Journal of the Royal Statistical Society: Series C (Applied Statistics), 30(3), 249-253.
 * https://doi.org/10.2307/2346348
 */
export const randomLogarithmic = (p: number, rand: Random): number => {
  // LK
  if (p >= 0.95) {
    const h = Math.log(1 - p);
    const u2 = rand.float();
    if (u2 > p) return 1;
    const u1 = rand.float();
    const q = 1 - Math.exp(u1 * h);
    if (u2 < Math.pow(q, 2)) return (1 + Math.log(u2) / Math.log(q)) | 0;
    if (u2 > q) return 1;
    return 2;
  }

  // LS
  let u = rand.float();
  let x = 1;
  let f = -p / Math.log(1.0 - p);

  while (u > f) {
    x++;
    u -= f;
    f *= (p * (x - 1)) / x;
  }

  return x;
};
