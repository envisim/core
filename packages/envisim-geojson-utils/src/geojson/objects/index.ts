import {Circle} from './ClassCircle.js';
import {LineString} from './ClassLineString.js';
import {MultiCircle} from './ClassMultiCircle.js';
import {MultiLineString} from './ClassMultiLineString.js';
import {MultiPoint} from './ClassMultiPoint.js';
import {MultiPolygon} from './ClassMultiPolygon.js';
import {Point} from './ClassPoint.js';
import {Polygon} from './ClassPolygon.js';

export {
  Point,
  MultiPoint,
  Circle,
  MultiCircle,
  LineString,
  MultiLineString,
  Polygon,
  MultiPolygon,
};

export type AreaObject = Circle | MultiCircle | Polygon | MultiPolygon;
export type LineObject = LineString | MultiLineString;
export type PointObject = Point | MultiPoint;
