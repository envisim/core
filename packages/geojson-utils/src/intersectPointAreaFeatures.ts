import type * as GJ from './geojson/types.js';
import {bboxInBBox} from './bbox.js';
import type {AreaFeature} from './geojson/areas/ClassAreaFeature.js';
import {MultiPoint} from './geojson/points/ClassMultiPoint.js';
import {Point} from './geojson/points/ClassPoint.js';
import {PointFeature} from './geojson/points/ClassPointFeature.js';
import type {PointObject} from './geojson/points/PointObjects.js';
import {pointInAreaFeature} from './pointInPolygon.js';

/**
 * Computes the intersection between a PointFeature and an AreaFeature.
 *
 * @param pointFeature
 * @param areaFeature
 * @returns `null` if no intersection and PointFeature if intersection.
 */
export function intersectPointAreaFeatures(
  pointFeature: PointFeature,
  areaFeature: AreaFeature,
): PointFeature | null {
  // Early return if bboxes of geometries doesn't overlap
  if (
    !bboxInBBox(pointFeature.geometry.getBBox(), areaFeature.geometry.getBBox())
  )
    return null;

  // Check each position
  const coordinates: GJ.Position[] = [];

  pointFeature.geomEach((pg: PointObject) => {
    switch (pg.type) {
      case 'Point':
        if (pointInAreaFeature(pg.coordinates, areaFeature)) {
          coordinates.push([...pg.coordinates]);
        }
        break;

      case 'MultiPoint':
        pg.coordinates.forEach((coords) => {
          if (pointInAreaFeature(coords, areaFeature)) {
            coordinates.push([...coords]);
          }
        });
        break;
    }
  });

  if (coordinates.length === 0) {
    return null;
  }

  if (coordinates.length === 1) {
    return PointFeature.create(Point.create(coordinates[0]), {});
  }

  return PointFeature.create(MultiPoint.create(coordinates), {});
}
