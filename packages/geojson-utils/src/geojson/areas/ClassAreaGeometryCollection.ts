import {GeoJsonObject} from '../ClassGeoJsonObject.js';
import type * as GJ from '../types.js';
import {OptionalParam} from '../util-types.js';
import {
  AreaObject,
  MultiPointCircle,
  MultiPolygon,
  PointCircle,
  Polygon,
} from './AreaObjects.js';

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
}

export type AreaGeometry = AreaObject | AreaGeometryCollection;
