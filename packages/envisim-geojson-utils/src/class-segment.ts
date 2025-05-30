import { inInterval, type Interval } from "@envisim/utils";
import type * as GJ from "./geojson.js";
import { azimuthalEquidistant } from "./projections.js";
import { destinationUnrolled, forwardAzimuth } from "./segments/geodesic.js";

const UNIT_INTERVAL_CLOSED: Interval = { interval: [0.0, 1.0], ends: "closed" };

export class Segment {
  static checkParameter(param: number): boolean {
    return 0.0 <= param && param <= 1.0;
  }

  p1: GJ.Position2;
  p2: GJ.Position2;
  delta: GJ.Position2;

  constructor(p1: GJ.Position, p2: GJ.Position) {
    this.p1 = [p1[0], p1[1]];
    this.p2 = [p2[0], p2[1]];
    this.delta = [p2[0] - p1[0], p2[1] - p1[1]];
  }

  start(): GJ.Position2 {
    return [this.p1[0], this.p1[1]];
  }

  end(): GJ.Position2 {
    return [this.p2[0], this.p2[1]];
  }

  isVertical(): boolean {
    return this.delta[0] === 0.0;
  }

  isVector(): boolean {
    return this.delta[0] !== 0.0 || this.delta[1] !== 0.0;
  }

  position(param: number): GJ.Position2 {
    if (param === 0.0) return this.start();
    if (param === 1.0) return this.end();
    return [this.p1[0] + param * this.delta[0], this.p1[1] + param * this.delta[1]];
  }

  intersect(seg: Segment): GJ.Position2 | null {
    const t = this.parametricIntersect(seg);
    if (t === null) return null;
    return this.position(t[0]);
  }

  intersectByPositions(p1: GJ.Position, p2: GJ.Position): GJ.Position2 | null {
    const seg = new Segment(p1, p2);
    return this.intersect(seg);
  }

  // Cross product of deltas: this x segment
  crossProduct(segment: Segment): number {
    return this.delta[0] * segment.delta[1] - this.delta[1] * segment.delta[0];
  }

  // Returns the parametric intersects of two segments as [this param, seg param] the parametric
  // intersect is a value t between 0 and 1 need to handle full intersects (overlap)
  parametricIntersect(segment: Segment, includeInvalid: boolean = true): [number, number] | null {
    const t = intersects(this, segment);

    if (t.length === 0) {
      return null;
    } else if (t.length === 1) {
      if (
        includeInvalid === false &&
        (!inInterval(t[0][0], UNIT_INTERVAL_CLOSED) || !inInterval(t[0][1], UNIT_INTERVAL_CLOSED))
      ) {
        return null;
      }

      return t[0];
    }

    const s: [number, number] = [0.0, 1.0];

    if (t[0][0] === 0.0 || t[0][0] === 1.0) {
      s[0] = t[1][0];
    } else if (t[1][0] === 0.0 || t[1][0] === 1.0) {
      s[0] = t[0][0];
    } else {
      // Completely overlapped, give it a value that will mark it as weird when buffering
      s[0] = 0.0;
    }

    if (t[0][1] === 0.0 || t[0][1] === 1.0) {
      s[1] = t[1][1];
    } else if (t[1][1] === 0.0 || t[1][1] === 1.0) {
      s[1] = t[0][1];
    } else {
      // Completely overlapped, give it a value that will mark it as weird when buffering
      s[1] = 1.0;
    }

    return s;
  }

  /**
   * Calculates the distance between a point and a segment along a ray travelling rightward from the
   * point.
   *
   * We should (but do not) assume that:
   * (1) An upward segment excludes its final point
   * (2) A downward segment excludes its starting point
   * (3) Horizontal segments are excluded
   * (4) The segment/ray intersection point must be strictly to the right of the point
   * However, we only exclude horizontal segments not on the point, and
   * allow intersections to happen on the point. Thus, 0.0 returns should be disregarded when
   * determining point-in-polygon.
   *
   * @returns `null` or a non-negative number
   */
  rightDistanceOfPoint(point: GJ.Position): number | null {
    if (this.delta[1] === 0.0) {
      if (this.delta[0] > 0.0) {
        return inInterval(point[0], { interval: [this.p1[0], this.p2[0]], ends: "open" })
          ? 0.0
          : null;
      } else {
        return inInterval(point[0], { interval: [this.p2[0], this.p1[0]], ends: "open" })
          ? 0.0
          : null;
      }
    } else if (Math.max(this.p1[0], this.p2[0]) < point[0]) {
      return null; // Segment completely to the left of the point -- can't intersect ray
    }

    const xdiff = point[0] - this.p1[0];
    const ydiff = point[1] - this.p1[1];

    if (this.delta[1] > 0.0) {
      // Upward segment
      if (point[1] < this.p1[1] || this.p2[1] <= point[1]) return null; // (1)
      // SHOULD not be needed, distance SHOULD still evaluate to xdiff, however keep for consistency
      // with downward segment. xdiff measures negative distance, tho
      if (ydiff === 0.0) return xdiff <= 0.0 ? -xdiff : null;
    } else {
      // Downward segment
      if (point[1] < this.p2[1] || this.p1[1] <= point[1]) return null; // (2)
      // Branch below needed b/c numerical instability of distance if diff === 0.0
      if (point[1] === this.p2[1]) {
        const diff = this.p2[0] - point[0];
        return diff >= 0.0 ? diff : null;
      }
    }

    const distance = (this.delta[0] * ydiff) / this.delta[1] - xdiff;

    if (distance < 0.0) {
      return null;
    }

    return distance;
  }

  // Moves segment to the right by radius
  buffer(distance: number) {
    if (distance === 0.0) return;

    const angleStart = forwardAzimuth(this.p1, this.p2);
    const angleEnd = forwardAzimuth(this.p2, this.p1);

    const add = distance > 0.0 ? 90.0 : -90.0;
    const dist = Math.abs(distance);

    const start = destinationUnrolled(this.p1, dist, angleStart + add);
    const end = destinationUnrolled(this.p2, dist, angleEnd - add);

    this.p1[0] = start[0];
    this.p1[1] = start[1];
    this.p2[0] = end[0];
    this.p2[1] = end[1];
  }

  // Sweep line left
  leftMost(): GJ.Position2 {
    if (this.isVertical()) {
      return this.p1[1] < this.p2[1] ? this.p1 : this.p2;
    }

    return this.p1[0] < this.p2[0] ? this.p1 : this.p2;
  }

  // Sweep line right
  rightMost(): GJ.Position2 {
    if (this.isVertical()) {
      return this.p1[1] < this.p2[1] ? this.p2 : this.p1;
    }

    return this.p1[0] < this.p2[0] ? this.p2 : this.p1;
  }

  /**
   * Distance from a position to the segment.
   * Note that this is not intended to be used for very long platé carree segments.
   * This function uses the azimuthal equidistant projection with position as reference point.
   *
   * @returns the distance from the position to the segment
   */
  distanceToPosition(position: GJ.Position): number {
    const proj = azimuthalEquidistant(position);
    const p1 = proj.project(this.p1);
    const p2 = proj.project(this.p2);
    const p1diff = [-p1[0], -p1[1]];
    const delta = [p2[0] - p1[0], p2[1] - p1[1]];
    const c1 = delta[0] * p1diff[0] + delta[1] * p1diff[1];
    if (c1 <= 0.0) {
      return Math.sqrt(p1[0] ** 2 + p1[1] ** 2);
    }
    const c2 = delta[0] * delta[0] + delta[1] * delta[1];
    if (c2 <= c1) {
      return Math.sqrt(p2[0] ** 2 + p2[1] ** 2);
    }
    const p3 = [p1[0] + (c1 / c2) * delta[0], p1[1] + (c1 / c2) * delta[1]];
    return Math.sqrt(p3[0] ** 2 + p3[1] ** 2);
  }
}

export const NULL_SEGMENT = new Segment([0, 0], [0, 0]);

// Only valids, but handles overlaps
export function intersects(
  a: Segment,
  b: Segment,
): [] | [[number, number]] | [[number, number], [number, number]] {
  if (a.p1[0] === b.p2[0] && a.p1[1] === b.p2[1]) {
    // segment -> this
    return [[0.0, 1.0]];
  }
  if (a.p2[0] === b.p1[0] && a.p2[1] === b.p1[1]) {
    // this -> segment
    return [[1.0, 0.0]];
  }

  // Cross product of deltas: this x segment
  const denom = a.crossProduct(b);

  const positiveDenom = denom > 0.0;
  const p1diff = [b.p1[0] - a.p1[0], b.p1[1] - a.p1[1]];

  const sNumer = a.delta[1] * p1diff[0] - a.delta[0] * p1diff[1];

  if (denom === 0.0) {
    // Segments are parallel or collinear
    if (sNumer !== 0.0) {
      return [];
    }

    const ret: [number, number][] = [];

    if (a.delta[0] === 0.0) {
      if (
        Math.max(a.p1[1], a.p2[1]) < Math.min(b.p1[1], b.p2[1]) ||
        Math.max(b.p1[1], b.p2[1]) < Math.min(a.p1[1], a.p2[1])
      ) {
        return [];
      }

      // Segments are vertical
      const xs = [a.p1[1], a.p2[1], b.p1[1], b.p2[1]];
      xs.sort((a, b) => a - b);

      ret.push([(xs[1] - a.p1[1]) / a.delta[1], (xs[1] - b.p1[1]) / b.delta[1]]);

      // touching points only need above
      if (xs[1] !== xs[2]) {
        ret.push([(xs[2] - a.p1[1]) / a.delta[1], (xs[2] - b.p1[1]) / b.delta[1]]);
      }
    } else {
      if (
        Math.max(a.p1[0], a.p2[0]) < Math.min(b.p1[0], b.p2[0]) ||
        Math.max(b.p1[0], b.p2[0]) < Math.min(a.p1[0], a.p2[0])
      ) {
        return [];
      }

      const xs = [a.p1[0], a.p2[0], b.p1[0], b.p2[0]];
      xs.sort((a, b) => a - b);

      ret.push([(xs[1] - a.p1[0]) / a.delta[0], (xs[1] - b.p1[0]) / b.delta[0]]);

      // touching points only need above
      if (xs[1] !== xs[2]) {
        ret.push([(xs[2] - a.p1[0]) / a.delta[0], (xs[2] - b.p1[0]) / b.delta[0]]);
      }
    }

    return ret as [[number, number]] | [[number, number], [number, number]];
  }

  if (sNumer <= 0.0 === positiveDenom || sNumer >= denom === positiveDenom) {
    return [];
  }

  const tNumer = b.delta[1] * p1diff[0] - b.delta[0] * p1diff[1];
  if (tNumer <= 0.0 === positiveDenom || tNumer >= denom === positiveDenom) {
    return [];
  }

  return [[tNumer / denom, sNumer / denom]];
}

export function ringToSegments(polygon: GJ.Position[]): Segment[] {
  const segments: Segment[] = [];

  for (let c = 1; c < polygon.length; c++) {
    segments.push(new Segment(polygon[c - 1], polygon[c]));
  }

  return segments;
}

export function segmentsToPolygon(segments: Segment[]): GJ.Position2[] {
  const poly: GJ.Position2[] = segments.map((seg) => seg.start());
  poly.push(segments[0].start());
  return poly;
}

/**
 * Use the leftpoint to calculate the distance, use midpoint of self to determine parent.
 * Assumes that self is either fully inside or fully outside the potential parent.
 */
export function rightDistanceToParent(
  parent: Segment[],
  self: Segment[],
  leftPoint: GJ.Position,
): number | null {
  let minimumDistance = Number.MAX_VALUE;
  let crossings: number | null = 0;

  for (const pseg of parent) {
    const d = pseg.rightDistanceOfPoint(leftPoint);

    if (d === null) {
      continue;
    } else if (d < minimumDistance) {
      minimumDistance = d;
      if (d === 0.0) {
        crossings = null;
        break;
      }
    }

    crossings += 1;
  }

  // We might be able to determine polygon-in-polygon by the leftmost point
  if (crossings !== null) {
    if (crossings % 2 === 0) {
      return null;
    }

    return minimumDistance;
  }

  for (const seg of self) {
    crossings = 0;
    const point = seg.position(0.5);

    for (const pseg of parent) {
      const d = pseg.rightDistanceOfPoint(point);

      if (d === null) {
        continue;
      } else if (d === 0.0) {
        crossings = null;
        break;
      }

      crossings += 1;
    }

    // If crossings is null, we have inconclusive results, and need to continue the search,
    // otherwise we have found a solution, since polygons are either fully inside, or fully outside,
    // the potential parent.
    if (crossings !== null) break;
  }

  if (crossings === null) {
    // No crossing is conclusive indicates that the segments are equal -- we return this as a 0.0
    // distance overlap
    return 0.0;
  }

  // Otherwise, a parent exists if crossings is odd
  if (crossings % 2 === 0) {
    return null;
  }

  return minimumDistance;
}
