import type * as GJ from '../types.js';
import {
  AreaGeometry,
  AreaGeometryCollection,
} from './ClassAreaGeometryCollection.js';
import {
  MultiPointCircle,
  MultiPolygon,
  PointCircle,
  Polygon,
} from './AreaObjects.js';

export function toAreaGeometry(
  geometry: GJ.AreaGeometry,
  shallow: boolean = true,
): AreaGeometry {
  switch (geometry.type) {
    case 'Point':
      return shallow === false || !PointCircle.isObject(geometry)
        ? new PointCircle(geometry, shallow)
        : geometry;
    case 'MultiPoint':
      return shallow === false || !MultiPointCircle.isObject(geometry)
        ? new MultiPointCircle(geometry, shallow)
        : geometry;
    case 'Polygon':
      return shallow === false || !Polygon.isObject(geometry)
        ? new Polygon(geometry, shallow)
        : geometry;
    case 'MultiPolygon':
      return shallow === false || !MultiPolygon.isObject(geometry)
        ? new MultiPolygon(geometry, shallow)
        : geometry;
    case 'GeometryCollection':
      return shallow === false ||
        !AreaGeometryCollection.isGeometryCollection(geometry)
        ? new AreaGeometryCollection(geometry, shallow)
        : geometry;
    default:
      throw new TypeError('type not supported');
  }
}
