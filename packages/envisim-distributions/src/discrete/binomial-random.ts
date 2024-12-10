import {Random} from '@envisim/random';

const binomialCoefsFun = (a: number, b: number): number => {
  return (13860.0 - (462.0 - (132.0 - (99.0 - 140.0 / a) / a) / a) / a) / b / 166320.0;
};

interface RandomBinomialLarge {
  upperTail: boolean;
  n0: number;
  p: number;
  q: number;
  npq: number;
  fm: number;
  m: number;
  pqFrac: number;
  fmFrac: number;
  xm: number;
  xl: number;
  xr: number;
  c: number;
  lambdal: number;
  lambdar: number;
  p1: number;
  p2: number;
  p3: number;
  p4: number;
}

interface RandomBinomialSmall {
  upperTail: boolean;
  n0: number;
  frac: number;
  delta: number;
  pmf0: number;
}

/*
 * Returns a random Binomial(n, p)
 *
 * Acceptance rejection
 *
 * Kachitvichyanukul, V., & Schmeiser, B. W. (1988).
 * Binomial random variate generation.
 * Communications of the ACM, 31(2), 216-222.
 * https://doi.org/10.1145/42372.42381
 */
function randomBinomialLarge(n: number, n0: number, p0: number, rand: Random): number[] {
  const upperTail = p0 > 0.5;
  const p = upperTail ? 1.0 - p0 : p0;
  const q = 1.0 - p;
  const npq = n0 * p * q;
  const fm = p * (n0 + 1);
  const m = fm | 0;
  const pqFrac = p / q;
  const fmFrac = fm / q;

  const p1 = ((2.195 * Math.sqrt(npq) - 4.6 * q) | 0) + 0.5;
  const xm = m + 0.5;
  const xl = xm - p1;
  const xr = xm + p1;
  const c = 0.134 + 20.5 / (15.3 + m);
  let a = (fm - xl) / (fm - xl * p);
  const lambdal = a * (1.0 + a * 0.5);
  a = (xr - fm) / (xr * q);
  const lambdar = a * (1.0 + a * 0.5);
  const p2 = p1 * (1.0 + c + c);
  const p3 = p2 + c / lambdal;
  const p4 = p3 + c / lambdar;

  const constants: RandomBinomialLarge = {
    upperTail,
    n0,
    p,
    q,
    npq,
    fm,
    m,
    pqFrac,
    fmFrac,
    xm,
    xl,
    xr,
    c,
    lambdal,
    lambdar,
    p1,
    p2,
    p3,
    p4,
  };

  const rv = new Array<number>(n);
  for (let i = 0; i < n; i++) rv[i] = randomBinomialLarge_inner(rand, constants);
  return rv;
}

function randomBinomialLarge_inner(
  rand: Random,
  {
    upperTail,
    n0,
    p,
    q,
    npq,
    m,
    pqFrac,
    fmFrac,
    xm,
    xl,
    xr,
    c,
    lambdal,
    lambdar,
    p1,
    p2,
    p3,
    p4,
  }: RandomBinomialLarge,
): number {
  let A: number, f: number, i: number, k: number;
  let t: number, u: number, v: number, x: number, y: number;
  let rho: number, x1: number, f1: number, z: number, w: number;
  let x2: number, f2: number, z2: number, w2: number;

  let run = 1;
  while (run++ <= 1e5) {
    // BTPE 1
    u = rand.float() * p4;
    v = rand.float();

    if (u <= p1) {
      y = (xm - p1 * v + u) | 0;
      return upperTail ? n0 - y : y;
    }

    if (u <= p2) {
      // BTPE 2
      x = xl + (u - p1) / c;
      v = v * c + 1.0 - Math.abs(xm - x) / p1;
      if (v > 1.0) continue;
      y = x | 0;
      // goto 5
    } else if (u <= p3) {
      // BTPE 3
      y = (xl + Math.log(v) / lambdal) | 0;
      if (y < 0) continue;
      v *= (u - p2) * lambdal;
      // goto 5
    } else {
      y = (xr - Math.log(v) / lambdar) | 0;
      if (y > n0) continue;
      v *= (u - p3) * lambdar;
    }

    // BTPE 5.0
    k = Math.abs(y - m);

    if (k <= 20 || k >= npq * 0.5 - 1) {
      // BTPE 5.1
      f = 1.0;
      if (m < y) {
        for (i = m + 1; i <= y; i++) f *= fmFrac / i - pqFrac;
      } else if (m > y) {
        for (i = y + 1; i <= m; i++) f /= fmFrac / i - pqFrac;
      }

      if (v > f) continue;
      return upperTail ? n0 - y : y;
    }

    // BTPE 5.2
    rho = (k / npq) * ((k * (k / 3 + 0.625) + 1.0 / 6.0) / npq + 0.5);
    t = (-k * k) / (2 * npq);
    A = Math.log(u);
    if (A < t - rho) return upperTail ? n0 - y : y;
    if (A > t + rho) continue;

    // BTPE 5.3
    x1 = y + 1;
    f1 = m + 1;
    z = n0 + 1 - m;
    w = n0 + 1 - y;
    x2 = x1 * x1;
    f2 = f1 * f1;
    z2 = z * z;
    w2 = w * w;
    if (
      A >
      xm * Math.log(f1 / x1) +
        (n0 - m + 0.5) * Math.log(z / w) +
        (y - m) * Math.log((w * p) / (x1 * q)) +
        binomialCoefsFun(f2, f1) +
        binomialCoefsFun(z2, z) +
        binomialCoefsFun(x2, x1) +
        binomialCoefsFun(w2, w)
    )
      continue;
    return upperTail ? n0 - y : y;
  }

  console.warn('binomial (randomBinomialLarge) did not resolve in 1e5 iterations');
  return NaN;
}

function randomBinomialSmall(n: number, n0: number, p0: number, rand: Random): number[] {
  const upperTail: boolean = p0 > 0.5;
  const p = upperTail ? 1.0 - p0 : p0;
  const q = 1.0 - p;
  const frac = p / q;
  const delta = frac * (n0 + 1);
  const pmf0 = Math.pow(q, n0);

  const constants: RandomBinomialSmall = {
    upperTail,
    n0,
    frac,
    delta,
    pmf0,
  };

  const rv = new Array<number>(n);
  for (let i = 0; i < n; i++) rv[i] = randomBinomialSmall_inner(rand, constants);
  return rv;
}

function randomBinomialSmall_inner(
  rand: Random,
  {upperTail, n0, frac, delta, pmf0}: RandomBinomialSmall,
): number {
  let u = rand.float();
  let pmf = pmf0;

  let k = 0;
  for (; u >= pmf && k <= n0; ) {
    u -= pmf;
    k++;
    pmf *= delta / k - frac;
  }

  return upperTail ? n0 - k : k;
}

export function randomBinomial(n: number, n0: number, p0: number, rand: Random): number[] {
  if (n0 * p0 <= 30.0) return randomBinomialSmall(n, n0, p0, rand);
  return randomBinomialLarge(n, n0, p0, rand);
}
