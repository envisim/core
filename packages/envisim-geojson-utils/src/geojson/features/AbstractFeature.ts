import {copy} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {GeoJsonObject, type GeomEachCallback} from '../base/index.js';
import type {AreaGeometry, LineGeometry, PointGeometry} from '../gcs/index.js';
import type {AreaObject, LineObject, PointObject} from '../objects/index.js';

export abstract class AbstractFeature<
  T extends AreaObject | LineObject | PointObject,
  G extends AreaGeometry | LineGeometry | PointGeometry,
> extends GeoJsonObject<'Feature'> {
  geometry!: G;
  properties: GJ.FeatureProperties<number>;

  constructor(obj: GJ.Feature<GJ.Geometry>, shallow: boolean = true) {
    super(obj, shallow);

    this.properties =
      obj.properties === null
        ? {}
        : shallow === true
          ? obj.properties
          : copy(obj.properties);
  }

  /* GEOJSON COMMON */
  get size(): number {
    return this.geometry.size;
  }

  setBBox(force: boolean = false): GJ.BBox {
    if (force === true) {
      this.bbox = this.geometry.setBBox(true);
    } else {
      this.bbox = this.geometry.getBBox();
    }

    return this.bbox;
  }

  distanceToPosition(coords: GJ.Position): number {
    return this.geometry.distanceToPosition(coords);
  }

  centroid(iterations: number = 2): GJ.Position {
    return this.geometry.centroid(iterations);
  }

  /* FEATURE SPECIFIC */
  abstract geomEach(callback: GeomEachCallback<T>, featureIndex: number): void;

  initProperty(property: string, defaultValue: number = 0.0): void {
    if (!Object.prototype.hasOwnProperty.call(this.properties, property))
      this.properties[property] = defaultValue;
  }

  removeProperty(property: string): void {
    delete this.properties[property];
  }

  setProperty(property: string, value: number): void {
    this.properties[property] = value;
  }
}
