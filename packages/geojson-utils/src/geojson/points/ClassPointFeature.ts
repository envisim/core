import type * as GJ from '../types.js';
import {BaseFeature} from '../ClassBaseFeature.js';
import type {GeomEachCallback} from '../callback-types.js';
import {OptionalParam} from '../util-types.js';
import {
  PointGeometry,
  PointGeometryCollection,
} from './ClassPointGeometryCollection.js';
import {MultiPoint, Point, PointObject} from './PointObjects.js';

export class PointFeature
  extends BaseFeature<PointGeometry>
  implements GJ.PointFeature
{
  static isFeature(obj: any): obj is PointFeature {
    return obj instanceof PointFeature;
  }

  static create(
    geometry: GJ.PointGeometry,
    properties: GJ.FeatureProperties,
    shallow: boolean = true,
  ): PointFeature {
    return new PointFeature({geometry, properties}, shallow);
  }

  constructor(
    obj: OptionalParam<GJ.PointFeature, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'Feature'}, shallow);

    switch (obj.geometry?.type) {
      case 'GeometryCollection':
        this.geometry = new PointGeometryCollection(obj.geometry, shallow);
        break;
      case 'Point':
        this.geometry = new Point(obj.geometry, shallow);
        break;
      case 'MultiPoint':
        this.geometry = new MultiPoint(obj.geometry, shallow);
        break;
    }
  }

  get size(): number {
    return this.geometry.size;
  }

  count(): number {
    return this.geometry.count();
  }

  geomEach(
    callback: GeomEachCallback<PointObject>,
    featureIndex: number = -1,
  ): void {
    this.geometry.geomEach(callback, featureIndex);
  }

  distanceToPosition(coords: GJ.Position): number {
    return this.geometry.distanceToPosition(coords);
  }
}
