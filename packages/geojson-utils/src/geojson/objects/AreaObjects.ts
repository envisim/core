import {MultiPointCircle} from './ClassMultiPointCircle.js';
import {MultiPolygon} from './ClassMultiPolygon.js';
import {PointCircle} from './ClassPointCircle.js';
import {Polygon} from './ClassPolygon.js';

export type AreaObject =
  | PointCircle
  | MultiPointCircle
  | Polygon
  | MultiPolygon;

export {PointCircle, MultiPointCircle, Polygon, MultiPolygon};
