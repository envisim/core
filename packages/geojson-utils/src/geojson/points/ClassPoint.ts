import type * as GJ from '../types.js';
import type {OptionalParam} from '../util-types.js';
import {BasePointObject} from './BasePointObject.js';
import {distance} from '../../distance.js';

export class Point extends BasePointObject<GJ.Point> implements GJ.Point {
  static isObject(obj: any): obj is Point {
    return obj instanceof Point;
  }

  static create(
    coordinates: GJ.Point['coordinates'],
    shallow: boolean = true,
  ): Point {
    return new Point({coordinates}, shallow);
  }

  constructor(obj: OptionalParam<GJ.Point, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'Point'}, shallow);
  }

  get size(): number {
    return 1;
  }

  count(): number {
    return 1;
  }

  geomEach(callback: Function): void {
    callback(this);
  }

  distanceToPosition(coords: GJ.Position): number {
    return distance(coords, this.coordinates);
  }

  setBBox(): GJ.BBox {
    const c = this.coordinates;
    // Got to love typescript!
    // Try remove the if, then it complains as it think the length of the bbox might be 5
    // as the length of c might be 2 or 3...
    if (c.length === 3) {
      this.bbox = [...c, ...c];
    } else {
      this.bbox = [...c, ...c];
    }
    return this.bbox;
  }

  getBBox(): GJ.BBox {
    return this.bbox ?? this.setBBox();
  }
}
