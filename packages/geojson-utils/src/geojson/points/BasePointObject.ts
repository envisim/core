import {BaseGeometry} from '../ClassBaseGeometry.js';
import type * as GJ from '../types.js';
import type {GeomEachCallback} from '../typeGeomEachCallback.js';

export abstract class BasePointObject<
  T extends GJ.PointObject,
> extends BaseGeometry<T> {
  constructor(obj: GJ.PointObject, shallow: boolean = true) {
    super(obj, shallow);
  }

  abstract count(): number;

  abstract geomEach(callback: GeomEachCallback<T>): void;

  abstract distanceToPosition(coords: GJ.Position): number;

  abstract setBBox(): GJ.BBox;

  abstract getBBox(): GJ.BBox;
}
