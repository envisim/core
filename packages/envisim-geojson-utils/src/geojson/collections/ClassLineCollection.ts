import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {GeometricPrimitive} from '../../geometric-primitive/index.js';
import {centroidFromMultipleCentroids} from '../../utils/centroid.js';
import {LineFeature} from '../features/index.js';
import {AbstractCollection} from './AbstractCollection.js';
import {AreaCollection} from './ClassAreaCollection.js';

export class LineCollection
  extends AbstractCollection<LineFeature>
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

  static create(features: GJ.LineFeature[], shallow: boolean = true): LineCollection {
    return new LineCollection({features}, shallow);
  }

  constructor(obj: OptionalParam<GJ.LineFeatureCollection, 'type'>, shallow: boolean = true) {
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
    return centroidFromMultipleCentroids(centroids, this.getBBox(), iterations).centroid;
  }

  /* COLLECTION SPECIFIC */
  addFeature(feature: OptionalParam<GJ.LineFeature, 'type'>, shallow: boolean = true): number {
    if (LineFeature.isFeature(feature)) {
      this.features.push(shallow === false ? new LineFeature(feature, false) : feature);
    } else {
      this.features.push(new LineFeature(feature, shallow));
    }

    return this.features.length;
  }

  /* LINE SPECIFIC */
  length(): number {
    return this.features.reduce((prev, curr) => prev + curr.length(), 0);
  }

  buffer(distance: number, steps: number = 10): AreaCollection | null {
    const features: GJ.AreaFeature[] = [];
    this.forEach((feature: LineFeature) => {
      const bf = feature.buffer(distance, steps);
      if (bf) features.push(bf);
    });
    if (features.length === 0) return null;
    return AreaCollection.create(features, true);
  }
}
