import type * as GJ from './types.js';
import {copy} from '../copy.js';
import {GeoJsonObject} from './ClassGeoJsonObject.js';
import type {GeomEachCallback} from './callback-types.js';

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
  abstract geomEach(callback: GeomEachCallback<T>, featureIndex: number): void;
  abstract distanceToPosition(coords: GJ.Position): number;
}
