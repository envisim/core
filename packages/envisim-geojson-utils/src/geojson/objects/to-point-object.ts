import type * as GJ from '../../types/geojson.js';
import {MultiPoint} from './class-multipoint.js';
import {Point} from './class-point.js';
import type {PointObject} from './index.js';

export function toPointObject(geometry: GJ.PointGeometry, shallow: boolean = true): PointObject {
  switch (geometry.type) {
    case 'Point':
      return shallow === false && Point.isObject(geometry)
        ? geometry
        : new Point(geometry, shallow);

    case 'MultiPoint':
      return shallow === false && MultiPoint.isObject(geometry)
        ? geometry
        : new MultiPoint(geometry, shallow);

    case 'GeometryCollection':
      return geometryCollection(geometry, shallow);

    default:
      throw new TypeError('type not supported');
  }
}

function geometryCollection(geometry: GJ.PointGeometryCollection, shallow: boolean): PointObject {
  if (geometry.geometries.length === 1) {
    return toPointObject(geometry.geometries[0], shallow);
  }

  const coordinates: GJ.Position[] = [];

  for (const geom of geometry.geometries) {
    if (geom.type === 'Point') {
      coordinates.push(geom.coordinates);
    } else {
      coordinates.push(...geom.coordinates);
    }
  }

  if (coordinates.length === 1) {
    return Point.create(coordinates[0], shallow);
  }

  return MultiPoint.create(coordinates, shallow);
}
