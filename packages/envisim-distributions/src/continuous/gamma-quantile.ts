import {logGammaFunction, regularizedLowerGammaFunction} from '../gamma-utils.js';
import {ParamsShapeScale} from '../params.js';
import {chiSquaredQuantile91} from './chi-squared-quantile.js';

/*
 * Newton's method on chi square
 * Inspired by R: https://bugs.r-project.org/show_bug.cgi?id=2214
 */
export function gammaQuantile(
  p: number,
  {shape, scale}: ParamsShapeScale,
  eps: number = 1e-12,
  lgammaFn: number = logGammaFunction(shape),
): number {
  const ch0 = chiSquaredQuantile91(p, 2.0 * shape);

  let x0 = 0.5 * scale * ch0;
  let F: number;
  let D: number;
  let f: number;
  const gammac = lgammaFn + shape * Math.log(scale);

  for (let i = 0; i < 20; i++) {
    F = regularizedLowerGammaFunction(shape, x0 / scale, eps, lgammaFn);
    D = F - p;
    if (Math.abs(D) < eps * p) break;

    f = Math.exp(gammac + (shape - 1.0) * Math.log(x0) - x0 / scale);
    x0 -= D / f;
  }

  return x0;
}
