import {EPS} from './utils-consts.js';
import {binomialCoefficient} from './utils.js';

/*
 * Berger, R. L. (1991).
 * A Remark on Algorithm AS 152: Cumulative Hypergeometric Probabilities.
 * Journal of the Royal Statistical Society Series C, 40(2), 374-375.
 * https://doi.org/10.2307/2347606
 *
 * Shea, B. L. (1989).
 * Remark AS R77: A remark on algorithm AS 152: Cumulative hypergeometric probabilities.
 * Journal of the Royal Statistical Society. Series C (Applied Statistics), 38(1), 199-204.
 * https://doi.org/10.2307/2347696
 *
 * Lund, R. E. (1980).
 * Algorithm AS 152: Cumulative hypergeometric probabilities.
 * Journal of the Royal Statistical Society. Series C (Applied Statistics), 29(2), 221-223.
 * https://doi.org/10.2307/2986315
 *
 * Welinder, M. (2004).
 * Bug 6772 - phyper accuracy and efficiency
 * R-project.
 * https://bugs.r-project.org/show_bug.cgi?id=6772
 */
export function hypergeometricCDF(
  x: number,
  N: number,
  K: number,
  n: number,
  pmf: (y: number, nk: number, kn: number) => number,
): number {
  const NK = K;
  const KN = N - K;
  let xx = x;

  if (x < Math.max(0, n - KN)) return 0.0;
  if (x >= Math.min(n, K)) return 1.0;
  if (x * N > n * K) return 1.0 - hypergeometricCDF(n - x - 1, N, KN, n, pmf);

  let e = 1.0;
  let s = 1.0;

  while (xx > 0 && e > s * EPS) {
    e *= (xx * (KN - n + xx)) / ((NK - xx + 1) * (n - xx + 1));
    s += e;
    xx--;
  }

  return s * pmf(x, NK, KN);
}

export function hypergeometricQuantile(
  quantile: number,
  N: number,
  K: number,
  n: number,
): number {
  if (quantile < 0.0 || quantile > 1.0) return NaN;
  let NK = K;
  let KN = N - K;
  const k0 = Math.max(0, n - KN);
  if (quantile === 0.0) return k0;
  const k1 = Math.min(n, K);
  if (quantile === 1.0) return Math.min(n, K);

  let nk = k0;
  let kn = n - k0;
  let e =
    (binomialCoefficient(NK, nk) * binomialCoefficient(KN, kn)) /
    binomialCoefficient(N, n);
  let s = e;
  NK -= nk;
  KN -= kn;

  while (s < quantile && nk < k1) {
    nk++;
    KN++;
    e *= (NK / KN) * (kn / nk);
    s += e;
    kn--;
    NK--;
  }

  return nk;
}
