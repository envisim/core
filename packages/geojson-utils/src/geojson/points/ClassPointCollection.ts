import {BaseCollection} from '../ClassBaseCollection.js';
import type * as GJ from '../types.js';
import type {GeomEachCallback} from '../typeGeomEachCallback.js';
import {OptionalParam} from '../util-types.js';
import {PointFeature} from './ClassPointFeature.js';
import {PointObject} from './PointObjects.js';
import {bboxFromArrayOfBBoxes} from '../../bbox.js';

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

  features: PointFeature[];

  constructor(
    obj: OptionalParam<GJ.PointFeatureCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'FeatureCollection'}, shallow);

    this.features = obj.features.map((f: GJ.PointFeature) => {
      return new PointFeature(f, shallow);
    });
  }

  addFeature(feature: GJ.PointFeature, shallow: boolean = true): this {
    this.features.push(new PointFeature(feature, shallow));
    return this;
  }

  count(): number {
    return this.features.reduce(
      (prev, curr) => prev + curr.geometry.count(),
      0,
    );
  }

  geomEach(callback: GeomEachCallback<PointObject>): void {
    this.features.forEach((feature, featureIndex) => {
      if (feature.geometry.type === 'GeometryCollection') {
        feature.geometry.geometries.forEach(
          (geom: PointObject, geomIndex: number) => {
            callback(geom, featureIndex, geomIndex);
          },
        );
      } else {
        callback(feature.geometry, featureIndex);
      }
    });
  }

  distanceToPosition(coords: GJ.Position): number {
    return this.features.reduce(
      (prev, curr) => Math.min(prev, curr.geometry.distanceToPosition(coords)),
      Infinity,
    );
  }

  setBBox(): GJ.BBox {
    const bboxArray: GJ.BBox[] = new Array(this.features.length);
    this.features.forEach((feature, index) => {
      bboxArray[index] = feature.getBBox();
    });
    this.bbox = bboxFromArrayOfBBoxes(bboxArray);
    return this.bbox;
  }

  getBBox(): GJ.BBox {
    return this.bbox ?? this.setBBox();
  }
}
