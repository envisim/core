import type {AreaObject, LineObject, PointObject} from '../objects/index.js';

export enum GeometricPrimitive {
  NONE,
  POINT,
  LINE,
  AREA,
}

export type PrimitiveOfObject<T extends AreaObject | LineObject | PointObject> =
  T extends AreaObject
    ? GeometricPrimitive.AREA
    : T extends LineObject
      ? GeometricPrimitive.LINE
      : T extends PointObject
        ? GeometricPrimitive.POINT
        : GeometricPrimitive.NONE;
export type ObjectOfPrimitive<T extends GeometricPrimitive> = T extends GeometricPrimitive.AREA
  ? AreaObject
  : T extends GeometricPrimitive.LINE
    ? LineObject
    : T extends GeometricPrimitive.POINT
      ? PointObject
      : never;
