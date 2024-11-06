import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {type LineObject, toLineObject} from '../objects/index.js';
import {AbstractFeature} from './abstract-feature.js';

export class LineFeature extends AbstractFeature<LineObject> implements GJ.LineFeature {
  static isFeature(obj: unknown): obj is LineFeature {
    return obj instanceof LineFeature;
  }

  static assert(obj: unknown, msg: string = 'Expected LineFeature'): asserts obj is LineFeature {
    if (!(obj instanceof LineFeature)) throw new TypeError(msg);
  }

  static create(
    geometry: GJ.LineGeometry,
    properties: GJ.FeatureProperties = {},
    shallow: boolean = true,
  ): LineFeature {
    return new LineFeature({geometry, properties}, shallow);
  }

  constructor(obj: OptionalParam<GJ.LineFeature, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'Feature'}, shallow);

    this.geometry = toLineObject(obj.geometry, shallow);
  }
}
