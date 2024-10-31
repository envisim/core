import * as GJ from './types/geojson.js';
import {
  AreaCollection,
  AreaFeature,
  AreaGeometryCollection,
  Circle,
  MultiCircle,
  MultiPolygon,
  Polygon,
} from './geojson/index.js';
import {IntersectList} from './utils/class-intersects.js';
import {type Segment, ringToSegments, segmentsToPolygon} from './utils/class-segment.js';

export function unionOfSegments(segments: Segment[], breaks: number[]): GJ.Position2[][][] {
  const il = new IntersectList(segments, breaks);
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

export function unionOfRings(polygons: GJ.Position[][][]): GJ.Position2[][][] {
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
 * @param areaCollection The AreaCollection to compute the union from
 * @param pointsPerCircle number of points per circle
 * @returns the union of the polygons in the areaCollection
 */
export function unionOfPolygons(
  collection: AreaCollection,
  pointsPerCircle: number = 16,
): AreaCollection {
  const ppc = {pointsPerCircle};
  const geoms: GJ.Position[][][] = [];

  for (const feature of collection.features) {
    if (AreaGeometryCollection.isGeometryCollection(feature.geometry)) {
      feature.geometry.forEach((g) => {
        if (Circle.isObject(g) || MultiCircle.isObject(g)) {
          const cp = g.toPolygon(ppc);
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
    } else {
      const cp = feature.geometry.toPolygon(ppc);
      if (Polygon.isObject(cp)) {
        geoms.push(cp.coordinates);
      } else {
        geoms.push(...cp.coordinates);
      }
    }
  }

  const unionOfGeoms = unionOfRings(geoms);

  if (unionOfGeoms.length === 1) {
    return AreaCollection.create(
      [AreaFeature.create(Polygon.create(unionOfGeoms[0], true), {}, true)],
      true,
    );
  }

  return AreaCollection.create(
    [AreaFeature.create(MultiPolygon.create(unionOfGeoms, true), {}, true)],
    true,
  );
}
