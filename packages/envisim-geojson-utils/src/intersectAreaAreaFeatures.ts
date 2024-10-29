import type * as GJ from './types/geojson.js';
import {AreaFeature, AreaGeometryCollection, MultiPolygon, Polygon} from './geojson/index.js';
import {bboxInBBox} from './utils/bbox.js';
import {intersectPolygons} from './utils/intersect-polygons.js';

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

  const intersectOfGeoms = intersectPolygons(geoms);

  if (intersectOfGeoms.length === 0) {
    return null;
  }

  if (intersectOfGeoms.length === 1) {
    return AreaFeature.create(Polygon.create(intersectOfGeoms[0], true), {}, true);
  }

  return AreaFeature.create(MultiPolygon.create(intersectOfGeoms, true), {}, true);
}
