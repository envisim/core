import {BaseGeometry} from '../ClassBaseGeometry.js';
import type * as GJ from '../types.js';
import type {GeomEachCallback} from '../typeGeomEachCallback.js';
import {LineObject} from './LineObjects.js';

export abstract class BaseLineObject<
  T extends GJ.LineObject,
> extends BaseGeometry<T> {
  constructor(obj: GJ.LineObject, shallow: boolean = true) {
    super(obj, shallow);
  }
  abstract length(): number;

  abstract geomEach(calback: GeomEachCallback<LineObject>): void;

  abstract distanceToPosition(coords: GJ.Position): number;

  abstract setBBox(): GJ.BBox;

  abstract getBBox(): GJ.BBox;
}
