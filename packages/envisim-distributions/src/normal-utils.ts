import {SQRTMPI} from './utils-consts.js';

/* eslint-disable no-loss-of-precision */
const NORMALQCOEFS = [
  [
    2509.0809287301226727, 33430.575583588128105, 67265.770927008700853, 45921.953931549871457,
    13731.693765509461125, 1971.5909503065514427, 133.14166789178437745,
  ],
  [
    5226.495278852854561, 28729.085735721942674, 39307.89580009271061, 21213.794301586595867,
    5394.1960214247511077, 687.1870074920579083, 42.313330701600911252,
  ],
  [
    7.7454501427834140764e-4, 0.0227238449892691845833, 0.24178072517745061177,
    1.27045825245236838258, 3.64784832476320460504, 5.7694972214606914055, 4.6303378461565452959,
  ],
  [
    1.05075007164441684324e-9, 5.475938084995344946e-4, 0.0151986665636164571966,
    0.14810397642748007459, 0.68976733498510000455, 1.6763848301838038494, 2.05319162663775882187,
  ],
  [
    2.01033439929228813265e-7, 2.71155556874348757815e-5, 0.0012426609473880784386,
    0.026532189526576123093, 0.29656057182850489123, 1.7848265399172913358, 5.4637849111641143699,
  ],
  [
    2.04426310338993978564e-15, 1.4215117583164458887e-7, 1.8463183175100546818e-5,
    7.868691311456132591e-4, 0.0148753612908506148525, 0.13692988092273580531,
    0.59983220655588793769,
  ],
] as const;
const NORMALQCOEFVALS = [
  3.387132872796366608, 1.0, 1.42343711074968357734, 1.0, 6.6579046435011037772, 1.0,
] as const;
/* eslint-enable no-loss-of-precision */
function normalQCoefs(a: number, r: number): number {
  return NORMALQCOEFS[a].reduce((t, c) => (t + c) * r, 0.0) + NORMALQCOEFVALS[a];
}

/*
 * Wichura, M. J. (1988).
 * Algorithm AS 241: The percentage points of the normal distribution.
 * Journal of the Royal Statistical Society. Series C (Applied Statistics), 37(3), 477-484.
 * https://doi.org/10.2307/2347330
 */
export function stdNormalQuantile(p: number): number {
  if (p === 0.0) return -Infinity;
  if (p === 1.0) return Infinity;
  const q = p - 0.5;

  if (Math.abs(q) <= 0.425) {
    const r = 0.180625 - Math.pow(q, 2);
    const val = (q * normalQCoefs(0, r)) / normalQCoefs(1, r);
    return val;
  }

  let r = Math.sqrt(-Math.log(q < 0.0 ? p : 1.0 - p));
  let val: number;

  if (r <= 5.0) {
    r -= 1.6;
    val = normalQCoefs(2, r) / normalQCoefs(3, r);
  } else {
    r -= 5.0;
    val = normalQCoefs(4, r) / normalQCoefs(5, r);
  }

  return q < 0.0 ? -val : val;
}

/* eslint-disable no-loss-of-precision */
const COEFSCDF = {
  a: [
    3.1611237438705656, 1.13864154151050156e2, 3.77485237685302021e2, 3.20937758913846947e3,
    1.85777706184603153e-1,
  ],
  b: [2.36012909523441209e1, 2.44024637934444173e2, 1.28261652607737228e3, 2.84423683343917062e3],
  c: [
    5.64188496988670089e-1, 8.88314979438837594, 6.61191906371416295e1, 2.98635138197400131e2,
    8.8195222124176909e2, 1.71204761263407058e3, 2.05107837782607147e3, 1.23033935479799725e3,
    2.15311535474403846e-8,
  ],
  d: [
    1.57449261107098347e1, 1.17693950891312499e2, 5.37181101862009858e2, 1.62138957456669019e3,
    3.29079923573345963e3, 4.36261909014324716e3, 3.43936767414372164e3, 1.23033935480374942e3,
  ],
  p: [
    3.05326634961232344e-1, 3.60344899949804439e-1, 1.25781726111229246e-1, 1.60837851487422766e-2,
    6.58749161529837803e-4, 1.63153871373020978e-2,
  ],
  q: [
    2.56852019228982242, 1.87295284992346047, 5.27905102951428412e-1, 6.05183413124413191e-2,
    2.33520497626869185e-3,
  ],
} as const;
/* eslint-enable no-loss-of-precision */

/*
 * Cody, W. J. (1993).
 * Algorithm 715: SPECFUN–a portable FORTRAN package of special function routines and test drivers.
 * ACM Transactions on Mathematical Software (TOMS), 19(1), 22-30.
 * https://doi.org/10.1145/151271.151273
 *
 * Cody, W. J. (1969).
 * Rational Chebyshev approximations for the error function.
 * Mathematics of computation, 23(107), 631-637.
 * https://doi.org/10.1090/S0025-5718-1969-0247736-4
 * 715:6559
 */
export function errorFunction(x: number): number {
  const y = Math.abs(x);

  let xnum, xden, ysq, res, i: number;

  if (y <= 0.46875) {
    if (y <= Number.EPSILON) {
      ysq = xnum = xden = 0.0;
    } else {
      ysq = xden = Math.pow(y, 2);
      xnum = COEFSCDF.a[4] * ysq;
      for (i = 0; i < 3; i++) {
        xnum = (xnum + COEFSCDF.a[i]) * ysq;
        xden = (xden + COEFSCDF.b[i]) * ysq;
      }
    }

    return (x * (xnum + COEFSCDF.a[3])) / (xden + COEFSCDF.b[3]);
  }

  if (y <= 4.0) {
    xnum = COEFSCDF.c[8] * y;
    xden = y;
    for (i = 0; i < 7; i++) {
      xnum = (xnum + COEFSCDF.c[i]) * y;
      xden = (xden + COEFSCDF.d[i]) * y;
    }

    res = (xnum + COEFSCDF.c[7]) / (xden + COEFSCDF.d[7]);
    ysq = ((y * 16.0) | 0) / 16.0;
    res *= Math.exp(-ysq * ysq) * Math.exp(-(y - ysq) * (y + ysq));
    return x < 0.0 ? res - 1.0 : 1.0 - res;
  }

  if (y >= 26.543) {
    return x < 0.0 ? -1.0 : 1.0;
  }

  ysq = 1.0 / Math.pow(y, 2);
  xnum = COEFSCDF.p[5] * ysq;
  xden = ysq;
  for (i = 0; i < 4; i++) {
    xnum = (xnum + COEFSCDF.p[i]) * ysq;
    xden = (xden + COEFSCDF.q[i]) * ysq;
  }

  res = (SQRTMPI - (ysq * (xnum + COEFSCDF.p[4])) / (xden + COEFSCDF.q[4])) / y;
  ysq = ((y * 16.0) | 0) / 16.0;
  res *= Math.exp(-ysq * ysq) * Math.exp(-(y - ysq) * (y + ysq));
  return x < 0.0 ? res - 1.0 : 1.0 - res;
}

export function stdNormalCDF(z: number): number {
  return 0.5 + errorFunction(z / Math.SQRT2) * 0.5;
}
