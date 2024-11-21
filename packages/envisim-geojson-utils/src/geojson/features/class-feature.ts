import {type OptionalParam, copy} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {CirclesToPolygonsOptions} from '../../utils/circles-to-polygons.js';
import {GeometricPrimitive} from '../geometric-primitive/index.js';
import {
  AreaObject,
  LineObject,
  PointObject,
  toAreaObject,
  toLineObject,
  toPointObject,
} from '../objects/index.js';

export class Feature<out T extends AreaObject | LineObject | PointObject>
  implements GJ.BaseFeature<GJ.SingleTypeObject, number | string>
{
  readonly type = 'Feature';
  geometry: T;
  properties: GJ.FeatureProperties<number | string>;

  static isArea(obj: unknown): obj is Feature<AreaObject> {
    return obj instanceof Feature && obj.geometricPrimitive() === GeometricPrimitive.AREA;
  }
  static isLine(obj: unknown): obj is Feature<LineObject> {
    return obj instanceof Feature && obj.geometricPrimitive() === GeometricPrimitive.LINE;
  }
  static isPoint(obj: unknown): obj is Feature<PointObject> {
    return obj instanceof Feature && obj.geometricPrimitive() === GeometricPrimitive.POINT;
  }

  static assertArea(
    obj: unknown,
    msg: string = 'Expected area',
  ): asserts obj is Feature<AreaObject> {
    if (!Feature.isArea(obj)) throw new TypeError(msg);
  }
  static assertLine(
    obj: unknown,
    msg: string = 'Expected line',
  ): asserts obj is Feature<LineObject> {
    if (!Feature.isLine(obj)) throw new TypeError(msg);
  }
  static assertPoint(
    obj: unknown,
    msg: string = 'Expected point',
  ): asserts obj is Feature<PointObject> {
    if (!Feature.isPoint(obj)) throw new TypeError(msg);
  }

  static createAreaFromJson(
    feature: OptionalParam<GJ.BaseFeature<GJ.BaseGeometry, number | string>, 'type'>,
    shallow: boolean = true,
  ): Feature<AreaObject> | null {
    return Feature.createArea(feature.geometry, feature.properties ?? {}, shallow);
  }
  static createLineFromJson(
    feature: OptionalParam<GJ.BaseFeature<GJ.BaseGeometry, number | string>, 'type'>,
    shallow: boolean = true,
  ): Feature<LineObject> | null {
    return Feature.createLine(feature.geometry, feature.properties ?? {}, shallow);
  }
  static createPointFromJson(
    feature: OptionalParam<GJ.BaseFeature<GJ.BaseGeometry, number | string>, 'type'>,
    shallow: boolean = true,
  ): Feature<PointObject> | null {
    return Feature.createPoint(feature.geometry, feature.properties ?? {}, shallow);
  }

  static createArea(
    geometry: GJ.BaseGeometry,
    properties: GJ.FeatureProperties<number | string> = {},
    shallow: boolean = true,
    options: CirclesToPolygonsOptions = {},
  ): Feature<AreaObject> | null {
    const geom = toAreaObject(geometry, true, options);
    if (geom === null) return null;
    return new Feature(geom, properties, shallow);
  }
  static createLine(
    geometry: GJ.BaseGeometry,
    properties: GJ.FeatureProperties<number | string> = {},
    shallow: boolean = true,
  ): Feature<LineObject> | null {
    const geom = toLineObject(geometry, true);
    if (geom === null) return null;
    return new Feature(geom, properties, shallow);
  }
  static createPoint(
    geometry: GJ.BaseGeometry,
    properties: GJ.FeatureProperties<number | string> = {},
    shallow: boolean = true,
  ): Feature<PointObject> | null {
    const geom = toPointObject(geometry, true);
    if (geom === null) return null;
    return new Feature(geom, properties, shallow);
  }

  constructor(
    geometry: T,
    properties: GJ.FeatureProperties<number | string> = {},
    shallow: boolean = true,
  ) {
    if (shallow === true) {
      this.geometry = geometry;
      this.properties = properties;
      return;
    }

    this.geometry = geometry.copy(false) as T;
    this.properties = copy(properties);
  }

  geometricPrimitive(): GeometricPrimitive {
    return this.geometry.geometricPrimitive();
  }

  initProperty(property: string, defaultValue: number | string): void {
    if (!Object.hasOwn(this.properties, property)) {
      this.properties[property] = defaultValue;
    }
  }

  removeProperty(property: string): void {
    delete this.properties[property];
  }

  setProperty(property: string, value: number | string): void {
    this.properties[property] = value;
  }

  editProperty(
    property: string,
    callback: <P extends number | string>(value: P) => P,
    defaultValue: number = 0.0,
  ): number | string {
    this.initProperty(property, defaultValue);
    const newValue = callback(this.properties[property]);
    this.properties[property] = newValue;
    return newValue;
  }

  replaceProperties(properties: GJ.FeatureProperties<number | string>, shallow: boolean = true) {
    if (shallow) {
      this.properties = properties;
    } else {
      this.properties = copy(properties);
    }
  }

  // SPECIAL PROPERTIES
  getSpecialPropertyDesignWeight(defaultValue: number = 1.0): number {
    return (this.properties['_designWeight'] ?? defaultValue) as number;
  }
  getSpecialPropertyDistance(defaultValue: number = 0.0): number {
    return (this.properties['_distance'] ?? defaultValue) as number;
  }
  getSpecialPropertyParent(defaultValue: number = -1): number {
    return (this.properties['_parent'] ?? defaultValue) as number;
  }
  getSpecialPropertyRandomRotation(defaultValue: number = 0): number {
    return (this.properties['_randomRotation'] ?? defaultValue) as number;
  }
  setSpecialPropertyDesignWeight(value: number = 1.0) {
    (this.properties['_designWeight'] as number) = value;
  }
  setSpecialPropertyDistance(value: number = 0.0) {
    (this.properties['_distance'] as number) = value;
  }
  setSpecialPropertyParent(value: number = -1) {
    (this.properties['_parent'] as number) = value;
  }
  setSpecialPropertyRandomRotation(value: number = 0) {
    (this.properties['_randomRotation'] as number) = value;
  }
  multSpecialPropertyDesignWeight(value: number = 1.0): number {
    return ((this.properties['_designWeight'] as number) *= value);
  }
}
