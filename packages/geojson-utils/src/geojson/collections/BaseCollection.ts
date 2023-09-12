import type * as GJ from '../../types/geojson.js';
import {unionOfBBoxes} from '../../utils/bbox.js';
import {GeoJsonObject} from '../ClassGeoJsonObject.js';
import type {ForEachCallback, GeomEachCallback} from '../callback-types.js';
import {Feature} from '../features/index.js';
import {AreaObject, LineObject, PointObject} from '../objects/index.js';

export abstract class BaseCollection<
  T extends AreaObject | LineObject | PointObject,
> extends GeoJsonObject<'FeatureCollection'> {
  features: Feature<T>[] = [];

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
    const bboxArray = new Array<GJ.BBox>(this.features.length);

    if (force === true) {
      this.forEach((feature: Feature<T>, index: number) => {
        bboxArray[index] = feature.geometry.setBBox(true);
      });
    } else {
      this.forEach((feature: Feature<T>, index: number) => {
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

  abstract centroid(): GJ.Position;

  /* COLLECTION SPECIFIC */
  /* === FOR EACH === */
  forEach(callback: ForEachCallback<Feature<T>>): void {
    this.features.forEach(callback);
  }

  abstract geomEach(callback: GeomEachCallback<T>): void;

  /* === ADD/REMOVE FEATURES === */
  abstract addFeature(feature: Feature<T>, shallow: boolean): void;

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
