import type * as GJ from '../types.js';
import type {OptionalParam} from '../util-types.js';
import {BaseLineObject} from './BaseLineObject.js';
import {lengthOfLineString} from '../../length.js';
export class LineString
  extends BaseLineObject<GJ.LineString>
  implements GJ.LineString
{
  static isObject(obj: any): obj is LineString {
    return obj instanceof LineString;
  }

  static create(
    coordinates: GJ.LineString['coordinates'],
    shallow: boolean = true,
  ): LineString {
    return new LineString({coordinates}, shallow);
  }

  constructor(
    obj: OptionalParam<GJ.LineString, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'LineString'}, shallow);
  }

  get size(): number {
    return 1;
  }
  length(dist: number = Infinity): number {
    return lengthOfLineString(this.coordinates, dist);
  }
}
