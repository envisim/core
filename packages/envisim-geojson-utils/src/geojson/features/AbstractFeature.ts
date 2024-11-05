import {copy} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {GeoJsonObject} from '../base/index.js';
import type {AreaObject, LineObject, PointObject} from '../objects/index.js';

export abstract class AbstractFeature<
  T extends AreaObject | LineObject | PointObject,
> extends GeoJsonObject<'Feature'> {
  geometry!: T;
  properties: GJ.FeatureProperties<number>;

  constructor(obj: GJ.Feature<GJ.Geometry>, shallow: boolean = true) {
    super(obj, shallow);

    this.properties =
      obj.properties === null ? {} : shallow === true ? obj.properties : copy(obj.properties);
  }

  /* GEOJSON COMMON */
  get size(): number {
    return this.geometry.size;
  }

  setBBox(force: boolean = false): GJ.BBox {
    if (force === true) {
      this.bbox = this.geometry.setBBox();
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

  initProperty(property: string, defaultValue: number = 0.0): void {
    if (!Object.hasOwn(this.properties, property)) {
      this.properties[property] = defaultValue;
    }
  }

  removeProperty(property: string): void {
    delete this.properties[property];
  }

  setProperty(property: string, value: number): void {
    this.properties[property] = value;
  }

  editProperty(
    property: string,
    callback: (value: number) => number,
    defaultValue: number = 0.0,
  ): number {
    this.initProperty(property, defaultValue);
    const newValue = callback(this.properties[property]);
    this.properties[property] = newValue;
    return newValue;
  }

  replaceProperties(properties: GJ.FeatureProperties, shallow: boolean = true) {
    if (shallow) {
      this.properties = properties;
    } else {
      this.properties = copy(properties);
    }
  }
}
