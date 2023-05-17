import type * as GJ from './geojson/types.js';
import {positionInAreaFeature} from './pointInPolygon.js';
import {bboxInBBox} from './bbox.js';
import {PointFeature} from './geojson/points/ClassPointFeature.js';
import {Point} from './geojson/points/ClassPoint.js';
import {MultiPoint} from './geojson/points/ClassMultiPoint.js';
import {AreaFeature} from './index.js';

interface intersection {
  geoJSON?: GJ.PointFeature;
}

/**
 * Computes the intersection between a PointFeature
 * and an AreaFeature.
 *
 * @param pointFeature - A PointFeature.
 * @param areaFeature - An AreaFeature.
 * @returns - An empty object {} if no intersection and {geoJSON:PointFeature} if intersection.
 */
export const intersectPointAreaFeatures = (
  pointFeature: GJ.PointFeature,
  areaFeature: GJ.AreaFeature,
): intersection => {
  const pf = PointFeature.isFeature(pointFeature)
    ? pointFeature
    : new PointFeature(pointFeature);
  const af = AreaFeature.isFeature(areaFeature)
    ? areaFeature
    : new AreaFeature(areaFeature);

  // Check if bboxes of features overlap
  const box1 = pf.getBBox();
  const box2 = af.getBBox();
  if (!bboxInBBox(box1, box2)) {
    return {};
  }

  // Check each position
  const coordinates: GJ.Position[] = [];
  pf.geomEach((pg: GJ.PointObject) => {
    switch (pg.type) {
      case 'Point':
        if (positionInAreaFeature(pg.coordinates, af)) {
          coordinates.push([...pg.coordinates]);
        }
        break;
      case 'MultiPoint':
        pg.coordinates.forEach((coords) => {
          if (positionInAreaFeature(coords, af)) {
            coordinates.push([...coords]);
          }
        });
        break;
    }
  });
  if (coordinates.length === 0) {
    return {};
  }
  if (coordinates.length === 1) {
    return {geoJSON: PointFeature.create(Point.create(coordinates[0]), {})};
  }
  return {geoJSON: PointFeature.create(MultiPoint.create(coordinates), {})};
};
