import type {
  GeometricPrimitiveArea,
  GeometricPrimitiveLine,
  GeometricPrimitiveNone,
  GeometricPrimitivePoint,
  GeometricPrimitiveUnion,
} from "@envisim/geojson-utils";
import { Circle } from "./class-circle.js";
import { LineString } from "./class-linestring.js";
import { MultiCircle } from "./class-multicircle.js";
import { MultiLineString } from "./class-multilinestring.js";
import { MultiPoint } from "./class-multipoint.js";
import { MultiPolygon } from "./class-multipolygon.js";
import { Point } from "./class-point.js";
import { Polygon } from "./class-polygon.js";

export {
  // Areas
  Polygon,
  MultiPolygon,
  Circle,
  MultiCircle,
  // Lines
  LineString,
  MultiLineString,
  // Points
  Point,
  MultiPoint,
};

export { toAreaObject, toLineObject, toPointObject } from "./to-object.js";

export type AreaObject = Circle | MultiCircle | Polygon | MultiPolygon;
export type LineObject = LineString | MultiLineString;
export type PointObject = Point | MultiPoint;
export type PureObject<
  T extends AreaObject | LineObject | PointObject = AreaObject | LineObject | PointObject,
> = T extends AreaObject ? T : T extends LineObject ? T : T extends PointObject ? T : never;
export type DecreasingObject<G extends PureObject> = //
  G extends AreaObject
    ? PureObject
    : G extends LineObject
      ? PureObject<LineObject | PointObject>
      : G extends PointObject
        ? PointObject
        : never;
export type IncreasingObject<G extends PureObject> = //
  G extends AreaObject
    ? AreaObject
    : G extends LineObject
      ? PureObject<AreaObject | LineObject>
      : G extends PointObject
        ? PureObject
        : never;
export type RetractingObject<G extends PureObject> = //
  G extends AreaObject
    ? PureObject
    : G extends LineObject
      ? PureObject<AreaObject | LineObject>
      : G extends PointObject
        ? AreaObject
        : never;

export type PrimitiveOfObject<T extends AreaObject | LineObject | PointObject> =
  T extends AreaObject
    ? GeometricPrimitiveArea
    : T extends LineObject
      ? GeometricPrimitiveLine
      : T extends PointObject
        ? GeometricPrimitivePoint
        : GeometricPrimitiveNone;
export type ObjectOfPrimitive<T extends GeometricPrimitiveUnion> = T extends GeometricPrimitiveArea
  ? AreaObject
  : T extends GeometricPrimitiveLine
    ? LineObject
    : T extends GeometricPrimitivePoint
      ? PointObject
      : never;
