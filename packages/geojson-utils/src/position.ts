/**
 * @param p - the longitude to normalize
 * @param norm - the normalizing factor
 * @returns p normalized to [-norm/2, norm/2]
 */
export function normalizeLongitude(p: number, norm: number = 360.0): number {
  const v = p % norm;
  return (v < -norm * 0.5 ? v + norm : v < norm * 0.5 ? v : v - norm) + 0.0;
}

/**
 * Checks if x is in the range [a, b], where [a, b] are normalized longitudes
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
 * Returns the distance in normalized longitudes on range [a, b]
 */
export function longitudeDistance(
  a: number,
  b: number,
  norm: number = 360.0,
): number {
  a = normalizeLongitude(a);
  b = normalizeLongitude(b);

  return b - a + (b >= a ? 0.0 : norm);
}

export function longitudeCenter(
  a: number,
  b: number,
  norm: number = 360.0,
): number {
  return normalizeLongitude(a + longitudeDistance(a, b, norm) * 0.5);
}

export function checkInRange(x: number, a: number, b: number): boolean {
  return a <= x && x <= b;
}
