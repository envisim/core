import * as GJ from './types/geojson.js';
import {
  AreaCollection,
  AreaFeature,
  AreaGeometryCollection,
  Circle,
  MultiCircle,
  MultiPolygon,
  Polygon,
} from './index.js';
import {IntersectList} from './utils/class-intersects.js';
import {Segment} from './utils/class-segment.js';

interface BufferOptions {
  /**
   * The radius/distance to buffer in meters
   */
  radius?: number;
  /**
   * The number of steps in the buffer.
   */
  steps?: number;
}

// Assume not duplicate points
function moveSegments(
  polygon: GJ.Position[],
  {radius: buffer, steps: bindings}: Required<BufferOptions>,
): Segment[] {
  const segments: Segment[] = [];
  const params: [number, number][] = [];

  {
    let prev = new Segment(polygon[0], polygon[1]);
    prev.buffer(buffer);
    segments.push(prev);
    params.push([0.0, 1.0]);

    for (let c = 2; c < polygon.length; c++) {
      // const seg = new Segment(prev.p2, polygon[c]);
      const seg = new Segment(polygon[c - 1], polygon[c]);
      seg.buffer(buffer);
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

    const curr = segments[i];
    // If previous segment is adjacent to current, then we need to add a proper connetion, otherwise
    // we just draw a line
    // A connection is only needed if the two previous segments does not touch.
    if (lastIndex !== i - 1) {
      addSegmentConnection(bindedSegments, lastPoint, curr.position(t[0]), 1);
    } else if (params[i][0] < 0.0) {
      addSegmentConnection(bindedSegments, lastPoint, curr.position(t[0]), bindings);
    }

    lastPoint = curr.position(t[1]);
    // Add segment if needed, i.e. if there is a segment to add
    if (t[0] !== t[1]) {
      bindedSegments.push(new Segment(curr.position(t[0]), lastPoint));
    }
    lastIndex = i;
  }

  if (lastIndex !== segments.length - 1 || firstIndex !== 0) {
    addSegmentConnection(bindedSegments, lastPoint, bindedSegments[0].p1, 1);
  } else if (params[0][0] < 0.0) {
    addSegmentConnection(bindedSegments, lastPoint, bindedSegments[0].p1, bindings);
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

/**
 * modifies segmentList in-place
 */
function addSegmentConnection(
  segmentList: Segment[],
  start: GJ.Position2,
  end: GJ.Position2,
  bindings: number = 1,
) {
  if (bindings <= 1) {
    segmentList.push(new Segment(start, end));
    return;
  }

  // Handle making a circle...
  segmentList.push(new Segment(start, end));
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
export function buffering(
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

  const il = new IntersectList(outerSegments, outerBreaks);
  const [list, parents] = il.reduceRingList(il.unwindToSegmentRings(), true);

  const parentIndices: number[] = Array.from<number>({length: list.length}).fill(-1);
  const returningPolygons: GJ.Position2[][][] = [];

  for (let i = 0; i < list.length; i++) {
    if (parents[i] === -1) {
      returningPolygons.push([segmentsToPolygon(list[i])]);
      parentIndices[i] = returningPolygons.length - 1;
    } else {
      // Since kids always comes after their parent in the returning list, we don't need to loop twice
      returningPolygons[parentIndices[parents[i]]].push(segmentsToPolygon(list[i]));
    }
  }

  return returningPolygons;
}

// Only NEGATIVE
export function shrinking(
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

function segmentsToPolygon(segments: Segment[]): GJ.Position2[] {
  const poly: GJ.Position2[] = segments.map((seg) => seg.start());
  poly.push(segments[0].start());
  return poly;
}

export function buffer(gj: AreaCollection, options: BufferOptions): AreaCollection {
  const opts: Required<BufferOptions> = {radius: options.radius ?? 0.0, steps: options.steps ?? 1};
  const collection = AreaCollection.create([]);
  // const feats: AreaFeature[] = [];

  for (const feature of gj.features) {
    const geoms: GJ.Position[][][] = [];

    if (AreaGeometryCollection.isGeometryCollection(feature.geometry)) {
      feature.geometry.forEach((g) => {
        if (Circle.isObject(g) || MultiCircle.isObject(g)) {
          const cp = g.toPolygon();
          if (Polygon.isObject(cp)) {
            geoms.push(cp.coordinates);
          } else {
            geoms.push(...cp.coordinates);
          }
        } else if (Polygon.isObject(g)) {
          geoms.push(g.coordinates);
        } else {
          geoms.push(...g.coordinates);
        }
      });
    } else if (Polygon.isObject(feature.geometry)) {
      geoms.push(feature.geometry.coordinates);
    } else if (MultiPolygon.isObject(feature.geometry)) {
      geoms.push(...feature.geometry.coordinates);
    } else if (MultiCircle.isObject(feature.geometry)) {
      if (opts.radius <= 0.0) {
        if (feature.geometry.radius + opts.radius > 0.0) {
          const af = new AreaFeature(feature, false);
          (af.geometry as MultiCircle).radius += opts.radius;
          collection.addFeature(af);
          continue;
        }
      } else {
        geoms.push(...feature.geometry.toPolygon().coordinates);
      }
    } else {
      if (feature.geometry.radius + opts.radius > 0.0) {
        const af = new AreaFeature(feature, false);
        (af.geometry as Circle).radius += opts.radius;
        collection.addFeature(af);
        continue;
      }
    }

    const newGeoms = opts.radius < 0.0 ? shrinking(geoms, opts) : buffering(geoms, opts);
    const af =
      newGeoms.length === 1
        ? AreaFeature.create({type: 'Polygon', coordinates: newGeoms[0]}, {}, true)
        : AreaFeature.create({type: 'MultiPolygon', coordinates: newGeoms}, {}, true);

    af.replaceProperties(feature.properties, false);
    collection.addFeature(af);
  }

  return collection;
}
