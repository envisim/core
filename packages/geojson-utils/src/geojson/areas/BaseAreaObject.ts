import {BaseGeometry} from '../ClassBaseGeometry.js';
import type * as GJ from '../types.js';
import type {GeomEachCallback} from '../typeGeomEachCallback.js';
import {AreaObject} from './AreaObjects.js';

export abstract class BaseAreaObject<
  T extends GJ.AreaObject,
> extends BaseGeometry<T> {
  constructor(obj: GJ.AreaObject, shallow: boolean = true) {
    super(obj, shallow);
  }

  abstract area(): number;

  abstract geomEach(calback: GeomEachCallback<AreaObject>): void;

  abstract distanceToPosition(coords: GJ.Position): number;

  abstract setBBox(): GJ.BBox;

  abstract getBBox(): GJ.BBox;
}
