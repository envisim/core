import {v4 as uuid} from 'uuid';

import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {type BufferOptions} from '../../buffer/index.js';
import {unionOfBBoxes} from '../../utils/bbox.js';
import {centroidFromMultipleCentroids} from '../../utils/centroid.js';
import {CirclesToPolygonsOptions} from '../../utils/circles-to-polygons.js';
import {Feature} from '../features/index.js';
import {GeometricPrimitive} from '../geometric-primitive/index.js';
import {AreaObject, LineObject, PointObject} from '../objects/index.js';
import {
  type CategoricalProperty,
  type NumericalProperty,
  PropertyRecord,
} from '../property-record.js';

type ForEachCallback<T> = (obj: T, index: number) => void;

export class FeatureCollection<T extends AreaObject | LineObject | PointObject>
  implements GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.SingleTypeObject, number | string>>
{
  readonly type = 'FeatureCollection';
  features: Feature<T>[] = [];
  bbox?: GJ.BBox;
  readonly primitive: GeometricPrimitive;

  // Layer
  propertyRecord: PropertyRecord;

  static isArea(obj: unknown): obj is FeatureCollection<AreaObject> {
    return obj instanceof FeatureCollection && obj.geometricPrimitive() === GeometricPrimitive.AREA;
  }
  static isLine(obj: unknown): obj is FeatureCollection<LineObject> {
    return obj instanceof FeatureCollection && obj.geometricPrimitive() === GeometricPrimitive.LINE;
  }
  static isPoint(obj: unknown): obj is FeatureCollection<PointObject> {
    return (
      obj instanceof FeatureCollection && obj.geometricPrimitive() === GeometricPrimitive.POINT
    );
  }

  static assertArea(
    obj: unknown,
    msg: string = 'Expected area',
  ): asserts obj is FeatureCollection<AreaObject> {
    if (!FeatureCollection.isArea(obj)) throw new TypeError(msg);
  }
  static assertLine(
    obj: unknown,
    msg: string = 'Expected line',
  ): asserts obj is FeatureCollection<LineObject> {
    if (!FeatureCollection.isLine(obj)) throw new TypeError(msg);
  }
  static assertPoint(
    obj: unknown,
    msg: string = 'Expected point',
  ): asserts obj is FeatureCollection<PointObject> {
    if (!FeatureCollection.isPoint(obj)) throw new TypeError(msg);
  }

  static createAreaFromJson(
    fc: OptionalParam<GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>, 'type'>,
    createPropertyRecord: boolean = true,
    shallow: boolean = true,
  ): FeatureCollection<AreaObject> {
    return FeatureCollection.createArea(fc.features, createPropertyRecord, shallow);
  }
  static createLineFromJson(
    fc: OptionalParam<GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>, 'type'>,
    createPropertyRecord: boolean = true,
    shallow: boolean = true,
  ): FeatureCollection<LineObject> {
    return FeatureCollection.createLine(fc.features, createPropertyRecord, shallow);
  }
  static createPointFromJson(
    fc: OptionalParam<GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>, 'type'>,
    createPropertyRecord: boolean = true,
    shallow: boolean = true,
  ): FeatureCollection<PointObject> {
    return FeatureCollection.createPoint(fc.features, createPropertyRecord, shallow);
  }

  static createArea(
    features: GJ.BaseFeature<GJ.BaseGeometry, any>[],
    createPropertyRecord: boolean = true,
    shallow: boolean = true,
    options: CirclesToPolygonsOptions = {},
  ): FeatureCollection<AreaObject> {
    const feats: Feature<AreaObject>[] = [];
    const fmap: number[] = [];

    for (let i = 0; i < features.length; i++) {
      const f = features[i];
      const feature = Feature.createArea(f.geometry, {}, shallow, options);
      if (feature === null) continue;
      feats.push(feature);
      fmap.push(i);
    }

    if (feats.length === 0) {
      return new FeatureCollection([], undefined, GeometricPrimitive.AREA);
    }

    let pr: PropertyRecord | undefined = undefined;
    if (createPropertyRecord === true) {
      pr = PropertyRecord.createFromFeature(features[fmap[0]]);

      for (let i = 0; i < feats.length; i++) {
        feats[i].properties = setPropertiesOfFeature(pr, features[fmap[i]].properties ?? {});
      }
    }

    return new FeatureCollection(feats, pr, GeometricPrimitive.AREA);
  }
  static createLine(
    features: GJ.BaseFeature<GJ.BaseGeometry, any>[],
    createPropertyRecord: boolean = true,
    shallow: boolean = true,
  ): FeatureCollection<LineObject> {
    const feats: Feature<LineObject>[] = [];
    const fmap: number[] = [];

    for (let i = 0; i < features.length; i++) {
      const f = features[i];
      const feature = Feature.createLine(f.geometry, {}, shallow);
      if (feature === null) continue;
      feats.push(feature);
      fmap.push(i);
    }

    if (feats.length === 0) {
      return new FeatureCollection([], undefined, GeometricPrimitive.LINE);
    }

    let pr: PropertyRecord | undefined = undefined;
    if (createPropertyRecord === true) {
      pr = PropertyRecord.createFromFeature(features[fmap[0]]);

      for (let i = 0; i < feats.length; i++) {
        feats[i].properties = setPropertiesOfFeature(pr, features[fmap[i]].properties ?? {});
      }
    }

    return new FeatureCollection(feats, pr, GeometricPrimitive.LINE);
  }
  static createPoint(
    features: GJ.BaseFeature<GJ.BaseGeometry, any>[],
    createPropertyRecord: boolean = true,
    shallow: boolean = true,
  ): FeatureCollection<PointObject> {
    const feats: Feature<PointObject>[] = [];
    const fmap: number[] = [];

    for (let i = 0; i < features.length; i++) {
      const f = features[i];
      const feature = Feature.createPoint(f.geometry, {}, shallow);
      if (feature === null) continue;
      feats.push(feature);
      fmap.push(i);
    }

    if (feats.length === 0) {
      return new FeatureCollection([], undefined, GeometricPrimitive.POINT);
    }

    let pr: PropertyRecord | undefined = undefined;
    if (createPropertyRecord === true) {
      pr = PropertyRecord.createFromFeature(features[fmap[0]]);

      for (let i = 0; i < feats.length; i++) {
        feats[i].properties = setPropertiesOfFeature(pr, features[fmap[i]].properties ?? {});
      }
    }

    return new FeatureCollection(feats, pr, GeometricPrimitive.POINT);
  }

  static newArea<F extends AreaObject = AreaObject>(
    features: Feature<F>[] = [],
    propertyRecord: PropertyRecord | undefined = undefined,
    shallow: boolean = true,
  ): FeatureCollection<F> {
    if (shallow === true) {
      return new FeatureCollection(features, propertyRecord, GeometricPrimitive.AREA);
    }

    return new FeatureCollection(
      features.map((f) => new Feature(f.geometry, f.properties, false)),
      propertyRecord?.copy(shallow),
      GeometricPrimitive.AREA,
    );
  }
  static newLine<F extends LineObject = LineObject>(
    features: Feature<F>[] = [],
    propertyRecord: PropertyRecord | undefined = undefined,
    shallow: boolean = true,
  ): FeatureCollection<F> {
    if (shallow === true) {
      return new FeatureCollection(features, propertyRecord, GeometricPrimitive.LINE);
    }

    return new FeatureCollection(
      features.map((f) => new Feature(f.geometry, f.properties, false)),
      propertyRecord?.copy(shallow),
      GeometricPrimitive.LINE,
    );
  }
  static newPoint<F extends PointObject = PointObject>(
    features: Feature<F>[] = [],
    propertyRecord: PropertyRecord | undefined = undefined,
    shallow: boolean = true,
  ): FeatureCollection<F> {
    if (shallow === true) {
      return new FeatureCollection(features, propertyRecord, GeometricPrimitive.POINT);
    }

    return new FeatureCollection(
      features.map((f) => new Feature(f.geometry, f.properties, false)),
      propertyRecord?.copy(shallow),
      GeometricPrimitive.POINT,
    );
  }

  private constructor(
    features: Feature<T>[],
    propertyRecord: PropertyRecord | undefined,
    primitive: GeometricPrimitive,
  ) {
    this.primitive = primitive;
    this.features = features;
    this.propertyRecord = propertyRecord ?? new PropertyRecord();
  }

  /**
   * Transforms the categorical properties back to strings, and returns the json
   * @param options if `options.convertCircles` is `true` (default), then circles will be converted
   * to polygons.
   */
  copy(
    shallow: boolean = true,
    {
      convertCircles = false,
      ...options
    }: CirclesToPolygonsOptions & {convertCircles?: boolean} = {},
  ): FeatureCollection<T> {
    if (FeatureCollection.isArea(this) && convertCircles) {
      const features: Feature<T>[] = [];

      for (const f of this.features) {
        const g = f.geometry.toPolygon(options);
        if (g === null) continue;
        features.push(new Feature(g, f.properties, shallow) as Feature<T>);
      }

      return new FeatureCollection(features, this.propertyRecord.copy(shallow), this.primitive);
    }

    return new FeatureCollection(
      this.features.map((f) => new Feature(f.geometry, f.properties, shallow)),
      this.propertyRecord.copy(shallow),
      this.primitive,
    );
  }

  copyEmpty(shallow: boolean = true): FeatureCollection<T> {
    return new FeatureCollection([], this.propertyRecord.copy(shallow), this.primitive);
  }

  geometricPrimitive(): GeometricPrimitive {
    return this.primitive;
  }

  /**
   * @returns the measure of the collection: the total area of an area collection, the total length
   * of a line collection, and the total count of a point collection
   */
  measure(): number {
    return this.features.reduce((p, c) => p + c.geometry.measure(), 0.0);
  }

  setBBox(force: boolean = false): GJ.BBox {
    const bboxArray = Array.from<GJ.BBox>({length: this.features.length});

    if (force === true) {
      this.geomEach((geometry: T, index: number) => {
        bboxArray[index] = geometry.setBBox();
      });
    } else {
      this.geomEach((geometry: T, index: number) => {
        bboxArray[index] = geometry.getBBox();
      });
    }

    this.bbox = unionOfBBoxes(bboxArray);
    return this.bbox;
  }
  getBBox(): GJ.BBox {
    return this.bbox ?? this.setBBox();
  }

  size(): number {
    return this.features.length;
  }

  distanceToPosition(coords: GJ.Position): number {
    let distance = Infinity;

    for (const feat of this.features) {
      const d = feat.geometry.distanceToPosition(coords);

      if (distance <= 0.0) {
        if (d <= 0.0 && d > distance) {
          distance = d;
        }
      } else {
        if (d < distance) {
          distance = d;
        }
      }
    }

    return distance;
  }

  centroid(iterations: number = 2): GJ.Position {
    const centroids = this.features.map((feature) => {
      return {
        centroid: feature.geometry.centroid(iterations),
        weight: feature.geometry.measure(),
      };
    });
    return centroidFromMultipleCentroids(centroids, this.getBBox(), iterations).centroid;
  }

  buffer(options: BufferOptions): FeatureCollection<AreaObject> | null {
    const ac = FeatureCollection.newArea();

    this.forEach((feature) => {
      const bf = feature.geometry.buffer(options);
      if (bf !== null) ac.addFeature(new Feature(bf), true);
    });

    if (ac.features.length === 0) return null;
    return ac;
  }

  // LOOPING
  forEach(callback: ForEachCallback<Feature<T>>): void {
    this.features.forEach(callback);
  }
  geomEach(callback: ForEachCallback<T>): void {
    this.features.forEach((f, i) => callback(f.geometry, i));
  }

  // FEATURE HANDLING
  addGeometry(
    geometry: T,
    properties: GJ.FeatureProperties<number | string> = {},
    shallow: boolean = true,
  ): number {
    return this.features.push(new Feature(geometry, properties, shallow));
  }

  addFeature(feature: Feature<T>, shallow: boolean = true): number {
    if (shallow === true) {
      return this.features.push(feature);
    }

    return this.features.push(new Feature(feature.geometry, feature.properties, false));
  }

  removeFeature(index: number): void {
    this.features.splice(index, 1);
  }

  // PROPERTY HANDLING
  initNumericalProperty(
    {id = uuid(), name = id, parent}: Partial<NumericalProperty>,
    defaultValue: number,
  ): void {
    // add the property to the record
    this.propertyRecord.addNumerical({id, name, parent});
    // add the default value to each feature
    this.forEach((feature) => feature.setProperty(id, defaultValue));
  }
  initCategoricalProperty(
    {id = uuid(), name = id, values = []}: Partial<CategoricalProperty>,
    defaultValue: string,
  ): void {
    // add the property to the record
    this.propertyRecord.addCategorical({id, name, values});
    // add the default value to record if it does not exist
    this.propertyRecord.addValueToCategory(id, defaultValue);
    // add the default value to each feature
    this.forEach((feature) => feature.setProperty(id, defaultValue));
  }
  removeProperty(id: string): void {
    // remove the property from the record
    this.propertyRecord.removeProperty(id);
    // remove the property from each feature
    this.forEach((feature) => feature.removeProperty(id));
  }

  setProperty(id: string, index: number, value: number | string): void {
    if (index < 0 || index >= this.size()) throw new Error('no feature with this index exists');
    this.features[index].setProperty(id, value);
  }

  // LAYER
  appendFeatureCollection(fc: FeatureCollection<T>, shallow: boolean = true): void {
    if (this.geometricPrimitive() !== fc.geometricPrimitive()) {
      throw new TypeError('layer types does not match');
    }

    const thisKeys = this.propertyRecord.getIds();
    const fcKeys = fc.propertyRecord.getIds();

    if (thisKeys.length !== fcKeys.length || !thisKeys.every((id) => fcKeys.includes(id))) {
      throw new RangeError('propertyRecords does not match');
    }

    fc.forEach((feat) => this.addFeature(feat, shallow));
  }
}

function setPropertiesOfFeature(
  propertyRecord: PropertyRecord,
  properties: GJ.FeatureProperties<any>,
): GJ.FeatureProperties<number | string> {
  const newProps: GJ.FeatureProperties<number | string> = {};

  for (const prop of propertyRecord.getRecord()) {
    const id = prop.id;

    // If the prop does not exist on the feature, we have a problem
    if (!Object.hasOwn(properties, id)) {
      throw new Error('All features must have the same properties.');
    }

    const value: unknown = properties[id];

    if (PropertyRecord.propertyIsNumerical(prop)) {
      // Add numerical property
      if (typeof value !== 'number') {
        throw new Error('All features must have the same types on the properties.');
      }
    } else {
      // prop.type === 'categorical'
      // Add categorical property
      // We fill the value array, as new values are encountered.
      if (typeof value !== 'string') {
        throw new Error('All features must have the same types on the properties.');
      }

      if (!prop.values.includes(value)) {
        prop.values.push(value);
      }
    }

    newProps[prop.id] = value;
  }

  return newProps;
}

export type PureCollection<
  T extends AreaObject | LineObject | PointObject = AreaObject | LineObject | PointObject,
> = T extends AreaObject
  ? FeatureCollection<AreaObject>
  : T extends LineObject
    ? FeatureCollection<LineObject>
    : T extends PointObject
      ? FeatureCollection<PointObject>
      : never;
