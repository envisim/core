import {coordToWebMercator, coordFromWebMercator} from './projections.js';

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
  const seg1 = segment1.map(coordToWebMercator);
  const seg2 = segment2.map(coordToWebMercator);
  const p0 = {x: seg1[0][0], y: seg1[0][1]};
  const p1 = {x: seg1[1][0], y: seg1[1][1]};
  const p2 = {x: seg2[0][0], y: seg2[0][1]};
  const p3 = {x: seg2[1][0], y: seg2[1][1]};
  const s10_x = p1.x - p0.x;
  const s10_y = p1.y - p0.y;
  const s32_x = p3.x - p2.x;
  const s32_y = p3.y - p2.y;
  const denom = s10_x * s32_y - s32_x * s10_y;
  if (denom == 0) {
    return {intersection: false};
  }
  const denom_positive = denom > 0;
  const s02_x = p0.x - p2.x;
  const s02_y = p0.y - p2.y;
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
  const p = [p0.x + t * s10_x, p0.y + t * s10_y];
  return {intersection: true, point: coordFromWebMercator(p)};
};
