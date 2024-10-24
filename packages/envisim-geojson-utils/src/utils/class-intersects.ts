import * as GJ from '../types/geojson.js';
import {Segment, intersects} from './class-segment.js';

type IntersectSegment = {segment: number; param: number; visited: boolean};
type IntersectPoint = {segments: IntersectSegment[]; position: GJ.Position2};
type IntersectIndices = [null, null] | [number, number];

export class IntersectList {
  segments: Segment[];
  list: IntersectPoint[] = [];
  order: number[] = [];
  segmentMap: number[][]; // segment->point index connection

  constructor(segments: Segment[], breaks: number[] = [segments.length]) {
    this.segments = segments;
    this.segmentMap = Array.from({length: segments.length}, () => []);
    const queue: number[] = [];

    // Get order of segments by lowest x, lowest y.
    const order = Array.from(segments, (_, i) => i);
    order.sort((i, j) => {
      const a = segments[i].leftMost();
      const b = segments[j].leftMost();
      const diff = a[0] - b[0];
      return diff === 0.0 ? a[1] - b[1] : diff;
    });

    // Sweepline search
    for (const idx of order) {
      const seg = segments[idx];

      // Check new seg for intersect with current queue
      for (let j = 0; j < queue.length; ) {
        const queueIdx = queue[j];
        const queueSeg = segments[queueIdx];

        // Check if queued can be deleted
        if (queueSeg.rightMost()[0] < seg.leftMost()[0]) {
          queue[j] = queue[queue.length - 1];
          queue.pop();
          continue; // without incrementing j, as j points to different value
        }

        // if the segment after idx is the next seg, intersection must happen at [1.0, 0.0]. if it
        // is the previous, intersection must happen at [0.0, 1.0]
        const ts: [number, number][] =
          nextIndex(idx, breaks) === queueIdx
            ? [[1.0, 0.0]]
            : prevIndex(idx, breaks) === queueIdx
              ? [[0.0, 1.0]]
              : intersects(seg, queueSeg);

        for (const t of ts) {
          if (this.tryAppendIntersect([idx, queueIdx], t) === false) {
            this.addIntersect([idx, queueIdx], t, seg.position(t[0]));
          }
        }

        j++;
      }

      queue.push(idx);
    }
  }

  addIntersect(segments: [number, number], params: [number, number], position: GJ.Position2) {
    this.list.push({
      segments: [],
      position,
    });
    const idx = this.list.length - 1;
    this.appendIntersect(idx, segments[0], params[0]);
    this.appendIntersect(idx, segments[1], params[1]);
  }
  appendIntersect(idx: number, segment: number, param: number) {
    this.list[idx].segments.push({segment, param, visited: param === 1.0});
    if (!this.segmentMap[segment].includes(idx)) {
      this.segmentMap[segment].push(idx);
    }
  }
  tryAppendIntersect(segments: [number, number], params: [number, number]): boolean {
    // It shouldnt be possible for a crossing to exist for seg[0], without already existing for
    // seg[1]
    let intidx = this.segmentMap[segments[1]].find((int) =>
      this.list[int].segments.some(
        (inner) => inner.segment === segments[1] && inner.param === params[1],
      ),
    );
    if (intidx) {
      // check so intersect doesnt already exist for seg[0]
      if (!this.segmentMap[segments[0]].includes(intidx)) {
        this.appendIntersect(intidx, segments[0], params[0]);
      }
      return true;
    }

    return false;
  }

  getUnvisitedIntersectAndSegment(): IntersectIndices {
    for (let i = 0; i < this.list.length; i++) {
      const intsegIdx = this.list[i].segments.findIndex((intseg) => intseg.visited === false);
      if (intsegIdx > -1) {
        return [i, intsegIdx];
      }
    }

    return [null, null];
  }
  // Finds the closest intersect along a segment with a larger param
  getNextIntersectOfSegment(start: IntersectSegment): number | null {
    let param = Number.MAX_VALUE;
    let idx: number | null = null;

    for (const intpointIdx of this.segmentMap[start.segment]) {
      const intseg = this.list[intpointIdx].segments.find(
        (intseg) =>
          start.segment === intseg.segment && start.param < intseg.param && intseg.param < param,
      );
      if (intseg) {
        param = intseg.param;
        idx = intpointIdx;
      }
    }

    return idx;
  }
  // Finds the rightmost segment in an intersection, relative to the travelled segment. The
  // intersect is guaranteed to have an unvisited segment.
  getRightmostSegment(start: IntersectSegment, intpointIdx: number): IntersectSegment {
    const intpoint = this.list[intpointIdx];

    // Most intersections are going to be simple: the meetings of endpoints. Endpoints always have
    // one visited and one unvisited segment.
    // Second most common intersections should be a crossing: A crossing have two unvisited
    // segments.
    if (intpoint.segments.length === 2) {
      const intseg0 = intpoint.segments[0];
      const intseg1 = intpoint.segments[1];

      // It is not possible for both of these to be unvisited, at least one must be. First, we check
      // if exactly one is.
      if (intseg0.visited !== intseg1.visited) {
        return intseg0.visited ? intseg1 : intseg0;
      }

      // Now we have concluded that both segments are unvisited, i.e. we have a proper crossing,
      // where one segment is the segment that we're travelling along, and the other is the crossing
      // segment.

      // unvisitedSegs.length === 2
      // one must be the same segment as the travelling segment
      const cp = this.segments[intseg0.segment].crossProduct(this.segments[intseg1.segment]);
      if (cp > 0.0) {
        return intseg0;
      } else if (cp < 0.0) {
        return intseg1;
      }

      // since the segments are collinear, we either have that the other segment is in the same
      // direction as the travelling segment, or that they are going in the same direction. Either
      // way, we can continue along the travelling segment.
      return start.segment === intseg0.segment ? intseg0 : intseg1;
    }

    // If we have multiple segments intersection, we need find the rightmost.
    // We start by dividing the segments into respective categories: those on the line (0), those to
    // the right (-1) and those to the left (1) of the current travelling direction. null signals a
    // visited segment.
    const travelledSegment = this.segments[start.segment];
    const direction: (number | null)[] = Array.from<number | null>({
      length: intpoint.segments.length,
    }).fill(null);
    let candidate: IntersectSegment | undefined;
    let canContinueAlongTravellingSegment = -1;

    for (let i = 0; i < intpoint.segments.length; i++) {
      const intseg = intpoint.segments[i];
      if (intseg.visited === true) {
        continue;
      }

      // the travelling segment
      if (start.segment === intseg.segment) {
        canContinueAlongTravellingSegment = i;
        direction[i] = 0;
        continue;
      }

      direction[i] = Math.sign(travelledSegment.crossProduct(this.segments[intseg.segment]));
      // We can start checking the rightmost directly
      if (direction[i] === -1) {
        if (candidate) {
          const cp = this.segments[candidate.segment].crossProduct(this.segments[intseg.segment]);
          if (cp > 0.0) {
            candidate = intseg;
          }
        } else {
          candidate = intseg;
        }
      }
    }

    // If candidate is set, we have found a champion, and it is to the right of the current
    // travelling direction.
    if (candidate) {
      return candidate;
    }

    // Otherwise, we should try to travel in the direction of the travelling direction. If the
    // travelling segment is still travellable, we can select that segment.
    if (canContinueAlongTravellingSegment > -1) {
      return intpoint.segments[canContinueAlongTravellingSegment];
    }

    // Now, we need to exclude backwards travelling, amongst collinear segments. We do this and try
    // to find the rightmostest segment to the left.
    for (let i = 0; i < intpoint.segments.length; i++) {
      if (direction[i] === -1) {
        continue;
      }

      const intseg = intpoint.segments[i];

      if (direction[i] === 0) {
        // We exclude opposite direction by ensuring that the deltas are going to the same sector
        if (
          Math.sign(travelledSegment.delta[0]) ===
            Math.sign(this.segments[intseg.segment].delta[0]) &&
          Math.sign(travelledSegment.delta[1]) === Math.sign(this.segments[intseg.segment].delta[1])
        ) {
          return intseg;
        }
        continue;
      }

      // direction === 1
      if (candidate) {
        const cp = this.segments[candidate.segment].crossProduct(this.segments[intseg.segment]);
        if (cp > 0.0) {
          candidate = intseg;
        }
      } else {
        candidate = intseg;
      }
    }

    // If candidate is set, we have found a champion, and it is to the left of the current
    // travelling direction.
    if (candidate) {
      return candidate;
    }

    // Otherwise, we need to go in the opposite direction -- we just find the first 0
    candidate = intpoint.segments.find((_, i) => direction[i] === 0);

    if (candidate) {
      return candidate;
    }

    throw new Error('no rightmost segment was found in intersect');
  }

  unwindToSegmentRings(): number[][] {
    let ring: number[]; // store intersectpoint indices
    const ringList: number[][] = [];

    for (
      let indices = this.getUnvisitedIntersectAndSegment();
      indices[0] !== null;
      indices = this.getUnvisitedIntersectAndSegment()
    ) {
      // First intersect gives an arbitrary vector to follow, but does not yield an intersection. In
      // the next step, we can use vector to decide how to follow up in the next intersection,
      // i.e. how to turn the rightest.
      ring = [];

      let travellingSegment = this.list[indices[0]].segments[indices[1]];

      for (
        let ipIdx = this.getNextIntersectOfSegment(travellingSegment);
        ipIdx !== null;
        ipIdx = this.getNextIntersectOfSegment(travellingSegment)
      ) {
        const ipIdxLocation = ring.indexOf(ipIdx);

        if (ipIdxLocation === 0) {
          if (ring.length > 2) {
            ringList.push(ring);
          }
          break;
        }

        if (ipIdxLocation > -1) {
          const splicedRing = ring.splice(ipIdxLocation, Infinity);
          if (splicedRing.length > 2) {
            ringList.push(splicedRing);
          }
        }

        ring.push(ipIdx);

        travellingSegment = this.getRightmostSegment(travellingSegment, ipIdx);
        travellingSegment.visited = true;
      }
    }

    return ringList;
  }

  // Remove bad rings from list, i.e. negative rings from a positive.
  reduceRingList(ringList: number[][], parentIsPositive: boolean): [Segment[][], number[]] {
    const segList: Segment[][] = Array.from(ringList, (ring) => this.ringToSegments(ring));
    const extremes: [number, number][] = Array.from(ringList, (ring) =>
      this.extremePointInRing(ring),
    );
    const parent: number[] = Array.from<number>({length: ringList.length}).fill(-1);
    const positive: boolean[] = Array.from(ringList, (ring, i) =>
      this.ringIsPositive(ring, extremes[i][0]),
    );
    const returnListPosition: number[] = Array.from<number>({length: ringList.length}).fill(-1);
    const order: number[] = Array.from({length: ringList.length}, (_, i) => i);
    order.sort((a, b) => {
      const apos = this.list[extremes[a][0]].position;
      const bpos = this.list[extremes[b][0]].position;
      const d = apos[0] - bpos[0];
      if (d === 0.0) return apos[1] - bpos[1];
      return d;
    });

    const queue: number[] = [];
    const filteredList: Segment[][] = [];
    const filteredParents: number[] = [];

    for (const idx of order) {
      // const ring = ringList[idx];
      const sweepPoint = this.list[extremes[idx][0]].position;
      let distance = Number.MAX_VALUE;

      for (let j = 0; j < queue.length; ) {
        const queueIdx = queue[j];
        // const queueRing = ringList[queueIdx];
        // Remove from queue those rings that has passed
        if (this.list[extremes[queueIdx][1]].position[0] < sweepPoint[0]) {
          queue[j] = queue[queue.length - 1]; // Swap remove
          queue.pop();
          continue; // Without incrementing j
        }

        const p = upwardIntersection(segList[queueIdx], sweepPoint, positive[queueIdx]);
        if (p && p < distance) {
          parent[idx] = queueIdx;
          distance = p;
        }

        j++;
      }

      // Top ring
      if (parent[idx] === -1) {
        // A top ring, with unexpected direction, should be removed
        if (positive[idx] !== parentIsPositive) {
          // Do not add to queue.
          continue;
        }

        queue.push(idx);
        returnListPosition[idx] = filteredList.length;
        filteredList.push(segList[idx]);
        filteredParents.push(-1);
        continue;
      }

      if (returnListPosition[parent[idx]] === -1) {
        // Do not add to queue, parent already marked as removable, all its decendants should be
        // removed.
        continue;
      }
      if (positive[idx] === positive[parent[idx]]) {
        // Add to queue, all its decendants need to be removed as well.
        queue.push(idx);
        continue;
      }

      // We return rings with a grandparent as a top parent
      queue.push(idx);
      returnListPosition[idx] = filteredList.length;
      filteredList.push(segList[idx]);
      filteredParents.push(
        positive[idx] === parentIsPositive ? -1 : returnListPosition[parent[idx]],
      );
    }

    return [filteredList, filteredParents];
  }

  // Returns the list idx of the extreme points in a ring
  extremePointInRing(ring: number[]): [number, number] {
    let min = ring[0];
    let minPos = this.list[min].position;
    let max = ring[0];
    let maxPos = this.list[max].position;

    for (let i = 1; i < ring.length; i++) {
      const idx = ring[i];
      const pos = this.list[idx].position;
      if (pos[0] < minPos[0] || (pos[0] === minPos[0] && pos[1] < minPos[1])) {
        min = idx;
        minPos = pos;
      } else if (pos[0] > maxPos[0] || (pos[0] === maxPos[0] && pos[1] > maxPos[1])) {
        max = idx;
        maxPos = pos;
      }
    }

    return [min, max];
  }

  /*
   * Given an polygon, and the index of the point with lowest x (lowest y as tiebreaker), find the
   * orientation of the polygon. We assume 0 is this point.
   * See [wikipedia](https://en.wikipedia.org/wiki/Curve_orientation#Orientation_of_a_simple_polygon).
   * @returns `true` if orientation is counter-clockwise
   */
  ringIsPositive(ring: number[], min = this.extremePointInRing(ring)[0]): boolean {
    const minPosition = this.list[min].position;
    const ringIndex = ring.indexOf(min);

    const prev = this.list[ring[ringIndex === 0 ? ring.length - 1 : ringIndex - 1]].position;
    const next = this.list[ring[ringIndex === ring.length - 1 ? 0 : ringIndex + 1]].position;

    const det =
      prev[0] * (minPosition[1] - next[1]) +
      minPosition[0] * (next[1] - prev[1]) +
      next[0] * (prev[1] - minPosition[1]);

    return det > 0.0;
  }

  ringToSegments(ring: number[]): Segment[] {
    const segments: Segment[] = [
      new Segment(this.list[ring[ring.length - 1]].position, this.list[ring[0]].position),
    ];

    for (let i = 1; i < ring.length; i++) {
      segments.push(new Segment(this.list[ring[i - 1]].position, this.list[ring[i]].position));
    }

    return segments;
  }

  ringToPolygon(ring: number[]): GJ.Position2[] {
    const poly: GJ.Position2[] = ring.map((idx) => this.list[idx].position);
    poly.push(this.list[ring[0]].position);
    return poly;
  }
}

function prevIndex(index: number, breaks: number[]): number {
  if (index === 0) {
    return breaks[0] - 1;
  }

  let rmi = breaks.indexOf(index);
  return rmi > -1 ? breaks[rmi + 1] - 1 : index - 1;
}

function nextIndex(index: number, breaks: number[]): number {
  const next = index + 1;
  if (next === breaks[0]) {
    return 0;
  }

  let rmi = breaks.indexOf(next);

  return rmi > -1 ? breaks[rmi - 1] : next;
}

function upwardIntersection(
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
