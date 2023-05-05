import type * as GJ from '../types.js';
import type {OptionalParam} from '../util-types.js';
import {BaseAreaObject} from './BaseAreaObject.js';

export class MultiPolygon
  extends BaseAreaObject<GJ.MultiPolygon>
  implements GJ.MultiPolygon
{
  static isObject(obj: any): obj is MultiPolygon {
    return obj instanceof MultiPolygon;
  }

  constructor(
    obj: OptionalParam<GJ.MultiPolygon, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'MultiPolygon'}, shallow);
  }

  create(
    coordinates: GJ.MultiPolygon['coordinates'],
    shallow: boolean = true,
  ): MultiPolygon {
    return new MultiPolygon({coordinates}, shallow);
  }

  area(): number {
    return 0.0;
  }
}
