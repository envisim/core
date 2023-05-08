import type * as GJ from '../types.js';
import type {OptionalParam} from '../util-types.js';
import {BasePointObject} from './BasePointObject.js';

export class MultiPoint
  extends BasePointObject<GJ.MultiPoint>
  implements GJ.MultiPoint
{
  static isObject(obj: any): obj is MultiPoint {
    return obj instanceof MultiPoint;
  }

  static create(
    coordinates: GJ.MultiPoint['coordinates'],
    shallow: boolean = true,
  ): MultiPoint {
    return new MultiPoint({coordinates}, shallow);
  }

  constructor(
    obj: OptionalParam<GJ.MultiPoint, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'MultiPoint'}, shallow);
  }

  get size(): number {
    return this.coordinates.length;
  }
  count(): number {
    return this.coordinates.length;
  }
}
