import type {AreaObject} from './areas/AreaObjects.js';
import {GeoJsonObject} from './ClassGeoJsonObject.js';
import type {LineObject} from './lines/LineObjects.js';
import type {PointObject} from './points/PointObjects.js';
import type * as GJ from './types.js';
import type {GeomEachCallback, ForEachCallback} from './callback-types.js';
import {bboxFromArrayOfBBoxes} from '../bbox.js';

export abstract class BaseGeometryCollection<
  T extends AreaObject | LineObject | PointObject,
> extends GeoJsonObject<'GeometryCollection'> {
  geometries!: T[];

  constructor(obj: GJ.GeometryCollection, shallow: boolean = true) {
    super(obj, shallow);
  }

  get size(): number {
    return this.geometries.length;
  }

  forEach(callback: ForEachCallback<T>): void {
    this.geometries.forEach(callback);
  }

  geomEach(callback: GeomEachCallback<T>, featureIndex: number = -1): void {
    this.forEach((geometry: T, geometryIndex: number) => {
      callback(geometry, featureIndex, geometryIndex);
    });
  }

  setBBox(): GJ.BBox {
    const bboxArray: GJ.BBox[] = new Array(this.geometries.length);

    this.forEach((geom: T, index: number) => {
      bboxArray[index] = geom.getBBox();
    });

    this.bbox = bboxFromArrayOfBBoxes(bboxArray);
    return this.bbox;
  }
}
