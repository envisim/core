import {type OptionalParam, copy} from '@envisim/utils';

import type * as GJ from '../types/geojson.js';
import {type CirclesToPolygonsOptions} from '../utils/circles-to-polygons.js';
import {GeometricPrimitive} from './geometric-primitive/index.js';
import {
  type AreaObject,
  type LineObject,
  type PointObject,
  type PureObject,
  toAreaObject,
  toLineObject,
  toPointObject,
} from './objects/index.js';
import {type FeatureProperties} from './property-record.js';

export class Feature<T extends PureObject, PID extends string = string>
  implements GJ.BaseFeature<GJ.SingleTypeObject, number | string>
{
  readonly type = 'Feature';
  geometry: T;
  properties: FeatureProperties<PID>;

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

  static createArea<PID extends string = string>(
    geometry: GJ.BaseGeometry,
    properties?: FeatureProperties<PID> | null,
    shallow: boolean = true,
    options: CirclesToPolygonsOptions = {},
  ): Feature<AreaObject, PID> | null {
    const geom = toAreaObject(geometry, true, options);
    if (geom === null) return null;
    if (!properties) return new Feature<AreaObject, string>(geom, {}, shallow);
    return new Feature(geom, properties, shallow);
  }
  static createLine<PID extends string = string>(
    geometry: GJ.BaseGeometry,
    properties?: FeatureProperties<PID> | null,
    shallow: boolean = true,
  ): Feature<LineObject> | null {
    const geom = toLineObject(geometry, true);
    if (geom === null) return null;
    if (!properties) return new Feature<LineObject, string>(geom, {}, shallow);
    return new Feature(geom, properties ?? {}, shallow);
  }
  static createPoint<PID extends string = string>(
    geometry: GJ.BaseGeometry,
    properties?: FeatureProperties<PID> | null,
    shallow: boolean = true,
  ): Feature<PointObject> | null {
    const geom = toPointObject(geometry, true);
    if (geom === null) return null;
    if (!properties) return new Feature<PointObject, string>(geom, {}, shallow);
    return new Feature(geom, properties ?? {}, shallow);
  }

  constructor(geometry: T, properties: FeatureProperties<PID>, shallow: boolean = true) {
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

  getProperty(id: PID): number | string {
    return this.properties[id];
  }

  setProperty(id: PID, value: FeatureProperties[PID]): void {
    this.properties[id] = value;
  }

  editProperty(
    id: PID,
    callback: (value: FeatureProperties[PID]) => FeatureProperties[PID],
  ): FeatureProperties[PID] {
    return (this.properties[id] = callback(this.properties[id]));
  }

  // SPECIAL PROPERTIES
  getSpecialPropertyDesignWeight(): number {
    return this.properties['_designWeight'] ?? 1.0;
  }
  getSpecialPropertyDistance(): number {
    return this.properties['_distance'] ?? 0.0;
  }
  getSpecialPropertyParent(): number {
    return this.properties['_parent'] ?? -1;
  }
  getSpecialPropertyRandomRotation(): number {
    return this.properties['_randomRotation'] ?? 0;
  }
  setSpecialPropertyDesignWeight(value: number) {
    this.properties['_designWeight'] = value;
  }
  setSpecialPropertyDistance(value: number) {
    this.properties['_distance'] = value;
  }
  setSpecialPropertyParent(value: number) {
    this.properties['_parent'] = value;
  }
  setSpecialPropertyRandomRotation(value: number) {
    this.properties['_randomRotation'] = value;
  }
  multSpecialPropertyDesignWeight(value: number): number {
    const dw = this.getSpecialPropertyDesignWeight() * value;
    this.properties['_designWeight'] = dw;
    return dw;
  }
}
