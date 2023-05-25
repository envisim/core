import {BaseGeometry} from '../ClassBaseGeometry.js';
import type * as GJ from '../types.js';
import type {AreaGeomEachCallback} from '../typeGeomEachCallback.js';

export abstract class BaseAreaObject<
  T extends GJ.AreaObject,
> extends BaseGeometry<T> {
  constructor(obj: GJ.AreaObject, shallow: boolean = true) {
    super(obj, shallow);
  }

  abstract area(): number;

  abstract geomEach(calback: AreaGeomEachCallback): void;

  abstract distanceToPosition(coords: GJ.Position): number;

  abstract setBBox(): GJ.BBox;

  abstract getBBox(): GJ.BBox;
}
