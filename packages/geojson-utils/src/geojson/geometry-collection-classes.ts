import {GeoJsonObject, OptionalParam} from './base-classes.js';
import {
  AreaObject,
  LineObject,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPointCircle,
  MultiPolygon,
  Point,
  PointCircle,
  PointObject,
  Polygon,
} from './object-classes.js';
import type * as GJ from './types.js';

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

    this.geometries = obj.geometries.map((g) => {
      switch (g.type) {
        case 'Point':
          return new Point(g, true);
        case 'MultiPoint':
          return new MultiPoint(g, true);
      }
    });
  }
}

export class LineGeometryCollection
  extends GeoJsonObject<'GeometryCollection'>
  implements GJ.LineGeometryCollection
{
  static isGeometryCollection(obj: any): obj is LineGeometryCollection {
    return obj instanceof LineGeometryCollection;
  }

  geometries: LineObject[];

  constructor(
    obj: OptionalParam<GJ.LineGeometryCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'GeometryCollection'}, shallow);

    this.geometries = obj.geometries.map((g) => {
      switch (g.type) {
        case 'LineString':
          return new LineString(g, true);
        case 'MultiLineString':
          return new MultiLineString(g, true);
      }
    });
  }
}

export class AreaGeometryCollection
  extends GeoJsonObject<'GeometryCollection'>
  implements GJ.AreaGeometryCollection
{
  static isGeometryCollection(obj: any): obj is AreaGeometryCollection {
    return obj instanceof AreaGeometryCollection;
  }

  geometries: AreaObject[];

  constructor(
    obj: OptionalParam<GJ.AreaGeometryCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'GeometryCollection'}, shallow);

    this.geometries = obj.geometries.map((g) => {
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
}

export type PointGeometry = PointObject | PointGeometryCollection;
export type LineGeometry = LineObject | LineGeometryCollection;
export type AreaGeometry = AreaObject | AreaGeometryCollection;
