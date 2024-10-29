import type * as GJ from './types/geojson.js';
import {AreaFeature, AreaGeometryCollection, MultiPolygon, Polygon} from './geojson/index.js';
import {bboxInBBox} from './utils/bbox.js';
import {IntersectList} from './utils/class-intersects.js';
import {
  type Segment,
  ringToSegments,
  segmentsToPolygon,
  upwardIntersection,
} from './utils/class-segment.js';

function intersect(polygons: GJ.Position[][][]): GJ.Position2[][][] {
  if (polygons.length === 1) {
    return [polygons[0].map((ring) => ring.map((p) => [p[0], p[1]]))];
  }

  const outerSegments: Segment[] = [];
  const outerBreaks: number[] = [];

  for (const polygon of polygons) {
    for (const ring of polygon) {
      outerSegments.push(...ringToSegments(ring));
      outerBreaks.push(outerSegments.length);
    }
  }

  const il = new IntersectList(outerSegments, outerBreaks);
  const ringList = il.unwindToSegmentRings();

  const segList: Segment[][] = Array.from(ringList, (ring) => il.ringToSegments(ring));
  const extremes: [number, number][] = Array.from(ringList, (ring) => il.extremePointInRing(ring));
  const parent: number[] = Array.from<number>({length: ringList.length}).fill(-1);
  const positive: boolean[] = Array.from(ringList, (ring, i) =>
    il.ringIsPositive(ring, extremes[i][0]),
  );
  const order: number[] = Array.from({length: ringList.length}, (_, i) => i);
  order.sort((a, b) => {
    const apos = il.list[extremes[a][0]].position;
    const bpos = il.list[extremes[b][0]].position;
    const d = apos[0] - bpos[0];
    if (d === 0.0) return apos[1] - bpos[1];
    return d;
  });

  const queue: number[] = [];

  const depth = Array.from<number>({length: ringList.length});
  const retPolys: GJ.Position2[][][] = [];
  const retIndices: number[] = Array.from<number>({length: ringList.length}).fill(-1);

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

      const p = upwardIntersection(segList[queueIdx], sweepPoint, positive[queueIdx]);
      if (p && p < distance) {
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

/**
 * Intersect of AreaFeature and AreaFeature.
 *
 * @param feature1
 * @param feature2
 * @param pointsPerCircle number of points to use in intersects with circles
 * @returns the intersect or `null` if no intersect
 */
export function intersectAreaAreaFeatures(
  feature1: AreaFeature,
  feature2: AreaFeature,
  pointsPerCircle: number = 16,
): AreaFeature | null {
  const fg1 = feature1.geometry;
  const fg2 = feature2.geometry;

  // early return if bboxes doesn't overlap
  if (!bboxInBBox(fg1.getBBox(), fg2.getBBox())) {
    return null;
  }

  if (
    AreaGeometryCollection.isGeometryCollection(fg1) ||
    AreaGeometryCollection.isGeometryCollection(fg2)
  ) {
    // We don't handle gcs
    return null;
  }

  const geoms: GJ.Position[][][] = [];

  if (Polygon.isObject(fg1)) {
    geoms.push(fg1.coordinates);
  } else if (MultiPolygon.isObject(fg1)) {
    geoms.push(...fg1.coordinates);
  } else {
    const cp = fg1.toPolygon({pointsPerCircle});
    if (Polygon.isObject(cp)) {
      geoms.push(cp.coordinates);
    } else {
      geoms.push(...cp.coordinates);
    }
  }

  if (Polygon.isObject(fg2)) {
    geoms.push(fg2.coordinates);
  } else if (MultiPolygon.isObject(fg2)) {
    geoms.push(...fg2.coordinates);
  } else {
    const cp = fg2.toPolygon({pointsPerCircle});
    if (Polygon.isObject(cp)) {
      geoms.push(cp.coordinates);
    } else {
      geoms.push(...cp.coordinates);
    }
  }

  const intersectOfGeoms = intersect(geoms);

  if (intersectOfGeoms.length === 1) {
    return AreaFeature.create(Polygon.create(intersectOfGeoms[0], true), {}, true);
  }

  return AreaFeature.create(MultiPolygon.create(intersectOfGeoms, true), {}, true);
}
