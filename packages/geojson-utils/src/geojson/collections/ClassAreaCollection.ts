import type * as GJ from '../../types/geojson.js';
import type {GeomEachCallback} from '../callback-types.js';
import {AreaFeature} from '../features/index.js';
import {AreaObject} from '../objects/index.js';
import {OptionalParam} from '../util-types.js';
import {BaseCollection} from './BaseCollection.js';

export class AreaCollection
  extends BaseCollection<AreaObject>
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

  /* GEOJSON COMMON */
  distanceToPosition(coords: GJ.Position): number {
    return this.features.reduce((prev, curr) => {
      const d = curr.geometry.distanceToPosition(coords);
      if (prev <= 0 && d <= 0) {
        return Math.max(prev, d);
      }
      return Math.min(prev, d);
    }, Infinity);
  }

  /* COLLECTION SPECIFIC */
  geomEach(callback: GeomEachCallback<AreaObject>): void {
    this.forEach((feature, featureIndex) => {
      feature.geometry.geomEach(callback, featureIndex);
    });
  }

  addFeature(feature: AreaFeature, shallow: boolean = true): void {
    this.features.push(
      shallow === false ? new AreaFeature(feature, false) : feature,
    );
  }

  /* AREA SPECIFIC */
  area(dist: number = Infinity): number {
    return this.features.reduce((prev, curr) => prev + curr.area(dist), 0);
  }
}
