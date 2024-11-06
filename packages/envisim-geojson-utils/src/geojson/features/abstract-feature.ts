import {copy} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {GeometricPrimitive} from '../../geometric-primitive/index.js';
import {GeoJsonObject} from '../abstract-geojson-object.js';
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
  geometricPrimitive(): GeometricPrimitive {
    return this.geometry.geometricPrimitive();
  }

  get size(): number {
    return this.geometry.size;
  }

  setBBox(): GJ.BBox {
    return this.geometry.setBBox();
  }

  override getBBox(): GJ.BBox {
    return this.geometry.bbox ?? this.geometry.setBBox();
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
