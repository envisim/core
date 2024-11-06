import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {type PointObject, toPointObject} from '../objects/index.js';
import {AbstractFeature} from './abstract-feature.js';

export class PointFeature extends AbstractFeature<PointObject> implements GJ.PointFeature {
  static isFeature(obj: unknown): obj is PointFeature {
    return obj instanceof PointFeature;
  }

  static assert(obj: unknown, msg: string = 'Expected PointFeature'): asserts obj is PointFeature {
    if (!(obj instanceof PointFeature)) throw new TypeError(msg);
  }

  static create(
    geometry: GJ.PointGeometry,
    properties: GJ.FeatureProperties = {},
    shallow: boolean = true,
  ): PointFeature {
    return new PointFeature({geometry, properties}, shallow);
  }

  constructor(obj: OptionalParam<GJ.PointFeature, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'Feature'}, shallow);

    this.geometry = toPointObject(obj.geometry, shallow);
  }
}
