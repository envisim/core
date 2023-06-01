import polygonClipping from 'polygon-clipping';

import type * as GJ from './geojson/types.js';
import {bboxInBBox} from './bbox.js';
import {AreaObject} from './geojson/areas/AreaObjects.js';
import {AreaFeature} from './geojson/areas/ClassAreaFeature.js';
import {MultiPolygon} from './geojson/areas/ClassMultiPolygon.js';
import {PointCircle} from './geojson/areas/ClassPointCircle.js';
import {Polygon} from './geojson/areas/ClassPolygon.js';
import {AreaGeometryCollection, distance} from './index.js';

const intersectPolygonPolygon = (
  p1: Polygon | MultiPolygon,
  p2: Polygon | MultiPolygon,
): Polygon | MultiPolygon | null => {
  const geoms: polygonClipping.Geom[] = [
    p1.coordinates as polygonClipping.Geom,
    p2.coordinates as polygonClipping.Geom,
  ];
  const intersection = polygonClipping.intersection(
    geoms[0],
    ...geoms.slice(1),
  );
  if (intersection.length === 0) {
    return null;
  }
  if (intersection.length === 1) {
    return Polygon.create(intersection[0] as GJ.Position[][]);
  }
  return MultiPolygon.create(intersection as GJ.Position[][][]);
};

const intersectPointCirclePointCircle = (
  p1: PointCircle,
  p2: PointCircle,
  pointsPerCircle = 16,
): Polygon | PointCircle | null => {
  const dist = distance(p1.coordinates, p2.coordinates);
  const minRadius = Math.min(p1.radius, p2.radius);
  if (dist < p1.radius + p2.radius) {
    // Intersection
    if (dist + p1.radius < p2.radius) {
      // Circle 1 is fully within circle 2
      return PointCircle.create([...p1.coordinates], p1.radius);
    }

    if (dist + p2.radius < p1.radius) {
      // Circle 2 is fully within circle 1
      return PointCircle.create([...p2.coordinates], p2.radius);
    }

    // Need to intersect polygons
    const intersect = intersectPolygonPolygon(
      p1.toPolygon({pointsPerCircle}),
      p2.toPolygon({pointsPerCircle}),
    );
    // Intersect must be Polygon not MultiPolygon
    if (Polygon.isObject(intersect)) {
      return intersect;
    }
  }
  // No intersect
  return null;
};

const intersectPointCirclePolygon = (
  p1: PointCircle,
  p2: Polygon | MultiPolygon,
  pointsPerCircle = 16,
): MultiPolygon | Polygon | PointCircle | null => {
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
};

/**
 * Intersect of AreaFeature and AreaFeature.
 *
 * @param areaFeature1 - An AreaFeature.
 * @param areaFeature2 - An AreaFeature.
 * @param pointsPerCircle - Optional number of points to use in intersects with circles, default 16.
 * @returns - null if no intersect and AreaFeature if intersect.
 */
export const intersectAreaAreaFeatures = (
  areaFeature1: GJ.AreaFeature,
  areaFeature2: GJ.AreaFeature,
  pointsPerCircle = 16,
): AreaFeature | null => {
  const af1 = AreaFeature.isFeature(areaFeature1)
    ? areaFeature1
    : new AreaFeature(areaFeature1);
  const af2 = AreaFeature.isFeature(areaFeature2)
    ? areaFeature2
    : new AreaFeature(areaFeature2);

  const box1 = af1.geometry.getBBox();
  const box2 = af2.geometry.getBBox();

  if (!bboxInBBox(box1, box2)) {
    return null;
  }
  // Need to work with geometries to keep
  // PointCircles/MultiPointCircles if possible

  const geoms: AreaObject[] = [];

  af1.geomEach((g1: AreaObject) => {
    af2.geomEach((g2: AreaObject) => {
      // push possible intersect to array of geoms
      const box1 = g1.getBBox();
      const box2 = g2.getBBox();
      let intersect;

      if (bboxInBBox(box1, box2)) {
        // We may have intersect
        switch (g1.type) {
          case 'MultiPolygon':
          case 'Polygon':
            if (g2.type === 'Polygon' || g2.type === 'MultiPolygon') {
              intersect = intersectPolygonPolygon(g1, g2);
              if (intersect) {
                geoms.push(intersect);
              }
              break;
            }
            if (g2.type === 'Point') {
              intersect = intersectPointCirclePolygon(g2, g1, pointsPerCircle);
              if (intersect) {
                geoms.push(intersect);
              }
              break;
            }
            if (g2.type === 'MultiPoint') {
              g2.coordinates.forEach((coords) => {
                const circle = PointCircle.create(coords, g2.radius);
                intersect = intersectPointCirclePolygon(
                  circle,
                  g1,
                  pointsPerCircle,
                );
                if (intersect) {
                  geoms.push(intersect);
                }
              });
              break;
            }
            break;
          case 'Point':
            if (g2.type === 'Polygon' || g2.type === 'MultiPolygon') {
              intersect = intersectPointCirclePolygon(g1, g2, pointsPerCircle);
              if (intersect) {
                geoms.push(intersect);
              }
              break;
            }
            if (g2.type === 'Point') {
              intersect = intersectPointCirclePointCircle(
                g1,
                g2,
                pointsPerCircle,
              );
              if (intersect) {
                geoms.push(intersect);
              }
              break;
            }
            if (g2.type === 'MultiPoint') {
              g2.coordinates.forEach((coords) => {
                const circle = PointCircle.create(coords, g2.radius);
                intersect = intersectPointCirclePointCircle(
                  circle,
                  g1,
                  pointsPerCircle,
                );
                if (intersect) {
                  geoms.push(intersect);
                }
              });
              break;
            }
            break;
          case 'MultiPoint':
            if (g2.type === 'Polygon' || g2.type === 'MultiPolygon') {
              g1.coordinates.forEach((coords) => {
                const circle = PointCircle.create(coords, g1.radius);
                intersect = intersectPointCirclePolygon(
                  circle,
                  g2,
                  pointsPerCircle,
                );
                if (intersect) {
                  geoms.push(intersect);
                }
              });
              break;
            }
            if (g2.type === 'Point') {
              g1.coordinates.forEach((coords) => {
                const circle = PointCircle.create(coords, g1.radius);
                intersect = intersectPointCirclePointCircle(
                  circle,
                  g2,
                  pointsPerCircle,
                );
                if (intersect) {
                  geoms.push(intersect);
                }
              });
              break;
            }
            if (g2.type === 'MultiPoint') {
              g1.coordinates.forEach((c1) => {
                g2.coordinates.forEach((c2) => {
                  const circle1 = PointCircle.create(c1, g1.radius);
                  const circle2 = PointCircle.create(c2, g2.radius);
                  intersect = intersectPointCirclePointCircle(
                    circle1,
                    circle2,
                    pointsPerCircle,
                  );
                  if (intersect) {
                    geoms.push(intersect);
                  }
                });
              });
              break;
            }
            break;
        }
      }
    });
  });

  if (geoms.length === 0) {
    return null;
  }
  if (geoms.length === 1) {
    return AreaFeature.create(geoms[0], {});
  }
  // TODO?: Might be possible to check if all geometries are of the same type,
  // e.g. all PointCircle and make MultiPointCircle instead of GeometryCollection
  // or MultiPolygon instead of GeometryCollection of Polygons/MultiPolygons
  // etc... For now keep as GeometryCollection.
  return AreaFeature.create(AreaGeometryCollection.create(geoms), {});
};
