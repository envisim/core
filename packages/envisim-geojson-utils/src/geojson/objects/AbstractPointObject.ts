import type * as GJ from '../../types/geojson.js';
import {AbstractSingleTypeObject} from './AbstractSingleTypeObject.js';

export abstract class AbstractPointObject<
  T extends GJ.PointObject,
> extends AbstractSingleTypeObject<T> {
  constructor(obj: GJ.PointObject, shallow: boolean = true) {
    super(obj, shallow);
  }

  abstract count(): number;
}
