import type * as GJ from '../../types/geojson.js';
import {unionOfBBoxes} from '../../utils/bbox.js';
import {
  type ForEachCallback,
  GeoJsonObject,
  type GeomEachCallback,
} from '../base/index.js';
import type {AreaObject, LineObject, PointObject} from '../objects/index.js';

export abstract class AbstractGeometryCollection<
  T extends AreaObject | LineObject | PointObject,
  G extends GJ.Object,
> extends GeoJsonObject<'GeometryCollection'> {
  geometries!: T[];

  constructor(obj: GJ.GeometryCollection<G>, shallow: boolean = true) {
    super(obj, shallow);
  }

  /* GEOJSON COMMON */
  get size(): number {
    return this.geometries.length;
  }

  setBBox(force: boolean = false): GJ.BBox {
    const bboxArray = new Array<GJ.BBox>(this.geometries.length);

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

  distanceToPosition(coords: GJ.Position): number {
    return this.geometries.reduce(
      (prev, curr) => Math.min(prev, curr.distanceToPosition(coords)),
      Infinity,
    );
  }

  abstract centroid(iterations: number): GJ.Position;

  /* GEOMETRYCOLLECTION SPECIFIC */
  forEach(callback: ForEachCallback<T>): void {
    this.geometries.forEach(callback);
  }

  geomEach(callback: GeomEachCallback<T>, featureIndex: number = -1): void {
    this.forEach((geometry: T, geometryIndex: number) => {
      callback(geometry, featureIndex, geometryIndex);
    });
  }
}
