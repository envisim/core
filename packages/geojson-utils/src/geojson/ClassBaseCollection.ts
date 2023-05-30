import type * as GJ from './types.js';
import {GeoJsonObject} from './ClassGeoJsonObject.js';
import type {AreaFeature} from './areas/ClassAreaFeature.js';
import type {LineFeature} from './lines/ClassLineFeature.js';
import type {PointFeature} from './points/ClassPointFeature.js';

export abstract class BaseCollection<
  T extends PointFeature | LineFeature | AreaFeature,
> extends GeoJsonObject<'FeatureCollection'> {
  //abstract features: PointFeature[] | LineFeature[] | AreaFeature[];
  abstract features: T[];

  constructor(obj: GJ.FeatureCollection, shallow: boolean = true) {
    super(obj, shallow);
  }

  get size(): number {
    return this.features.length;
  }

  abstract addFeature(
    feature: GJ.PointFeature | GJ.LineFeature | GJ.AreaFeature,
    shallow: boolean,
  ): this;

  removeFeature(index: number): this {
    this.features.splice(index, 1);
    return this;
  }

  initProperty(property: string, defaultValue: number = 0.0): this {
    this.features.forEach((f) => f.initProperty(property, defaultValue));
    return this;
  }

  removeProperty(property: string): this {
    this.features.forEach((f) => f.removeProperty(property));
    return this;
  }

  setProperty(property: string, index: number, value: number): this {
    if (index < 0 || index >= this.size)
      throw new Error('no feature with this index exists');
    this.features[index].setProperty(property, value);
    return this;
  }

  forEachProperty(
    property: string,
    callbackFn: (value: number, index: number) => void,
  ): this {
    this.features.forEach((f, i) => {
      callbackFn(f.properties[property], i);
    });

    return this;
  }
}
