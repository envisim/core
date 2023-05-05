import type * as GJ from '../types.js';
import type {OptionalParam} from '../util-types.js';
import {BasePointObject} from './BasePointObject.js';

export class Point extends BasePointObject<GJ.Point> implements GJ.Point {
  static isObject(obj: any): obj is Point {
    return obj instanceof Point;
  }

  constructor(obj: OptionalParam<GJ.Point, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'Point'}, shallow);
  }

  create(coordinates: GJ.Point['coordinates'], shallow: boolean = true): Point {
    return new Point({coordinates}, shallow);
  }
}
