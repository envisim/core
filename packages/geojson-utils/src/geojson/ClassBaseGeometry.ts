import {copy} from '../copy.js';
import {GeoJsonObject} from './ClassGeoJsonObject.js';
import type * as GJ from './types.js';

export abstract class BaseGeometry<
  T extends GJ.BaseGeometry,
> extends GeoJsonObject<T['type']> {
  coordinates: T['coordinates'];

  constructor(obj: GJ.BaseGeometry, shallow: boolean = true) {
    super(obj, shallow);

    if (shallow === true) {
      this.coordinates = obj.coordinates;
    } else {
      this.coordinates = copy(obj.coordinates);
    }
  }

  abstract get size(): number;
}
