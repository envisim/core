import {GeoJsonObject, OptionalParam} from './base-classes.js';
import {
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPointCircle,
  MultiPolygon,
  Point,
  PointCircle,
  Polygon,
} from './object-classes.js';
import type * as GJ from './types.js';
import {copy} from '../copy.js';
import {
  AreaGeometry,
  AreaGeometryCollection,
  LineGeometry,
  LineGeometryCollection,
  PointGeometry,
  PointGeometryCollection,
} from './geometry-collection-classes.js';

abstract class BaseFeature extends GeoJsonObject<'Feature'> {
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

export class PointFeature extends BaseFeature implements GJ.PointFeature {
  static isFeature(obj: any): obj is PointFeature {
    return obj instanceof PointFeature;
  }

  geometry: PointGeometry;

  constructor(
    obj: OptionalParam<GJ.PointFeature, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'Feature'}, shallow);

    switch (obj.geometry?.type) {
      case 'GeometryCollection':
        this.geometry = new PointGeometryCollection(obj.geometry, shallow);
        break;
      case 'Point':
        this.geometry = new Point(obj.geometry, shallow);
        break;
      case 'MultiPoint':
        this.geometry = new MultiPoint(obj.geometry, shallow);
        break;
    }
  }
}

export class LineFeature extends BaseFeature implements GJ.LineFeature {
  static isFeature(obj: any): obj is LineFeature {
    return obj instanceof LineFeature;
  }

  geometry: LineGeometry;

  constructor(
    obj: OptionalParam<GJ.LineFeature, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'Feature'}, shallow);

    switch (obj.geometry?.type) {
      case 'GeometryCollection':
        this.geometry = new LineGeometryCollection(obj.geometry, shallow);
        break;
      case 'LineString':
        this.geometry = new LineString(obj.geometry, shallow);
        break;
      case 'MultiLineString':
        this.geometry = new MultiLineString(obj.geometry, shallow);
        break;
    }
  }
}

export class AreaFeature extends BaseFeature implements GJ.AreaFeature {
  static isFeature(obj: any): obj is AreaFeature {
    return obj instanceof AreaFeature;
  }

  geometry: AreaGeometry;

  constructor(
    obj: OptionalParam<GJ.AreaFeature, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'Feature'}, shallow);

    switch (obj.geometry?.type) {
      case 'GeometryCollection':
        this.geometry = new AreaGeometryCollection(obj.geometry, shallow);
        break;
      case 'Point':
        this.geometry = new PointCircle(obj.geometry, shallow);
        break;
      case 'MultiPoint':
        this.geometry = new MultiPointCircle(obj.geometry, shallow);
        break;
      case 'Polygon':
        this.geometry = new Polygon(obj.geometry, shallow);
        break;
      case 'MultiPolygon':
        this.geometry = new MultiPolygon(obj.geometry, shallow);
        break;
    }
  }
}
