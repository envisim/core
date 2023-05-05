import {copy} from '../copy.js';
import {GeoJsonObject} from './ClassGeoJsonObject.js';

export abstract class BaseFeature extends GeoJsonObject<'Feature'> {
  properties: Exclude<GJ.FeatureProperties, null>;

  constructor(obj: GJ.Feature<GJ.Geometry>, shallow: boolean = true) {
    super(obj, shallow);

    this.properties =
      obj.properties === null
        ? {}
        : shallow === true
        ? obj.properties
        : copy(obj.properties);
  }

  initProperty(property: string, defaultValue: number = 0.0): this {
    if (!this.properties.hasOwnProperty(property))
      this.properties[property] = defaultValue;
    return this;
  }

  removeProperty(property: string): this {
    delete this.properties[property];
    return this;
  }

  setProperty(property: string, value: number): this {
    this.properties[property] = value;
    return this;
  }
}
