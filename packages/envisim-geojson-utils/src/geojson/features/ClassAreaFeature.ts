import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {GeometricPrimitive} from '../../geometric-primitive/index.js';
import {type AreaObject, toAreaObject} from '../objects/index.js';
import {AbstractFeature} from './AbstractFeature.js';

export class AreaFeature extends AbstractFeature<AreaObject> implements GJ.AreaFeature {
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

    this.geometry = toAreaObject(obj.geometry, shallow);
  }

  geometricPrimitive(): GeometricPrimitive.AREA {
    return GeometricPrimitive.AREA;
  }

  buffer(distance: number, steps: number = 10): AreaFeature | null {
    const bg = this.geometry.buffer(distance, steps);
    if (!bg) return null;
    // TODO: Decide if we want to copy properties
    return AreaFeature.create(bg, {}, true);
  }

  /* AREA SPECIFIC */
  area(): number {
    return this.geometry.area();
  }

  perimeter(): number {
    return this.geometry.perimeter();
  }
}
