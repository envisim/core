import type * as GJ from "../geojson.js";
import { GeometricPrimitive } from "../geometric-primitive.js";
import { isPosition, isPositionArr1, isPositionArr2, isPositionArr3 } from "./positions.js";

/**
 * @returns `true` if `obj` can be narrowed to `GJ.Point`.
 */
export function isPoint(obj: GJ.SingleTypeObject): obj is GJ.Point {
  return obj.type === "Point" && "radius" in obj === false;
}
/**
 * @returns `true` if `obj` can be narrowed to `GJ.MultiPoint`.
 */
export function isMultiPoint(obj: GJ.SingleTypeObject): obj is GJ.MultiPoint {
  return obj.type === "MultiPoint" && "radius" in obj === false;
}
/**
 * @returns `true` if `obj` can be narrowed to `GJ.Point | GJ.MultiPoint`.
 */
export function isPointish(obj: GJ.SingleTypeObject): obj is GJ.Point | GJ.MultiPoint {
  return (obj.type === "Point" || obj.type === "MultiPoint") && "radius" in obj === false;
}

/**
 * @returns `true` if `obj` can be narrowed to `GJ.Circle`.
 */
export function isCircle(
  obj: GJ.SingleTypeObject,
  checkPositiveRadius: boolean = false,
): obj is GJ.Circle {
  return obj.type === "Point" && "radius" in obj && (!checkPositiveRadius || obj.radius > 0.0);
}
/**
 * @returns `true` if `obj` can be narrowed to `GJ.MultiCircle`.
 */
export function isMultiCircle(
  obj: GJ.SingleTypeObject,
  checkPositiveRadius: boolean = false,
): obj is GJ.MultiCircle {
  return obj.type === "MultiPoint" && "radius" in obj && (!checkPositiveRadius || obj.radius > 0.0);
}
/**
 * @returns `true` if `obj` can be narrowed to `GJ.Circle | GJ.MultiCircle`.
 */
export function isCircleish(
  obj: GJ.SingleTypeObject,
  checkPositiveRadius: boolean = false,
): obj is GJ.Circle | GJ.MultiCircle {
  return (
    (obj.type === "Point" || obj.type === "MultiPoint") &&
    "radius" in obj &&
    (!checkPositiveRadius || obj.radius > 0.0)
  );
}

/**
 * @param checkCoordinates - checks the validity of the `coordinates` property if `true`, otherwise
 * just checks for the existance of the `coordinates` property.
 * @param allowGC - if `false`, disallowes the existance of `GJ.BaseGeometryCollection` on `obj`
 * @returns `true` if `obj` can be narrowed to `GJ.BaseGeometry`.
 */
export function isBaseGeometry(
  obj: unknown,
  checkCoordinates: boolean,
  allowGC: false,
): obj is GJ.SingleTypeObject;
export function isBaseGeometry(
  obj: unknown,
  checkCoordinates?: boolean,
  allowGC?: boolean,
): obj is GJ.BaseGeometry;
export function isBaseGeometry(
  obj: unknown,
  checkCoordinates: boolean = false,
  allowGC: boolean = true,
): obj is GJ.BaseGeometry {
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) return false;
  if (!("type" in obj)) return false;

  switch (obj.type) {
    case "Point":
      return "coordinates" in obj && (!checkCoordinates || isPosition(obj.coordinates));
    case "MultiPoint":
    case "LineString":
      return "coordinates" in obj && (!checkCoordinates || isPositionArr1(obj.coordinates));
    case "MultiLineString":
    case "Polygon":
      return "coordinates" in obj && (!checkCoordinates || isPositionArr2(obj.coordinates));
    case "MultiPolygon":
      return "coordinates" in obj && (!checkCoordinates || isPositionArr3(obj.coordinates));
    case "GeometryCollection":
      return (
        allowGC &&
        "geometries" in obj &&
        Array.isArray(obj.geometries) &&
        obj.geometries.every((g) => isBaseGeometry(g, checkCoordinates, true))
      );
    default:
      return false;
  }
}
/**
 * @returns `true` if `obj` can be narrowed to `GJ.AreaGeometry`.
 */
export function isAreaGeometry(obj: GJ.BaseGeometry): obj is GJ.AreaGeometry {
  return GeometricPrimitive.isArea(GeometricPrimitive.fromGeometry(obj, false));
}
/**
 * @returns `true` if `obj` can be narrowed to `GJ.LineGeometry`.
 */
export function isLineGeometry(obj: GJ.BaseGeometry): obj is GJ.LineGeometry {
  return GeometricPrimitive.isLine(GeometricPrimitive.fromGeometry(obj, false));
}
/**
 * @returns `true` if `obj` can be narrowed to `GJ.PointGeometry`.
 */
export function isPointGeometry(obj: GJ.BaseGeometry): obj is GJ.PointGeometry {
  return GeometricPrimitive.isPoint(GeometricPrimitive.fromGeometry(obj, false));
}

/**
 * @returns `true` if `obj` can be narrowed to `GJ.SingleTypeObject`.
 */
export function isSingleTypeGeometry(
  obj: unknown,
  checkCoordinates: boolean = false,
): obj is GJ.SingleTypeObject {
  return isBaseGeometry(obj, checkCoordinates, false);
}
