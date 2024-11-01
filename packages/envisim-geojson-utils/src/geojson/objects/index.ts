import {Circle} from './ClassCircle.js';
import {LineString} from './ClassLineString.js';
import {MultiCircle} from './ClassMultiCircle.js';
import {MultiLineString} from './ClassMultiLineString.js';
import {MultiPoint} from './ClassMultiPoint.js';
import {MultiPolygon} from './ClassMultiPolygon.js';
import {Point} from './ClassPoint.js';
import {Polygon} from './ClassPolygon.js';

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

export {toAreaObject} from './toAreaObject.js';
export {toLineObject} from './toLineObject.js';
export {toPointObject} from './toPointObject.js';

export type AreaObject = Circle | MultiCircle | Polygon | MultiPolygon;
export type LineObject = LineString | MultiLineString;
export type PointObject = Point | MultiPoint;
