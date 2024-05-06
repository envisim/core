import {copy} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {GeoJsonObject, type GeomEachCallback} from '../base/index.js';

export abstract class AbstractObject<T extends GJ.Object> extends GeoJsonObject<
  T['type']
> {
  coordinates: T['coordinates'];

  constructor(obj: GJ.Object, shallow: boolean = true) {
    super(obj, shallow);

    if (shallow === true) {
      this.coordinates = obj.coordinates;
    } else {
      this.coordinates = copy(obj.coordinates);
    }
  }

  abstract override get size(): number;
  abstract geomEach(callback: GeomEachCallback<T>, featureIndex: number): void;
  abstract override distanceToPosition(coords: GJ.Position): number;
  abstract centroid(iterations: number): GJ.Position;
}
