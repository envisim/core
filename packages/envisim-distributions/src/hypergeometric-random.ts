import {Random} from '@envisim/random';

import {hypergeometricQuantile} from './hypergeometric-utils.js';
import {IHypergeometricParams} from './types.js';
import {logFactorial} from './utils.js';

interface IHypergeometricRandom {
  n: number;
  n1: number;
  n2: number;
  k: number;
  m: number;
  xl: number;
  xr: number;
  lambdal: number;
  lambdar: number;
  p1: number;
  p2: number;
  p3: number;
}

/*
 * Kachitvichyanukul, V., & Schmeiser, B. (1985).
 * Computer generation of hypergeometric random variates.
 * Journal of Statistical Computation and Simulation, 22(2), 127-145.
 * https://doi.org/10.1080/00949658508810839
 */
export function randomHypergeometric(
  numberR: number,
  params: IHypergeometricParams,
  rand: Random,
): number[] {
  const rv = new Array<number>(numberR);
  // n1 = K
  // n2 = N - K
  // n = k
  // H2PE 0.0
  const n = params.N;
  let n1 = params.K;
  let n2 = n - n1;
  if (n1 > n2) {
    n1 = n2;
    n2 = params.K;
  }
  const k = params.n <= n * 0.5 ? params.n : n - params.n;

  // H2PE 0.1
  const m = (((k + 1) * (n1 + 1)) / (n + 2)) | 0;
  if (m - Math.max(0, k - n2) < 10) {
    for (let i = 0; i < numberR; i++)
      rv[i] = hypergeometricQuantile(
        rand.float(),
        params.N,
        params.K,
        params.n,
      );
    return rv;
  }

  const a =
    logFactorial(m) +
    logFactorial(n1 - m) +
    logFactorial(k - m) +
    logFactorial(n2 - k + m);
  const d =
    0.5 + ((1.5 * Math.sqrt(((n - k) * k * n1 * n2) / ((n - 1) * n * n))) | 0); // unclear
  const xl = m - d + 0.5;
  const xr = m + d + 0.5;
  const kl = Math.exp(
    a -
      logFactorial(xl) -
      logFactorial(n1 - xl) -
      logFactorial(k - xl) -
      logFactorial(n2 - k + xl),
  );
  const kr = Math.exp(
    a -
      logFactorial(xr - 1) -
      logFactorial(n1 - xr + 1) -
      logFactorial(k - xr + 1) -
      logFactorial(n2 - k + xr - 1),
  );
  const lambdal = -Math.log(
    (xl * (n2 - k + xl)) / ((n1 - xl + 1) * (k - xl + 1)),
  );
  const lambdar = -Math.log(
    ((n1 - xr + 1) * (k - xr + 1)) / (xr * (n2 - k + xr)),
  );
  const p1 = 2 * d;
  const p2 = p1 + kl / lambdal;
  const p3 = p2 + kr / lambdar;

  const constants: IHypergeometricRandom = {
    n,
    n1,
    n2,
    k,
    m,
    xl,
    xr,
    lambdal,
    lambdar,
    p1,
    p2,
    p3,
  };

  for (let i = 0; i < numberR; i++)
    rv[i] = randomHypergeometric_inner(rand, params, constants);
  return rv;
}

function randomHypergeometric_inner(
  rand: Random,
  params: IHypergeometricParams,
  {
    n,
    n1,
    n2,
    k,
    m,
    xl,
    xr,
    lambdal,
    lambdar,
    p1,
    p2,
    p3,
  }: IHypergeometricRandom,
): number {
  // H2PE 1
  let i: number, f: number, u: number, v: number;
  let y: number = 0;

  let xm: number, xn: number, xk: number;
  let y1: number, ym: number, yn: number, yk: number;
  let r: number, s: number, t: number, e: number;
  let nk: number, nm: number;
  let g: number, gu: number, gl: number;
  let ub: number, av: number;
  let dg: number, dr: number, ds: number, dt: number, de: number;

  let run = 0;
  while (run++ <= 1e5) {
    u = rand.float() * p3;
    v = rand.float();
    if (u <= p1) {
      // H2PE 1
      y = (xl + u) | 0;
    } else if (u <= p2) {
      // H2PE 2
      y = (xl + Math.log(v) / lambdal) | 0;
      if (y < Math.max(0, k - n2)) continue;
      v *= (u - p1) * lambdal;
    } else {
      y = (xr - Math.log(v) / lambdar) | 0;
      if (y > Math.min(n1, k)) continue;
      v *= (u - p2) * lambdar;
    }

    if (m < 100 || y <= 50) {
      // H2PE 4.1
      f = 1.0;
      if (m < y) {
        for (i = m + 1; i <= y; i++)
          f *= ((n1 - i + 1) * (k - i + 1)) / (i * (n2 - k + i));
      } else if (m > y) {
        for (i = y + 1; i <= m; i++)
          f *= (i * (n2 - k + i)) / ((n1 - i + 1) * (k - i + 1));
        // f *= (i * (n2 - k + i)) / ((n1 - i) * (k - i));
      }
      if (v > f) continue;
      break;
    } else {
      // H2PE 4.2
      // x = y;
      y1 = y + 1;
      ym = y - m;
      yn = n1 - y + 1;
      yk = k - y + 1;
      nk = n2 - k + y1;
      r = -ym / y1;
      s = ym / yn;
      t = ym / yk;
      e = -ym / nk;
      g = (yn * yk) / (y1 * nk) - 1.0;
      dg = g < 0 ? 1.0 + g : 1.0;
      gu = g * (1.0 + g * (-0.5 + g / 3.0));
      gl = gu - Math.pow(g, 4) / (4 * dg); // unclear
      xm = m + 0.5;
      xn = n1 - m + 0.5;
      xk = k - m + 0.5;
      nm = n2 - k + xm;
      ub =
        xm * r * (1.0 + r * (-0.5 + r / 3.0)) +
        xn * s * (1.0 + s * (-0.5 + s / 3.0)) +
        xk * t * (1.0 + t * (-0.5 + t / 3.0)) +
        nm * e * (1.0 + e * (-0.5 + e / 3.0)) +
        y * gu -
        m * gl +
        0.0034;
      av = Math.log(v);
      if (av > ub) continue;
      dr = xm * Math.pow(r, 4);
      if (r < 0) dr /= 1 + r;
      ds = xn * Math.pow(s, 4);
      if (s < 0) ds /= 1 + s;
      dt = xk * Math.pow(t, 4);
      if (t < 0) dt /= 1 + t;
      de = nm * Math.pow(e, 4);
      if (e < 0) de /= 1 + e;

      if (
        av < ub - 0.25 * (dr + ds + dt + de) + (y + m) * (gl - gu) - 0.0078 ||
        av <=
          -logFactorial(y) -
            logFactorial(n1 - y) -
            logFactorial(k - y) -
            logFactorial(n2 - k + y)
      )
        break;
    }
  }

  // H2PE 5
  if (params.n < n * 0.5)
    return params.K <= params.N - params.K ? y : params.n - y;
  if (params.K <= params.N - params.K) return params.K - y;
  return params.n - params.N + params.K + y;
}
