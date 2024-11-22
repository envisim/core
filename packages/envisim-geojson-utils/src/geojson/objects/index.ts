import {Circle} from './class-circle.js';
import {LineString} from './class-linestring.js';
import {MultiCircle} from './class-multicircle.js';
import {MultiLineString} from './class-multilinestring.js';
import {MultiPoint} from './class-multipoint.js';
import {MultiPolygon} from './class-multipolygon.js';
import {Point} from './class-point.js';
import {Polygon} from './class-polygon.js';

export {
  // Areas
  Polygon,
  MultiPolygon,
  Circle,
  MultiCircle,
  // Lines
  LineString,
  MultiLineString,
  // Points
  Point,
  MultiPoint,
};

export {toAreaObject, toLineObject, toPointObject} from './to-object.js';

export type AreaObject = Circle | MultiCircle | Polygon | MultiPolygon;
export type LineObject = LineString | MultiLineString;
export type PointObject = Point | MultiPoint;
export type PureObject<
  T extends AreaObject | LineObject | PointObject = AreaObject | LineObject | PointObject,
> = T extends AreaObject ? T : T extends LineObject ? T : T extends PointObject ? T : never;
