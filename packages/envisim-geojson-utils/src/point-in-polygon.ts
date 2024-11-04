import type * as GJ from './types/geojson.js';
import type {AreaObject} from './geojson/index.js';
import {pointInBBox} from './utils/bbox.js';
import {
  pointInMultiPolygonPosition,
  pointInSinglePolygonPosition,
} from './utils/pointInPolygonPosition.js';

/**
 * Checks if a point is inside an area.
 *
 * @returns `true` if the position is inside the area.
 */
export function pointInAreaGeometry(point: GJ.Position, area: AreaObject): boolean {
  // If it is not in the bounding box, we can give up
  if (!pointInBBox(point, area.getBBox())) {
    return false;
  }

  switch (area.type) {
    case 'Point':
    case 'MultiPoint':
      return area.distanceToPosition(point) <= 0;

    case 'Polygon':
      return pointInSinglePolygonPosition(point, area.coordinates);

    case 'MultiPolygon':
      return pointInMultiPolygonPosition(point, area.coordinates);

    default:
      return false;
  }
}
