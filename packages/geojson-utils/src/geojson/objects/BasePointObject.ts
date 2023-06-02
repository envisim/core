import type * as GJ from '../types.js';
import {BaseGeometry} from './BaseGeometry.js';

export abstract class BasePointObject<
  T extends GJ.PointObject,
> extends BaseGeometry<T> {
  constructor(obj: GJ.PointObject, shallow: boolean = true) {
    super(obj, shallow);
  }

  abstract count(): number;
}
