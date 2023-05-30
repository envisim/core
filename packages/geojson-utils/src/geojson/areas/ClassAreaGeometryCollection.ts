import type * as GJ from '../types.js';
import {OptionalParam} from '../util-types.js';
import {
  AreaObject,
  MultiPointCircle,
  MultiPolygon,
  PointCircle,
  Polygon,
} from './AreaObjects.js';
import {BaseGeometryCollection} from '../ClassBaseGeometryCollection.js';

export class AreaGeometryCollection
  extends BaseGeometryCollection<AreaObject>
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

  area(dist: number = Infinity): number {
    return this.geometries.reduce((prev, curr) => prev + curr.area(dist), 0);
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
}

export type AreaGeometry = AreaObject | AreaGeometryCollection;
