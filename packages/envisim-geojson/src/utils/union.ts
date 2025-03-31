import {
  IntersectList,
  type Segment,
  ringToSegments,
  segmentsToPolygon,
} from "@envisim/geojson-utils";
import type * as GJ from "@envisim/geojson-utils/geojson";

export function unionOfSegments(segments: Segment[], breaks: number[]): GJ.Position2[][][] {
  const il = new IntersectList(segments, breaks);
  const [list, parents] = il.intersectionRingsToOrderedSegmentRings(
    il.traceIntersectionRings(),
    true,
  );

  const parentIndices: number[] = Array.from<number>({ length: list.length }).fill(-1);
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

export function unionOfPolygons(polygons: GJ.Position[][][]): GJ.Position2[][][] {
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

  return unionOfSegments(outerSegments, outerBreaks);
}
