import {Circle} from './class-circle.js';
import {LineString} from './class-linestring.js';
import {MultiCircle} from './class-multicircle.js';
import {MultiLineString} from './class-multilinestring.js';
import {MultiPoint} from './class-multipoint.js';
import {MultiPolygon} from './class-multipolygon.js';
import {Point} from './class-point.js';
import {Polygon} from './class-polygon.js';

export {
  // Points
  Point,
  MultiPoint,
  // Lines
  LineString,
  MultiLineString,
  // Areas
  Polygon,
  MultiPolygon,
  Circle,
  MultiCircle,
};

export {toAreaObject} from './to-area-object.js';
export {toLineObject} from './to-line-object.js';
export {toPointObject} from './to-point-object.js';

export type AreaObject = Circle | MultiCircle | Polygon | MultiPolygon;
export type LineObject = LineString | MultiLineString;
export type PointObject = Point | MultiPoint;
