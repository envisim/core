import { GeometricPrimitive } from "@envisim/geojson-utils";
import type * as GJ from "@envisim/geojson-utils/geojson";
import { AbstractSingleTypeObject } from "./abstract-single-type-object.js";

export abstract class AbstractAreaObject<
  T extends GJ.AreaObject,
> extends AbstractSingleTypeObject<T> {
  constructor(obj: GJ.AreaObject, shallow: boolean = true) {
    super(obj, shallow);
  }

  geometricPrimitive(): GeometricPrimitive.AREA {
    return GeometricPrimitive.AREA;
  }
  measure(): number {
    return this.area();
  }

  abstract area(): number;
  abstract perimeter(): number;
  abstract includesPosition(position: GJ.Position): boolean;
}
