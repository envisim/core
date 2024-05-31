import type * as GJ from '../../types/geojson.js';
import {GeometricPrimitive} from '../../geometric-primitive/GeometricPrimitive.js';
import {centroidFromMultipleCentroids} from '../../utils/centroid.js';
import type {GeomEachCallback, OptionalParam} from '../base/index.js';
import {LineFeature} from '../features/index.js';
import {LineObject} from '../objects/index.js';
import {AbstractCollection} from './AbstractCollection.js';

export class LineCollection
  extends AbstractCollection<LineObject, LineFeature>
  implements GJ.LineFeatureCollection
{
  static isCollection(obj: unknown): obj is LineCollection {
    return obj instanceof LineCollection;
  }

  static assert(
    obj: unknown,
    msg: string = 'Expected LineCollection',
  ): asserts obj is LineCollection {
    if (!(obj instanceof LineCollection)) throw new TypeError(msg);
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

  geometricPrimitive(): GeometricPrimitive.LINE {
    return GeometricPrimitive.LINE;
  }

  centroid(iterations: number = 2): GJ.Position {
    const centroids = this.features.map((feature: LineFeature) => {
      return {
        centroid: feature.centroid(),
        weight: feature.length(),
      };
    });
    return centroidFromMultipleCentroids(centroids, this.getBBox(), iterations)
      .centroid;
  }

  /* COLLECTION SPECIFIC */
  geomEach(callback: GeomEachCallback<LineObject>): void {
    this.forEach((feature, featureIndex) => {
      feature.geometry.geomEach(callback, featureIndex);
    });
  }

  addFeature(
    feature: OptionalParam<GJ.LineFeature, 'type'>,
    shallow: boolean = true,
  ): void {
    if (LineFeature.isFeature(feature)) {
      this.features.push(
        shallow === false ? new LineFeature(feature, false) : feature,
      );
    } else {
      this.features.push(new LineFeature(feature, shallow));
    }
  }

  /* LINE SPECIFIC */
  length(): number {
    return this.features.reduce((prev, curr) => prev + curr.length(), 0);
  }
}
