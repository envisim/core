import type * as GJ from '../types.js';
import type {OptionalParam} from '../util-types.js';
import type {LineGeomEachCallback} from '../typeGeomEachCallback.js';
import {BaseLineObject} from './BaseLineObject.js';
import {lengthOfLineString} from '../../length.js';
import {distancePositionToSegment} from '../../distancePositionToSegment.js';
import {bboxFromArrayOfPositions} from '../../bbox.js';

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

  geomEach(callback: LineGeomEachCallback): void {
    callback(this);
  }

  distanceToPosition(coords: GJ.Position): number {
    let d = Infinity;
    const c = this.coordinates;
    for (let i = 0; i < c.length; i++) {
      const n = c[i].length - 1;
      for (let j = 0; j < n; j++) {
        d = Math.min(
          d,
          distancePositionToSegment(coords, [c[i][j], c[i][j + 1]]),
        );
      }
    }
    return d;
  }

  setBBox(): GJ.BBox {
    this.bbox = bboxFromArrayOfPositions(this.coordinates.flat(1));
    return this.bbox;
  }

  getBBox(): GJ.BBox {
    return this.bbox ?? this.setBBox();
  }
}
