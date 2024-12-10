import {logGammaFunction} from './gamma-utils.js';
import {ParamsBeta} from './params.js';

const SAE = -20; //9;
// const EPS = Math.pow(10, SAE);

export function betaFunction(params: ParamsBeta): number {
  return Math.exp(logBetaFunction(params));
}

export function logBetaFunction({alpha, beta}: ParamsBeta): number {
  return logGammaFunction(alpha) + logGammaFunction(beta) - logGammaFunction(alpha + beta);
}

/*
 * Majumder, K. L., & Bhattacharjee, G. P. (1973).
 * Algorithm AS 63: The incomplete beta integral.
 * Journal of the Royal Statistical Society. Series C (Applied Statistics), 22(3), 409-411.
 * https://doi.org/10.2307/2346797
 *
 * Cran, G. W., Martin, K. J., & Thomas, G. E. (1977).
 * Remark AS R19 and algorithm AS 109: A remark on algorithms:
 * AS 63: The incomplete beta integral
 * AS 64: Inverse of the incomplete beta function ratio.
 * Journal of the Royal Statistical Society. Series C (Applied Statistics), 26(1), 111-114.
 * https://doi.org/10.2307/2346887
 */
export function regularizedBetaFunction(
  x: number,
  params: ParamsBeta,
  eps: number = 1e-20,
  logbetafn: number = logBetaFunction(params),
): number {
  const {alpha, beta} = params;

  if (x < 0.0 || 1.0 < x) return NaN;
  if (alpha <= 0.0 || beta <= 0.0) return NaN;
  if (x === 0.0 || x === 1.0) return x;
  if (alpha === 1.0) return 1.0 - Math.pow(1.0 - x, beta);
  if (beta === 1.0) return Math.pow(x, alpha);

  // 1
  let psq = alpha + beta;
  const cx = 1.0 - x;
  if (alpha < psq * x)
    return 1.0 - regularizedBetaFunction(cx, {alpha: beta, beta: alpha}, eps, logbetafn);

  // 2
  let term = 1.0;
  let ai = 1.0;
  let ret = 1.0;
  let ns = (beta + cx * psq) | 0;

  // 3
  let rx = x / cx;
  let temp = beta - ai;

  let run = 0;
  while (run++ <= 1e5) {
    // 4
    term *= (temp * rx) / (alpha + ai);
    ret += term;
    temp = Math.abs(term);
    if (temp <= eps && temp <= eps * ret) break;
    ai += 1.0;
    ns -= 1;
    if (ns >= 0.0) {
      temp = beta - ai;
      if (ns === 0.0) rx = x;
      continue;
    }

    temp = psq;
    psq += 1.0;
  }

  // 5
  return (ret * Math.exp(alpha * Math.log(x) + (beta - 1.0) * Math.log(cx) - logbetafn)) / alpha;
}

export function incompleteBetaFunction(
  x: number,
  params: ParamsBeta,
  eps: number = 1e-20,
  logbetafn: number = logBetaFunction(params),
): number {
  return Math.exp(logbetafn) * regularizedBetaFunction(x, params, eps, logbetafn);
}

/*
 * Majumder, K. L., & Bhattacharjee, G. P. (1973).
 * Algorithm AS 64: Inverse of the incomplete beta function ratio.
 * Journal of the Royal Statistical Society. Series C (Applied Statistics), 22(3), 411-414.
 * https://doi.org/10.2307/2346798
 *
 * Cran, G. W., Martin, K. J., & Thomas, G. E. (1977).
 * Remark AS R19 and algorithm AS 109: A remark on algorithms:
 * AS 63: The incomplete beta integral
 * AS 64: Inverse of the incomplete beta function ratio.
 * Journal of the Royal Statistical Society. Series C (Applied Statistics), 26(1), 111-114.
 * https://doi.org/10.2307/2346887
 *
 * Berry, K. J., Mielke, P. W., & Cran, G. W. (1990).
 * Algorithm AS R83: A Remark on Algorithm AS 109: Inverse of the Incomplete Beta Function Ratio
 * Journal of the Royal Statistical Society. Series C (Applied Statistics), 39(2), 309-310.
 * https://doi.org/10.2307/2347779
 *
 * Berry, K. J., Mielke, P. W., & Cran, G. W. (1990).
 * Correction to Algorithm AS R83-A Remark on Algorithm AS 109:
 * Inverse of The Incomplete Beta Function Ratio
 * Journal of the Royal Statistical Society. Series C (Applied Statistics), 40(1), 236.
 * https://doi.org/10.2307/2347939
 */
export function inverseRegularizedBetaFunction(
  p: number,
  params: ParamsBeta,
  eps: number = 1e-20,
  logbetafn: number = logBetaFunction(params),
): number {
  const {alpha, beta} = params;

  /* AS 64:
   * p = alpha
   * q = beta
   * beta = betafn
   * alpha = p
   * AS 109
   * beta = logbetafn
   */
  if (alpha <= 0.0 || beta <= 0.0) throw new RangeError('alpha, beta must be > 0.0');
  if (p < 0.0 || p > 1.0) throw new RangeError('p must be in [0,1]');
  if (p === 0.0) return 0.0;
  if (p === 1.0) return 1.0;

  // 1
  if (p > 0.5)
    return (
      1.0 - inverseRegularizedBetaFunction(1.0 - p, {alpha: beta, beta: alpha}, eps, logbetafn)
    );

  const fpu = eps;
  let ret = p;

  const iex = Math.max(-5.0 / Math.pow(alpha, 2) - 1.0 / Math.pow(p, 0.2) - 13.0, SAE);
  const acu = Math.pow(10, iex);

  const logp = Math.log(p);
  let r = Math.sqrt(-2.0 * logp);
  let y = r - (2.30753 + 0.27061 * r) / (1.0 + (0.99229 + 0.04481 * r) * r);
  let s, t, h, w: number;

  if (alpha > 1.0 && beta > 1.0) {
    // 5
    r = (y * y - 3.0) / 6.0;
    s = 1.0 / (alpha + alpha - 1.0);
    t = 1.0 / (beta + beta - 1.0);
    h = 2.0 / (s + t);
    w = (y * Math.sqrt(h + r)) / h - (t - s) * (r + 5.0 / 6.0 - 2.0 / (3.0 * h));
    ret = alpha / (alpha + beta * Math.exp(w + w));
  } else {
    // 2
    r = beta + beta;
    t = 1.0 / (9.0 * beta);
    t = r * Math.pow(1.0 - t + y * Math.sqrt(t), 3);

    if (t <= 0.0) {
      // 3
      ret = 1.0 - Math.exp((Math.log(1.0 - p) + Math.log(beta) + logbetafn) / beta);
    } else {
      t = (4.0 * beta + r - 2.0) / t;
      if (t <= 1.0) {
        // 4
        ret = Math.exp((Math.log(p * alpha) + logbetafn) / alpha);
      } else {
        ret = 1.0 - 2.0 / (t + 1.0);
      }
    }
  }

  // 6
  r = 1.0 - alpha;
  t = 1.0 - beta;
  let yprev = 0.0;
  let sq = 1.0;
  let prev = 1.0;
  let g, adj, tx: number;

  if (ret < 0.0001) ret = 0.0001;
  if (ret > 0.9999) ret = 0.9999;

  let run1 = 0;
  let run2 = 0;
  outer: while (run1++ <= 1e5) {
    // 7
    y = regularizedBetaFunction(ret, params, eps, logbetafn);
    if (y === 0.0) throw new Error('something went wrong');

    // 8
    y = (y - p) * Math.exp(logbetafn + r * Math.log(ret) + t * Math.log(1.0 - ret));
    if (y * yprev <= 0.0) prev = Math.max(sq, fpu);
    g = 1.0;

    // 9
    run2 = 0;
    while (run2++ <= 1e5) {
      adj = g * y;
      sq = Math.pow(adj, 2);

      if (sq < prev) {
        tx = ret - adj;
        if (0.0 <= tx && tx <= 1.0) {
          // 11
          if (prev <= acu || Math.pow(y, 2) <= acu) return ret;
          if (tx !== 0.0 && tx !== 1.0) {
            if (tx === ret) return ret;
            ret = tx;
            yprev = y;
            continue outer;
          }
        }
      }

      // 10
      g /= 3.0;
    }
  }

  // 12 -- shouldn't come to this
  return ret;
}

/*
 * Press, W. H., Teukolsky, S. A., Vetterling, W. T., & Flannery, B. P. (1996).
 * Numerical Recipes in Fortran 90: Numerical recipes in Fortran 77V. 2. Numerical recipes in Fortran 90.
 * Cambridge University Press.
 * ISBN: 9780521430647
 */
export function betaContinuedFraction(x: number, params: ParamsBeta, eps: number = 1e-20): number {
  const {alpha, beta} = params;
  const qab = alpha + beta;
  const qap = alpha + 1.0;
  const qam = alpha - 1.0;
  let c = 1;
  let d = 1.0 - (qab * x) / qap;
  if (Math.abs(d) < Number.EPSILON) d = Number.EPSILON;
  d = 1.0 / d;
  let h = d;

  let m2, aa, del: number;

  for (let r = 1; r < 100; r++) {
    m2 = 2 * r;
    aa = (r * (beta - r) * x) / ((qam + m2) * (alpha + m2));
    d = 1.0 + aa * d;
    if (Math.abs(d) < Number.EPSILON) d = Number.EPSILON;
    c = 1.0 + aa / c;
    if (Math.abs(c) < Number.EPSILON) c = Number.EPSILON;
    d = 1.0 / d;
    h *= d * c;
    aa = (-(alpha + r) * (qab + r) * x) / ((alpha + m2) * (qap + m2));
    d = 1.0 + aa * d;
    if (Math.abs(d) < Number.EPSILON) d = Number.EPSILON;
    c = 1.0 + aa / c;
    if (Math.abs(c) < Number.EPSILON) c = Number.EPSILON;
    d = 1.0 / d;
    del = d * c;
    h *= del;
    if (Math.abs(del - 1.0) < eps) break;
  }

  return h;
}
