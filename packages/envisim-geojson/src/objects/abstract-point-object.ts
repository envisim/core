import { GeometricPrimitive } from "@envisim/geojson-utils";
import type * as GJ from "@envisim/geojson-utils/geojson";
import { AbstractSingleTypeObject } from "./abstract-single-type-object.js";

export abstract class AbstractPointObject<
  T extends GJ.PointObject,
> extends AbstractSingleTypeObject<T> {
  constructor(obj: GJ.PointObject, shallow: boolean = true) {
    super(obj, shallow);
  }

  geometricPrimitive() {
    return GeometricPrimitive.POINT;
  }
  measure(): number {
    return this.size();
  }

  count(): number {
    return this.size();
  }
}
