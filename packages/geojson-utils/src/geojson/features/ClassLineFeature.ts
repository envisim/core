import type * as GJ from '../../types/geojson.js';
import type {GeomEachCallback} from '../callback-types.js';
import {toLineGeometry} from '../gcs/index.js';
import type {LineObject} from '../objects/index.js';
import {OptionalParam} from '../util-types.js';
import {BaseFeature} from './BaseFeature.js';

export class LineFeature
  extends BaseFeature<LineObject>
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

  /* FEATURE SPECIFIC */
  geomEach(
    callback: GeomEachCallback<LineObject>,
    featureIndex: number = -1,
  ): void {
    this.geometry.geomEach(callback, featureIndex);
  }

  /* LINE SPECIFIC */
  length(dist: number): number {
    return this.geometry.length(dist);
  }
}
