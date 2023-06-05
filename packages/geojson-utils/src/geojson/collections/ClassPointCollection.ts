import type * as GJ from '../../types/geojson.js';
import type {GeomEachCallback} from '../callback-types.js';
import {PointFeature} from '../features/index.js';
import {PointObject} from '../objects/index.js';
import {OptionalParam} from '../util-types.js';
import {BaseCollection} from './BaseCollection.js';

export class PointCollection
  extends BaseCollection<PointObject>
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

  /* COLLECTION SPECIFIC */
  geomEach(callback: GeomEachCallback<PointObject>): void {
    this.forEach((feature, featureIndex) => {
      feature.geometry.geomEach(callback, featureIndex);
    });
  }

  addFeature(feature: PointFeature, shallow: boolean = true): void {
    this.features.push(
      shallow === false ? new PointFeature(feature, false) : feature,
    );
  }

  /* POINT SPECIFIC */
  count(): number {
    return this.features.reduce(
      (prev, curr) => prev + curr.geometry.count(),
      0,
    );
  }
}
