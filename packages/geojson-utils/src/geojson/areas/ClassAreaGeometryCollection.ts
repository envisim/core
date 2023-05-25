import {GeoJsonObject} from '../ClassGeoJsonObject.js';
import type * as GJ from '../types.js';
import {OptionalParam} from '../util-types.js';
import type {GeomEachCallback} from '../typeGeomEachCallback.js';
import {
  AreaObject,
  MultiPointCircle,
  MultiPolygon,
  PointCircle,
  Polygon,
} from './AreaObjects.js';
import {bboxFromArrayOfBBoxes} from '../../bbox.js';

export class AreaGeometryCollection
  extends GeoJsonObject<'GeometryCollection'>
  implements GJ.AreaGeometryCollection
{
  static isGeometryCollection(obj: any): obj is AreaGeometryCollection {
    return obj instanceof AreaGeometryCollection;
  }

  static create(
    geometries: GJ.AreaObject[],
    shallow: boolean = true,
  ): AreaGeometryCollection {
    return new AreaGeometryCollection({geometries}, shallow);
  }

  geometries: AreaObject[];

  constructor(
    obj: OptionalParam<GJ.AreaGeometryCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'GeometryCollection'}, shallow);

    this.geometries = obj.geometries.map((g: GJ.AreaObject) => {
      switch (g.type) {
        case 'Point':
          return new PointCircle(g, true);
        case 'MultiPoint':
          return new MultiPointCircle(g, true);
        case 'Polygon':
          return new Polygon(g, true);
        case 'MultiPolygon':
          return new MultiPolygon(g, true);
      }
    });
  }

  get size(): number {
    return this.geometries.length;
  }

  area(dist: number = Infinity): number {
    return this.geometries.reduce((prev, curr) => prev + curr.area(dist), 0);
  }

  geomEach(callback: GeomEachCallback<AreaObject>): void {
    this.geometries.forEach((geom, geomIndex) => {
      callback(geom, geomIndex);
    });
  }

  distanceToPosition(coords: GJ.Position): number {
    return this.geometries.reduce((prev, curr) => {
      const d = curr.distanceToPosition(coords);
      if (prev <= 0 && d <= 0) {
        return Math.max(d, prev);
      }
      return Math.min(d, prev);
    }, Infinity);
  }

  setBBox(): GJ.BBox {
    let bboxArray: GJ.BBox[] = new Array(this.geometries.length);
    this.geometries.forEach((geom, index) => {
      bboxArray[index] = geom.getBBox();
    });
    this.bbox = bboxFromArrayOfBBoxes(bboxArray);
    return this.bbox;
  }

  getBBox(): GJ.BBox {
    return this.bbox ?? this.setBBox();
  }
}

export type AreaGeometry = AreaObject | AreaGeometryCollection;
