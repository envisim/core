import polygonClipping from 'polygon-clipping';

import type * as GJ from './geojson/types.js';
import {bboxInBBox} from './bbox.js';
import {
  AreaObject,
  MultiPolygon,
  PointCircle,
  Polygon,
} from './geojson/areas/AreaObjects.js';
import {AreaFeature} from './geojson/areas/ClassAreaFeature.js';
import {AreaGeometryCollection, distance} from './index.js';

/**
 * @internal
 */
function intersectPolygonPolygon(
  p1: Polygon | MultiPolygon,
  p2: Polygon | MultiPolygon,
): Polygon | MultiPolygon | null {
  const geoms: polygonClipping.Geom[] = [
    p1.coordinates as polygonClipping.Geom,
    p2.coordinates as polygonClipping.Geom,
  ];

  const intersection = polygonClipping.intersection(
    geoms[0],
    ...geoms.slice(1),
  );

  if (intersection.length === 0) return null;

  if (intersection.length === 1)
    return Polygon.create(intersection[0] as GJ.Position[][]);

  return MultiPolygon.create(intersection as GJ.Position[][][]);
}

/**
 * @internal
 */
function intersectPointCirclePointCircle(
  p1: PointCircle,
  p2: PointCircle,
  pointsPerCircle: number = 16,
): Polygon | PointCircle | null {
  const dist = distance(p1.coordinates, p2.coordinates);

  if (dist < p1.radius + p2.radius) {
    // Intersection

    // Check if circle 1 is fully within circle 2
    if (dist + p1.radius < p2.radius)
      return PointCircle.create([...p1.coordinates], p1.radius);

    // Check if circle 2 is fully within circle 1
    if (dist + p2.radius < p1.radius)
      return PointCircle.create([...p2.coordinates], p2.radius);

    // Need to intersect polygons
    const intersect = intersectPolygonPolygon(
      p1.toPolygon({pointsPerCircle}),
      p2.toPolygon({pointsPerCircle}),
    );

    // Return the intersect if it is, as expected, a Polygon (not MultyPolygon)
    if (Polygon.isObject(intersect)) return intersect;
  }

  // No intersect
  return null;
}

/**
 * @internal
 */
function intersectPointCirclePolygon(
  p1: PointCircle,
  p2: Polygon | MultiPolygon,
  pointsPerCircle: number = 16,
): MultiPolygon | Polygon | PointCircle | null {
  const dist = p2.distanceToPosition(p1.coordinates);

  if (dist <= -p1.radius) {
    // Circle fully within polygon
    return PointCircle.create([...p1.coordinates], p1.radius);
  }

  if (dist < p1.radius) {
    // Intersection, convert to polygon
    const intersect = intersectPolygonPolygon(
      p1.toPolygon({pointsPerCircle}),
      p2,
    );
    return intersect;
  }

  // No  intersect
  return null;
}

/**
 * @internal
 */
function intersectPolygonAF(
  geoms: AreaObject[],
  g1: Polygon | MultiPolygon,
  feature: AreaFeature,
  pointsPerCircle: number = 16,
): void {
  let isc;

  feature.geomEach((g2: AreaObject) => {
    if (!bboxInBBox(g1.getBBox(), g2.getBBox())) return;

    switch (g2.type) {
      case 'Polygon':
      case 'MultiPolygon':
        isc = intersectPolygonPolygon(g1, g2);
        if (isc) geoms.push(isc);
        return;

      case 'Point':
        isc = intersectPointCirclePolygon(g2, g1, pointsPerCircle);
        if (isc) geoms.push(isc);
        return;

      case 'MultiPoint':
        g2.coordinates.forEach((coords) => {
          const circle = PointCircle.create(coords, g2.radius);
          isc = intersectPointCirclePolygon(circle, g1, pointsPerCircle);
          if (isc) geoms.push(isc);
          return;
        });
        return;
    }
  });
}

/**
 * @internal
 */
function intersectPointCircleAF(
  geoms: AreaObject[],
  circles1: PointCircle[],
  circles1BBox: GJ.BBox,
  feature: AreaFeature,
  pointsPerCircle: number = 16,
): void {
  let isc;

  feature.geomEach((g2: AreaObject) => {
    if (!bboxInBBox(circles1BBox, g2.getBBox())) return;

    switch (g2.type) {
      case 'Polygon':
      case 'MultiPolygon':
        circles1.forEach((circle: PointCircle) => {
          isc = intersectPointCirclePolygon(circle, g2, pointsPerCircle);
          if (isc) geoms.push(isc);
        });
        return;

      case 'Point':
        circles1.forEach((circle: PointCircle) => {
          isc = intersectPointCirclePointCircle(circle, g2, pointsPerCircle);
          if (isc) geoms.push(isc);
        });
        return;

      case 'MultiPoint':
        const circles2 = g2.coordinates.map((coords) =>
          PointCircle.create(coords, g2.radius),
        );

        circles1.forEach((circle1: PointCircle) => {
          circles2.forEach((circle2: PointCircle) => {
            isc = intersectPointCirclePointCircle(
              circle1,
              circle2,
              pointsPerCircle,
            );
            if (isc) geoms.push(isc);
          });
        });
        return;
    }
  });
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
  // early return if bboxes doesn't overlap
  if (!bboxInBBox(feature1.geometry.getBBox(), feature2.geometry.getBBox()))
    return null;

  // Need to work with geometries to keep
  // PointCircles/MultiPointCircles if possible
  const geoms: AreaObject[] = [];

  feature1.geomEach((g1: AreaObject) => {
    if (g1.type === 'Polygon' || g1.type === 'MultiPolygon') {
      intersectPolygonAF(geoms, g1, feature2, pointsPerCircle);
      return;
    }

    const circles: PointCircle[] =
      g1.type === 'Point'
        ? [g1]
        : g1.coordinates.map((coords: GJ.Position) =>
            PointCircle.create(coords, g1.radius),
          );

    intersectPointCircleAF(
      geoms,
      circles,
      g1.getBBox(),
      feature2,
      pointsPerCircle,
    );
  });

  if (geoms.length === 0) return null;

  if (geoms.length === 1) return AreaFeature.create(geoms[0], {});

  // TODO?: Might be possible to check if all geometries are of the same type,
  // e.g. all PointCircle and make MultiPointCircle instead of GeometryCollection
  // or MultiPolygon instead of GeometryCollection of Polygons/MultiPolygons
  // etc... For now keep as GeometryCollection.
  return AreaFeature.create(AreaGeometryCollection.create(geoms), {});
}
