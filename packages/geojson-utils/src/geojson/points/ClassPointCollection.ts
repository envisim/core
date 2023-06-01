import type * as GJ from '../types.js';
import {BaseCollection} from '../ClassBaseCollection.js';
import type {GeomEachCallback} from '../callback-types.js';
import {OptionalParam} from '../util-types.js';
import {PointFeature} from './ClassPointFeature.js';
import {PointObject} from './PointObjects.js';

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

  constructor(
    obj: OptionalParam<GJ.PointFeatureCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'FeatureCollection'}, shallow);

    this.features = obj.features.map((f: GJ.PointFeature) => {
      return new PointFeature(f, shallow);
    });
  }

  addFeature(feature: PointFeature, shallow: boolean = true): void {
    this.features.push(
      shallow === false ? new PointFeature(feature, false) : feature,
    );
  }

  count(): number {
    return this.features.reduce(
      (prev, curr) => prev + curr.geometry.count(),
      0,
    );
  }

  geomEach(callback: GeomEachCallback<PointObject>): void {
    this.forEach((feature, featureIndex) => {
      feature.geometry.geomEach(callback, featureIndex);
    });
  }

  distanceToPosition(coords: GJ.Position): number {
    return this.features.reduce(
      (prev, curr) => Math.min(prev, curr.geometry.distanceToPosition(coords)),
      Infinity,
    );
  }
}
