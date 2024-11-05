import {type OptionalParam, copy} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {type BufferOptions} from '../../buffer/index.js';
import {GeometricPrimitive} from '../../geometric-primitive/index.js';
import {type LineObject, toLineObject} from '../objects/index.js';
import {AbstractFeature} from './AbstractFeature.js';
import {AreaFeature} from './ClassAreaFeature.js';

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

  geometricPrimitive(): GeometricPrimitive.LINE {
    return GeometricPrimitive.LINE;
  }

  buffer(options: BufferOptions): AreaFeature | null {
    const bg = this.geometry.buffer(options);
    if (bg === null) return null;
    return AreaFeature.create(bg, copy(this.properties), true);
  }

  /* LINE SPECIFIC */
  length(): number {
    return this.geometry.length();
  }
}
