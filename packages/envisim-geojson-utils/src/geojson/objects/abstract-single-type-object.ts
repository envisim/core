import {copy} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {GeometricPrimitive} from '../geometric-primitive/index.js';

export abstract class AbstractSingleTypeObject<T extends GJ.SingleTypeObject> {
  readonly type: T['type'];
  coordinates: T['coordinates'];
  bbox?: GJ.BBox;

  constructor(obj: GJ.SingleTypeObject, shallow: boolean = true) {
    this.type = obj.type;

    if (shallow === true) {
      this.coordinates = obj.coordinates;
      this.bbox = obj.bbox;
      return;
    }

    this.coordinates = copy(obj.coordinates);
    if (obj.bbox) this.bbox = [...obj.bbox];
  }

  abstract geometricPrimitive(): GeometricPrimitive;
  abstract measure(): number;

  abstract setBBox(): GJ.BBox;
  getBBox(): GJ.BBox {
    return this.bbox ?? this.setBBox();
  }

  size(): number {
    return 1;
  }

  abstract getCoordinateArray(): GJ.Position[] | GJ.Position[][] | GJ.Position[][][];
  abstract distanceToPosition(coords: GJ.Position): number;
  abstract centroid(iterations: number): GJ.Position;
}
