import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {GeometricPrimitive} from '../../geometric-primitive/index.js';
import {centroidFromMultipleCentroids} from '../../utils/centroid.js';
import {type GeomEachCallback} from '../base/index.js';
import {PointFeature} from '../features/index.js';
import {PointObject} from '../objects/index.js';
import {AbstractCollection} from './AbstractCollection.js';

export class PointCollection
  extends AbstractCollection<PointObject, PointFeature>
  implements GJ.PointFeatureCollection
{
  static isCollection(obj: unknown): obj is PointCollection {
    return obj instanceof PointCollection;
  }

  static assert(obj: unknown, msg?: string): obj is PointCollection {
    if (obj instanceof PointCollection) return true;
    throw new TypeError(msg ?? 'Expected PointCollection');
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

  geometricPrimitive(): GeometricPrimitive.POINT {
    return GeometricPrimitive.POINT;
  }

  centroid(iterations: number = 2): GJ.Position {
    const centroids = this.features.map((feature: PointFeature) => {
      return {
        centroid: feature.centroid(),
        weight: feature.count(),
      };
    });
    return centroidFromMultipleCentroids(centroids, this.getBBox(), iterations)
      .centroid;
  }

  /* COLLECTION SPECIFIC */
  geomEach(callback: GeomEachCallback<PointObject>): void {
    this.forEach((feature, featureIndex) => {
      feature.geometry.geomEach(callback, featureIndex);
    });
  }

  addFeature(
    feature: OptionalParam<GJ.PointFeature, 'type'>,
    shallow: boolean = true,
  ): void {
    if (PointFeature.isFeature(feature)) {
      this.features.push(
        shallow === false ? new PointFeature(feature, false) : feature,
      );
    } else {
      this.features.push(new PointFeature(feature, shallow));
    }
  }

  /* POINT SPECIFIC */
  count(): number {
    return this.features.reduce(
      (prev, curr) => prev + curr.geometry.count(),
      0,
    );
  }
}
