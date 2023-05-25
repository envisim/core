import {PointObject} from './index.js';
import {LineObject} from './index.js';
import {AreaObject} from './index.js';

export type PointGeomEachCallback = (
  geom: PointObject,
  firstIndex?: number,
  secondIndex?: number,
) => void;

export type LineGeomEachCallback = (
  geom: LineObject,
  firstIndex?: number,
  secondIndex?: number,
) => void;

export type AreaGeomEachCallback = (
  geom: AreaObject,
  firstIndex?: number,
  secondIndex?: number,
) => void;
