import * as GJ from './types/geojson.js';
import {Segment} from './utils/intersectSegments.js';

type InnerIntersect = {seg: number; param: number; visited: boolean};
type Intersect = {list: InnerIntersect[]; position: GJ.Position2};

class IntersectList {
  list: Intersect[] = [];
  order: number[] = [];
  segs: number[][]; // Segment->intersect connection

  constructor(size: number) {
    this.segs = Array.from<number[]>({length: size}).fill([]);
  }
  addIntersect(segments: [number, number], params: [number, number], position: GJ.Position2) {
    this.list.push({
      list: [],
      position,
    });
    const idx = this.list.length - 1;
    this.appendIntersect(idx, segments[0], params[0]);
    this.appendIntersect(idx, segments[1], params[1]);
  }
  appendIntersect(idx: number, segment: number, param: number) {
    this.list[idx].list.push({seg: segment, param, visited: param === 1.0});
    if (!this.segs[segment].includes(idx)) {
      this.segs[segment].push(idx);
    }
  }
  tryAppendIntersect(segments: [number, number], params: [number, number]): boolean {
    // It shouldnt be possible for a crossing to exist for seg[0], without already existing for
    // seg[1]
    let intidx = this.segs[segments[1]].find((int) =>
      this.list[int].list.some((inner) => inner.seg === segments[1] && inner.param === params[1]),
    );
    if (intidx) {
      this.appendIntersect(intidx, segments[0], params[0]);
      return true;
    }

    return false;
  }
  sortIntersects() {
    this.order = this.list.map((_, i) => i);
    this.order.sort((a, b) => {
      const x_diff = this.list[a].position[0] - this.list[b].position[0];
      return x_diff === 0.0 ? this.list[a].position[1] - this.list[b].position[1] : x_diff;
    });
  }
  getLeftmostIntersect(): Intersect | null {
    for (let i = 0; i < this.order.length; i++) {
      const idx = this.order[i];
      const int = this.list[idx];
      for (const inner of int.list) {
        if (inner.visited === false) {
          return int;
        }
      }
    }

    return null;
  }

  getNextIntersect(current: InnerIntersect): Intersect | null {
    let param = Number.MAX_VALUE;
    let int: Intersect | null = null;

    // find intersect with minimum param
    for (const intidx of this.segs[current.seg]) {
      const inner = this.list[intidx].list.find((inner) => current.seg === inner.seg);
      if (inner && current.param < inner.param && inner.param < param) {
        param = inner.param;
        int = this.list[intidx];
      }
    }

    return int;
  }

  static selectInner(int: Intersect, segments: SegmentList): InnerIntersect {
    const filtered_intersect = int.list.filter((inner) => inner.visited === false);

    let inner = filtered_intersect[0];
    let inner_seg = segments.segment(inner.seg);
    for (let i = 1; i < filtered_intersect.length; i++) {
      const cp = inner_seg.crossProduct(segments.segment(filtered_intersect[i].seg));
      if (cp < 0.0) {
        inner = filtered_intersect[i];
        inner_seg = segments.segment(filtered_intersect[i].seg);
      }
    }

    return inner;
  }
}

export function bufferPolygon(polygons: GJ.Position[][], radius: number): GJ.Position2[][][] {
  // Buffer and solve all input rings
  // ringList is ordered by minx/miny
  // const segments = polygons.map(poly => new SegmentList(poly, radius));
  const segments = new SegmentList(polygons[0], radius);
  const ringList = ringsFromSegments(segments);
  return reduceRings(ringList);
}

class SegmentList {
  segments: Segment[] = [];
  indices: number[];

  static reassemble(ring: Segment[]): GJ.Position2[] {
    const arr = ring.map((seg) => seg.a);
    arr.push(ring[0].a);
    return arr;
  }

  get length() {
    return this.segments.length;
  }

  constructor(linearRing: GJ.Position[], buffer: number) {
    if (linearRing.length < 4) {
      throw new RangeError('too few positions');
    }

    // Skip one since first and last point MUST be the same
    let prev_seg: Segment | undefined = undefined;
    for (let i = 1; i < linearRing.length; i++) {
      const seg = new Segment(linearRing[i - 1], linearRing[i]);
      seg.buffer(buffer);

      // Add connections
      if (prev_seg) {
        this.segments.push(new Segment(prev_seg.b, seg.a));
      }

      this.segments.push(seg);
      prev_seg = seg;
    }

    // Add final connection
    this.segments.push(new Segment((prev_seg as Segment).b, this.segments[0].a));

    this.indices = this.segments.map((_, i) => i);
    this.sortSegmentIndices();
  }

  segment(idx: number): Segment {
    if (idx < 0) {
      const seg = this.segments.at(idx);
      if (seg === undefined) {
        throw new RangeError('foul idx');
      }
      return seg;
    } else if (idx >= this.segments.length) {
      const seg = this.segments.at(idx - this.segments.length);
      if (seg === undefined) {
        throw new RangeError('foul idx');
      }
      return seg;
    }

    return this.segments[idx];
  }

  prevSegment(idx: number): number {
    return idx === 0 ? this.segments.length - 1 : idx - 1;
  }

  nextSegment(idx: number): number {
    return idx === this.segments.length - 1 ? 0 : idx + 1;
  }

  checkIfNeighbour(a: number, b: number): boolean {
    return (
      a === b - 1 ||
      a === b + 1 ||
      (a === 0 && b === this.segments.length - 1) ||
      (a === this.segments.length - 1 && b === 0)
    );
  }

  // Sort indices left->right
  sortSegmentIndices() {
    this.indices.sort((seg_i, seg_j) => {
      const seg_a = this.segments[seg_i].leftMost();
      const seg_b = this.segments[seg_j].leftMost();
      const x_diff = seg_a[0] - seg_b[0];
      return x_diff !== 0.0 ? x_diff : seg_a[1] - seg_b[1];
    });
  }

  sweepLineSearch(): IntersectList {
    // array of intersection points
    // each intersection point is an array of segment idx and param
    const intersects: IntersectList = new IntersectList(this.segments.length);
    const search_queue: number[] = []; // queue of indices

    // We only want to save intersection points which have at least one interesting intersection; we
    // disregard intersection points which only have intersections between neighbouring segments the
    // later strategy revolves around interesting intersections

    // We save all intersection points
    for (let i = 0; i < this.indices.length; i++) {
      const idx = this.indices[i];
      const seg = this.segments[idx];

      for (let j = 0; j < search_queue.length; ) {
        const sq_idx = search_queue[j];
        const sq_seg = this.segments[sq_idx];

        // Check if we should delete
        if (sq_seg.rightMost()[0] < seg.leftMost()[0]) {
          search_queue[j] = search_queue.at(-1) as number;
          search_queue.pop();
          continue; // continue without incrementing
        }

        const t_intersect: [number, number] | null =
          // if the segment after idx is the next seg, intersection must happen at [1.0, 0.0]. if it
          // is the previous, intersection must happen at [0.0, 1.0]
          this.nextSegment(idx) === sq_idx
            ? [1.0, 0.0]
            : this.prevSegment(idx) === sq_idx
              ? [0.0, 1.0]
              : seg.parametricIntersect(sq_seg);

        if (t_intersect !== null) {
          if (intersects.tryAppendIntersect([idx, sq_idx], t_intersect) === false) {
            intersects.addIntersect(
              [idx, sq_idx],
              t_intersect,
              this.segment(idx).position(t_intersect[0]),
            );
          }
        }

        j++;
      }

      search_queue.push(idx);
    }

    return intersects;
  }
}

function upwardIntersection(poly: GJ.Position[], point: GJ.Position): number | null {
  let min_dist = Number.MAX_VALUE;
  let crossings = 0;

  for (let i = 1; i < poly.length; i++) {
    // segment is totally below point
    if (poly[i - 1][1] < point[1] && poly[i][1] < point[1]) {
      continue;
    }

    // lets disregard vertical line b/c complicated
    // if (poly[i - 1][0] === poly[i][0]) {
    //   continue;
    // }

    // segment is overlapping point in x
    if (poly[i - 1][0] <= point[0] === point[0] < poly[i][0]) {
      // we need to know how and where it intersects (and maybe how many times)
      const dist =
        poly[i][1] -
        point[1] -
        ((poly[i - 1][1] - poly[i][1]) / (poly[i - 1][0] - poly[i][0])) * (poly[i][0] - point[0]);
      // Handle touching points? Do we need to do this before?
      if (dist >= 0.0) {
        crossings += 1;
        if (dist < min_dist) {
          min_dist = dist;
        }
      }
    }
  }

  return crossings % 2 === 0 ? null : min_dist;
}

/*
 * Given an polygon, and the index of the point with lowest x (lowest y as tiebreaker), find the
 * orientation of the polygon. We assume 0 is this point.
 * See [wikipedia](https://en.wikipedia.org/wiki/Curve_orientation#Orientation_of_a_simple_polygon).
 * @returns `true` if orientation is counter-clockwise
 */
function polygonOrientation(poly: GJ.Position2[]): boolean {
  // Since first and last are equal, we disregard the last point completely
  const a = poly[poly.length - 2];
  const b = poly[0];
  const c = poly[1];

  const det = a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]);

  if (det === 0.0) {
    throw new Error('incorrect input: points are collinear');
  }

  return det > 0.0;
}

function ringsFromSegments(segments: SegmentList) {
  const intersects = segments.sweepLineSearch();
  intersects.sortIntersects();

  // Special case of convex shape
  if (intersects.list.length === segments.length) {
    return [SegmentList.reassemble(segments.segments)];
  }

  // Select an intersect and resolve it.
  let ringList: GJ.Position2[][] = [];
  let ring: GJ.Position2[] = [];

  for (
    let int = intersects.getLeftmostIntersect();
    int !== null;
    int = intersects.getLeftmostIntersect()
  ) {
    ring.push(int.position);
    let inner = IntersectList.selectInner(int, segments);
    inner.visited = true;

    for (
      let next = intersects.getNextIntersect(inner);
      next !== null && next !== int;
      next = intersects.getNextIntersect(inner)
    ) {
      ring.push(next.position);
      inner = IntersectList.selectInner(next, segments);
      inner.visited = true;
    }

    ring.push(ring[0]);
    ringList.push(ring);
    ring = [];
  }

  // 0) start of by selecting an intersect
  // 1) calculate the direction
  // 2) add the start of segment
  // check if selected segment has intersect with larger param
  // if no, go to next segment and go to 2)
  // if yes, check if selected segment has been visited. if so, add interesect and go to (0)
  // if not visited, go to 1)

  return ringList;
}

function reduceRings(ringList: GJ.Position2[][]): GJ.Position2[][][] {
  // store max x of each ring
  const max = ringList.map((ring) => ring.reduce((p, c) => (p < c[0] ? c[0] : p), ring[0][0]));

  const returnPolys: GJ.Position2[][][] = [];
  // [parent, isPositive, removable, returnIdx]
  const ringInfo = Array.from<[number, boolean, boolean, number]>({
    length: ringList.length,
  }).fill([-1, true, false, -1]);
  const status: number[] = [];

  for (let idx = 0; idx < ringList.length; idx++) {
    const sweepx = ringList[idx][0][0];
    const closestRing = [-1, Number.MAX_VALUE];
    ringInfo[idx][1] = polygonOrientation(ringList[idx]);

    // Loop through status, in order to find potential parent
    // It might be possible to better this by checking rings according to parental-tree
    for (let j = 0; j < status.length; ) {
      // Remove from status those who are not needed
      if (max[status[j]] < sweepx) {
        status[j] = status.at(-1) as number;
        status.pop();
        continue;
      }

      const p = upwardIntersection(ringList[status[j]], ringList[idx][0]);
      if (p !== null && p < closestRing[1]) {
        closestRing[0] = status[j];
        closestRing[1] = p;
      }

      j++;
    }

    // Handle topmost ring
    if (closestRing[0] === -1) {
      returnPolys.push([ringList[idx]]);
      ringInfo[idx][3] = returnPolys.length - 1;
      status.push(idx);
      continue;
    }

    ringInfo[idx][0] = closestRing[0];

    // Check if orientation is the same as parent: if so, we can remove
    if (ringInfo[idx][1] === ringInfo[closestRing[0]][1]) {
      ringInfo[idx][2] = true;
      continue;
    }

    // otherwise, we insert it into the status
    status.push(idx);

    // if orientation is clockwise, it must be a hole, and belongs to its parent
    if (ringInfo[idx][1] === false) {
      const parentReturnIdx = ringInfo[ringInfo[idx][0]][3];
      returnPolys[parentReturnIdx].push(ringList[idx]);
      ringInfo[idx][3] = parentReturnIdx;
    } else {
      returnPolys.push([ringList[idx]]);
      ringInfo[idx][3] = returnPolys.length - 1;
    }
  }

  return returnPolys;
}
