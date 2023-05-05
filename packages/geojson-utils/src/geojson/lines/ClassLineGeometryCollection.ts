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
}

export type LineGeometry = LineObject | LineGeometryCollection;
