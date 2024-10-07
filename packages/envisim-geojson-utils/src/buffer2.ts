import * as GJ from './types/geojson.js';
import {Segment} from './utils/intersectSegments.js';
import {pointInRing} from './utils/pointInPolygonPosition.js';

type InnerIntersect = {seg: number; param: number; visited: boolean};
type Intersect = InnerIntersect[];
// type IntersectList = Intersect[];

class IntersectList {
  list: Intersect[] = [];
  constructor() {}
  add(inner_a: InnerIntersect, inner_b: InnerIntersect) {
    this.list.push([inner_a, inner_b]);
  }
  getIntersect(): Intersect | null {
    for (const int of this.list) {
      for (const inner of int) {
        if (inner.visited === false && inner.param < 1.0) {
          return int;
        }
      }
    }

    return null;
  }

  getNextIntersect(current: InnerIntersect): Intersect | null {
    for (const int of this.list) {
      for (const inner of int) {
        if (current.seg === inner.seg && current.param < inner.param) {
          return int;
        }
      }
    }

    return null;
  }

  static selectInner(
    int: Intersect,
    segments: BufferedSegmentList,
  ): InnerIntersect {
    const filtered_intersect = int.filter((inner) => inner.visited === false);

    let inner = filtered_intersect[0];
    let inner_seg = segments.segment(inner.seg);
    for (let i = 1; i < filtered_intersect.length; i++) {
      const cp = inner_seg.crossProduct(
        segments.segment(filtered_intersect[i].seg),
      );
      if (cp < 0.0) {
        inner = filtered_intersect[i];
        inner_seg = segments.segment(filtered_intersect[i].seg);
      }
    }

    return inner;
  }
}

export function bufferPolygon(
  polygon: GJ.Position[][],
  radius: number,
): GJ.Position2[][][] {
  // Buffer and solve all input rings
  const ringList = bufferInner(polygon[0], radius);

  // Sort buffered rings according to leftmost point (while also storing
  // rightmost). Store the index of the smallest and largest point for each ring
  const extremePoints = ringList.map((ring) => {
    const extreme = [0, 0];
    for (let i = 1; i < ring.length; i++) {
      if (ring[i][0] <= ring[extreme[0]][0]) {
        // Smallest should be smallest in x & y
        if (
          ring[i][0] < ring[extreme[0]][0] ||
          ring[i][1] < ring[extreme[0]][1]
        ) {
          extreme[0] = i;
        }
      } else if (ring[i][0] > ring[extreme[1]][0]) {
        extreme[1] = i;
      }
    }

    return extreme;
  });

  // Create the search order
  const ringOrder = extremePoints.map((_, i) => i);
  ringOrder.sort(
    (a, b) =>
      ringList[a][extremePoints[a][0]][0] - ringList[b][extremePoints[b][0]][0],
  );

  const returnPolys: GJ.Position2[][][] = [];
  // [parent, isPositive, removable, returnIdx]
  const ringInfo = Array.from<[number, boolean, boolean, number]>({
    length: ringList.length,
  }).fill([-1, true, false, -1]);
  const status: number[] = [];

  // Sweep Line Search
  for (let i = 0; i < ringOrder.length; i++) {
    let idx = ringOrder[i];
    let closestRing = [-1, Number.MAX_VALUE];
    ringInfo[idx][1] = polygonOrientation(ringList[idx], extremePoints[idx][0]);

    // check winding order???
    // It might be possible to better this by checking rings according to
    // parental-tree
    for (let j = 0; j < status.length; ) {
      if (extremePoints[j][1] < extremePoints[idx][0]) {
        status[j] = status.at(-1) as number;
        status.pop();
        continue;
      }

      const p = upwardIntersection(
        ringList[status[j]],
        ringList[idx][extremePoints[idx][0]],
      );
      if (p !== null && p < closestRing[1]) {
        closestRing[0] = i;
        closestRing[1] = p;
      }

      j++;
    }

    // Handle closest ring
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

function bufferInner(polygon: GJ.Position[], radius: number): GJ.Position2[][] {
  const segments = new BufferedSegmentList(polygon, radius);
  segments.sortSegmentIndices();
  const intersects = segments.sweepLineSearch();

  // Special case of convex shape
  if (intersects.list.length === 0) {
    return [BufferedSegmentList.reassemble(segments.segments)];
  }

  // Select an intersect and resolve it.
  let ringList: GJ.Position2[][] = [];
  let ring: GJ.Position2[] = [];
  let int: Intersect | null = intersects.getIntersect();
  let start: Intersect | null = int;

  for (;;) {
    if (int === null) {
      return ringList;
    }

    let inner = IntersectList.selectInner(int, segments);
    ring.push(segments.segment(inner.seg).position(inner.param));
    inner.visited = true;

    for (
      int = intersects.getNextIntersect(inner);
      int !== null;
      int = intersects.getNextIntersect(inner)
    ) {
      inner = {
        seg: segments.nextSegment(inner.seg),
        param: 0.0,
        visited: false,
      };
      ring.push(segments.segment(inner.seg).position(0.0));
    }

    if (int === start) {
      if (ring.length > 2) {
        ring.push(ring[0]);
        ringList.push(ring);
      }
      ring = [];
      int = intersects.getIntersect();
    }

    // 0) start of by selecting an intersect
    // 1) calculate the direction
    // 2) add the start of segment
    // check if selected segment has intersect with larger param
    // if no, go to next segment and go to 2)
    // if yes, check if selected segment has been visited. if so, add interesect
    // and go to (0)
    // if not visited, go to 1)
  }
}

class BufferedSegmentList {
  segments: Segment[] = [];
  indices: number[];

  static reassemble(ring: Segment[]): GJ.Position2[] {
    const arr = ring.map((seg) => seg.a);
    arr.push(ring[0].a);
    return arr;
  }

  constructor(linearRing: GJ.Position[], radius: number) {
    if (linearRing.length < 4) {
      throw new RangeError('too few positions');
    }

    // Skip one since first and last point MUST be the same
    let prev_seg: Segment | undefined = undefined;
    for (let i = 1; i < linearRing.length; i++) {
      const seg = new Segment(linearRing[i - 1], linearRing[i]);
      seg.buffer(radius);

      // Add connections
      if (prev_seg) {
        this.segments.push(new Segment(prev_seg.b, seg.a));
      }

      this.segments.push(seg);
      prev_seg = seg;
    }

    // Add final connection
    this.segments.push(
      new Segment((prev_seg as Segment).b, this.segments[0].a),
    );

    this.indices = this.segments.map((_, i) => i);
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

  // Sort indices right->left
  sortSegmentIndices() {
    this.indices.sort((seg_i, seg_j) => {
      const seg_a = this.segments[seg_i].leftMost();
      const seg_b = this.segments[seg_j].leftMost();
      return seg_a[0] - seg_b[0];
    });
  }

  sweepLineSearch(): IntersectList {
    // array of intersection points
    // each intersection point is an array of segment idx and param
    const intersects: IntersectList = new IntersectList();
    const search_queue: number[] = []; // queue of indices

    // We only want to save intersection points which have at least one
    // interesting intersection; we disregard intersection points which only
    // have intersections between neighbouring segments
    // the later strategy revolves around interesting intersections
    for (let i = 0; i < this.indices.length; i++) {
      const idx = this.indices[i];
      const seg = this.segments[idx];

      // Problem: identify points w/ multiple crossings.
      // Idea: all crossings that can become multiple already exists at this
      // point. It should therefore be possible to loop through all existing
      // intersects, searching for the other segment.
      // The above idea is not true, since an impure crossing can exist
      for (let j = 0; j < search_queue.length; ) {
        const sq_idx = search_queue[j];
        const sq_seg = this.segments[sq_idx];

        // Check if we should delete
        if (sq_seg.rightMost()[0] < seg.leftMost()[0]) {
          search_queue[j] = search_queue.at(-1) as number;
          search_queue.pop();
          continue; // continue without incrementing
        }

        // We skip uninteresting intersection
        if (this.checkIfNeighbour(idx, sq_idx)) {
          j++;
          continue;
        }

        const t_intersect = seg.parametricIntersect(sq_seg);
        if (t_intersect !== null) {
          let existing_intersect = false;
          for (const int of intersects.list) {
            for (const inner of int) {
              if (inner.seg === idx && inner.param === t_intersect[0]) {
                int.push({
                  seg: sq_idx,
                  param: t_intersect[1],
                  visited: t_intersect[1] === 1.0,
                });
                existing_intersect = true;
              } else if (
                inner.seg === sq_idx &&
                inner.param === t_intersect[1]
              ) {
                int.push({
                  seg: idx,
                  param: t_intersect[0],
                  visited: t_intersect[0] === 1.0,
                });
                existing_intersect = true;
              }
            }
          }

          if (!existing_intersect) {
            intersects.add(
              {
                seg: idx,
                param: t_intersect[0],
                visited: t_intersect[0] === 1.0,
              },
              {
                seg: sq_idx,
                param: t_intersect[1],
                visited: t_intersect[1] === 1.0,
              },
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

function upwardIntersection(
  poly: GJ.Position[],
  point: GJ.Position,
): number | null {
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
        ((poly[i - 1][1] - poly[i][1]) / (poly[i - 1][0] - poly[i][0])) *
          (poly[i][0] - point[0]);
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
 * Given an polygon, and the index of the point with lowest x (lowest y as
 * tiebreaker), find the orientation of the polygon.
 * See [wikipedia](https://en.wikipedia.org/wiki/Curve_orientation#Orientation_of_a_simple_polygon).
 * @returns `true` if orientation is counter-clockwise
 */
function polygonOrientation(poly: GJ.Position2[], pointIdx: number): boolean {
  const a = poly[pointIdx === 0 ? poly.length - 1 : pointIdx - 1];
  const b = poly[pointIdx];
  const c = poly[pointIdx === poly.length - 1 ? 0 : pointIdx + 1];

  const det =
    a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]);

  if (det === 0.0) {
    throw new Error('incorrect input: points are collinear');
  }

  return det > 0.0;
}
