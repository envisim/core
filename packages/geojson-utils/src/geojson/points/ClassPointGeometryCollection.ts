import {GeoJsonObject} from '../ClassGeoJsonObject.js';
import type * as GJ from '../types.js';
import {OptionalParam} from '../util-types.js';
import {MultiPoint, Point, PointObject} from './PointObjects.js';

export class PointGeometryCollection
  extends GeoJsonObject<'GeometryCollection'>
  implements GJ.PointGeometryCollection
{
  static isGeometryCollection(obj: any): obj is PointGeometryCollection {
    return obj instanceof PointGeometryCollection;
  }

  static create(
    geometries: GJ.PointObject[],
    shallow: boolean = true,
  ): PointGeometryCollection {
    return new PointGeometryCollection({geometries}, shallow);
  }

  geometries: PointObject[];

  constructor(
    obj: OptionalParam<GJ.PointGeometryCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'GeometryCollection'}, shallow);

    this.geometries = obj.geometries.map((g: GJ.PointObject) => {
      switch (g.type) {
        case 'Point':
          return new Point(g, true);
        case 'MultiPoint':
          return new MultiPoint(g, true);
      }
    });
  }

  get size(): number {
    return this.geometries.length;
  }

  count(): number {
    return this.geometries.reduce((prev, curr) => prev + curr.count(), 0);
  }

  geomEach(callback: Function): void {
    this.geometries.forEach((geom, geomIndex) => {
      callback(geom, geomIndex);
    });
  }

  distanceToPosition(coords: GJ.Position): number {
    return this.geometries.reduce(
      (prev, curr) => Math.min(prev, curr.distanceToPosition(coords)),
      Infinity,
    );
  }
}

export type PointGeometry = PointObject | PointGeometryCollection;
