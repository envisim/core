import type * as GJ from '../types.js';
import {BaseCollection} from '../ClassBaseCollection.js';
import type {GeomEachCallback} from '../callback-types.js';
import {OptionalParam} from '../util-types.js';
import {AreaObject} from './AreaObjects.js';
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

  area(dist: number = Infinity): number {
    return this.features.reduce((prev, curr) => prev + curr.area(dist), 0);
  }

  geomEach(callback: GeomEachCallback<AreaObject>): void {
    this.forEach((feature, featureIndex) => {
      feature.geometry.geomEach(callback, featureIndex);
    });
  }

  distanceToPosition(coords: GJ.Position): number {
    return this.features.reduce((prev, curr) => {
      const d = curr.geometry.distanceToPosition(coords);
      if (prev <= 0 && d <= 0) {
        return Math.max(prev, d);
      }
      return Math.min(prev, d);
    }, Infinity);
  }
}
