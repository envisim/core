import type {AreaObject, LineObject, PointObject} from '../objects/index.js';
import {AreaGeometryCollection} from './ClassAreaGeometryCollection.js';
import {LineGeometryCollection} from './ClassLineGeometryCollection.js';
import {PointGeometryCollection} from './ClassPointGeometryCollection.js';

export {toAreaGeometry} from './toAreaGeometry.js';
export {toLineGeometry} from './toLineGeometry.js';
export {toPointGeometry} from './toPointGeometry.js';

export {
  AreaGeometryCollection,
  LineGeometryCollection,
  PointGeometryCollection,
};

export type Geometry<T extends AreaObject | LineObject | PointObject> =
  T extends AreaObject
    ? AreaObject | AreaGeometryCollection
    : T extends LineObject
      ? LineObject | LineGeometryCollection
      : T extends PointObject
        ? PointObject | PointGeometryCollection
        : never;

export type AreaGeometry = AreaObject | AreaGeometryCollection;
export type LineGeometry = LineObject | LineGeometryCollection;
export type PointGeometry = PointObject | PointGeometryCollection;
