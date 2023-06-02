import type * as GJ from './types.js';
import {unionOfBBoxes} from '../bbox.js';
import type {AreaObject, LineObject, PointObject} from '../objects/index.js';
import {GeoJsonObject} from './ClassGeoJsonObject.js';
import type {GeomEachCallback, ForEachCallback} from './callback-types.js';

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

  setBBox(force: boolean = false): GJ.BBox {
    const bboxArray: GJ.BBox[] = new Array(this.geometries.length);

    if (force === true) {
      this.forEach((geom: T, index: number) => {
        bboxArray[index] = geom.setBBox();
      });
    } else {
      this.forEach((geom: T, index: number) => {
        bboxArray[index] = geom.getBBox();
      });
    }

    this.bbox = unionOfBBoxes(bboxArray);
    return this.bbox;
  }
}
