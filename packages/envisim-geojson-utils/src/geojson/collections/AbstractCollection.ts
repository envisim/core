import type * as GJ from '../../types/geojson.js';
import {unionOfBBoxes} from '../../utils/bbox.js';
import {GeoJsonObject} from '../base/index.js';
import {AreaFeature, LineFeature, PointFeature} from '../features/index.js';

type ForEachCallback<T> = (obj: T, index: number) => void;

export abstract class AbstractCollection<
  F extends AreaFeature | LineFeature | PointFeature,
> extends GeoJsonObject<'FeatureCollection'> {
  features: F[] = [];

  constructor(obj: GJ.FeatureCollection, shallow: boolean = true) {
    super(obj, shallow);
  }

  /* GEOJSON COMMON */
  get size(): number {
    return this.features.length;
  }

  /**
   * @param force - if `true`, it sets all the underlying `bbox`'es, skipping
   *   the features.
   * @returns the bounding box.
   */
  setBBox(force: boolean = false): GJ.BBox {
    const bboxArray = Array.from<GJ.BBox>({length: this.features.length});

    if (force === true) {
      this.forEach((feature: F, index: number) => {
        bboxArray[index] = feature.geometry.setBBox();
      });
    } else {
      this.forEach((feature: F, index: number) => {
        bboxArray[index] = feature.geometry.getBBox();
      });
    }

    this.bbox = unionOfBBoxes(bboxArray);
    return this.bbox;
  }

  distanceToPosition(coords: GJ.Position): number {
    return this.features.reduce((prev, curr) => {
      return Math.min(prev, curr.geometry.distanceToPosition(coords));
    }, Infinity);
  }

  abstract centroid(iterations: number): GJ.Position;

  /* COLLECTION SPECIFIC */
  /* === FOR EACH === */
  forEach(callback: ForEachCallback<F>): void {
    this.features.forEach(callback);
  }

  geomEach(callback: ForEachCallback<F['geometry']>): void {
    this.features.forEach((f, i) => callback(f.geometry, i));
  }

  /* === ADD/REMOVE FEATURES === */
  abstract addFeature(feature: F, shallow: boolean): number;

  removeFeature(index: number): void {
    this.features.splice(index, 1);
  }

  /* === PROPERTIES === */
  initProperty(property: string, defaultValue: number = 0.0): void {
    this.forEach((feature) => feature.initProperty(property, defaultValue));
  }

  removeProperty(property: string): void {
    this.forEach((feature) => feature.removeProperty(property));
  }

  setProperty(property: string, index: number, value: number): void {
    if (index < 0 || index >= this.size) throw new Error('no feature with this index exists');
    this.features[index].setProperty(property, value);
  }

  forEachProperty(property: string, callback: (value: number, index: number) => void): void {
    this.forEach((feature, index) => {
      callback(feature.properties[property], index);
    });
  }
}
