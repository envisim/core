import { logGammaFunction, regularizedLowerGammaFunction } from "../gamma-utils.js";
import { type ShapeScaleParams } from "../params.js";
import { chiSquaredQuantile91 } from "./chi-squared-quantile.js";

/*
 * Newton's method on chi square
 * Inspired by R: https://bugs.r-project.org/show_bug.cgi?id=2214
 */
export function gammaQuantile(
  this: ShapeScaleParams,
  p: number,
  eps: number = 1e-12,
  lgammaFn: number = logGammaFunction(this.shape),
): number {
  const ch0 = chiSquaredQuantile91(p, 2.0 * this.shape);

  let x0 = 0.5 * this.scale * ch0;
  let F: number;
  let D: number;
  let f: number;
  const gammac = lgammaFn + this.shape * Math.log(this.scale);

  for (let i = 0; i < 20; i++) {
    F = regularizedLowerGammaFunction(this.shape, x0 / this.scale, eps, lgammaFn);
    D = F - p;
    if (Math.abs(D) < eps * p) break;

    f = Math.exp(gammac + (this.shape - 1.0) * Math.log(x0) - x0 / this.scale);
    x0 -= D / f;
  }

  return x0;
}
