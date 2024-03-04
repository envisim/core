import type * as GJ from '../../types/geojson.js';
import type {GeomEachCallback} from '../callback-types.js';
import {toAreaGeometry} from '../gcs/index.js';
import type {AreaObject} from '../objects/index.js';
import {OptionalParam} from '../util-types.js';
import {BaseFeature} from './BaseFeature.js';

export class AreaFeature
  extends BaseFeature<AreaObject>
  implements GJ.AreaFeature
{
  static isFeature(obj: unknown): obj is AreaFeature {
    return obj instanceof AreaFeature;
  }

  static assert(obj: unknown, msg?: string): obj is AreaFeature {
    if (obj instanceof AreaFeature) return true;
    throw new TypeError(msg ?? 'Expected AreaFeature');
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

  /* FEATURE SPECIFIC */
  geomEach(
    callback: GeomEachCallback<AreaObject>,
    featureIndex: number = -1,
  ): void {
    this.geometry.geomEach(callback, featureIndex);
  }

  /* AREA SPECIFIC */
  area(): number {
    return this.geometry.area();
  }

  perimeter(): number {
    return this.geometry.perimeter();
  }
}
