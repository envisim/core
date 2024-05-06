import type * as GJ from '../../types/geojson.js';
import {AbstractObject} from './AbstractObject.js';

export abstract class AbstractLineObject<
  T extends GJ.LineObject,
> extends AbstractObject<T> {
  constructor(obj: GJ.LineObject, shallow: boolean = true) {
    super(obj, shallow);
  }

  abstract length(): number;
}
