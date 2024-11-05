import {type OptionalParam, copy} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {type BufferOptions} from '../../buffer/index.js';
import {GeometricPrimitive} from '../../geometric-primitive/index.js';
import {type GeomEachCallback} from '../base/index.js';
import {PointGeometry, toPointGeometry} from '../gcs/index.js';
import {type PointObject} from '../objects/index.js';
import {AbstractFeature} from './AbstractFeature.js';
import {AreaFeature} from './ClassAreaFeature.js';

export class PointFeature
  extends AbstractFeature<PointObject, PointGeometry>
  implements GJ.PointFeature
{
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

    this.geometry = toPointGeometry(obj.geometry, shallow);
  }

  geometricPrimitive(): GeometricPrimitive.POINT {
    return GeometricPrimitive.POINT;
  }

  buffer(options: BufferOptions): AreaFeature | null {
    const bg = this.geometry.buffer(options);
    if (bg === null) return null;
    return AreaFeature.create(bg, copy(this.properties), true);
  }

  /* FEATURE SPECIFIC */
  geomEach(callback: GeomEachCallback<PointObject>, featureIndex: number = -1): void {
    this.geometry.geomEach(callback, featureIndex);
  }

  /* POINT SPECIFIC */
  count(): number {
    return this.geometry.count();
  }
}
