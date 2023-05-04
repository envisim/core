import {GeoJsonObject, OptionalParam} from './base-classes.js';
import type * as GJ from './types.js';
import {AreaFeature, LineFeature, PointFeature} from './feature-classes.js';

abstract class BaseCollection<
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

export class PointCollection
  extends BaseCollection<PointFeature>
  implements GJ.PointFeatureCollection
{
  static isCollection(obj: any): obj is PointCollection {
    return obj instanceof PointCollection;
  }

  features: PointFeature[];

  constructor(
    obj: OptionalParam<GJ.PointFeatureCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'FeatureCollection'}, shallow);

    this.features = obj.features.map((f) => {
      return new PointFeature(f, shallow);
    });
  }

  addFeature(feature: GJ.PointFeature, shallow: boolean = true): this {
    this.features.push(new PointFeature(feature, shallow));
    return this;
  }
}

export class LineCollection
  extends BaseCollection<LineFeature>
  implements GJ.LineFeatureCollection
{
  static isCollection(obj: any): obj is LineCollection {
    return obj instanceof LineCollection;
  }

  features: LineFeature[];

  constructor(
    obj: OptionalParam<GJ.LineFeatureCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'FeatureCollection'}, shallow);

    this.features = obj.features.map((f) => {
      return new LineFeature(f, shallow);
    });
  }

  addFeature(feature: GJ.LineFeature, shallow: boolean = true): this {
    this.features.push(new LineFeature(feature, shallow));
    return this;
  }
}

export class AreaCollection
  extends BaseCollection<AreaFeature>
  implements GJ.AreaFeatureCollection
{
  static isCollection(obj: any): obj is AreaCollection {
    return obj instanceof AreaCollection;
  }

  features: AreaFeature[];

  constructor(
    obj: OptionalParam<GJ.AreaFeatureCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'FeatureCollection'}, shallow);

    this.features = obj.features.map((f) => {
      return new AreaFeature(f, shallow);
    });
  }

  addFeature(feature: GJ.AreaFeature, shallow: boolean = true): this {
    this.features.push(new AreaFeature(feature, shallow));
    return this;
  }
}
