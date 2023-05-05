import type * as GJ from '../types.js';
import type {OptionalParam} from '../util-types.js';
import {BaseAreaObject} from './BaseAreaObject.js';

export class Polygon extends BaseAreaObject<GJ.Polygon> implements GJ.Polygon {
  static isObject(obj: any): obj is Polygon {
    return obj instanceof Polygon;
  }

  constructor(obj: OptionalParam<GJ.Polygon, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'Polygon'}, shallow);
  }

  create(
    coordinates: GJ.Polygon['coordinates'],
    shallow: boolean = true,
  ): Polygon {
    return new Polygon({coordinates}, shallow);
  }

  area(): number {
    return 0.0;
  }
}
