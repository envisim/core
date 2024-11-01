import * as GJ from '../types/geojson.js';
import {MultiPolygon, Polygon} from '../geojson/index.js';
import {unionOfSegments} from '../union-of-polygons.js';
import {Geodesic} from '../utils/Geodesic.js';
import {EARTH_BOUNDARIES} from '../utils/antimeridian.js';
import {IntersectList} from '../utils/class-intersects.js';
import {Segment, segmentsToPolygon} from '../utils/class-segment.js';
import {intersectPolygons} from '../utils/intersect-polygons.js';
import type {BufferOptions} from './types.js';

// Assume not duplicate points
function bufferedSegmentsFromRing(
  ring: GJ.Position[],
  options: Required<BufferOptions>,
): Segment[] {
  const segments: Segment[] = [];
  const params: [number | null, number | null][] = [];

  {
    let prev = new Segment(ring[0], ring[1]);
    prev.buffer(options.distance);
    segments.push(prev);
    params.push([null, null]);

    for (let c = 2; c < ring.length; c++) {
      const seg = new Segment(ring[c - 1], ring[c]);
      seg.buffer(options.distance);
      segments.push(seg);

      // add params
      const t = seg.parametricIntersect(prev);
      if (t !== null) {
        params[c - 2][1] = t[1];
        params.push([t[0], null]);
      } else {
        params.push([null, null]);
      }

      prev = seg;
    }

    // fix turnaround params
    const t = segments[0].parametricIntersect(prev);
    if (t !== null) {
      params[0][0] = t[0];
      params[params.length - 1][1] = t[1];
    }
  }

  const connectedSegments: Segment[] = [];

  const firstIndex = params.findIndex((t) => t[0] === null || t[1] === null || t[0] <= t[1]);

  if (firstIndex === -1) {
    return []; // No valid segment
  }

  let lastIndex = firstIndex;
  const t = normalizeParametricInterval(params[lastIndex]) as [number, number]; // Guaranteed by filter above

  let curr = segments[lastIndex];
  let lastPoint: GJ.Position2 = curr.position(t[1]);
  if (t[0] !== t[1]) {
    connectedSegments.push(new Segment(curr.position(t[0]), lastPoint));
  }

  for (let i = lastIndex + 1; i < segments.length; i++) {
    const par = params[i];
    const t = normalizeParametricInterval(par);
    // Paradoxical segment, starts after it ends
    if (t === null) {
      continue;
    }

    curr = segments[i];
    // If previous segment is adjacent to current, then we need to add a proper connetion, otherwise
    // we just draw a line
    // A connection is only needed if the two previous segments does not touch.
    if (lastIndex !== i - 1) {
      addStraightSegmentConnection(connectedSegments, lastPoint, curr.position(t[0]));
    } else if (par[0] === null || par[0] < 0.0) {
      addSegmentConnection(connectedSegments, lastPoint, curr.position(t[0]), ring[i], options);
    }

    lastPoint = curr.position(t[1]);
    // Add segment if needed, i.e. if there is a segment to add
    if (t[0] !== t[1]) {
      connectedSegments.push(new Segment(curr.position(t[0]), lastPoint));
    }
    lastIndex = i;
  }

  const par0 = params[0];

  if (lastIndex !== segments.length - 1 || firstIndex !== 0) {
    addStraightSegmentConnection(connectedSegments, lastPoint, connectedSegments[0].p1);
  } else if (par0[0] === null || par0[0] < 0.0) {
    addSegmentConnection(connectedSegments, lastPoint, connectedSegments[0].p1, ring[0], options);
  }

  return connectedSegments;
}

function normalizeParametricInterval(
  params: [number | null, number | null],
): [number, number] | null {
  const ret: [number, number] = [params[0] ?? 0.0, params[1] ?? 1.0];

  if (ret[1] < ret[0]) {
    return null;
  }

  if ((ret[0] === 0.0 && ret[1] === 1.0) || ret[0] === ret[1]) {
    return ret;
  }

  if (1.0 <= ret[0]) {
    ret[0] = 1.0;
  } else if (ret[1] <= 0.0) {
    ret[1] = 0.0;
  } else {
    ret[0] = Math.max(0.0, ret[0]);
    ret[1] = Math.min(1.0, ret[1]);
  }

  return ret;
}

function addStraightSegmentConnection(
  segmentList: Segment[],
  start: GJ.Position,
  end: GJ.Position,
) {
  segmentList.push(new Segment(start, end));
}

/**
 * modifies segmentList in-place
 */
function addSegmentConnection(
  segmentList: Segment[],
  start: GJ.Position,
  end: GJ.Position,
  origin: GJ.Position,
  {distance, steps}: Required<BufferOptions>,
) {
  if (steps <= 1) {
    return addStraightSegmentConnection(segmentList, start, end);
  }

  let startAngle = Geodesic.forwardAzimuth(origin, start);
  if (startAngle < 0.0) startAngle += 360.0;
  let endAngle = Geodesic.forwardAzimuth(origin, end);
  if (endAngle < 0.0) endAngle += 360.0;

  let theta = endAngle - startAngle;
  if (distance >= 0.0) {
    if (theta > 0.0) {
      theta -= 360.0;
    }
  } else {
    if (theta < 0.0) {
      theta += 360.0;
    }
  }

  const numPoints = Math.ceil(Math.abs(theta) / 90.0) * steps;
  const delta = theta / numPoints;
  const dist = Math.abs(distance);

  let angle = startAngle + delta;
  let prev = start;

  for (let i = 1; i < numPoints; i++) {
    const point = Geodesic.destinationUnrolled(origin, dist, angle);
    segmentList.push(new Segment(prev, point));
    prev = point;
    angle += delta;
  }

  segmentList.push(new Segment(prev, end));
}

function groupSegmentsByRings(
  segments: Segment[],
  parentIsPositive: boolean,
): [Segment[][], number[]] {
  const il = new IntersectList(segments);
  const rings = il.traceIntersectionRings();
  return il.intersectionRingsToOrderedSegmentRings(rings, parentIsPositive);
}

function separatePolygonsOverAntimeridian(polygons: GJ.Position2[][][]): GJ.Position2[][][] {
  const returningPolys: GJ.Position2[][][] = [];

  for (let i = polygons.length; i-- > 0; ) {
    const range = polygons[i][0].reduce(
      (p, c) => {
        p[0] = Math.min(p[0], c[0]);
        p[1] = Math.max(p[1], c[0]);
        return p;
      },
      [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
    );

    if (range[0] >= -180.0 && range[1] <= 180.0) {
      return polygons;
    }

    if (range[0] < -180.0) {
      // Polygons can be drawn over -180, but cannot exist soley there, as any crossed polygon would
      // have been moved +360 before operations.
      // range[0] < -180 therefore implies range[1] > -180
      const l = intersectPolygons([polygons[i], EARTH_BOUNDARIES.left]).map((r) =>
        r.map((p) => p.map<[number, number]>((c) => [c[0] + 360.0, c[1]])),
      );

      if (l.length > 0) {
        returningPolys.push(...l);
      }

      const n = intersectPolygons([polygons[i], EARTH_BOUNDARIES.normal]);

      if (n.length > 0) {
        returningPolys.push(...n);
      }
    } else if (range[0] < 180.0 && range[1] > 180.0) {
      const r = intersectPolygons([polygons[i], EARTH_BOUNDARIES.right]).map((r) =>
        r.map((p) => p.map<[number, number]>((c) => [c[0] - 360.0, c[1]])),
      );

      if (r.length > 0) {
        returningPolys.push(...r);
      }

      const n = intersectPolygons([polygons[i], EARTH_BOUNDARIES.normal]);

      if (n.length > 0) {
        returningPolys.push(...n);
      }
    } else {
      // Something can be alone on the rightmost earth ... no need to intersect

      const r = polygons[i].map((p) => p.map<[number, number]>((c) => [c[0] - 360.0, c[1]]));
      returningPolys.push(r);
    }
  }

  return returningPolys;
}

// If the buffer is negative, we need to start to "merge" each separate polygon group
// (i.e. outer+inner), in order to ensure that the group is a proper polygon, i.e. doesn't have
// any hole outside of the boundary.

// If we only have a single polygon, without hole, or a single polygon with a hole and a positive
// buffer, we can reconstruct the parts directly, without dissecting the segments again.

// After all buffered polygons have been merged and reassembled, we need to take care during the
// process of creating the hiearchy; a positive ring containing a positive ring containing a
// negative ring, the two children should both be disregarded, as the positive > positive should
// be merged by removal. Since the negative ring is the child of the removed positive ring, the
// negative ring is also removed. However, if the removal of the inner positive ring is done
// prematurely, we risk keeping a negative ring that should not have been included.
// Positive ONLY
function expand(polygons: GJ.Position[][][], options: Required<BufferOptions>): GJ.Position2[][][] {
  if (polygons.length === 1) {
    const polygon = polygons[0];

    const segRing = bufferedSegmentsFromRing(polygon[0], options);
    if (segRing.length < 2) {
      return [];
    }

    const [list, parents] = groupSegmentsByRings(segRing, true);

    const outer = parents.indexOf(-1);
    const returningPolygon: GJ.Position2[][] = [segmentsToPolygon(list[outer])];
    for (let i = 0; i < list.length; i++) {
      if (parents[i] === -1) continue;

      returningPolygon.push(segmentsToPolygon(list[i]));
    }

    for (let i = 1; i < polygon.length; i++) {
      const segRing = bufferedSegmentsFromRing(polygon[i], options);
      if (segRing.length < 2) {
        continue;
      }

      const [list] = groupSegmentsByRings(segRing, false);

      for (const segs of list) {
        returningPolygon.push(segmentsToPolygon(segs));
      }
    }

    return separatePolygonsOverAntimeridian([returningPolygon]);
  }

  const outerSegments: Segment[] = [];
  const outerBreaks: number[] = [];

  for (const polygon of polygons) {
    const segRing = bufferedSegmentsFromRing(polygon[0], options);
    if (segRing.length < 2) {
      continue;
    }

    const [list] = groupSegmentsByRings(segRing, true);

    for (const segs of list) {
      outerSegments.push(...segs);
      outerBreaks.push(outerSegments.length);
    }

    for (let i = 1; i < polygon.length; i++) {
      const segRing = bufferedSegmentsFromRing(polygon[i], options);
      if (segRing.length < 2) {
        continue;
      }

      const [list] = groupSegmentsByRings(segRing, false);

      for (const segs of list) {
        outerSegments.push(...segs);
        outerBreaks.push(outerSegments.length);
      }
    }

    // Positive buffer: No inner can "outgrow" outer, either inners are removed, or they are
    // disjunkt.
  }

  const unionRings = unionOfSegments(outerSegments, outerBreaks);
  return separatePolygonsOverAntimeridian(unionRings);
}

// Only NEGATIVE
function shrink(polygons: GJ.Position[][][], options: Required<BufferOptions>): GJ.Position2[][][] {
  const returningPolygons: GJ.Position2[][][] = [];

  // A single polygon can become multiple polygons by shrinking, so the outer and inners need to be
  // merged in the end. Assuming that the starting polygon(s) were non-overlapping, the outers are
  // disjunct.
  for (const polygon of polygons) {
    const segRing = bufferedSegmentsFromRing(polygon[0], options);
    if (segRing.length < 2) {
      continue;
    }

    const il = new IntersectList(segRing);
    const [list] = il.intersectionRingsToOrderedSegmentRings(il.traceIntersectionRings(), true);

    // The outer cannot become inner in any way, however multiple outers may be returned
    if (polygon.length === 1) {
      for (const segs of list) {
        returningPolygons.push([segmentsToPolygon(segs)]);
      }

      continue;
    }

    const segments: Segment[] = [];
    const breaks: number[] = [];
    for (const segs of list) {
      segments.push(...segs);
      breaks.push(segments.length);
    }

    for (let i = 1; i < polygon.length; i++) {
      const segRing = bufferedSegmentsFromRing(polygon[i], options);
      if (segRing.length < 2) {
        continue;
      }

      const il = new IntersectList(segRing);
      const [list] = il.intersectionRingsToOrderedSegmentRings(il.traceIntersectionRings(), false);

      for (const segs of list) {
        segments.push(...segs);
        breaks.push(segments.length);
      }
    }

    {
      const il = new IntersectList(segments, breaks);
      const [list, parents] = il.intersectionRingsToOrderedSegmentRings(
        il.traceIntersectionRings(),
        true,
      );
      const parentIndices: number[] = Array.from<number>({length: list.length}).fill(-1);

      for (let i = 0; i < list.length; i++) {
        if (parents[i] === -1) {
          returningPolygons.push([segmentsToPolygon(list[i])]);
          parentIndices[i] = returningPolygons.length - 1;
        } else {
          // Since kids always comes after their parent in the returning list, we don't need to loop twice
          returningPolygons[parentIndices[parents[i]]].push(segmentsToPolygon(list[i]));
        }
      }
    }
  }

  return returningPolygons;
}

/**
 * Buffering of multipolygons
 */
export function bufferPolygons(
  polygons: GJ.Position[][][],
  options: Required<BufferOptions>,
): Polygon | MultiPolygon | null {
  const transformedPolygons =
    options.distance < 0.0 ? shrink(polygons, options) : expand(polygons, options);
  if (transformedPolygons.length === 0) {
    return null;
  }

  if (transformedPolygons.length === 1) {
    return Polygon.create(transformedPolygons[0], true);
  }

  return MultiPolygon.create(transformedPolygons, true);
}
