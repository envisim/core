import type * as GJ from './geojson/types.js';
import {pointInBBox} from './bbox.js';
import type {AreaObject} from './geojson/areas/AreaObjects.js';
import {toAreaGeometry} from './geojson/areas/toAreaGeometry.js';
import {
  pointInMultiPolygonPosition,
  pointInSinglePolygonPosition,
} from './pointInPolygonPosition.js';

/**
 * Checks if a point is inside an AreaGeometry.
 *
 * @param point - A GeoJSON Position [lon,lat].
 * @param geometry
 * @returns `true` if the position is inside the area.
 */
export function pointInAreaGeometry(
  point: GJ.Position,
  geometry: GJ.AreaGeometry,
): boolean {
  const ag = toAreaGeometry(geometry, true);

  // If it is not in the bounding box, we can give up
  if (!pointInBBox(point, ag.getBBox())) return false;

  switch (ag.type) {
    case 'Point':
    case 'MultiPoint':
      return ag.distanceToPosition(point) <= 0;

    case 'Polygon':
      return pointInSinglePolygonPosition(point, ag.coordinates);

    case 'MultiPolygon':
      return pointInMultiPolygonPosition(point, ag.coordinates);

    case 'GeometryCollection':
      return ag.geometries.some((geom: AreaObject) =>
        pointInAreaGeometry(point, geom),
      );

    default:
      return false;
  }
}

/**
 * Checks if a point is inside an AreaFeature.
 *
 * @param point - A GeoJSON Position [lon,lat].
 * @param feature
 * @returns `true` if the position is inside the area.
 */
export function pointInAreaFeature(
  point: GJ.Position,
  feature: GJ.AreaFeature,
): boolean {
  return pointInAreaGeometry(point, feature.geometry);
}
