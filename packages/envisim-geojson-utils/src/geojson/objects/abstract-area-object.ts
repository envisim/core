import type * as GJ from '../../types/geojson.js';
import {GeometricPrimitive} from '../geometric-primitive/index.js';
import {AbstractSingleTypeObject} from './abstract-single-type-object.js';

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
