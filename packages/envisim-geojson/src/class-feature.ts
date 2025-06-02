import { GeometricPrimitive } from "@envisim/geojson-utils";
import type * as GJ from "@envisim/geojson-utils/geojson";
import { type OptionalParam, ValidationError, copy } from "@envisim/utils";
import {
  type AreaObject,
  type LineObject,
  type PointObject,
  type PureObject,
  toAreaObject,
  toLineObject,
  toPointObject,
} from "./objects/index.js";
import { type FeatureProperties } from "./property-record.js";
import { type CirclesToPolygonsOptions } from "./utils/circles-to-polygons.js";

export class Feature<T extends PureObject, PID extends string = string>
  implements GJ.BaseFeature<GJ.SingleTypeObject, number | string>
{
  readonly type = "Feature";
  geometry: T;
  properties: FeatureProperties<PID>;

  static isArea(obj: unknown): obj is Feature<AreaObject> {
    return obj instanceof Feature && GeometricPrimitive.isArea(obj.geometricPrimitive());
  }
  static isLine(obj: unknown): obj is Feature<LineObject> {
    return obj instanceof Feature && GeometricPrimitive.isLine(obj.geometricPrimitive());
  }
  static isPoint(obj: unknown): obj is Feature<PointObject> {
    return obj instanceof Feature && GeometricPrimitive.isPoint(obj.geometricPrimitive());
  }

  static assertArea(obj: unknown): asserts obj is Feature<AreaObject> {
    if (!Feature.isArea(obj))
      throw ValidationError.create["geojson-not-area"]({ arg: "obj", type: "feature" });
  }
  static assertLine(obj: unknown): asserts obj is Feature<LineObject> {
    if (!Feature.isLine(obj))
      throw ValidationError.create["geojson-not-line"]({ arg: "obj", type: "feature" });
  }
  static assertPoint(obj: unknown): asserts obj is Feature<PointObject> {
    if (!Feature.isPoint(obj))
      throw ValidationError.create["geojson-not-point"]({ arg: "obj", type: "feature" });
  }

  static createAreaFromJson(
    feature: OptionalParam<GJ.BaseFeature<GJ.BaseGeometry, number | string>, "type">,
    shallow: boolean = true,
  ): Feature<AreaObject> | null {
    return Feature.createArea(feature.geometry, feature.properties ?? {}, shallow);
  }
  static createLineFromJson(
    feature: OptionalParam<GJ.BaseFeature<GJ.BaseGeometry, number | string>, "type">,
    shallow: boolean = true,
  ): Feature<LineObject> | null {
    return Feature.createLine(feature.geometry, feature.properties ?? {}, shallow);
  }
  static createPointFromJson(
    feature: OptionalParam<GJ.BaseFeature<GJ.BaseGeometry, number | string>, "type">,
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

  geometricPrimitive() {
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

  measure(): number {
    if (typeof this.properties["_measure"] !== "number") {
      this.setSpecialPropertyMeasure();
    }

    return this.properties["_measure"] as number;
  }

  // SPECIAL PROPERTIES
  getSpecialPropertyDesignWeight(): number {
    return this.properties["_designWeight"] ?? 1.0;
  }
  getSpecialPropertyDistance(): number {
    return this.properties["_distance"] ?? 0.0;
  }
  getSpecialPropertyParent(): number {
    return this.properties["_parent"] ?? -1;
  }
  getSpecialPropertyRandomRotation(): number {
    return this.properties["_randomRotation"] ?? 0;
  }
  setSpecialPropertyDesignWeight(value: number) {
    this.properties["_designWeight"] = value;
  }
  setSpecialPropertyDistance(value: number) {
    this.properties["_distance"] = value;
  }
  setSpecialPropertyParent(value: number) {
    this.properties["_parent"] = value;
  }
  setSpecialPropertyRandomRotation(value: number) {
    this.properties["_randomRotation"] = value;
  }
  setSpecialPropertyMeasure() {
    this.properties["_measure"] = this.geometry.measure();
  }
  multSpecialPropertyDesignWeight(value: number): number {
    const dw = this.getSpecialPropertyDesignWeight() * value;
    this.properties["_designWeight"] = dw;
    return dw;
  }
}
