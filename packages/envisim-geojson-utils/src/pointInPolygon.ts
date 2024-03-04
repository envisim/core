import type * as GJ from './types/geojson.js';
import type {AreaFeature, AreaGeometry, AreaObject} from './geojson/index.js';
import {pointInBBox} from './utils/bbox.js';
import {
  pointInMultiPolygonPosition,
  pointInSinglePolygonPosition,
} from './utils/pointInPolygonPosition.js';

/**
 * Checks if a point is inside an AreaGeometry.
 *
 * @param point A GeoJSON Position [lon,lat].
 * @param geometry
 * @returns `true` if the position is inside the area.
 */
export function pointInAreaGeometry(
  point: GJ.Position,
  geometry: AreaGeometry,
): boolean {
  // If it is not in the bounding box, we can give up
  if (!pointInBBox(point, geometry.getBBox())) return false;

  switch (geometry.type) {
    case 'Point':
    case 'MultiPoint':
      return geometry.distanceToPosition(point) <= 0;

    case 'Polygon':
      return pointInSinglePolygonPosition(point, geometry.coordinates);

    case 'MultiPolygon':
      return pointInMultiPolygonPosition(point, geometry.coordinates);

    case 'GeometryCollection':
      return geometry.geometries.some((geom: AreaObject) =>
        pointInAreaGeometry(point, geom),
      );

    default:
      return false;
  }
}

/**
 * Checks if a point is inside an AreaFeature.
 *
 * @param point A GeoJSON Position [lon,lat].
 * @param feature
 * @returns `true` if the position is inside the area.
 */
export function pointInAreaFeature(
  point: GJ.Position,
  feature: AreaFeature,
): boolean {
  return pointInAreaGeometry(point, feature.geometry);
}
