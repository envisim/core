import { IntersectList } from "./class-intersects.js";
import {
  type Segment,
  rightDistanceToParent,
  ringToSegments,
  segmentsToPolygon,
} from "./class-segment.js";
import type * as GJ from "./geojson.js";

/**
 * Assumes that `polygons` consists of two sets of non-overlapping polygon(s).
 * @returns the intersect of these two sets.
 */
export function intersectPolygons(
  polygons1: GJ.Position[][][],
  polygons2: GJ.Position[][][],
): GJ.Position2[][][] {
  if (
    polygons1.length === 0 ||
    polygons2.length === 0 ||
    polygons1.length + polygons2.length === 1
  ) {
    return [];
  }

  const polygons = [...polygons1, ...polygons2];

  const outerSegments: Segment[] = [];
  const outerBreaks: number[] = [];

  for (const polygon of polygons) {
    for (const ring of polygon) {
      outerSegments.push(...ringToSegments(ring));
      outerBreaks.push(outerSegments.length);
    }
  }

  const il = new IntersectList(outerSegments, outerBreaks);
  const ringList = il.traceIntersectionRings();

  const segList: Segment[][] = Array.from(ringList, (ring) =>
    il.intersectionRingToSegmentRing(ring),
  );
  const extremes: [number, number][] = Array.from(ringList, (ring) =>
    il.extremePointOfIntersectionRing(ring),
  );
  const parent: number[] = Array.from<number>({ length: ringList.length }).fill(-1);
  const positive: boolean[] = Array.from(ringList, (ring, i) =>
    il.intersectionRingIsPositive(ring, extremes[i][0]),
  );
  const order: number[] = Array.from({ length: ringList.length }, (_, i) => i);
  order.sort((a, b) => {
    const apos = il.list[extremes[a][0]].position;
    const bpos = il.list[extremes[b][0]].position;
    const d = apos[0] - bpos[0];
    if (d === 0.0) return apos[1] - bpos[1];
    return d;
  });

  const queue: number[] = [];

  const depth = Array.from<number>({ length: ringList.length });
  const retPolys: GJ.Position2[][][] = [];
  const retIndices: number[] = Array.from<number>({ length: ringList.length }).fill(-1);

  for (const idx of order) {
    // const ring = ringList[idx];
    const sweepPoint = il.list[extremes[idx][0]].position;
    let distance = Number.MAX_VALUE;

    for (let j = 0; j < queue.length; ) {
      const queueIdx = queue[j];
      // const queueRing = ringList[queueIdx];
      // Remove from queue those rings that has passed
      if (il.list[extremes[queueIdx][1]].position[0] < sweepPoint[0]) {
        queue[j] = queue[queue.length - 1]; // Swap remove
        queue.pop();
        continue; // Without incrementing j
      }

      const p = rightDistanceToParent(segList[queueIdx], segList[idx], sweepPoint);

      if (p !== null && p < distance) {
        parent[idx] = queueIdx;
        distance = p;
      }

      j++;
    }

    depth[idx] = parent[idx] > -1 ? depth[parent[idx]] : 0;

    if (positive[idx]) {
      depth[idx] += 1;

      if (depth[idx] === 2) {
        retPolys.push([segmentsToPolygon(segList[idx])]);
        retIndices[idx] = retPolys.length - 1;
      }
    } else {
      depth[idx] -= 1;

      if (depth[idx] === 1) {
        retPolys[retIndices[parent[idx]]].push(segmentsToPolygon(segList[idx]));
      }
    }

    queue.push(idx);
  }

  return retPolys;
}
