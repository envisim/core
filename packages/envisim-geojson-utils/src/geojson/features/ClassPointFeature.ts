import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {type GeomEachCallback} from '../base/index.js';
import {PointGeometry, toPointGeometry} from '../gcs/index.js';
import {type PointObject} from '../objects/index.js';
import {AbstractFeature} from './AbstractFeature.js';

export class PointFeature
  extends AbstractFeature<PointObject, PointGeometry>
  implements GJ.PointFeature
{
  static isFeature(obj: unknown): obj is PointFeature {
    return obj instanceof PointFeature;
  }

  static assert(obj: unknown, msg?: string): obj is PointFeature {
    if (obj instanceof PointFeature) return true;
    throw new TypeError(msg ?? 'Expected PointFeature');
  }

  static create(
    geometry: GJ.PointGeometry,
    properties: GJ.FeatureProperties = {},
    shallow: boolean = true,
  ): PointFeature {
    return new PointFeature({geometry, properties}, shallow);
  }

  constructor(
    obj: OptionalParam<GJ.PointFeature, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'Feature'}, shallow);

    this.geometry = toPointGeometry(obj.geometry, shallow);
  }

  /* FEATURE SPECIFIC */
  geomEach(
    callback: GeomEachCallback<PointObject>,
    featureIndex: number = -1,
  ): void {
    this.geometry.geomEach(callback, featureIndex);
  }

  /* POINT SPECIFIC */
  count(): number {
    return this.geometry.count();
  }
}
