import type * as GJ from '../../types/geojson.js';
import {
  AreaObject,
  Circle,
  MultiCircle,
  MultiPolygon,
  Polygon,
} from '../objects/index.js';
import {AreaGeometryCollection} from './ClassAreaGeometryCollection.js';

function toAreaGeometry(
  geometry: GJ.AreaObject,
  shallow: boolean,
  allowCollection: false,
): AreaObject;
function toAreaGeometry(
  geometry: GJ.AreaGeometry,
  shallow: boolean,
  allowCollection?: true,
): AreaObject | AreaGeometryCollection;
function toAreaGeometry(
  geometry: GJ.AreaGeometry,
  shallow: boolean = true,
  allowCollection: boolean = true,
): AreaObject | AreaGeometryCollection {
  switch (geometry.type) {
    case 'Point':
      return shallow === false || !Circle.isObject(geometry)
        ? new Circle(geometry, shallow)
        : geometry;

    case 'MultiPoint':
      return shallow === false || !MultiCircle.isObject(geometry)
        ? new MultiCircle(geometry, shallow)
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
      if (allowCollection === true)
        return shallow === false ||
          !AreaGeometryCollection.isGeometryCollection(geometry)
          ? new AreaGeometryCollection(geometry, shallow)
          : geometry;

    default:
      throw new TypeError('type not supported');
  }
}

export {toAreaGeometry};
