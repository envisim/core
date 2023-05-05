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
}

export type PointGeometry = PointObject | PointGeometryCollection;
