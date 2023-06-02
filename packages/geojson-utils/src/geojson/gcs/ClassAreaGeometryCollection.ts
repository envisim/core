import type * as GJ from '../../types/geojson.js';
import type {AreaObject} from '../objects/index.js';
import {OptionalParam} from '../util-types.js';
import {BaseGeometryCollection} from './BaseGeometryCollection.js';
import {toAreaGeometry} from './toAreaGeometry.js';

export class AreaGeometryCollection
  extends BaseGeometryCollection<AreaObject>
  implements GJ.AreaGeometryCollection
{
  static isGeometryCollection(obj: any): obj is AreaGeometryCollection {
    return obj instanceof AreaGeometryCollection;
  }

  static create(
    geometries: GJ.AreaObject[],
    shallow: boolean = true,
  ): AreaGeometryCollection {
    return new AreaGeometryCollection({geometries}, shallow);
  }

  constructor(
    obj: OptionalParam<GJ.AreaGeometryCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'GeometryCollection'}, shallow);

    this.geometries = obj.geometries.map((g: GJ.AreaObject) =>
      toAreaGeometry(g, shallow, false),
    );
  }

  area(dist: number = Infinity): number {
    return this.geometries.reduce((prev, curr) => prev + curr.area(dist), 0);
  }

  distanceToPosition(coords: GJ.Position): number {
    return this.geometries.reduce((prev, curr) => {
      const d = curr.distanceToPosition(coords);
      if (prev <= 0 && d <= 0) {
        return Math.max(d, prev);
      }
      return Math.min(d, prev);
    }, Infinity);
  }
}
