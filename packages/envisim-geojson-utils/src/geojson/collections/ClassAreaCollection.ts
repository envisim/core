import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {GeometricPrimitive} from '../../geometric-primitive/index.js';
import {centroidFromMultipleCentroids} from '../../utils/centroid.js';
import {type GeomEachCallback} from '../base/index.js';
import {AreaFeature} from '../features/index.js';
import {AreaObject} from '../objects/index.js';
import {AbstractCollection} from './AbstractCollection.js';

export class AreaCollection
  extends AbstractCollection<AreaObject, AreaFeature>
  implements GJ.AreaFeatureCollection
{
  static isCollection(obj: unknown): obj is AreaCollection {
    return obj instanceof AreaCollection;
  }

  static assert(
    obj: unknown,
    msg: string = 'Expected AreaCollection',
  ): asserts obj is AreaCollection {
    if (!(obj instanceof AreaCollection)) throw new TypeError(msg);
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

  geometricPrimitive(): GeometricPrimitive.AREA {
    return GeometricPrimitive.AREA;
  }

  /* GEOJSON COMMON */
  override distanceToPosition(coords: GJ.Position): number {
    return this.features.reduce((prev, curr) => {
      const d = curr.geometry.distanceToPosition(coords);
      if (prev <= 0 && d <= 0) {
        return Math.max(prev, d);
      }
      return Math.min(prev, d);
    }, Infinity);
  }

  centroid(iterations: number = 2): GJ.Position {
    const centroids = this.features.map((feature: AreaFeature) => {
      return {
        centroid: feature.centroid(),
        weight: feature.area(),
      };
    });
    return centroidFromMultipleCentroids(centroids, this.getBBox(), iterations)
      .centroid;
  }

  /* COLLECTION SPECIFIC */
  geomEach(callback: GeomEachCallback<AreaObject>): void {
    this.forEach((feature, featureIndex) => {
      feature.geometry.geomEach(callback, featureIndex);
    });
  }

  addFeature(
    feature: OptionalParam<GJ.AreaFeature, 'type'>,
    shallow: boolean = true,
  ): number {
    if (AreaFeature.isFeature(feature)) {
      this.features.push(
        shallow === false ? new AreaFeature(feature, false) : feature,
      );
    } else {
      this.features.push(new AreaFeature(feature, shallow));
    }

    return this.features.length;
  }

  /* AREA SPECIFIC */
  area(): number {
    return this.features.reduce((prev, curr) => prev + curr.area(), 0);
  }

  perimeter(): number {
    return this.features.reduce((prev, curr) => prev + curr.perimeter(), 0);
  }
}
