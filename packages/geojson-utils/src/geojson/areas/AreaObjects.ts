export {PointCircle} from './ClassPointCircle.js';
export {MultiPointCircle} from './ClassMultiPointCircle.js';
export {Polygon} from './ClassPolygon.js';
export {MultiPolygon} from './ClassMultiPolygon.js';

export type AreaObject =
  | PointCircle
  | MultiPointCircle
  | Polygon
  | MultiPolygon;
