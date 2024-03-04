import type * as GJ from '../../types/geojson.js';
import {BaseGeometry} from './BaseGeometry.js';

export abstract class BaseAreaObject<
  T extends GJ.AreaObject,
> extends BaseGeometry<T> {
  constructor(obj: GJ.AreaObject, shallow: boolean = true) {
    super(obj, shallow);
  }

  abstract area(): number;
  abstract perimeter(): number;
}
