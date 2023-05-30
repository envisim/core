import {BaseFeature} from '../ClassBaseFeature.js';
import type * as GJ from '../types.js';
import type {GeomEachCallback} from '../callback-types.js';
import {OptionalParam} from '../util-types.js';
import {
  LineGeometry,
  LineGeometryCollection,
} from './ClassLineGeometryCollection.js';
import {LineString, MultiLineString, LineObject} from './LineObjects.js';

export class LineFeature
  extends BaseFeature<LineGeometry>
  implements GJ.LineFeature
{
  static isFeature(obj: any): obj is LineFeature {
    return obj instanceof LineFeature;
  }

  static create(
    geometry: GJ.LineGeometry,
    properties: GJ.FeatureProperties,
    shallow: boolean = true,
  ): LineFeature {
    return new LineFeature({geometry, properties}, shallow);
  }

  constructor(
    obj: OptionalParam<GJ.LineFeature, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'Feature'}, shallow);

    switch (obj.geometry?.type) {
      case 'GeometryCollection':
        this.geometry = new LineGeometryCollection(obj.geometry, shallow);
        break;
      case 'LineString':
        this.geometry = new LineString(obj.geometry, shallow);
        break;
      case 'MultiLineString':
        this.geometry = new MultiLineString(obj.geometry, shallow);
        break;
    }
  }

  get size(): number {
    return this.geometry.size;
  }

  length(dist: number): number {
    return this.geometry.length(dist);
  }

  geomEach(
    callback: GeomEachCallback<LineObject>,
    featureIndex: number = -1,
  ): void {
    this.geometry.geomEach(callback, featureIndex);
  }

  distanceToPosition(coords: GJ.Position): number {
    return this.geometry.distanceToPosition(coords);
  }
}
