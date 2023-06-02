import type * as GJ from '../types.js';
import {MultiPoint, Point, PointObject} from '../objects/index.js';
import {PointGeometryCollection} from './ClassPointGeometryCollection.js';

function toPointGeometry(
  geometry: GJ.PointObject,
  shallow: boolean,
  allowCollection: false,
): PointObject;
function toPointGeometry(
  geometry: GJ.PointGeometry,
  shallow: boolean,
  allowCollection?: true,
): PointObject | PointGeometryCollection;
function toPointGeometry(
  geometry: GJ.PointGeometry,
  shallow: boolean = true,
  allowCollection: boolean = true,
): PointObject | PointGeometryCollection {
  switch (geometry.type) {
    case 'Point':
      return shallow === false || !Point.isObject(geometry)
        ? new Point(geometry, shallow)
        : geometry;

    case 'MultiPoint':
      return shallow === false || !MultiPoint.isObject(geometry)
        ? new MultiPoint(geometry, shallow)
        : geometry;

    case 'GeometryCollection':
      if (allowCollection === true)
        return shallow === false ||
          !PointGeometryCollection.isGeometryCollection(geometry)
          ? new PointGeometryCollection(geometry, shallow)
          : geometry;

    default:
      throw new TypeError('type not supported');
  }
}

export {toPointGeometry};
