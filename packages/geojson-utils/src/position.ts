import type * as GeoJSON from './geojson/types.js';

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

/**
 * Transforms a `GeoJSON.Position` to +/-180 and +/-90.
 */
export function normalizePosition(
  p: GeoJSON.Position, // [lon, lat]
): GeoJSON.Position {
  const r: GeoJSON.Position = [
    normalizeLongitude(p[0], 360.0),
    normalizeLongitude(p[1], 180.0),
  ];

  if (p.length === 3) {
    r.push(p[2]);
  }

  return r;
}

export function longitudeDifference(
  p1: number,
  p2: number,
  norm: number = 360.0,
): number {
  return Math.abs(
    normalizeLongitude(
      normalizeLongitude(-p1, norm) + normalizeLongitude(p2, norm) + 0.0,
      norm,
    ),
  );
}
