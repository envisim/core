import type * as GJ from '../types/geojson.js';

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
  segment1: [GJ.Position, GJ.Position],
  segment2: [GJ.Position, GJ.Position],
): GJ.Position2 | null {
  // Given two segments:
  // - L1 = P11 + (P12 - P11)t, 0 <= t <= 1
  // - L2 = P21 + (P22 - P21)s, 0 <= s <= 1
  // Find the intersection between these lines through
  const p0 = segment1[0];
  const p1 = segment1[1];
  const p2 = segment2[0];
  const p3 = segment2[1];
  const s10_x = p1[0] - p0[0];
  const s10_y = p1[1] - p0[1];
  const s32_x = p3[0] - p2[0];
  const s32_y = p3[1] - p2[1];
  const denom = s10_x * s32_y - s32_x * s10_y;

  if (denom === 0.0) {
    return null;
  }

  const denom_positive = denom > 0;
  const s02_x = p0[0] - p2[0];
  const s02_y = p0[1] - p2[1];
  const s_numer = s10_x * s02_y - s10_y * s02_x;

  // Intersection only if 0 <= s <= 1
  if (s_numer < 0.0 === denom_positive || s_numer > denom === denom_positive) {
    return null;
  }

  const t_numer = s32_x * s02_y - s32_y * s02_x;

  // Intersection only if 0 <= t <= 1
  if (t_numer < 0.0 === denom_positive || t_numer > denom === denom_positive) {
    return null;
  }

  const t = t_numer / denom;

  return [p0[0] + t * s10_x, p0[1] + t * s10_y];
}

export class Segment {
  p1: GJ.Position2;
  p2: GJ.Position2;
  delta: GJ.Position2;

  constructor(p1: GJ.Position, p2: GJ.Position) {
    this.p1 = [p1[0], p1[1]];
    this.p2 = [p2[0], p2[1]];
    this.delta = [p2[0] - p1[0], p2[1] - p1[1]];
  }

  get a(): GJ.Position2 {
    return [this.p1[0], this.p1[1]];
  }

  get b(): GJ.Position2 {
    return [this.p2[0], this.p2[1]];
  }

  is_vertical(): boolean {
    return this.delta[0] === 0.0;
  }

  position(t: number): GJ.Position2 {
    return [this.p1[0] + t * this.delta[0], this.p1[1] + t * this.delta[1]];
  }

  midPosition(t1: number, t2: number): GJ.Position2 {
    return this.position((t1 + t2) * 0.5);
  }

  midPositionArr(t: [number, number]): GJ.Position2 {
    return this.position((t[0] + t[1]) * 0.5);
  }

  intersect(p1: GJ.Position, p2: GJ.Position): GJ.Position2 | null {
    const t = this.parameter(p1, p2);
    if (t === null) return null;
    return this.position(t);
  }

  parameter(p1: GJ.Position, p2: GJ.Position): number | null {
    const delta = [p2[0] - p1[0], p2[1] - p1[1]];
    const denom = this.delta[0] * delta[1] - this.delta[1] * delta[0];

    if (denom === 0.0) return null;

    const positiveDenom = denom > 0.0;
    const p1diff = [p1[0] - this.p1[0], p1[1] - this.p1[1]];

    const sNumer = this.delta[1] * p1diff[0] - this.delta[0] * p1diff[1];
    if (sNumer < 0.0 === positiveDenom || sNumer > denom === positiveDenom) return null;

    const tNumer = delta[1] * p1diff[0] - delta[0] * p1diff[1];
    if (tNumer < 0.0 === positiveDenom || tNumer > denom === positiveDenom) return null;

    return tNumer / denom;
  }

  intersectSegment(segment: Segment): GJ.Position2 | null {
    const t = this.parameterSegment(segment);
    if (t === null) return null;
    return this.position(t);
  }

  parameterSegment(segment: Segment): number | null {
    const denom = this.delta[0] * segment.delta[1] - this.delta[1] * segment.delta[0];

    if (denom === 0.0) return null;

    const positiveDenom = denom > 0.0;
    const p1diff = [segment.p1[0] - this.p1[0], segment.p1[1] - this.p1[1]];

    const sNumer = this.delta[1] * p1diff[0] - this.delta[0] * p1diff[1];
    if (sNumer < 0.0 === positiveDenom || sNumer > denom === positiveDenom) return null;

    const tNumer = segment.delta[1] * p1diff[0] - segment.delta[0] * p1diff[1];
    if (tNumer < 0.0 === positiveDenom || tNumer > denom === positiveDenom) return null;

    return tNumer / denom;
  }

  // Cross product of deltas: this x segment
  crossProduct(segment: Segment): number {
    return this.delta[0] * segment.delta[1] - this.delta[1] * segment.delta[0];
  }

  // Returns the parametric intersects of two segments as [this param, seg
  // param]
  // the parametric intersect is a value t between 0 and 1
  // need to handle full intersects (overlap)
  parametricIntersect(segment: Segment): [number, number] | null {
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
    if (sNumer < 0.0 === positiveDenom || sNumer > denom === positiveDenom) return null;

    const tNumer = segment.delta[1] * p1diff[0] - segment.delta[0] * p1diff[1];
    if (tNumer < 0.0 === positiveDenom || tNumer > denom === positiveDenom) return null;

    return [tNumer / denom, sNumer / denom];
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
    if (this.is_vertical()) {
      return this.p1[1] < this.p2[1] ? this.p1 : this.p2;
    }

    return this.p1[0] < this.p2[0] ? this.p1 : this.p2;
  }

  // Sweep line right
  rightMost(): GJ.Position2 {
    if (this.is_vertical()) {
      return this.p1[1] < this.p2[1] ? this.p2 : this.p1;
    }

    return this.p1[0] < this.p2[0] ? this.p2 : this.p1;
  }
}
