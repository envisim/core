import type * as GJ from './types/geojson.js';

/**
 * This function takes two linesegments and returns
 * - `null` if there is no intersection
 * - point of intersection if there is an intersection.
 *
 * @param segment1 First segment.
 * @param segment2 Second segment.
 * @returns A position or null.
 */
export function intersectSegments(
  segment1: GJ.Position[],
  segment2: GJ.Position[],
): GJ.Position | null {
  const p0 = segment1[0];
  const p1 = segment1[1];
  const p2 = segment2[0];
  const p3 = segment2[1];
  const s10_x = p1[0] - p0[0];
  const s10_y = p1[1] - p0[1];
  const s32_x = p3[0] - p2[0];
  const s32_y = p3[1] - p2[1];
  const denom = s10_x * s32_y - s32_x * s10_y;

  if (denom == 0) {
    return null;
  }

  const denom_positive = denom > 0;
  const s02_x = p0[0] - p2[0];
  const s02_y = p0[1] - p2[1];
  const s_numer = s10_x * s02_y - s10_y * s02_x;

  if (s_numer < 0 === denom_positive || s_numer > denom === denom_positive) {
    return null;
  }

  const t_numer = s32_x * s02_y - s32_y * s02_x;

  if (t_numer < 0 === denom_positive || t_numer > denom === denom_positive) {
    return null;
  }

  const t = t_numer / denom;

  return [p0[0] + t * s10_x, p0[1] + t * s10_y];
}
