import type * as GJ from '../../types/geojson.js';
import type {PointObject} from '../objects/index.js';
import {OptionalParam} from '../util-types.js';
import {BaseGeometryCollection} from './BaseGeometryCollection.js';
import {toPointGeometry} from './toPointGeometry.js';

export class PointGeometryCollection
  extends BaseGeometryCollection<PointObject>
  implements GJ.PointGeometryCollection
{
  static isGeometryCollection(obj: any): obj is PointGeometryCollection {
    return obj instanceof PointGeometryCollection;
  }

  static create(
    geometries: GJ.PointObject[],
    shallow: boolean = true,
  ): PointGeometryCollection {
    return new PointGeometryCollection({geometries}, shallow);
  }

  constructor(
    obj: OptionalParam<GJ.PointGeometryCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'GeometryCollection'}, shallow);

    this.geometries = obj.geometries.map((g: GJ.PointObject) =>
      toPointGeometry(g, shallow, false),
    );
  }

  /* POINT SPECIFIC */
  count(): number {
    return this.geometries.reduce((prev, curr) => prev + curr.count(), 0);
  }
}
