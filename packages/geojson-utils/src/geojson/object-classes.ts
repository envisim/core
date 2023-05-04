import {copy} from '../copy.js';
import {GeoJsonObject, OptionalParam} from './base-classes.js';
import type * as GJ from './types.js';

abstract class BaseGeometry<T extends GJ.BaseGeometry> extends GeoJsonObject<
  T['type']
> {
  coordinates: T['coordinates'];

  constructor(obj: GJ.BaseGeometry, shallow: boolean = true) {
    super(obj, shallow);

    if (shallow === true) {
      this.coordinates = obj.coordinates;
    } else {
      // this.coordinates = copy(obj.coordinates) as T['coordinates'];
      this.coordinates = copy(obj.coordinates);
    }
  }
}

export class Point extends BaseGeometry<GJ.Point> implements GJ.Point {
  static isObject(obj: any): obj is Point {
    return obj instanceof Point;
  }

  constructor(obj: OptionalParam<GJ.Point, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'Point'}, shallow);
  }
}

export class PointCircle
  extends BaseGeometry<GJ.PointCircle>
  implements GJ.PointCircle
{
  static isObject(obj: any): obj is PointCircle {
    return obj instanceof PointCircle;
  }

  radius: number;

  constructor(
    obj: OptionalParam<GJ.PointCircle, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'Point'}, shallow);
    this.radius = obj.radius;
  }
}

export class MultiPoint
  extends BaseGeometry<GJ.MultiPoint>
  implements GJ.MultiPoint
{
  static isObject(obj: any): obj is MultiPoint {
    return obj instanceof MultiPoint;
  }

  constructor(
    obj: OptionalParam<GJ.MultiPoint, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'MultiPoint'}, shallow);
  }
}

export class MultiPointCircle
  extends BaseGeometry<GJ.MultiPointCircle>
  implements GJ.MultiPointCircle
{
  static isObject(obj: any): obj is MultiPointCircle {
    return obj instanceof MultiPointCircle;
  }

  radius: number;

  constructor(
    obj: OptionalParam<GJ.MultiPointCircle, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'MultiPoint'}, shallow);
    this.radius = obj.radius;
  }
}

export class LineString
  extends BaseGeometry<GJ.LineString>
  implements GJ.LineString
{
  static isObject(obj: any): obj is LineString {
    return obj instanceof LineString;
  }

  constructor(
    obj: OptionalParam<GJ.LineString, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'LineString'}, shallow);
  }
}

export class MultiLineString
  extends BaseGeometry<GJ.MultiLineString>
  implements GJ.MultiLineString
{
  static isObject(obj: any): obj is MultiLineString {
    return obj instanceof MultiLineString;
  }

  constructor(
    obj: OptionalParam<GJ.MultiLineString, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'MultiLineString'}, shallow);
  }
}

export class Polygon extends BaseGeometry<GJ.Polygon> implements GJ.Polygon {
  static isObject(obj: any): obj is Polygon {
    return obj instanceof Polygon;
  }

  constructor(obj: OptionalParam<GJ.Polygon, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'Polygon'}, shallow);
  }
}

export class MultiPolygon
  extends BaseGeometry<GJ.MultiPolygon>
  implements GJ.MultiPolygon
{
  static isObject(obj: any): obj is MultiPolygon {
    return obj instanceof MultiPolygon;
  }

  constructor(
    obj: OptionalParam<GJ.MultiPolygon, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'MultiPolygon'}, shallow);
  }
}

export type PointObject = Point | MultiPoint;
export type LineObject = LineString | MultiLineString;
export type AreaObject =
  | PointCircle
  | MultiPointCircle
  | Polygon
  | MultiPolygon;
