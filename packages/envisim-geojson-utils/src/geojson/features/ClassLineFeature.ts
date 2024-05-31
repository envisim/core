import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {GeometricPrimitive} from '../../geometric-primitive/GeometricPrimitive.js';
import {type GeomEachCallback} from '../base/index.js';
import {LineGeometry, toLineGeometry} from '../gcs/index.js';
import {type LineObject} from '../objects/index.js';
import {AbstractFeature} from './AbstractFeature.js';

export class LineFeature
  extends AbstractFeature<LineObject, LineGeometry>
  implements GJ.LineFeature
{
  static isFeature(obj: unknown): obj is LineFeature {
    return obj instanceof LineFeature;
  }

  static assert(obj: unknown, msg?: string): obj is LineFeature {
    if (obj instanceof LineFeature) return true;
    throw new TypeError(msg ?? 'Expected LineFeature');
  }

  static create(
    geometry: GJ.LineGeometry,
    properties: GJ.FeatureProperties = {},
    shallow: boolean = true,
  ): LineFeature {
    return new LineFeature({geometry, properties}, shallow);
  }

  constructor(
    obj: OptionalParam<GJ.LineFeature, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'Feature'}, shallow);

    this.geometry = toLineGeometry(obj.geometry, shallow);
  }

  geometricPrimitive(): GeometricPrimitive.LINE {
    return GeometricPrimitive.LINE;
  }

  /* FEATURE SPECIFIC */
  geomEach(
    callback: GeomEachCallback<LineObject>,
    featureIndex: number = -1,
  ): void {
    this.geometry.geomEach(callback, featureIndex);
  }

  /* LINE SPECIFIC */
  length(): number {
    return this.geometry.length();
  }
}
