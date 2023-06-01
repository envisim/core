import type * as GJ from './geojson/types.js';
import {bboxInBBox} from './bbox.js';
import {AreaFeature} from './geojson/areas/ClassAreaFeature.js';
import {MultiPoint} from './geojson/points/ClassMultiPoint.js';
import {Point} from './geojson/points/ClassPoint.js';
import {PointFeature} from './geojson/points/ClassPointFeature.js';
import {pointInAreaFeature} from './pointInPolygon.js';

/**
 * Computes the intersection between a PointFeature
 * and an AreaFeature.
 *
 * @param pointFeature - A PointFeature.
 * @param areaFeature - An AreaFeature.
 * @returns - null if no intersection and PointFeature if intersection.
 */
export const intersectPointAreaFeatures = (
  pointFeature: GJ.PointFeature,
  areaFeature: GJ.AreaFeature,
): PointFeature | null => {
  const pf = PointFeature.isFeature(pointFeature)
    ? pointFeature
    : new PointFeature(pointFeature);
  const af = AreaFeature.isFeature(areaFeature)
    ? areaFeature
    : new AreaFeature(areaFeature);

  // Check if bboxes of geometries overlap
  const box1 = pf.geometry.getBBox();
  const box2 = af.geometry.getBBox();
  if (!bboxInBBox(box1, box2)) {
    return null;
  }

  // Check each position
  const coordinates: GJ.Position[] = [];
  pf.geomEach((pg: GJ.PointObject) => {
    switch (pg.type) {
      case 'Point':
        if (pointInAreaFeature(pg.coordinates, af)) {
          coordinates.push([...pg.coordinates]);
        }
        break;
      case 'MultiPoint':
        pg.coordinates.forEach((coords) => {
          if (pointInAreaFeature(coords, af)) {
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
};
