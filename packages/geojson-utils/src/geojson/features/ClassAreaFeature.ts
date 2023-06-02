import type * as GJ from '../types.js';
import type {GeomEachCallback} from '../callback-types.js';
import {AreaGeometry, toAreaGeometry} from '../gcs/index.js';
import type {AreaObject} from '../objects/index.js';
import {OptionalParam} from '../util-types.js';
import {BaseFeature} from './BaseFeature.js';

export class AreaFeature
  extends BaseFeature<AreaGeometry>
  implements GJ.AreaFeature
{
  static isFeature(obj: any): obj is AreaFeature {
    return obj instanceof AreaFeature;
  }

  static create(
    geometry: GJ.AreaGeometry,
    properties: GJ.FeatureProperties = {},
    shallow: boolean = true,
  ): AreaFeature {
    return new AreaFeature({geometry, properties}, shallow);
  }

  constructor(
    obj: OptionalParam<GJ.AreaFeature, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'Feature'}, shallow);

    this.geometry = toAreaGeometry(obj.geometry, shallow);
  }

  get size(): number {
    return this.geometry.size;
  }

  area(dist: number = Infinity): number {
    return this.geometry.area(dist);
  }

  geomEach(
    callback: GeomEachCallback<AreaObject>,
    featureIndex: number = -1,
  ): void {
    this.geometry.geomEach(callback, featureIndex);
  }

  distanceToPosition(coords: GJ.Position): number {
    return this.geometry.distanceToPosition(coords);
  }
}
