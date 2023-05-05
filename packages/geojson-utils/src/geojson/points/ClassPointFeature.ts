import {BaseFeature} from '../ClassBaseFeature.js';
import type * as GJ from '../types.js';
import {OptionalParam} from '../util-types.js';
import {
  PointGeometry,
  PointGeometryCollection,
} from './ClassPointGeometryCollection.js';
import {MultiPoint, Point} from './PointObjects.js';

export class PointFeature extends BaseFeature implements GJ.PointFeature {
  static isFeature(obj: any): obj is PointFeature {
    return obj instanceof PointFeature;
  }

  geometry: PointGeometry;

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
}
