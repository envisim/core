import type * as GJ from "../geojson.js";
import { GeometricPrimitive } from "../geometric-primitive.js";

export function isPoint(obj: GJ.SingleTypeObject): obj is GJ.Point {
  return obj.type === "Point" && "radius" in obj === false;
}
export function isMultiPoint(obj: GJ.SingleTypeObject): obj is GJ.MultiPoint {
  return obj.type === "MultiPoint" && "radius" in obj === false;
}
export function isPointish(obj: GJ.SingleTypeObject): obj is GJ.Point | GJ.MultiPoint {
  return (obj.type === "Point" || obj.type === "MultiPoint") && "radius" in obj === false;
}

export function isCircle(
  obj: GJ.SingleTypeObject,
  checkPositiveRadius: boolean = false,
): obj is GJ.Circle {
  return obj.type === "Point" && "radius" in obj && (!checkPositiveRadius || obj.radius > 0.0);
}
export function isMultiCircle(
  obj: GJ.SingleTypeObject,
  checkPositiveRadius: boolean = false,
): obj is GJ.MultiCircle {
  return obj.type === "MultiPoint" && "radius" in obj && (!checkPositiveRadius || obj.radius > 0.0);
}
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

export function isAreaGeometry(obj: GJ.BaseGeometry): obj is GJ.AreaGeometry {
  return GeometricPrimitive.isArea(GeometricPrimitive.fromGeometry(obj, false));
}
export function isLineGeometry(obj: GJ.BaseGeometry): obj is GJ.LineGeometry {
  return GeometricPrimitive.isLine(GeometricPrimitive.fromGeometry(obj, false));
}
export function isPointGeometry(obj: GJ.BaseGeometry): obj is GJ.PointGeometry {
  return GeometricPrimitive.isPoint(GeometricPrimitive.fromGeometry(obj, false));
}
