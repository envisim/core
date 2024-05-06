import type * as GJ from '../../types/geojson.js';
import {AbstractObject} from './AbstractObject.js';

export abstract class AbstractPointObject<
  T extends GJ.PointObject,
> extends AbstractObject<T> {
  constructor(obj: GJ.PointObject, shallow: boolean = true) {
    super(obj, shallow);
  }

  abstract count(): number;
}
