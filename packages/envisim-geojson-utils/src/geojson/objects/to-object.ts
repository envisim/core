import type * as GJ from '../../types/geojson.js';
import {isCircle, isMultiCircle} from '../../types/type-guards.js';
import {type CirclesToPolygonsOptions} from '../../utils/circles-to-polygons.js';
import {GeometricPrimitive, isGeometryPrimitive} from '../geometric-primitive/index.js';
import {Circle} from './class-circle.js';
import {LineString} from './class-linestring.js';
import {MultiCircle} from './class-multicircle.js';
import {MultiLineString} from './class-multilinestring.js';
import {MultiPoint} from './class-multipoint.js';
import {MultiPolygon} from './class-multipolygon.js';
import {Point} from './class-point.js';
import {Polygon} from './class-polygon.js';
import type {AreaObject, LineObject, PointObject} from './index.js';

export function toAreaObject(
  geometry: GJ.BaseGeometry,
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
      return areaGeometryCollection(geometry, shallow, options);
  }

  return null;
}

export function toLineObject(
  geometry: GJ.BaseGeometry,
  shallow: boolean = true,
): LineObject | null {
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
      return lineGeometryCollection(geometry, shallow);

    default:
      return null;
  }
}

export function toPointObject(
  geometry: GJ.BaseGeometry,
  shallow: boolean = true,
): PointObject | null {
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
      return pointGeometryCollection(geometry, shallow);
  }

  return null;
}

function areaGeometryCollection(
  geometry: GJ.BaseGeometryCollection,
  shallow: boolean,
  options: CirclesToPolygonsOptions = {},
): AreaObject | null {
  const gc = filteredGeometryCollection(geometry, GeometricPrimitive.AREA);

  if (gc === null) {
    return null;
  } else if (gc.type !== 'GeometryCollection') {
    return toAreaObject(gc);
  }

  const coordinates: GJ.Position[][][] = [];

  for (const geom of gc.geometries) {
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

function lineGeometryCollection(
  geometry: GJ.BaseGeometryCollection,
  shallow: boolean,
): LineObject | null {
  const gc = filteredGeometryCollection(geometry, GeometricPrimitive.LINE);

  if (gc === null) {
    return null;
  } else if (gc.type !== 'GeometryCollection') {
    return toLineObject(gc);
  }

  const coordinates: GJ.Position[][] = [];

  for (const geom of gc.geometries) {
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

function pointGeometryCollection(
  geometry: GJ.BaseGeometryCollection,
  shallow: boolean,
): PointObject | null {
  const gc = filteredGeometryCollection(geometry, GeometricPrimitive.POINT);

  if (gc === null) {
    return null;
  } else if (gc.type !== 'GeometryCollection') {
    return toPointObject(gc);
  }

  const coordinates: GJ.Position[] = [];

  for (const geom of gc.geometries) {
    if (geom.type === 'Point' && isCircle(geom) === false) {
      coordinates.push(geom.coordinates);
    } else if (geom.type === 'MultiPoint' && isMultiCircle(geom) === false) {
      coordinates.push(...geom.coordinates);
    }
  }

  if (coordinates.length === 0) {
    return null;
  } else if (coordinates.length === 1) {
    return Point.create(coordinates[0], shallow);
  }

  return MultiPoint.create(coordinates, shallow);
}

/**
 * Flattens and filters nested GCs
 */
function flattenGeometryCollections(
  geometry: GJ.BaseGeometry,
  primitive: GeometricPrimitive.AREA | GeometricPrimitive.LINE | GeometricPrimitive.POINT,
): GJ.SingleTypeObject | GJ.SingleTypeObject[] {
  if (geometry.type !== 'GeometryCollection') {
    return isGeometryPrimitive(geometry, primitive, false) ? geometry : [];
  }

  return geometry.geometries.flatMap((g) => flattenGeometryCollections(g, primitive));
}

function filteredGeometryCollection(
  geometry: GJ.BaseGeometryCollection,
  primitive: GeometricPrimitive.AREA,
): GJ.AreaGeometry | null;
function filteredGeometryCollection(
  geometry: GJ.BaseGeometryCollection,
  primitive: GeometricPrimitive.LINE,
): GJ.LineGeometry | null;
function filteredGeometryCollection(
  geometry: GJ.BaseGeometryCollection,
  primitive: GeometricPrimitive.POINT,
): GJ.PointGeometry | null;
function filteredGeometryCollection(
  geometry: GJ.BaseGeometryCollection,
  primitive: GeometricPrimitive.AREA | GeometricPrimitive.LINE | GeometricPrimitive.POINT,
): GJ.GeometryCollection<GJ.SingleTypeObject> | GJ.SingleTypeObject | null {
  // flattenGeometryCollections will flatten out all nested GC's
  const geometries = geometry.geometries.flatMap((g) => flattenGeometryCollections(g, primitive));

  if (geometries.length === 0) {
    return null;
  } else if (geometries.length === 1) {
    // Maximum flattness
    return geometries[0];
  } else {
    return {
      type: 'GeometryCollection',
      geometries,
    };
  }
}
