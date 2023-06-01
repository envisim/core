import type * as GJ from './types.js';
import {unionOfBBoxes} from '../bbox.js';
import {GeoJsonObject} from './ClassGeoJsonObject.js';
import type {AreaFeature} from './areas/ClassAreaFeature.js';
import type {ForEachCallback, GeomEachCallback} from './callback-types.js';
import type {LineFeature} from './lines/ClassLineFeature.js';
import type {PointFeature} from './points/ClassPointFeature.js';

export abstract class BaseCollection<
  T extends AreaFeature | LineFeature | PointFeature,
> extends GeoJsonObject<'FeatureCollection'> {
  features: T[] = [];

  constructor(obj: GJ.FeatureCollection, shallow: boolean = true) {
    super(obj, shallow);
  }

  get size(): number {
    return this.features.length;
  }

  /* === FOR EACH === */

  forEach(callback: ForEachCallback<T>): void {
    this.features.forEach(callback);
  }

  abstract geomEach(
    callback: GeomEachCallback<GJ.AreaObject | GJ.LineObject | GJ.PointObject>,
  ): void;

  /* === ADD/REMOVE FEATURES === */

  abstract addFeature(feature: T, shallow: boolean): void;

  removeFeature(index: number): void {
    this.features.splice(index, 1);
  }

  /* === BBOX === */
  /**
   * @param force - if `true`, it sets all the underlying `bbox`'es, skipping
   *   the features.
   * @returns the bounding box.
   */

  setBBox(force: boolean = false): GJ.BBox {
    const bboxArray: GJ.BBox[] = new Array(this.features.length);

    if (force === true) {
      this.forEach((feature: T, index: number) => {
        bboxArray[index] = feature.geometry.setBBox(true);
      });
    } else {
      this.forEach((feature: T, index: number) => {
        bboxArray[index] = feature.geometry.getBBox();
      });
    }

    this.bbox = unionOfBBoxes(bboxArray);
    return this.bbox;
  }

  /* === PROPERTIES === */

  initProperty(property: string, defaultValue: number = 0.0): void {
    this.forEach((feature) => feature.initProperty(property, defaultValue));
  }

  removeProperty(property: string): void {
    this.forEach((feature) => feature.removeProperty(property));
  }

  setProperty(property: string, index: number, value: number): void {
    if (index < 0 || index >= this.size)
      throw new Error('no feature with this index exists');
    this.features[index].setProperty(property, value);
  }

  forEachProperty(
    property: string,
    callback: (value: number, index: number) => void,
  ): void {
    this.forEach((feature, index) => {
      callback(feature.properties[property], index);
    });
  }
}
