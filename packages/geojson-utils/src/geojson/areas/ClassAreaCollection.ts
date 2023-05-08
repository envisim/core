import {BaseCollection} from '../ClassBaseCollection.js';
import type * as GJ from '../types.js';
import {OptionalParam} from '../util-types.js';
import {AreaFeature} from './ClassAreaFeature.js';

export class AreaCollection
  extends BaseCollection<AreaFeature>
  implements GJ.AreaFeatureCollection
{
  static isCollection(obj: any): obj is AreaCollection {
    return obj instanceof AreaCollection;
  }

  static create(
    features: GJ.AreaFeature[],
    shallow: boolean = true,
  ): AreaCollection {
    return new AreaCollection({features}, shallow);
  }

  features: AreaFeature[];

  constructor(
    obj: OptionalParam<GJ.AreaFeatureCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'FeatureCollection'}, shallow);

    this.features = obj.features.map((f: GJ.AreaFeature) => {
      return new AreaFeature(f, shallow);
    });
  }

  addFeature(feature: GJ.AreaFeature, shallow: boolean = true): this {
    this.features.push(new AreaFeature(feature, shallow));
    return this;
  }
}
