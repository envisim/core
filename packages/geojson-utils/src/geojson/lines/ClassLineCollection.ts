import {BaseCollection} from '../ClassBaseCollection.js';
import type * as GJ from '../types.js';
import {OptionalParam} from '../util-types.js';
import {LineFeature} from './ClassLineFeature.js';

export class LineCollection
  extends BaseCollection<LineFeature>
  implements GJ.LineFeatureCollection
{
  static isCollection(obj: any): obj is LineCollection {
    return obj instanceof LineCollection;
  }

  static create(
    features: GJ.LineFeature[],
    shallow: boolean = true,
  ): LineCollection {
    return new LineCollection({features}, shallow);
  }

  features: LineFeature[];

  constructor(
    obj: OptionalParam<GJ.LineFeatureCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'FeatureCollection'}, shallow);

    this.features = obj.features.map((f: GJ.LineFeature) => {
      return new LineFeature(f, shallow);
    });
  }

  addFeature(feature: GJ.LineFeature, shallow: boolean = true): this {
    this.features.push(new LineFeature(feature, shallow));
    return this;
  }
  length(dist: number = Infinity): number {
    return this.features.reduce((prev, curr) => prev + curr.length(dist), 0);
  }
}
