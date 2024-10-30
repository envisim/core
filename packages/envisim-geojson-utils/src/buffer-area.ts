import * as GJ from './types/geojson.js';
import type {BufferOptions} from './buffer.js';
import {AreaObject, Circle, MultiCircle, MultiPolygon, Polygon} from './geojson/index.js';
import {unionOfSegments} from './unionOfPolygons.js';
import {IntersectList} from './utils/class-intersects.js';
import {Segment, segmentsToPolygon} from './utils/class-segment.js';

// Assume not duplicate points
function moveSegments(polygon: GJ.Position[], options: Required<BufferOptions>): Segment[] {
  const segments: Segment[] = [];
  const params: [number, number][] = [];

  {
    let prev = new Segment(polygon[0], polygon[1]);
    prev.buffer(options.radius);
    segments.push(prev);
    params.push([0.0, 1.0]);

    for (let c = 2; c < polygon.length; c++) {
      const seg = new Segment(polygon[c - 1], polygon[c]);
      seg.buffer(options.radius);
      segments.push(seg);

      // add params
      const t = seg.parametricIntersect(prev);
      if (t) {
        params[c - 2][1] = t[1];
        params.push([t[0], 1.0]);
      } else {
        params.push([0.0, 1.0]);
      }

      prev = seg;
    }

    // fix turnaround params
    const t = segments[0].parametricIntersect(prev);
    if (t) {
      params[0][0] = t[0];
      params[params.length - 1][1] = t[1];
    }
  }

  const bindedSegments: Segment[] = [];

  const firstIndex = params.findIndex((t) => t[0] <= t[1]);

  if (firstIndex === -1) {
    return []; // No valid segment
  }

  let lastIndex = firstIndex;
  const t = parametricInterval(params[lastIndex]) as [number, number]; // Guaranteed by filter above

  let curr = segments[lastIndex];
  let lastPoint: GJ.Position2 = curr.position(t[1]);
  if (t[0] !== t[1]) {
    bindedSegments.push(new Segment(curr.position(t[0]), lastPoint));
  }

  for (let i = lastIndex + 1; i < segments.length; i++) {
    const t = parametricInterval(params[i]);
    // Paradoxical segment, starts after it ends
    if (t === null) {
      continue;
    }

    curr = segments[i];
    // If previous segment is adjacent to current, then we need to add a proper connetion, otherwise
    // we just draw a line
    // A connection is only needed if the two previous segments does not touch.
    if (lastIndex !== i - 1) {
      addStraightSegmentConnection(bindedSegments, lastPoint, curr.position(t[0]));
    } else if (params[i][0] < 0.0) {
      addSegmentConnection(bindedSegments, lastPoint, curr.position(t[0]), polygon[i], options);
    }

    lastPoint = curr.position(t[1]);
    // Add segment if needed, i.e. if there is a segment to add
    if (t[0] !== t[1]) {
      bindedSegments.push(new Segment(curr.position(t[0]), lastPoint));
    }
    lastIndex = i;
  }

  if (lastIndex !== segments.length - 1 || firstIndex !== 0) {
    addStraightSegmentConnection(bindedSegments, lastPoint, bindedSegments[0].p1);
  } else if (params[0][0] < 0.0) {
    addSegmentConnection(bindedSegments, lastPoint, bindedSegments[0].p1, polygon[0], options);
  }

  return bindedSegments;
}

function parametricInterval(params: [number, number]): [number, number] | null {
  if (params[1] < params[0]) {
    return null;
  }
  if (params[0] === 0.0 && params[1] === 1.0) {
    return params;
  }
  if (1.0 <= params[0]) {
    return [1.0, 1.0];
  } else if (params[1] <= 0.0) {
    return [0.0, 0.0];
  } else if (params[0] === params[1]) {
    return [params[0], params[0]];
  } else {
    return [Math.max(0.0, params[0]), Math.min(1.0, params[1])];
  }
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
  from: GJ.Position,
  {radius, steps}: Required<BufferOptions>,
) {
  if (steps <= 1) {
    return addStraightSegmentConnection(segmentList, start, end);
  }

  const r = Math.abs(radius);
  const delta0 = [start[0] - from[0], start[1] - from[1]];
  const delta1 = [end[0] - from[0], end[1] - from[1]];

  let theta0 = Math.acos(delta0[0] / r);
  if (delta0[1] < 0.0) theta0 = -theta0;
  const sweep = Math.atan2(
    delta1[1] * delta0[0] - delta1[0] * delta0[1],
    delta1[0] * delta0[0] + delta1[1] * delta0[1],
  );

  const nPoints = Math.ceil((Math.abs(sweep) / Math.PI) * steps * 2.0);
  const angleStep = sweep / nPoints;
  let angle = theta0;
  let lastPoint = start;

  for (let i = 1; i < nPoints; i++) {
    angle += angleStep;
    const newPoint: GJ.Position2 = [r * Math.cos(angle) + from[0], r * Math.sin(angle) + from[1]];
    segmentList.push(new Segment(lastPoint, newPoint));
    lastPoint = newPoint;
  }

  segmentList.push(new Segment(lastPoint, end));
}

function bufferSegmentRing(
  segments: Segment[],
  parentIsPositive: boolean,
): [Segment[][], number[]] {
  const il = new IntersectList(segments);
  const rings = il.unwindToSegmentRings();
  return il.reduceRingList(rings, parentIsPositive);
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
function buffering(
  polygons: GJ.Position[][][],
  options: Required<BufferOptions>,
): GJ.Position2[][][] {
  if (polygons.length === 1) {
    const polygon = polygons[0];

    const segRing = moveSegments(polygon[0], options);
    if (segRing.length < 2) {
      return [];
    }

    const [list, parents] = bufferSegmentRing(segRing, true);

    const outer = parents.indexOf(-1);
    const returningPolygon: GJ.Position2[][] = [segmentsToPolygon(list[outer])];
    for (let i = 0; i < list.length; i++) {
      if (parents[i] === -1) continue;

      returningPolygon.push(segmentsToPolygon(list[i]));
    }

    for (let i = 1; i < polygon.length; i++) {
      const segRing = moveSegments(polygon[i], options);
      if (segRing.length < 2) {
        continue;
      }

      const [list] = bufferSegmentRing(segRing, false);

      for (const segs of list) {
        returningPolygon.push(segmentsToPolygon(segs));
      }
    }

    return [returningPolygon];
  }

  const outerSegments: Segment[] = [];
  const outerBreaks: number[] = [];

  for (const polygon of polygons) {
    const segRing = moveSegments(polygon[0], options);
    if (segRing.length < 2) {
      continue;
    }

    const [list] = bufferSegmentRing(segRing, true);

    for (const segs of list) {
      outerSegments.push(...segs);
      outerBreaks.push(outerSegments.length);
    }

    for (let i = 1; i < polygon.length; i++) {
      const segRing = moveSegments(polygon[i], options);
      if (segRing.length < 2) {
        continue;
      }

      const [list] = bufferSegmentRing(segRing, false);

      for (const segs of list) {
        outerSegments.push(...segs);
        outerBreaks.push(outerSegments.length);
      }
    }

    // Positive buffer: No inner can "outgrow" outer, either inners are removed, or they are
    // disjunkt.
  }

  return unionOfSegments(outerSegments, outerBreaks);
}

// Only NEGATIVE
function shrinking(
  polygons: GJ.Position[][][],
  options: Required<BufferOptions>,
): GJ.Position2[][][] {
  const returningPolygons: GJ.Position2[][][] = [];

  // A single polygon can become multiple polygons by shrinking, so the outer and inners need to be
  // merged in the end. Assuming that the starting polygon(s) were non-overlapping, the outers are
  // disjunct.
  for (const polygon of polygons) {
    const segRing = moveSegments(polygon[0], options);
    if (segRing.length < 2) {
      continue;
    }

    const il = new IntersectList(segRing);
    const [list] = il.reduceRingList(il.unwindToSegmentRings(), true);

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
      const segRing = moveSegments(polygon[i], options);
      if (segRing.length < 2) {
        continue;
      }

      const il = new IntersectList(segRing);
      const [list] = il.reduceRingList(il.unwindToSegmentRings(), false);

      for (const segs of list) {
        segments.push(...segs);
        breaks.push(segments.length);
      }
    }

    {
      const il = new IntersectList(segments, breaks);
      const [list, parents] = il.reduceRingList(il.unwindToSegmentRings(), true);
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

export function bufferArea(area: AreaObject, options: Required<BufferOptions>): AreaObject | null {
  if (options.radius === 0.0) {
    switch (area.type) {
      case 'Polygon':
        return Polygon.create(area.coordinates, false);
      case 'MultiPolygon':
        return MultiPolygon.create(area.coordinates, false);
      case 'Point':
        return Circle.create(area.coordinates, area.radius, false);
      case 'MultiPoint':
        return MultiCircle.create(area.coordinates, area.radius, false);
    }
  }

  const geoms: GJ.Position[][][] = [];

  if (Polygon.isObject(area)) {
    geoms.push(area.coordinates);
  } else if (MultiPolygon.isObject(area)) {
    geoms.push(...area.coordinates);
  } else if (MultiCircle.isObject(area)) {
    if (options.radius <= 0.0) {
      if (area.radius + options.radius > 0.0) {
        return MultiCircle.create(area.coordinates, area.radius + options.radius, false);
      } else {
        return null;
      }
    } else {
      geoms.push(...area.toPolygon({pointsPerCircle: options.steps * 4}).coordinates);
    }
  } else {
    if (area.radius + options.radius > 0.0) {
      return Circle.create(area.coordinates, area.radius + options.radius, false);
    } else {
      return null;
    }
  }

  const newGeoms = options.radius < 0.0 ? shrinking(geoms, options) : buffering(geoms, options);

  if (newGeoms.length === 0) {
    return null;
  }

  if (newGeoms.length === 1) {
    return Polygon.create(newGeoms[0], true);
  }

  return MultiPolygon.create(newGeoms, true);
}
