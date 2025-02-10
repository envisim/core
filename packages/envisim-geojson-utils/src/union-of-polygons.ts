import type * as GJ from './types/geojson.js';
import {type AreaObject, FeatureCollection, MultiPolygon, Polygon} from './geojson/index.js';
import {type CirclesToPolygonsOptions} from './utils/circles-to-polygons.js';
import {IntersectList} from './utils/class-intersects.js';
import {type Segment, ringToSegments, segmentsToPolygon} from './utils/class-segment.js';

export function unionOfSegments(segments: Segment[], breaks: number[]): GJ.Position2[][][] {
  const il = new IntersectList(segments, breaks);
  const [list, parents] = il.intersectionRingsToOrderedSegmentRings(
    il.traceIntersectionRings(),
    true,
  );

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

/**
 * @param collection The AreaCollection to compute the union from
 * @param pointsPerCircle number of points per circle
 * @returns the union of the polygons in the areaCollection
 */
export function unionOfCollection(
  collection: FeatureCollection<AreaObject>,
  options: CirclesToPolygonsOptions = {},
): FeatureCollection<AreaObject, string> {
  const ppc = {pointsPerCircle: options.pointsPerCircle ?? 16};
  const geoms: GJ.Position[][][] = [];

  for (const feature of collection.features) {
    if (Polygon.isObject(feature.geometry) || MultiPolygon.isObject(feature.geometry)) {
      geoms.push(...feature.geometry.getCoordinateArray());
    } else {
      const cp = feature.geometry.toPolygon(ppc);

      if (cp === null) continue;

      geoms.push(...cp.getCoordinateArray());
    }
  }

  const unionOfGeoms = unionOfPolygons(geoms);

  const fc = FeatureCollection.newArea();

  if (unionOfGeoms.length === 1) {
    fc.addGeometry(Polygon.create(unionOfGeoms[0]), {});
  } else if (unionOfGeoms.length > 1) {
    fc.addGeometry(MultiPolygon.create(unionOfGeoms), {});
  }

  return fc;
}
