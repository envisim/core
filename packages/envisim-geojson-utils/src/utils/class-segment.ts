import type * as GJ from '../types/geojson.js';
import {Geodesic} from './Geodesic.js';

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
        (t[0][0] < 0.0 || t[0][0] > 1.0 || t[0][1] < 0.0 || t[0][1] > 1.0)
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

  upwardIntersectFromPoint(point: GJ.Position, isPositive: boolean = true): number | null {
    // Misses segment by x
    if (this.p1[0] <= this.p2[0]) {
      if (point[0] < this.p1[0] || point[0] > this.p2[0]) return null;
    } else {
      if (point[0] > this.p1[0] || point[0] < this.p2[0]) return null;
    }

    // Is above segment
    if (Math.max(this.p1[1], this.p2[1]) < point[1]) {
      return null;
    }

    const xdiff = point[0] - this.p1[0];
    const ydiff = point[1] - this.p1[1];

    // Is on vertical line
    if (this.delta[0] === 0.0) {
      if (xdiff === 0.0) {
        // Only accept if it encloses the point, assuming point is leftmost point. A leftmost point is
        // enclosed by a segment if it is to the left of a segment in positive direction, or to the
        // right of a segment in a negative direction.
        return this.delta[1] < 0.0 === isPositive ? 0.0 : null;
      } else {
        return null;
      }
    }

    const s = (this.delta[1] * xdiff) / this.delta[0] - ydiff;

    if (s === 0.0) {
      this.delta[1] < 0.0 === isPositive ? 0.0 : null;
    }

    return s < 0.0 ? null : s;
  }

  // Moves segment to the right by radius
  buffer(distance: number) {
    if (distance === 0.0) return;

    const angleStart = Geodesic.forwardAzimuth(this.p1, this.p2);
    const angleEnd = Geodesic.forwardAzimuth(this.p2, this.p1);

    const add = distance > 0.0 ? 90.0 : -90.0;
    const dist = Math.abs(distance);

    const start = Geodesic.destinationUnrolled(this.p1, dist, angleStart + add);
    const end = Geodesic.destinationUnrolled(this.p2, dist, angleEnd - add);

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

export function upwardIntersection(
  segments: Segment[],
  point: GJ.Position,
  isPositive: boolean,
): number | null {
  let minimumDistance = Number.MAX_VALUE;
  let crossings = 0;

  for (const seg of segments) {
    const d = seg.upwardIntersectFromPoint(point, isPositive);
    if (d === null || d < 0.0) {
      continue;
    }

    crossings += 1;

    if (d < minimumDistance) {
      minimumDistance = d;
    }
  }

  return crossings % 2 === 0 ? null : minimumDistance;
}
