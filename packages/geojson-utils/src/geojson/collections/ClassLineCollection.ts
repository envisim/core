import type * as GJ from '../types.js';
import type {GeomEachCallback} from '../callback-types.js';
import {LineFeature} from '../features/index.js';
import {LineObject} from '../objects/index.js';
import {OptionalParam} from '../util-types.js';
import {BaseCollection} from './BaseCollection.js';

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

  constructor(
    obj: OptionalParam<GJ.LineFeatureCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'FeatureCollection'}, shallow);

    this.features = obj.features.map((f: GJ.LineFeature) => {
      return new LineFeature(f, shallow);
    });
  }

  addFeature(feature: LineFeature, shallow: boolean = true): void {
    this.features.push(
      shallow === false ? new LineFeature(feature, false) : feature,
    );
  }

  length(dist: number = Infinity): number {
    return this.features.reduce((prev, curr) => prev + curr.length(dist), 0);
  }

  geomEach(callback: GeomEachCallback<LineObject>): void {
    this.forEach((feature, featureIndex) => {
      feature.geometry.geomEach(callback, featureIndex);
    });
  }

  distanceToPosition(coords: GJ.Position): number {
    return this.features.reduce((prev, curr) => {
      return Math.min(prev, curr.geometry.distanceToPosition(coords));
    }, Infinity);
  }
}
