import {copy} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {GeoJsonObject} from '../class-geojson-object.js';

export abstract class AbstractSingleTypeObject<T extends GJ.SingleTypeObject> extends GeoJsonObject<
  T['type']
> {
  coordinates: T['coordinates'];

  constructor(obj: GJ.SingleTypeObject, shallow: boolean = true) {
    super(obj, shallow);

    if (shallow === true) {
      this.coordinates = obj.coordinates;
    } else {
      this.coordinates = copy(obj.coordinates);
    }
  }

  abstract override get size(): number;
  abstract override distanceToPosition(coords: GJ.Position): number;
  abstract centroid(iterations: number): GJ.Position;
}
