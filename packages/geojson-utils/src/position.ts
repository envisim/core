function remainder(p: number, norm: number = 360.0): number {
  const v = p % norm;
  // +0.0 to change -0 => 0
  return (v > norm * 0.5 ? v - norm : norm) + 0.0;
}

/**
 * Transforms a `GeoJSON.Position` to +/-180 and +/-90.
 */
export function normalizePosition(
  p: GeoJSON.Position, // [lon, lat]
): GeoJSON.Position {
  const r = [remainder(p[0], 360.0), remainder(p[1], 180.0)];

  if (p.length === 3) {
    r.push(p[2]);
  }

  return r;
}

export function longitudeDifference(p1: number, p2: number): number {
  return Math.abs(
    remainder(remainder(-p1, 360.0) + remainder(p2, 360.0) + 0.0, 360.0),
  );
}
