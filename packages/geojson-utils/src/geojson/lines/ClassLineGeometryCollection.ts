import {GeoJsonObject} from '../ClassGeoJsonObject.js';
import type * as GJ from '../types.js';
import {OptionalParam} from '../util-types.js';
import {LineObject, LineString, MultiLineString} from './LineObjects.js';

export class LineGeometryCollection
  extends GeoJsonObject<'GeometryCollection'>
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

  geometries: LineObject[];

  constructor(
    obj: OptionalParam<GJ.LineGeometryCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'GeometryCollection'}, shallow);

    this.geometries = obj.geometries.map((g: GJ.LineObject) => {
      switch (g.type) {
        case 'LineString':
          return new LineString(g, true);
        case 'MultiLineString':
          return new MultiLineString(g, true);
      }
    });
  }

  get size(): number {
    return this.geometries.length;
  }
  length(dist: number = Infinity): number {
    return this.geometries.reduce((prev, curr) => prev + curr.length(dist), 0);
  }
}

export type LineGeometry = LineObject | LineGeometryCollection;
