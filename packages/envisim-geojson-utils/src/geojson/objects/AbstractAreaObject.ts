import type * as GJ from '../../types/geojson.js';
import {AbstractSingleTypeObject} from './AbstractSingleTypeObject.js';

export abstract class AbstractAreaObject<
  T extends GJ.AreaObject,
> extends AbstractSingleTypeObject<T> {
  constructor(obj: GJ.AreaObject, shallow: boolean = true) {
    super(obj, shallow);
  }

  abstract area(): number;
  abstract perimeter(): number;
}
