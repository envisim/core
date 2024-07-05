import type * as GJ from '../../types/geojson.js';
import {GeometricPrimitive} from '../../geometric-primitive/index.js';
import {AbstractSingleTypeObject} from './AbstractSingleTypeObject.js';

export abstract class AbstractPointObject<
  T extends GJ.PointObject,
> extends AbstractSingleTypeObject<T> {
  constructor(obj: GJ.PointObject, shallow: boolean = true) {
    super(obj, shallow);
  }

  geometricPrimitive(): GeometricPrimitive.POINT {
    return GeometricPrimitive.POINT;
  }

  abstract count(): number;
}
