import type * as GJ from '../../types/geojson.js';
import {bboxFromPositions} from '../../utils/bbox.js';
import {distance} from '../../utils/distance.js';
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

  static assert(obj: any, msg?: string): obj is MultiPoint {
    if (obj instanceof MultiPoint) return true;
    throw new TypeError(msg ?? 'Expected MultiPoint');
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
    this.bbox = bboxFromPositions(this.coordinates);
    return this.bbox;
  }
}
