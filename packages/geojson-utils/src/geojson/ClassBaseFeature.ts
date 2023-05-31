import type * as GJ from './types.js';
import {copy} from '../copy.js';
import {GeoJsonObject} from './ClassGeoJsonObject.js';
import type {AreaGeometry} from './areas/ClassAreaGeometryCollection.js';
import type {LineGeometry} from './lines/ClassLineGeometryCollection.js';
import type {PointGeometry} from './points/ClassPointGeometryCollection.js';

export abstract class BaseFeature<
  T extends AreaGeometry | LineGeometry | PointGeometry,
> extends GeoJsonObject<'Feature'> {
  geometry!: T;
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

  initProperty(property: string, defaultValue: number = 0.0): void {
    if (!this.properties.hasOwnProperty(property))
      this.properties[property] = defaultValue;
  }

  removeProperty(property: string): void {
    delete this.properties[property];
  }

  setProperty(property: string, value: number): void {
    this.properties[property] = value;
  }

  abstract get size(): number;

  setBBox(): GJ.BBox {
    // need setBBox to recompute here
    this.bbox = this.geometry.setBBox();
    return this.bbox;
  }
}
