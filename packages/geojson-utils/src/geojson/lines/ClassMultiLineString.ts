import type * as GJ from '../types.js';
import type {OptionalParam} from '../util-types.js';
import {BaseLineObject} from './BaseLineObject.js';

export class MultiLineString
  extends BaseLineObject<GJ.MultiLineString>
  implements GJ.MultiLineString
{
  static isObject(obj: any): obj is MultiLineString {
    return obj instanceof MultiLineString;
  }

  constructor(
    obj: OptionalParam<GJ.MultiLineString, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'MultiLineString'}, shallow);
  }

  create(
    coordinates: GJ.MultiLineString['coordinates'],
    shallow: boolean = true,
  ): MultiLineString {
    return new MultiLineString({coordinates}, shallow);
  }
}
