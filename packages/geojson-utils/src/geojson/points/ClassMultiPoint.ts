import type * as GJ from '../types.js';
import {bboxFromArrayOfPositions} from '../../bbox.js';
import {distance} from '../../distance.js';
import type {GeomEachCallback} from '../callback-types.js';
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

  geomEach(
    callback: GeomEachCallback<MultiPoint>,
    featureIndex: number = -1,
  ): void {
    callback(this, featureIndex, -1);
  }

  distanceToPosition(coords: GJ.Position): number {
    return this.coordinates.reduce(
      (prev, curr) => Math.min(prev, distance(curr, coords)),
      Infinity,
    );
  }

  setBBox(): GJ.BBox {
    this.bbox = bboxFromArrayOfPositions(this.coordinates);
    return this.bbox;
  }
}
