import {BaseGeometry} from '../ClassBaseGeometry.js';
import type * as GJ from '../types.js';

export abstract class BaseLineObject<
  T extends GJ.LineObject,
> extends BaseGeometry<T> {
  constructor(obj: GJ.LineObject, shallow: boolean = true) {
    super(obj, shallow);
  }
  abstract length(): number;

  abstract geomEach(calback: Function): void;

  abstract segmentEach(calback: Function): void;

  abstract distanceToPosition(coords: GJ.Position): number;
}
