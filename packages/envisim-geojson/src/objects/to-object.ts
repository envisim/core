import type * as GJ from "@envisim/geojson-utils/geojson";
import {
  isCircle,
  isMultiCircle,
  isAreaGeometry,
  isLineGeometry,
  isPointGeometry,
} from "@envisim/geojson-utils/type-guards";
import { type CirclesToPolygonsOptions } from "../utils/circles-to-polygons.js";
import { circlesToPolygons } from "../utils/circles-to-polygons.js";
import { Circle } from "./class-circle.js";
import { LineString } from "./class-linestring.js";
import { MultiCircle } from "./class-multicircle.js";
import { MultiLineString } from "./class-multilinestring.js";
import { MultiPoint } from "./class-multipoint.js";
import { MultiPolygon } from "./class-multipolygon.js";
import { Point } from "./class-point.js";
import { Polygon } from "./class-polygon.js";
import type { AreaObject, LineObject, PointObject } from "./index.js";

export function toAreaObject(
  geometry: GJ.BaseGeometry,
  shallow: boolean = true,
  options: CirclesToPolygonsOptions = {},
): AreaObject | null {
  switch (geometry.type) {
    case "Point":
      if (isCircle(geometry)) {
        return shallow === true && Circle.isObject(geometry)
          ? geometry
          : new Circle(geometry, shallow);
      }
      break;

    case "MultiPoint":
      if (isMultiCircle(geometry)) {
        return shallow === true && MultiCircle.isObject(geometry)
          ? geometry
          : new MultiCircle(geometry, shallow);
      }
      break;

    case "Polygon":
      return shallow === true && Polygon.isObject(geometry)
        ? geometry
        : new Polygon(geometry, shallow);

    case "MultiPolygon":
      return shallow === true && MultiPolygon.isObject(geometry)
        ? geometry
        : new MultiPolygon(geometry, shallow);

    case "GeometryCollection":
      return areaGeometryCollection(geometry, shallow, options);
  }

  return null;
}

export function toLineObject(
  geometry: GJ.BaseGeometry,
  shallow: boolean = true,
): LineObject | null {
  switch (geometry.type) {
    case "LineString":
      return shallow === true && LineString.isObject(geometry)
        ? geometry
        : new LineString(geometry, shallow);

    case "MultiLineString":
      return shallow === true && MultiLineString.isObject(geometry)
        ? geometry
        : new MultiLineString(geometry, shallow);

    case "GeometryCollection":
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
    case "Point":
      if (isCircle(geometry) === false) {
        return shallow === false && Point.isObject(geometry)
          ? geometry
          : new Point(geometry, shallow);
      }
      break;

    case "MultiPoint":
      if (isMultiCircle(geometry) === false) {
        return shallow === false && MultiPoint.isObject(geometry)
          ? geometry
          : new MultiPoint(geometry, shallow);
      }
      break;

    case "GeometryCollection":
      return pointGeometryCollection(geometry, shallow);
  }

  return null;
}

function areaGeometryCollection(
  geometry: GJ.BaseGeometryCollection,
  shallow: boolean,
  options: CirclesToPolygonsOptions = {},
): AreaObject | null {
  const gc = geometry.geometries.flatMap((g) => flattenGC(g)).filter((g) => isAreaGeometry(g));
  if (gc.length === 0) return null;

  const coordinates: GJ.MultiPolygon["coordinates"] = [];

  for (const geom of gc) {
    switch (geom.type) {
      case "Point":
        coordinates.push(...circlesToPolygons([geom.coordinates], geom.radius, options));
        break;
      case "MultiPoint":
        coordinates.push(...circlesToPolygons(geom.coordinates, geom.radius, options));
        break;
      case "Polygon":
        coordinates.push(geom.coordinates);
        break;
      case "MultiPolygon":
        coordinates.push(...geom.coordinates);
        break;
    }
  }

  if (coordinates.length === 0) {
    return null;
  } else if (coordinates.length === 1) {
    return Polygon.create(coordinates[0], shallow);
  } else {
    return MultiPolygon.create(coordinates, shallow);
  }
}

function lineGeometryCollection(
  geometry: GJ.BaseGeometryCollection,
  shallow: boolean,
): LineObject | null {
  const gc = geometry.geometries.flatMap((g) => flattenGC(g)).filter((g) => isLineGeometry(g));

  const coordinates: GJ.MultiLineString["coordinates"] = [];

  for (const geom of gc) {
    if (geom.type === "LineString") {
      coordinates.push(geom.coordinates);
    } else if (geom.type === "MultiLineString") {
      coordinates.push(...geom.coordinates);
    }
  }

  if (coordinates.length === 0) {
    return null;
  } else if (coordinates.length === 1) {
    return LineString.create(coordinates[0], shallow);
  } else {
    return MultiLineString.create(coordinates, shallow);
  }
}

function pointGeometryCollection(
  geometry: GJ.BaseGeometryCollection,
  shallow: boolean,
): PointObject | null {
  const gc = geometry.geometries.flatMap((g) => flattenGC(g)).filter((g) => isPointGeometry(g));

  const coordinates: GJ.MultiPoint["coordinates"] = [];

  for (const geom of gc) {
    if (geom.type === "Point") {
      coordinates.push(geom.coordinates);
    } else if (geom.type === "MultiPoint") {
      coordinates.push(...geom.coordinates);
    }
  }

  if (coordinates.length === 0) {
    return null;
  } else if (coordinates.length === 1) {
    return Point.create(coordinates[0], shallow);
  } else {
    return MultiPoint.create(coordinates, shallow);
  }
}

/**
 * Flattens and filters nested GCs
 */
function flattenGC(geometry: GJ.BaseGeometry): GJ.SingleTypeObject | GJ.SingleTypeObject[] {
  return geometry.type === "GeometryCollection"
    ? geometry.geometries.flatMap((g) => flattenGC(g))
    : geometry;
}
