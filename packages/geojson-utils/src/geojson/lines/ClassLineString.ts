import type * as GJ from '../types.js';
import type {OptionalParam} from '../util-types.js';
import {BaseLineObject} from './BaseLineObject.js';
import {lengthOfLineString} from '../../length.js';
import {distancePointToSegment} from '../../distancePointToSegment.js';

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

  geomEach(callback: Function): void {
    callback(this);
  }

  segmentEach(callback: Function): void {
    const coords = this.coordinates;
    for (let i = 0; i < coords.length - 1; i++) {
      callback([coords[i], coords[i + 1]]);
    }
  }

  distanceToPosition(coords: GJ.Position): number {
    let d = Infinity;
    const c = this.coordinates;
    const n = c.length - 1;
    for (let i = 0; i < n; i++) {
      d = Math.min(d, distancePointToSegment(coords, [c[i], c[i + 1]]));
    }
    return d;
  }
}
