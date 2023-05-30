import type * as GJ from '../types.js';
import {BaseGeometry} from '../ClassBaseGeometry.js';
import type {GeomEachCallback} from '../typeGeomEachCallback.js';

export abstract class BaseLineObject<
  T extends GJ.LineObject,
> extends BaseGeometry<T> {
  constructor(obj: GJ.LineObject, shallow: boolean = true) {
    super(obj, shallow);
  }
  abstract length(): number;

  abstract geomEach(calback: GeomEachCallback<T>): void;

  abstract distanceToPosition(coords: GJ.Position): number;

  abstract setBBox(): GJ.BBox;

  abstract getBBox(): GJ.BBox;
}
