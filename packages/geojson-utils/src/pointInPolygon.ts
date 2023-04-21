import {pointInBbox} from './bbox.js';
import {distance} from './distance.js';
import {intermediate} from './intermediate.js';
import {cartesian} from './projections.js';
import {intersectGreatCircleSegments} from './intersectSegments.js';

// internal.
const pointInSimplePolygon = (
  point: number[],
  polygon: number[][],
): boolean => {
  const p = point;
  const q = polygon;
  const n = q.length;
  let i = 0;
  let j = 0;
  let inside = false;
  for (i = 0, j = n - 1; i < n; j = i++) {
    if (
      q[i][1] > p[1] != q[j][1] > p[1] &&
      p[0] <
        ((q[j][0] - q[i][0]) * (p[1] - q[i][1])) / (q[j][1] - q[i][1]) + q[i][0]
    ) {
      inside = !inside;
    }
  }
  return inside;
};

/**
 * Checks if a point is in a polygon.
 * Note: Not for MultiPolygon.
 *
 * @param point - Coordinates [lon,lat] of a point.
 * @param polygon - Coordinates of a Polygon, not MultiPolygon.
 * @returns - true if point is in polygon, otherwise false.
 */
export const pointInSinglePolygon = (
  point: number[],
  polygon: number[][][],
): boolean => {
  if (!pointInSimplePolygon(point, polygon[0])) {
    return false; // Not in first polygon.
  }
  for (let i = 1; i < polygon.length; i++) {
    if (pointInSimplePolygon(point, polygon[i])) {
      return false; // In a hole.
    }
  }
  return true;
};

// internal
const pointInMultiPolygon = (
  point: number[],
  polygon: number[][][][],
): boolean => {
  for (let i = 0; i < polygon.length; i++) {
    if (pointInSinglePolygon(point, polygon[i])) {
      return true;
    }
  }
  return false;
};

/**
 * Checks if a GeoJSON Feature with geometry type Point is within a
 * GeoJSON Feature with geometry type Polygon or MultiPolygon.
 *
 * @param point - A GeoJSON Feature with geometry type Point.
 * @param polygon - A GeoJSON Feature with geometry type Polygon or MultiPolygon.
 * @returns - `true` if the Point is inside the Polygon; `false` if the Point is not inside the Polygon.
 */
export const pointInPolygon = (
  point: GeoJSON.Feature,
  polygon: GeoJSON.Feature,
): boolean => {
  const ptype = polygon.geometry.type;
  if (point.geometry.type !== 'Point') {
    throw new Error('Type Point is required for geometry of point Feature.');
  }
  if (ptype !== 'Polygon' && ptype !== 'MultiPolygon') {
    throw new Error(
      'Type Polygon or MultiPolygon is required for geometry of polygon Feature.',
    );
  }
  if (polygon.bbox) {
    if (!pointInBbox(point.geometry.coordinates, polygon.bbox)) {
      return false;
    }
  }
  if (ptype === 'Polygon') {
    return pointInSinglePolygon(
      point.geometry.coordinates,
      polygon.geometry.coordinates,
    );
  }
  if (ptype === 'MultiPolygon') {
    return pointInMultiPolygon(
      point.geometry.coordinates,
      polygon.geometry.coordinates,
    );
  }
  return false;
};

// A new version to test below, for the sphere

// internal, test if two points are equal
const equalPoints = (p1: GeoJSON.Position, p2: GeoJSON.Position): boolean => {
  if (p1[0] === p2[0] && p1[1] === p2[1]) {
    return true;
  }
  return false;
};

// internal, test if ring is clockwise
/*const isClockwise = (ring: GeoJSON.Position[]): boolean => {
  let sum = 0;
  let prev, curr;
  for (let i = 0; i < ring.length - 1; i++) {
    prev = ring[i];
    curr = ring[i + 1];
    sum += (curr[0] - prev[0]) * (curr[1] + prev[1]);
  }
  return sum > 0;
};*/

type Cartesian = [number, number, number];

// Internal.
const scalar_triple_product = (
  v: Cartesian,
  a: Cartesian,
  b: Cartesian,
): number => {
  const c0 = a[1] * b[2] - a[2] * b[1];
  const c1 = a[2] * b[0] - a[0] * b[2];
  const c2 = a[0] * b[1] - a[1] * b[0];
  return v[0] * c0 + v[1] * c1 + v[2] * c2;
};

// Internal.
const dot = (a: Cartesian, b: Cartesian): number => {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

// Internal.
const signedAngle = (v: Cartesian, a: Cartesian, b: Cartesian): number => {
  const numerator = scalar_triple_product(v, a, b);
  const denominator = dot(a, b) - dot(v, a) - dot(v, b);
  return Math.atan2(numerator, denominator);
};

// Internal, test if point is in ring on the sphere
const pointInRing = (
  point: GeoJSON.Position,
  ring: GeoJSON.Position[],
): boolean => {
  // https://cs.stackexchange.com/questions/144367/point-in-polygon-on-the-sphere
  // 1. Find arbitrary point A on a segment of the ring
  // 2. Make segment from testing point to A
  // 3. Find all intersection points and corresponding segments on the ring
  // 4. Find the closest intersection point and corresponding segment
  // 5. If testing point is on the inside of segment, then it is inside

  // 1. Make sure to get a segment with length > 0
  let i = 0;
  while (equalPoints(ring[i], ring[i + 1])) {
    i++;
  }
  // Pick the point in the middle of the segment as A
  const A = intermediate(ring[i], ring[i + 1], 0.5);
  const segmentA = [ring[i], ring[i + 1]];
  // 2. The segment from point to A
  const segment: GeoJSON.Position[] = [point, A];
  // 3-4. Find the segment to which the intersection point closest to the point lies.
  let closestSegment: GeoJSON.Position[] = [];
  let minDistance = Infinity;

  // Clockwise is computed in the following for-loop to
  // avoid additional loop over the ring.
  let sum = 0;
  for (i = 0; i < ring.length - 1; i++) {
    // sum for clockwise
    sum += (ring[i + 1][0] - ring[i][0]) * (ring[i + 1][1] + ring[i][1]);
    const segmentOfRing = [ring[i], ring[i + 1]];
    const intersection = intersectGreatCircleSegments(segment, segmentOfRing);
    if (intersection.point) {
      const dist = distance(point, intersection.point);
      if (dist < minDistance) {
        minDistance = dist;
        closestSegment = segmentOfRing;
      }
    }
  }
  // If no intersection points, use segmentA
  if (closestSegment[0] === undefined) {
    closestSegment = segmentA;
  }
  // 5. Find which side on segment
  const proj = cartesian();
  const v = proj.project(point);
  const a = proj.project(closestSegment[0]);
  const b = proj.project(closestSegment[1]);
  const signed = signedAngle(v, a, b);

  if (sum > 0) {
    // clockwise
    if (signed < 0) {
      // inside
      return true;
    }
  } else {
    // counterclockwise
    if (signed > 0) {
      // inside
      return true;
    }
  }
  // Are additional cases needed? See: // https://cs.stackexchange.com/questions/144367/point-in-polygon-on-the-sphere
  return false;
};

/**
 * Checks if a point is in a polygon.
 * Note: Not for MultiPolygon.
 *
 * @param point - Coordinates [lon,lat] of a point.
 * @param polygon - Coordinates of a Polygon, not MultiPolygon.
 * @returns - true if point is in polygon, otherwise false.
 */
export const pointInSinglePolygonSpherical = (
  point: number[],
  polygon: number[][][],
): boolean => {
  if (!pointInRing(point, polygon[0])) {
    return false; // Not in first polygon.
  }
  for (let i = 1; i < polygon.length; i++) {
    if (pointInRing(point, polygon[i])) {
      return false; // In a hole.
    }
  }
  return true;
};

// internal
const pointInMultiPolygonSpherical = (
  point: number[],
  polygon: number[][][][],
): boolean => {
  for (let i = 0; i < polygon.length; i++) {
    if (pointInSinglePolygonSpherical(point, polygon[i])) {
      return true;
    }
  }
  return false;
};

/**
 * Checks if a GeoJSON Feature with geometry type Point is within a
 * GeoJSON Feature with geometry type Polygon or MultiPolygon. This function
 * performes the test using great circle segments.
 *
 * @param point - A GeoJSON Feature with geometry type Point.
 * @param polygon - A GeoJSON Feature with geometry type Polygon or MultiPolygon.
 * @returns - `true` if the Point is inside the Polygon; `false` if the Point is not inside the Polygon.
 */
export const pointInPolygonSpherical = (
  point: GeoJSON.Feature,
  polygon: GeoJSON.Feature,
): boolean => {
  const ptype = polygon.geometry.type;
  if (point.geometry.type !== 'Point') {
    throw new Error('Type Point is required for geometry of point Feature.');
  }
  if (ptype !== 'Polygon' && ptype !== 'MultiPolygon') {
    throw new Error(
      'Type Polygon or MultiPolygon is required for geometry of polygon Feature.',
    );
  }
  if (polygon.bbox) {
    if (!pointInBbox(point.geometry.coordinates, polygon.bbox)) {
      return false;
    }
  }
  if (ptype === 'Polygon') {
    return pointInSinglePolygonSpherical(
      point.geometry.coordinates,
      polygon.geometry.coordinates,
    );
  }
  if (ptype === 'MultiPolygon') {
    return pointInMultiPolygonSpherical(
      point.geometry.coordinates,
      polygon.geometry.coordinates,
    );
  }
  return false;
};
