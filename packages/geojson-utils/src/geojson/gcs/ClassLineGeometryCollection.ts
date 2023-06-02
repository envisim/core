import type * as GJ from '../types.js';
import {BaseGeometryCollection} from '../ClassBaseGeometryCollection.js';
import {OptionalParam} from '../util-types.js';
import {LineObject} from './LineObjects.js';
import {toLineGeometry} from './toLineGeometry.js';

export class LineGeometryCollection
  extends BaseGeometryCollection<LineObject>
  implements GJ.LineGeometryCollection
{
  static isGeometryCollection(obj: any): obj is LineGeometryCollection {
    return obj instanceof LineGeometryCollection;
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

  length(dist: number = Infinity): number {
    return this.geometries.reduce((prev, curr) => prev + curr.length(dist), 0);
  }

  distanceToPosition(coords: GJ.Position): number {
    return this.geometries.reduce((prev, curr) => {
      return Math.min(prev, curr.distanceToPosition(coords));
    }, Infinity);
  }
}

export type LineGeometry = LineObject | LineGeometryCollection;
