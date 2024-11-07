import type * as GJ from '../../types/geojson.js';
import {isCircle, isMultiCircle} from '../../types/type-guards.js';
import {MultiPoint} from './class-multipoint.js';
import {Point} from './class-point.js';
import type {PointObject} from './index.js';

export function toPointObject(geometry: GJ.Geometry, shallow: boolean = true): PointObject {
  switch (geometry.type) {
    case 'Point':
      if (isCircle(geometry) === false) {
        return shallow === false && Point.isObject(geometry)
          ? geometry
          : new Point(geometry, shallow);
      }
      break;

    case 'MultiPoint':
      if (isMultiCircle(geometry) === false) {
        return shallow === false && MultiPoint.isObject(geometry)
          ? geometry
          : new MultiPoint(geometry, shallow);
      }
      break;

    case 'GeometryCollection':
      return geometryCollection(geometry, shallow);
  }

  throw new TypeError('type not supported');
}

function geometryCollection(
  geometry: GJ.GeometryCollection<GJ.SingleTypeObject>,
  shallow: boolean,
): PointObject {
  if (geometry.geometries.length === 1) {
    return toPointObject(geometry.geometries[0], shallow);
  }

  const coordinates: GJ.Position[] = [];

  for (const geom of geometry.geometries) {
    if (geom.type === 'Point' && isCircle(geom) === false) {
      coordinates.push(geom.coordinates);
    } else if (geom.type === 'MultiPoint' && isMultiCircle(geom) === false) {
      coordinates.push(...geom.coordinates);
    }
  }

  if (coordinates.length === 0) {
    throw new TypeError('type not supported');
  } else if (coordinates.length === 1) {
    return Point.create(coordinates[0], shallow);
  }

  return MultiPoint.create(coordinates, shallow);
}
