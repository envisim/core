import type * as GJ from '../types/geojson.js';

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

  // Returns the parametric intersects of two segments as [this param, seg
  // param]
  // the parametric intersect is a value t between 0 and 1
  // need to handle full intersects (overlap)
  parametricIntersect(segment: Segment, includeInvalid: boolean = true): [number, number] | null {
    if (this.p1[0] === segment.p2[0] && this.p1[1] === segment.p2[1]) {
      // segment -> this
      return [0.0, 1.0];
    }
    if (this.p2[0] === segment.p1[0] && this.p2[1] === segment.p1[1]) {
      // this -> segment
      return [1.0, 0.0];
    }

    // Cross product of deltas: this x segment
    const denom = this.crossProduct(segment);

    if (denom === 0.0) return null;

    const positiveDenom = denom > 0.0;
    const p1diff = [segment.p1[0] - this.p1[0], segment.p1[1] - this.p1[1]];

    const sNumer = this.delta[1] * p1diff[0] - this.delta[0] * p1diff[1];
    if (
      includeInvalid === false &&
      (sNumer <= 0.0 === positiveDenom || sNumer >= denom === positiveDenom)
    ) {
      return null;
    }

    const tNumer = segment.delta[1] * p1diff[0] - segment.delta[0] * p1diff[1];
    if (
      includeInvalid === false &&
      (tNumer <= 0.0 === positiveDenom || tNumer >= denom === positiveDenom)
    ) {
      return null;
    }

    return [tNumer / denom, sNumer / denom];
  }

  upwardIntersectFromPoint(point: GJ.Position, isPositive: boolean = true): number | null {
    // Misses segment by x
    if (this.p1[0] <= this.p2[0]) {
      if (point[0] < this.p1[0] || point[0] >= this.p2[0]) return null;
    } else {
      if (point[0] > this.p1[0] || point[0] <= this.p2[0]) return null;
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
  buffer(radius: number) {
    if (radius === 0.0) return;

    const sign_x = Math.sign(this.delta[0]);
    const sign_y = Math.sign(this.delta[1]);

    if (sign_x === 0) {
      // Segment is vertical
      this.p1[0] += radius * sign_y;
      this.p2[0] += radius * sign_y;
      return;
    }

    if (sign_y === 0) {
      // Segment is horizontal
      this.p1[1] -= radius * sign_x;
      this.p2[1] -= radius * sign_x;
      return;
    }

    const norm = Math.sqrt(this.delta[0] * this.delta[0] + this.delta[1] * this.delta[1]);
    const x_shift = (this.delta[1] / norm) * radius;
    const y_shift = (-this.delta[0] / norm) * radius;

    this.p1[0] += x_shift;
    this.p1[1] += y_shift;
    this.p2[0] += x_shift;
    this.p2[1] += y_shift;
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

// Only valids, but handles overlaps
export function intersects(a: Segment, b: Segment): [number, number][] {
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

    return ret;
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
