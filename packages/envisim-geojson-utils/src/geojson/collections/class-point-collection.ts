import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {type BufferOptions} from '../../buffer/index.js';
import {GeometricPrimitive} from '../../geometric-primitive/index.js';
import {centroidFromMultipleCentroids} from '../../utils/centroid.js';
import {PointFeature} from '../features/index.js';
import {AbstractCollection} from './abstract-collection.js';
import {AreaCollection} from './class-area-collection.js';

export class PointCollection
  extends AbstractCollection<PointFeature>
  implements GJ.PointFeatureCollection
{
  static isCollection(obj: unknown): obj is PointCollection {
    return obj instanceof PointCollection;
  }

  static assert(
    obj: unknown,
    msg: string = 'Expected PointCollection',
  ): asserts obj is PointCollection {
    if (!(obj instanceof PointCollection)) throw new TypeError(msg);
  }

  static create(features: GJ.PointFeature[], shallow: boolean = true): PointCollection {
    return new PointCollection({features}, shallow);
  }

  constructor(obj: OptionalParam<GJ.PointFeatureCollection, 'type'>, shallow: boolean = true) {
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
    return centroidFromMultipleCentroids(centroids, this.getBBox(), iterations).centroid;
  }

  /* COLLECTION SPECIFIC */

  addFeature(feature: OptionalParam<GJ.PointFeature, 'type'>, shallow: boolean = true): number {
    if (PointFeature.isFeature(feature)) {
      this.features.push(shallow === false ? new PointFeature(feature, false) : feature);
    } else {
      this.features.push(new PointFeature(feature, shallow));
    }

    return this.features.length;
  }

  /* POINT SPECIFIC */
  count(): number {
    return this.features.reduce((prev, curr) => prev + curr.geometry.count(), 0);
  }

  buffer(options: BufferOptions): AreaCollection | null {
    const ac = AreaCollection.create([]);

    this.forEach((feature) => {
      const bf = feature.buffer(options);
      if (bf !== null) ac.addFeature(bf, true);
    });

    if (ac.features.length === 0) return null;
    return ac;
  }
}
