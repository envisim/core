import type * as GJ from '../../types/geojson.js';
import {AbstractObject} from './AbstractObject.js';

export abstract class AbstractAreaObject<
  T extends GJ.AreaObject,
> extends AbstractObject<T> {
  constructor(obj: GJ.AreaObject, shallow: boolean = true) {
    super(obj, shallow);
  }

  abstract area(): number;
  abstract perimeter(): number;
}
