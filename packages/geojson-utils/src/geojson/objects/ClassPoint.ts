import type * as GJ from '../../types/geojson.js';
import {distance} from '../../utils/distance.js';
import type {GeomEachCallback} from '../callback-types.js';
import type {OptionalParam} from '../util-types.js';
import {BasePointObject} from './BasePointObject.js';

export class Point extends BasePointObject<GJ.Point> implements GJ.Point {
  static isObject(obj: unknown): obj is Point {
    return obj instanceof Point;
  }

  static assert(obj: unknown, msg?: string): obj is Point {
    if (obj instanceof Point) return true;
    throw new TypeError(msg ?? 'Expected Point');
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

  geomEach(callback: GeomEachCallback<Point>, featureIndex: number = -1): void {
    callback(this, featureIndex, -1);
  }

  distanceToPosition(coords: GJ.Position): number {
    return distance(coords, this.coordinates);
  }

  setBBox(): GJ.BBox {
    this.bbox = [...this.coordinates, ...this.coordinates] as GJ.BBox;
    return this.bbox;
  }
}
