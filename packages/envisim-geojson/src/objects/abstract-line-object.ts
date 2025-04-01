import { GeometricPrimitive } from "@envisim/geojson-utils";
import type * as GJ from "@envisim/geojson-utils/geojson";
import { AbstractSingleTypeObject } from "./abstract-single-type-object.js";

export abstract class AbstractLineObject<
  T extends GJ.LineObject,
> extends AbstractSingleTypeObject<T> {
  constructor(obj: GJ.LineObject, shallow: boolean = true) {
    super(obj, shallow);
  }

  geometricPrimitive(): GeometricPrimitive.LINE {
    return GeometricPrimitive.LINE;
  }
  measure(): number {
    return this.length();
  }

  abstract length(): number;
}
