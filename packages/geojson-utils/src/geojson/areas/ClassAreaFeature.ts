import {BaseFeature} from '../ClassBaseFeature.js';
import type * as GJ from '../types.js';
import {OptionalParam} from '../util-types.js';
import {
  MultiPointCircle,
  MultiPolygon,
  PointCircle,
  Polygon,
} from './AreaObjects.js';
import {
  AreaGeometry,
  AreaGeometryCollection,
} from './ClassAreaGeometryCollection.js';

export class AreaFeature extends BaseFeature implements GJ.AreaFeature {
  static isFeature(obj: any): obj is AreaFeature {
    return obj instanceof AreaFeature;
  }

  static create(
    geometry: GJ.AreaGeometry,
    properties: GJ.FeatureProperties,
    shallow: boolean = true,
  ): AreaFeature {
    return new AreaFeature({geometry, properties}, shallow);
  }

  geometry: AreaGeometry;

  constructor(
    obj: OptionalParam<GJ.AreaFeature, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'Feature'}, shallow);

    switch (obj.geometry?.type) {
      case 'GeometryCollection':
        this.geometry = new AreaGeometryCollection(obj.geometry, shallow);
        break;
      case 'Point':
        this.geometry = new PointCircle(obj.geometry, shallow);
        break;
      case 'MultiPoint':
        this.geometry = new MultiPointCircle(obj.geometry, shallow);
        break;
      case 'Polygon':
        this.geometry = new Polygon(obj.geometry, shallow);
        break;
      case 'MultiPolygon':
        this.geometry = new MultiPolygon(obj.geometry, shallow);
        break;
    }
  }

  get size(): number {
    return this.geometry.size;
  }

  area(dist: number = Infinity): number {
    return this.geometry.area(dist);
  }

  geomEach(callback: Function): void {
    if (this.geometry.type === 'GeometryCollection') {
      this.geometry.geometries.forEach(
        (geom: GJ.AreaObject, geomIndex: number) => {
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
