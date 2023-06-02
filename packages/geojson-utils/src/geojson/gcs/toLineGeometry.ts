import type * as GJ from '../types.js';
import {LineObject, LineString, MultiLineString} from '../objects/index.js';
import {LineGeometryCollection} from './ClassLineGeometryCollection.js';

function toLineGeometry(
  geometry: GJ.LineObject,
  shallow: boolean,
  allowCollection: false,
): LineObject;
function toLineGeometry(
  geometry: GJ.LineGeometry,
  shallow: boolean,
  allowCollection?: true,
): LineObject | LineGeometryCollection;
function toLineGeometry(
  geometry: GJ.LineGeometry,
  shallow: boolean = true,
  allowCollection: boolean = true,
): LineObject | LineGeometryCollection {
  switch (geometry.type) {
    case 'LineString':
      return shallow === false || !LineString.isObject(geometry)
        ? new LineString(geometry, shallow)
        : geometry;

    case 'MultiLineString':
      return shallow === false || !MultiLineString.isObject(geometry)
        ? new MultiLineString(geometry, shallow)
        : geometry;

    case 'GeometryCollection':
      if (allowCollection === true)
        return shallow === false ||
          !LineGeometryCollection.isGeometryCollection(geometry)
          ? new LineGeometryCollection(geometry, shallow)
          : geometry;

    default:
      throw new TypeError('type not supported');
  }
}

export {toLineGeometry};
