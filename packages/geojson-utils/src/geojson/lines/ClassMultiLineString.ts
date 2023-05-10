import type * as GJ from '../types.js';
import type {OptionalParam} from '../util-types.js';
import {BaseLineObject} from './BaseLineObject.js';
import {lengthOfLineString} from '../../length.js';
export class MultiLineString
  extends BaseLineObject<GJ.MultiLineString>
  implements GJ.MultiLineString
{
  static isObject(obj: any): obj is MultiLineString {
    return obj instanceof MultiLineString;
  }

  static create(
    coordinates: GJ.MultiLineString['coordinates'],
    shallow: boolean = true,
  ): MultiLineString {
    return new MultiLineString({coordinates}, shallow);
  }

  constructor(
    obj: OptionalParam<GJ.MultiLineString, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'MultiLineString'}, shallow);
  }

  get size(): number {
    return this.coordinates.length;
  }

  length(dist: number = Infinity): number {
    return this.coordinates.reduce(
      (prev, curr) => prev + lengthOfLineString(curr, dist),
      0,
    );
  }

  geomEach(callback: Function): void {
    callback(this);
  }
}
