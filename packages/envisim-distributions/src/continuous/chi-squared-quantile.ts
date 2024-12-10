import {logGammaFunction, regularizedLowerGammaFunction} from '../gamma-utils.js';
import {stdNormalQuantile} from './normal-utils.js';

const TWO_NINTHS = 2.0 / 9.0;

/*
 * Best, D. J., & Roberts, D. E. (1975).
 * Algorithm AS 91: The Percentage Points of the Chi2 Distribution
 * Journal of the Royal Statistical Society. Series C (Applied Statistics), 24(3), 385-388.
 * https://doi.org/10.2307/2347113
 */
export function chiSquaredQuantile91(p: number, df: number, eps: number = 1e-12): number {
  if (df <= 0.0) throw new RangeError('df must be positive');

  // FIX
  // if (p < 0.000002) return 0.0;
  // if (p > 0.999998) return Infinity;
  const xx = df * 0.5;
  const logxx = Math.log(xx);
  const logp = Math.log(p);
  const g = logGammaFunction(xx);
  const c = xx - 1.0;

  let ch: number;
  let a: number;
  let q: number;
  let p1: number;
  let p2: number;
  let t: number;
  let b: number;
  let s1: number;
  let s2: number;
  let s3: number;
  let s4: number;
  let s5: number;
  let s6: number;

  let run: number;

  // Starting approximation for small chi-squared
  if (df < -1.24 * logp) {
    // ch = Math.pow(p * xx * Math.exp(g + xx * Math.LN2), 1.0 / xx);
    ch = Math.exp((logp + logxx + g) / xx + Math.LN2);
    // if (ch - e) 6, 4, 4
    if (ch < eps) return ch;
  }

  // Starting approximation for df less than or equal to 0.32
  // 1
  else if (df <= 0.32) {
    ch = 0.4;
    a = Math.log(1.0 - p);
    // 2
    run = 0;
    while (run++ <= 1e5) {
      q = ch;
      p1 = 1.0 + ch * (4.67 + ch);
      p2 = ch * (6.73 + ch * (6.66 + ch));
      t = -0.5 + (4.67 + ch + ch) / p1 - (6.73 + ch * (13.32 + 3.0 * ch)) / p2;
      ch -= (1.0 - (Math.exp(a + g + 0.5 * ch + c * Math.LN2) * p2) / p1) / t;
      // neg, zero pos
      // if (abs(q/ch-1.0)-0.01) 4, 4, 2
      if (Math.abs(q / ch - 1.0) <= 0.01) break;
    }
  }

  // Call to algorithm AS 70 -- note that p has been tested above
  // 3
  else {
    // let x = standardNormalQuantile(p);
    // Starting approximation using wilson andhilferty estimate
    p1 = TWO_NINTHS / df;
    ch = df * Math.pow(stdNormalQuantile(p) * Math.sqrt(p1) + 1.0 - p1, 3);

    // Starting approximation for p tendint to 1
    if (ch >= 2.2 * df + 6.0) ch = -2.0 * (Math.log(1.0 - p) - c * Math.log(0.5 * ch) + g);
  }

  // Call to algorithm AS 32 and calculation of seven term taylor series
  run = 0;
  while (run++ <= 1e5) {
    // 4
    q = ch;
    p1 = 0.5 * ch;
    p2 = p - regularizedLowerGammaFunction(xx, p1, eps);

    // 5
    t = p2 * Math.exp(xx * Math.LN2 + g + p1 - c * Math.log(ch));
    b = t / ch;
    a = 0.5 * t - b * c;
    s1 = (210.0 + a * (140.0 + a * (105.0 + a * (84.0 + a * (70.0 + 60.0 * a))))) / 420.0;
    s2 = (420.0 + a * (735.0 + a * (966.0 + a * (1141.0 + a * (1278.0 * a))))) / 2520.0;
    s3 = (210.0 + a * (462.0 + a * (707.0 + a * 932.0))) / 2520.0;
    s4 = (252.0 + a * (672.0 + 1182.0 * a) + c * (294.0 + a * (889.0 + 1740.0 * a))) / 5040.0;
    s5 = (84.0 + 264.0 * a + c * (175.0 + 606.0 * a)) / 2520.0;
    s6 = (120.0 + c * (346.0 + 127.0 * c)) / 5040.0;
    ch +=
      t * (1.0 + 0.5 * t * s1 - b * c * (s1 - b * (s2 - b * (s3 - b * (s4 - b * (s5 - b * s6))))));
    // if (abs(q/ch-1.0) > e) goto 4;
    if (Math.abs(q / ch - 1.0) <= eps) break;
  }

  // 6
  return ch;
}
