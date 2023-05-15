import {GeoJsonObject} from '../ClassGeoJsonObject.js';
import type * as GJ from '../types.js';
import {OptionalParam} from '../util-types.js';
import {LineObject, LineString, MultiLineString} from './LineObjects.js';
import {bboxFromArrayOfBBoxes} from '../../bbox.js';

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

  geomEach(callback: Function): void {
    this.geometries.forEach((geom, geomIndex) => {
      callback(geom, geomIndex);
    });
  }

  segmentEach(callback: Function): void {
    this.geometries.forEach((geom) => {
      geom.segmentEach(callback);
    });
  }

  distanceToPosition(coords: GJ.Position): number {
    return this.geometries.reduce((prev, curr) => {
      return Math.min(prev, curr.distanceToPosition(coords));
    }, Infinity);
  }

  setBBox(): GJ.BBox {
    let bboxArray: GJ.BBox[] = new Array(this.geometries.length);
    this.geometries.forEach((geom, index) => {
      bboxArray[index] = geom.getBBox();
    });
    this.bbox = bboxFromArrayOfBBoxes(bboxArray);
    return this.bbox;
  }

  getBBox(): GJ.BBox {
    return this.bbox ?? this.setBBox();
  }
}

export type LineGeometry = LineObject | LineGeometryCollection;
