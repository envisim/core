import type * as GJ from '../../types/geojson.js';
import {AbstractSingleTypeObject} from './AbstractSingleTypeObject.js';

export abstract class AbstractLineObject<
  T extends GJ.LineObject,
> extends AbstractSingleTypeObject<T> {
  constructor(obj: GJ.LineObject, shallow: boolean = true) {
    super(obj, shallow);
  }

  abstract length(): number;
}
