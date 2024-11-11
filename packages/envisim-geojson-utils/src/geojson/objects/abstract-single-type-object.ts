import {copy} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {pointInBBox} from '../../utils/bbox.js';
import {GeometricPrimitive} from '../geometric-primitive/index.js';
import type {AreaObject, LineObject, PointObject} from './index.js';

export abstract class AbstractSingleTypeObject<T extends GJ.SingleTypeObject> {
  readonly type: T['type'];
  coordinates: T['coordinates'];
  bbox?: GJ.BBox;

  isArea(): this is AreaObject {
    return this.geometricPrimitive() === GeometricPrimitive.AREA;
  }
  isLine(): this is LineObject {
    return this.geometricPrimitive() === GeometricPrimitive.LINE;
  }
  isPoint(): this is PointObject {
    return this.geometricPrimitive() === GeometricPrimitive.POINT;
  }

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

  abstract copy(): AbstractSingleTypeObject<T>;

  abstract geometricPrimitive(): GeometricPrimitive;
  abstract measure(): number;

  abstract setBBox(): GJ.BBox;
  getBBox(): GJ.BBox {
    return this.bbox ?? this.setBBox();
  }
  pointInBBox(point: GJ.Position): boolean {
    return pointInBBox(point, this.getBBox());
  }

  size(): number {
    return 1;
  }

  abstract getCoordinateArray(): GJ.Position[] | GJ.Position[][] | GJ.Position[][][];
  abstract distanceToPosition(coords: GJ.Position): number;
  abstract centroid(iterations: number): GJ.Position;
}
