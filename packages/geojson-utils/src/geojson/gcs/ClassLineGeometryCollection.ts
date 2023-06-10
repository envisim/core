import type * as GJ from '../../types/geojson.js';
import type {LineObject} from '../objects/index.js';
import {OptionalParam} from '../util-types.js';
import {BaseGeometryCollection} from './BaseGeometryCollection.js';
import {toLineGeometry} from './toLineGeometry.js';

export class LineGeometryCollection
  extends BaseGeometryCollection<LineObject>
  implements GJ.LineGeometryCollection
{
  static isGeometryCollection(obj: any): obj is LineGeometryCollection {
    return obj instanceof LineGeometryCollection;
  }

  static assert(obj: any, msg?: string): obj is LineGeometryCollection {
    if (obj instanceof LineGeometryCollection) return true;
    throw new TypeError(msg ?? 'Expected LineGeometryCollection');
  }

  static create(
    geometries: GJ.LineObject[],
    shallow: boolean = true,
  ): LineGeometryCollection {
    return new LineGeometryCollection({geometries}, shallow);
  }

  constructor(
    obj: OptionalParam<GJ.LineGeometryCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'GeometryCollection'}, shallow);

    this.geometries = obj.geometries.map((g: GJ.LineObject) =>
      toLineGeometry(g, shallow, false),
    );
  }

  /* LINE SPECIFIC */
  length(dist: number = Infinity): number {
    return this.geometries.reduce((prev, curr) => prev + curr.length(dist), 0);
  }
}
