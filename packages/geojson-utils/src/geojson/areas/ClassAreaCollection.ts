import type * as GJ from '../types.js';
import {bboxFromArrayOfBBoxes} from '../../bbox.js';
import {unionOfBBoxesInPlace} from '../../bbox.js';
import {BaseCollection} from '../ClassBaseCollection.js';
import type {GeomEachCallback} from '../typeGeomEachCallback.js';
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

  features: AreaFeature[];

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
    this.features.forEach((feature, featureIndex) => {
      if (feature.geometry.type === 'GeometryCollection') {
        feature.geometry.geometries.forEach(
          (geom: AreaObject, geomIndex: number) => {
            callback(geom, featureIndex, geomIndex);
          },
        );
      } else {
        callback(feature.geometry, featureIndex);
      }
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

  setBBox(): GJ.BBox {
    const bbox: GJ.BBox = [0, 0, 0, 0];

    this.features.forEach((feature, index) => {
      unionOfBBoxesInPlace(bbox, feature.getBBox(), index === 0);
    });

    this.bbox = bbox;
    return this.bbox;
  }

  getBBox(): GJ.BBox {
    return this.bbox ?? this.setBBox();
  }
}
