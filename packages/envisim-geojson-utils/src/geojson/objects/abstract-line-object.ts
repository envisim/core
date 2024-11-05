import type * as GJ from '../../types/geojson.js';
import {GeometricPrimitive} from '../../geometric-primitive/index.js';
import {AbstractSingleTypeObject} from './abstract-single-type-object.js';

export abstract class AbstractLineObject<
  T extends GJ.LineObject,
> extends AbstractSingleTypeObject<T> {
  constructor(obj: GJ.LineObject, shallow: boolean = true) {
    super(obj, shallow);
  }

  geometricPrimitive(): GeometricPrimitive.LINE {
    return GeometricPrimitive.LINE;
  }

  abstract length(): number;
}
