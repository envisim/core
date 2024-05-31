import type * as GJ from '../../types/geojson.js';
import {GeometricPrimitive} from '../../geometric-primitive/index.js';
import {AbstractSingleTypeObject} from './AbstractSingleTypeObject.js';

export abstract class AbstractAreaObject<
  T extends GJ.AreaObject,
> extends AbstractSingleTypeObject<T> {
  constructor(obj: GJ.AreaObject, shallow: boolean = true) {
    super(obj, shallow);
  }

  geometricPrimitive(): GeometricPrimitive.AREA {
    return GeometricPrimitive.AREA;
  }

  abstract area(): number;
  abstract perimeter(): number;
}
