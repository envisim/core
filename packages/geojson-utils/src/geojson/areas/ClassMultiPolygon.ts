import type * as GJ from '../types.js';
import type {OptionalParam} from '../util-types.js';
import {BaseAreaObject} from './BaseAreaObject.js';
import {areaOfPolygonLonLat} from '../../area.js';

export class MultiPolygon
  extends BaseAreaObject<GJ.MultiPolygon>
  implements GJ.MultiPolygon
{
  static isObject(obj: any): obj is MultiPolygon {
    return obj instanceof MultiPolygon;
  }

  static create(
    coordinates: GJ.MultiPolygon['coordinates'],
    shallow: boolean = true,
  ): MultiPolygon {
    return new MultiPolygon({coordinates}, shallow);
  }

  constructor(
    obj: OptionalParam<GJ.MultiPolygon, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'MultiPolygon'}, shallow);
  }

  get size(): number {
    return this.coordinates.length;
  }

  area(dist: number = Infinity): number {
    return this.coordinates.reduce(
      (prev, curr) => prev + areaOfPolygonLonLat(curr, dist),
      0,
    );
  }

  geomEach(callback: Function): void {
    callback(this);
  }
}
