import type * as GJ from '../types.js';
import type {OptionalParam} from '../util-types.js';
import {BaseAreaObject} from './BaseAreaObject.js';
import {areaOfPolygonLonLat} from '../../area.js';

export class Polygon extends BaseAreaObject<GJ.Polygon> implements GJ.Polygon {
  static isObject(obj: any): obj is Polygon {
    return obj instanceof Polygon;
  }

  static create(
    coordinates: GJ.Polygon['coordinates'],
    shallow: boolean = true,
  ): Polygon {
    return new Polygon({coordinates}, shallow);
  }

  constructor(obj: OptionalParam<GJ.Polygon, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'Polygon'}, shallow);
  }

  get size(): number {
    return 1;
  }

  area(dist: number = Infinity): number {
    return areaOfPolygonLonLat(this.coordinates, dist);
  }

  geomEach(callback: Function): void {
    callback(this);
  }
}
