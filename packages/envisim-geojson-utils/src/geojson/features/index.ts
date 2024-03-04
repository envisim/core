import {AreaObject, LineObject, PointObject} from '../objects/index.js';
import {AreaFeature} from './ClassAreaFeature.js';
import {LineFeature} from './ClassLineFeature.js';
import {PointFeature} from './ClassPointFeature.js';

export {AreaFeature, LineFeature, PointFeature};

export type Feature<T extends AreaObject | LineObject | PointObject> =
  T extends AreaObject
    ? AreaFeature
    : T extends LineObject
      ? LineFeature
      : T extends PointObject
        ? PointFeature
        : never;
