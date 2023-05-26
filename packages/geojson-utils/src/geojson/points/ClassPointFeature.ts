import {BaseFeature} from '../ClassBaseFeature.js';
import type * as GJ from '../types.js';
import type {GeomEachCallback} from '../typeGeomEachCallback.js';
import {OptionalParam} from '../util-types.js';
import {
  PointGeometry,
  PointGeometryCollection,
} from './ClassPointGeometryCollection.js';
import {MultiPoint, Point, PointObject} from './PointObjects.js';

export class PointFeature extends BaseFeature implements GJ.PointFeature {
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

  get size(): number {
    return this.geometry.size;
  }

  count(): number {
    return this.geometry.count();
  }

  geomEach(callback: GeomEachCallback<PointObject>): void {
    if (PointGeometryCollection.isGeometryCollection(this.geometry)) {
      this.geometry.geometries.forEach(
        (geom: PointObject, geomIndex: number) => {
          callback(geom, geomIndex);
        },
      );
    } else {
      callback(this.geometry);
    }
  }

  distanceToPosition(coords: GJ.Position): number {
    return this.geometry.distanceToPosition(coords);
  }

  setBBox(): GJ.BBox {
    // need setBBox to recompute here
    this.bbox = this.geometry.setBBox();
    return this.bbox;
  }

  getBBox(): GJ.BBox {
    return this.bbox ?? this.geometry.getBBox();
  }
}
