import {BaseCollection} from '../ClassBaseCollection.js';
import type * as GJ from '../types.js';
import {OptionalParam} from '../util-types.js';
import {PointFeature} from './ClassPointFeature.js';

export class PointCollection
  extends BaseCollection<PointFeature>
  implements GJ.PointFeatureCollection
{
  static isCollection(obj: any): obj is PointCollection {
    return obj instanceof PointCollection;
  }

  static create(
    features: GJ.PointFeature[],
    shallow: boolean = true,
  ): PointCollection {
    return new PointCollection({features}, shallow);
  }

  features: PointFeature[];

  constructor(
    obj: OptionalParam<GJ.PointFeatureCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'FeatureCollection'}, shallow);

    this.features = obj.features.map((f: GJ.PointFeature) => {
      return new PointFeature(f, shallow);
    });
  }

  addFeature(feature: GJ.PointFeature, shallow: boolean = true): this {
    this.features.push(new PointFeature(feature, shallow));
    return this;
  }
}
