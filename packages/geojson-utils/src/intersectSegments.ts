interface Intersect {
  intersection: boolean;
  point?: GeoJSON.Position;
}

/**
 * This function takes two linesegments and returns object
 * {intersection:false} if there is no intersection and returns
 * object {intersection:true, point:pointOfIntersection}
 * if there is an intersection.
 *
 * @param segment1 - First segment.
 * @param segment2 - Second segment.
 * @returns - An intersect object.
 */
export const intersectSegments = (
  segment1: GeoJSON.Position[],
  segment2: GeoJSON.Position[],
): Intersect => {
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
    return {intersection: false};
  }
  const denom_positive = denom > 0;
  const s02_x = p0[0] - p2[0];
  const s02_y = p0[1] - p2[1];
  const s_numer = s10_x * s02_y - s10_y * s02_x;
  if (s_numer < 0 == denom_positive) {
    return {intersection: false};
  }
  const t_numer = s32_x * s02_y - s32_y * s02_x;
  if (t_numer < 0 == denom_positive) {
    return {intersection: false};
  }
  if (s_numer > denom == denom_positive || t_numer > denom == denom_positive) {
    return {intersection: false};
  }
  const t = t_numer / denom;
  const p = [p0[0] + t * s10_x, p0[1] + t * s10_y];
  return {intersection: true, point: p};
};
