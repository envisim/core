import type * as GJ from '../../types/geojson.js';
import {isCircle, isMultiCircle} from '../../types/type-guards.js';
import {CirclesToPolygonsOptions} from '../../utils/circles-to-polygons.js';
import {Circle} from './class-circle.js';
import {MultiCircle} from './class-multicircle.js';
import {MultiPolygon} from './class-multipolygon.js';
import {Polygon} from './class-polygon.js';
import type {AreaObject} from './index.js';

export function toAreaObject(
  geometry: GJ.Geometry,
  shallow: boolean = true,
  options: CirclesToPolygonsOptions = {},
): AreaObject | null {
  switch (geometry.type) {
    case 'Point':
      if (isCircle(geometry)) {
        return shallow === true && Circle.isObject(geometry)
          ? geometry
          : new Circle(geometry, shallow);
      }
      break;

    case 'MultiPoint':
      if (isMultiCircle(geometry)) {
        return shallow === true && MultiCircle.isObject(geometry)
          ? geometry
          : new MultiCircle(geometry, shallow);
      }
      break;

    case 'Polygon':
      return shallow === true && Polygon.isObject(geometry)
        ? geometry
        : new Polygon(geometry, shallow);

    case 'MultiPolygon':
      return shallow === true && MultiPolygon.isObject(geometry)
        ? geometry
        : new MultiPolygon(geometry, shallow);

    case 'GeometryCollection':
      return geometryCollection(geometry, shallow, options);
  }

  return null;
}

function geometryCollection(
  geometry: GJ.GeometryCollection<GJ.SingleTypeObject>,
  shallow: boolean,
  options: CirclesToPolygonsOptions = {},
): AreaObject | null {
  if (geometry.geometries.length === 1) {
    return toAreaObject(geometry.geometries[0], shallow, options);
  }

  const coordinates: GJ.Position[][][] = [];

  for (const geom of geometry.geometries) {
    switch (geom.type) {
      case 'Point':
        if (isCircle(geom)) {
          const circle = new Circle(geom, true).toPolygon(options);
          if (circle !== null) {
            coordinates.push(...circle.getCoordinateArray());
          }
        }
        break;

      case 'MultiPoint':
        if (isMultiCircle(geom)) {
          const circle = new MultiCircle(geom, true).toPolygon(options);
          if (circle !== null) {
            coordinates.push(...circle.getCoordinateArray());
          }
        }
        break;

      case 'Polygon':
        coordinates.push(geom.coordinates);
        break;

      case 'MultiPolygon':
        coordinates.push(...geom.coordinates);
        break;
    }
  }

  if (coordinates.length === 0) {
    return null;
  } else if (coordinates.length === 1) {
    return Polygon.create(coordinates[0], shallow);
  }

  return MultiPolygon.create(coordinates, shallow);
}
