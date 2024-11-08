import type * as GJ from '../../types/geojson.js';
import {LineString} from './class-linestring.js';
import {MultiLineString} from './class-multilinestring.js';
import type {LineObject} from './index.js';

export function toLineObject(geometry: GJ.Geometry, shallow: boolean = true): LineObject | null {
  switch (geometry.type) {
    case 'LineString':
      return shallow === true && LineString.isObject(geometry)
        ? geometry
        : new LineString(geometry, shallow);

    case 'MultiLineString':
      return shallow === true && MultiLineString.isObject(geometry)
        ? geometry
        : new MultiLineString(geometry, shallow);

    case 'GeometryCollection':
      return geometryCollection(geometry, shallow);

    default:
      return null;
  }
}

function geometryCollection(
  geometry: GJ.GeometryCollection<GJ.SingleTypeObject>,
  shallow: boolean,
): LineObject | null {
  if (geometry.geometries.length === 1) {
    return toLineObject(geometry.geometries[0], shallow);
  }

  const coordinates: GJ.Position[][] = [];

  for (const geom of geometry.geometries) {
    if (geom.type === 'LineString') {
      coordinates.push(geom.coordinates);
    } else if (geom.type === 'MultiLineString') {
      coordinates.push(...geom.coordinates);
    }
  }

  if (coordinates.length === 0) {
    return null;
  } else if (coordinates.length === 1) {
    return LineString.create(coordinates[0], shallow);
  }

  return MultiLineString.create(coordinates, shallow);
}
