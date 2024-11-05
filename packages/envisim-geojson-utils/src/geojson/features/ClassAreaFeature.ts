import {type OptionalParam, copy} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {type BufferOptions} from '../../buffer/index.js';
import {GeometricPrimitive} from '../../geometric-primitive/index.js';
import {type GeomEachCallback} from '../base/index.js';
import {AreaGeometry, toAreaGeometry} from '../gcs/index.js';
import {type AreaObject} from '../objects/index.js';
import {AbstractFeature} from './AbstractFeature.js';

export class AreaFeature
  extends AbstractFeature<AreaObject, AreaGeometry>
  implements GJ.AreaFeature
{
  static isFeature(obj: unknown): obj is AreaFeature {
    return obj instanceof AreaFeature;
  }

  static assert(obj: unknown, msg: string = 'Expected AreaFeature'): asserts obj is AreaFeature {
    if (!(obj instanceof AreaFeature)) throw new TypeError(msg);
  }

  static create(
    geometry: GJ.AreaGeometry,
    properties: GJ.FeatureProperties = {},
    shallow: boolean = true,
  ): AreaFeature {
    return new AreaFeature({geometry, properties}, shallow);
  }

  constructor(obj: OptionalParam<GJ.AreaFeature, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'Feature'}, shallow);

    this.geometry = toAreaGeometry(obj.geometry, shallow);
  }

  geometricPrimitive(): GeometricPrimitive.AREA {
    return GeometricPrimitive.AREA;
  }

  buffer(options: BufferOptions): AreaFeature | null {
    const bg = this.geometry.buffer(options);
    if (bg === null) return null;
    return AreaFeature.create(bg, copy(this.properties), true);
  }

  /* FEATURE SPECIFIC */
  geomEach(callback: GeomEachCallback<AreaObject>, featureIndex: number = -1): void {
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
