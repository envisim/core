import {type GeoJSON as GJ} from '../index.js';

/**
 * @param p the longitude to normalize
 * @param norm the normalizing factor
 * @returns p normalized to [-norm/2, norm/2]
 */
export function normalizeLongitude(p: number, norm: number = 360.0): number {
  const v = p % norm;
  return (v < -norm * 0.5 ? v + norm : v < norm * 0.5 ? v : v - norm) + 0.0;
}

/**
 * Checks if x is in the range [a, b], where [a, b] are normalized longitudes
 * @param x
 * @param a the smallest longitude
 * @param b the largest longitude
 * @param norm the normalizing factor
 * @returns `true` if `x` is in `[a, b]`
 */
export function checkLongitudeInRange(
  x: number,
  a: number,
  b: number,
  norm: number = 360.0,
): boolean {
  a = normalizeLongitude(a);
  b = normalizeLongitude(b);
  norm = norm * 0.5;
  // b >= a implies that [a,b] does not cross the antimeridean
  if (b >= a) return a <= x && x <= b;

  return (a <= x && x <= norm) || (-norm <= x && x <= b);
}

/**
 * @param a the smallest longitude
 * @param b the largest longitude
 * @param norm the normalizing factor
 * @returnsthe distance in normalized longitudes on range [a, b]
 */
export function longitudeDistance(a: number, b: number, norm: number = 360.0): number {
  a = normalizeLongitude(a);
  b = normalizeLongitude(b);

  return b - a + (b >= a ? 0.0 : norm);
}

/**
 * @param a the smallest longitude
 * @param b the largest longitude
 * @param norm the normalizing factor
 * @returns the midpoint of the longitudes `[a, b]` in `[-norm/2, norm/2]`
 */
export function longitudeCenter(a: number, b: number, norm: number = 360.0): number {
  return normalizeLongitude(a + longitudeDistance(a, b, norm) * 0.5);
}

export function checkInRange(x: number, a: number, b: number): boolean {
  return a <= x && x <= b;
}

export function midpointRaw(p1: GJ.Position2, p2: GJ.Position2): GJ.Position2 {
  return [(p1[0] + p2[0]) * 0.5, (p1[1] + p2[1]) * 0.5];
}

export function midpoint(p1: GJ.Position2, p2: GJ.Position2): GJ.Position2 {
  return [longitudeCenter(p1[0], p2[0]), (p1[1] + p2[1]) * 0.5];
}
