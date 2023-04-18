import type {TCollectionType} from './types/collection.js';

import {Feature} from './ClassFeature.js';

export class Collection implements GeoJSON.FeatureCollection {
  readonly type = 'FeatureCollection';
  features: Feature[];
  bbox: GeoJSON.BBox | undefined;

  constructor(
    {features = [], bbox}: Partial<GeoJSON.FeatureCollection> = {},
    copy: boolean = false,
    strict: boolean = true,
  ) {
    if (bbox) {
      this.bbox = bbox;
    }

    if (!Array.isArray(features))
      throw new TypeError('feature must be an array');
    if (features.length === 0) {
      this.features = [];
      return this;
    }

    this.features = features.map((f) => new Feature(f, copy, strict));

    if (strict === true) {
      const ctype = this.features[0].ctype;
      if (this.features.some((f) => f.ctype !== ctype))
        throw new Error('Mixed Features are not allowed (strict)');
    }

    return this;
  }

  static create(
    features: GeoJSON.Feature[] = [],
    copy: boolean = false,
    strict: boolean = true,
  ) {
    return new Collection({type: 'FeatureCollection', features}, copy, strict);
  }

  get size(): number {
    return this.features.length;
  }

  get ctype(): TCollectionType | '' {
    if (this.size === 0) return '';
    return this.features[0].ctype;
  }

  addFeature(
    feature: GeoJSON.Feature | Feature,
    copy: boolean = false,
    strict: boolean = true,
  ): this {
    const feat = new Feature(feature, copy, strict);
    if (strict === true && feat.ctype !== this.ctype)
      throw new Error('Mixed Features are not allowed (strict)');
    this.features.push(feat);
    return this;
  }

  removeFeature(index: number): this {
    if (index < 0 || index >= this.size)
      throw new RangeError('index out of bounds');
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
    if (index >= this.size)
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
