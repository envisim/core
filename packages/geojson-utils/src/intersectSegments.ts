import {bbox, bboxInBbox} from './bbox.js';
import {cartesian} from './projections.js';

interface Intersect {
  intersection: boolean;
  point?: GeoJSON.Position;
}

// A new function to test below. Intersects great circles.

type Cartesian = [number, number, number];

const distSquared = (a: Cartesian, b: Cartesian): number => {
  return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
};

// This test if a point on the same great circle on the unit sphere
// is on the segment (by use of distance)
const pointOnSegment = (
  point: Cartesian,
  p1: Cartesian,
  p2: Cartesian,
): boolean => {
  const d12 = distSquared(p1, p2);
  const d1 = distSquared(point, p1);
  const d2 = distSquared(point, p2);
  return d1 <= d12 && d2 <= d12;
};

// Cross product of two vectors
const cross = (a: Cartesian, b: Cartesian): Cartesian => {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
};

const normalize = (a: Cartesian): Cartesian => {
  const length = (a[0] ** 2 + a[1] ** 2 + a[2] ** 2) ** 0.5;
  return [a[0] / length, a[1] / length, a[2] / length];
};

/**
 * This function takes two line segments and returns object
 * {intersection:false} if there is no intersection and returns
 * object {intersection:true, point:pointOfIntersection}
 * if there is an intersection. The intersection point is computed
 * for the great circles defined by the segments.
 *
 * @param segment1 - First segment.
 * @param segment2 - Second segment.
 * @returns - An intersect object.
 */
export const intersectGreatCircleSegments = (
  segment1: GeoJSON.Position[],
  segment2: GeoJSON.Position[],
): Intersect => {
  const bbox1 = bbox({
    type: 'LineString',
    coordinates: segment1,
  });
  const bbox2 = bbox({
    type: 'LineString',
    coordinates: segment2,
  });
  if (!bboxInBbox(bbox1, bbox2)) {
    return {intersection: false};
  }
  const proj = cartesian();
  // points on unit sphere
  const p1 = proj.project(segment1[0]);
  const p2 = proj.project(segment1[1]);
  const p3 = proj.project(segment2[0]);
  const p4 = proj.project(segment2[1]);
  // https://www.dirkbertels.net/computing/greatCircles_files/great_circles_070206.pdf
  // Cross p1,p2
  const [a, b, c] = normalize(cross(p1, p2));
  // Cross p3,p4
  const [d, e, f] = normalize(cross(p3, p4));
  // Solve for intersection
  let h, g, k;
  let ip1: Cartesian;
  let ip2: Cartesian;
  const absA = Math.abs(a);
  const absD = Math.abs(d);
  // TODO: Check if 1e-12 can be replaced by 0
  const EPSILON = 1e-12;

  // Check if parallel (segments on the same great circle)
  const crossNormals = cross([a, b, c], [d, e, f]);
  // Should the test be === 0 ?
  if (distSquared(crossNormals, [0, 0, 0]) <= EPSILON ** 2) {
    // Parallel
    return {intersection: false};
  }

  // Numerical issue? Division by zero or small number.
  // TODO: investigate if there are issues.

  if (absA <= EPSILON && absD > EPSILON) {
    // Swap
    h = (a * f - c * d) / (b * d - a * e);
    g = (-e * h - f) / d;
    k = Math.sqrt(1 / (g * g + h * h + 1));
    ip1 = [g * k, h * k, k];
    ip2 = [-g * k, -h * k, -k];
  } else if (absA <= EPSILON && absD <= EPSILON) {
    // Both normals are in yz-plane, and not parallel.
    // The intersection is on the x axis.
    ip1 = [1, 0, 0];
    ip2 = [-1, 0, 0];
  } else {
    h = (d * c - f * a) / (e * a - d * b);
    g = (-b * h - c) / a;
    k = Math.sqrt(1 / (g * g + h * h + 1));
    ip1 = [g * k, h * k, k];
    ip2 = [-g * k, -h * k, -k];
  }

  // Intersection point 1 is (gk,hk,k) and
  // intersection point 2 is (-gk,-hk,-k)
  // of the two great circles defined by the segments.
  // Now check if one of them is on both segments.

  if (pointOnSegment(ip1, p1, p2) && pointOnSegment(ip1, p3, p4)) {
    return {intersection: true, point: proj.unproject(ip1)};
  }
  if (pointOnSegment(ip2, p1, p2) && pointOnSegment(ip2, p3, p4)) {
    return {intersection: true, point: proj.unproject(ip2)};
  }
  return {intersection: false};
};

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
  const bbox1 = bbox({
    type: 'LineString',
    coordinates: segment1,
  });
  const bbox2 = bbox({
    type: 'LineString',
    coordinates: segment2,
  });
  if (!bboxInBbox(bbox1, bbox2)) {
    return {intersection: false};
  }
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
