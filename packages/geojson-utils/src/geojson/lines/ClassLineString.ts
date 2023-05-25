import type * as GJ from '../types.js';
import type {OptionalParam} from '../util-types.js';
import type {GeomEachCallback} from '../typeGeomEachCallback.js';
import {BaseLineObject} from './BaseLineObject.js';
import {lengthOfLineString} from '../../length.js';
import {distancePositionToSegment} from '../../distancePositionToSegment.js';
import {bboxFromArrayOfPositions} from '../../bbox.js';

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

  geomEach(callback: GeomEachCallback<LineString>): void {
    callback(this);
  }

  distanceToPosition(coords: GJ.Position): number {
    let d = Infinity;
    const c = this.coordinates;
    const n = c.length - 1;
    for (let i = 0; i < n; i++) {
      d = Math.min(d, distancePositionToSegment(coords, [c[i], c[i + 1]]));
    }
    return d;
  }

  setBBox(): GJ.BBox {
    this.bbox = bboxFromArrayOfPositions(this.coordinates);
    return this.bbox;
  }

  getBBox(): GJ.BBox {
    return this.bbox ?? this.setBBox();
  }
}
