import type * as GJ from '../types.js';
import type {OptionalParam} from '../util-types.js';
import {BaseLineObject} from './BaseLineObject.js';

export class LineString
  extends BaseLineObject<GJ.LineString>
  implements GJ.LineString
{
  static isObject(obj: any): obj is LineString {
    return obj instanceof LineString;
  }

  constructor(
    obj: OptionalParam<GJ.LineString, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'LineString'}, shallow);
  }

  create(
    coordinates: GJ.LineString['coordinates'],
    shallow: boolean = true,
  ): LineString {
    return new LineString({coordinates}, shallow);
  }
}
