import {type OptionalParam, copy} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {type BufferOptions} from '../../buffer/index.js';
import {unionOfBBoxes} from '../../utils/bbox.js';
import {centroidFromMultipleCentroids} from '../../utils/centroid.js';
import {CirclesToPolygonsOptions} from '../../utils/circles-to-polygons.js';
import {Feature} from '../features/index.js';
import {GeometricPrimitive} from '../geometric-primitive/index.js';
import {AreaObject, Circle, LineObject, MultiCircle, PointObject} from '../objects/index.js';
import {PropertyRecord, createPropertyRecordFromFeature} from '../property-record.js';

type ForEachCallback<T> = (obj: T, index: number) => void;

export class FeatureCollection<T extends AreaObject | LineObject | PointObject>
  implements GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.SingleTypeObject, number>>
{
  readonly type = 'FeatureCollection';
  features: Feature<T>[] = [];
  bbox?: GJ.BBox;
  readonly primitive: GeometricPrimitive;

  // Layer
  propertyRecord: PropertyRecord | undefined = undefined;

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
    shallow: boolean = true,
  ): FeatureCollection<AreaObject> {
    return FeatureCollection.createArea(fc.features, shallow);
  }
  static createLineFromJson(
    fc: OptionalParam<GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>, 'type'>,
    shallow: boolean = true,
  ): FeatureCollection<LineObject> {
    return FeatureCollection.createLine(fc.features, shallow);
  }
  static createPointFromJson(
    fc: OptionalParam<GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>, 'type'>,
    shallow: boolean = true,
  ): FeatureCollection<PointObject> {
    return FeatureCollection.createPoint(fc.features, shallow);
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
      pr = createPropertyRecordFromFeature(features[fmap[0]]);

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
      pr = createPropertyRecordFromFeature(features[fmap[0]]);

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
      pr = createPropertyRecordFromFeature(features[fmap[0]]);

      for (let i = 0; i < feats.length; i++) {
        feats[i].properties = setPropertiesOfFeature(pr, features[fmap[i]].properties ?? {});
      }
    }

    return new FeatureCollection(feats, pr, GeometricPrimitive.POINT);
  }

  static newArea(
    features: Feature<AreaObject>[] = [],
    propertyRecord: PropertyRecord | undefined = undefined,
    shallow: boolean = true,
  ): FeatureCollection<AreaObject> {
    if (shallow === true) {
      return new FeatureCollection(features, propertyRecord, GeometricPrimitive.AREA);
    }

    return new FeatureCollection(
      features.map((f) => new Feature<AreaObject>(f.geometry, f.properties, false)),
      propertyRecord === undefined ? undefined : copy(propertyRecord),
      GeometricPrimitive.AREA,
    );
  }
  static newLine(
    features: Feature<LineObject>[] = [],
    propertyRecord: PropertyRecord | undefined = undefined,
    shallow: boolean = true,
  ): FeatureCollection<LineObject> {
    if (shallow === true) {
      return new FeatureCollection(features, propertyRecord, GeometricPrimitive.LINE);
    }

    return new FeatureCollection(
      features.map((f) => new Feature<LineObject>(f.geometry, f.properties, false)),
      propertyRecord === undefined ? undefined : copy(propertyRecord),
      GeometricPrimitive.LINE,
    );
  }
  static newPoint(
    features: Feature<PointObject>[] = [],
    propertyRecord: PropertyRecord | undefined = undefined,
    shallow: boolean = true,
  ): FeatureCollection<PointObject> {
    if (shallow === true) {
      return new FeatureCollection(features, propertyRecord, GeometricPrimitive.POINT);
    }

    return new FeatureCollection(
      features.map((f) => new Feature<PointObject>(f.geometry, f.properties, false)),
      propertyRecord === undefined ? undefined : copy(propertyRecord),
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
    this.propertyRecord = propertyRecord;
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
  addGeometry(geometry: T, properties: GJ.FeatureProperties = {}, shallow: boolean = true): number {
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
  initProperty(property: string, defaultValue: number = 0.0): void {
    this.forEach((feature) => feature.initProperty(property, defaultValue));
  }

  removeProperty(property: string): void {
    this.forEach((feature) => feature.removeProperty(property));
  }

  setProperty(property: string, index: number, value: number): void {
    if (index < 0 || index >= this.size()) throw new Error('no feature with this index exists');
    this.features[index].setProperty(property, value);
  }

  forEachProperty(property: string, callback: (value: number, index: number) => void): void {
    this.forEach((feature, index) => {
      callback(feature.properties[property], index);
    });
  }

  // LAYER
  appendFeatureCollection(fc: FeatureCollection<T>, shallow: boolean = true): void {
    if (this.geometricPrimitive() !== fc.geometricPrimitive()) {
      throw new TypeError('layer types does not match');
    }

    const thisKeys = Object.keys(this.propertyRecord ?? {});
    const fcKeys = Object.keys(fc.propertyRecord ?? {});

    if (thisKeys.length !== fcKeys.length || !thisKeys.every((id) => fcKeys.includes(id))) {
      throw new RangeError('propertyRecords does not match');
    }

    fc.forEach((feat) => this.addFeature(feat, shallow));
  }

  toGeoJSON(
    convertCircles: boolean = true,
    options: CirclesToPolygonsOptions = {},
  ): GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.SingleTypeObject, number | string>> {
    const features: GJ.BaseFeature<GJ.SingleTypeObject, number | string>[] = [];
    const pr = this.propertyRecord ?? {};

    if (FeatureCollection.isArea(this)) {
      this.forEach((feature) => {
        const oldProps = feature.properties;
        const newProps: GJ.FeatureProperties<number | string> = {};

        Object.keys(pr).forEach((key) => {
          const rec = pr[key];
          const name = rec.name ?? rec.id;
          if (rec.type === 'numerical') {
            newProps[name] = oldProps[rec.id];
          } else if (rec.type == 'categorical') {
            newProps[name] = rec.values[oldProps[rec.id]];
          }
        });

        let geometry: AreaObject | LineObject | PointObject | null;
        if (
          convertCircles === true &&
          (Circle.isObject(feature.geometry) || MultiCircle.isObject(feature.geometry))
        ) {
          geometry = feature.geometry.toPolygon(options);
        } else {
          geometry = copy(feature.geometry);
        }

        if (geometry !== null) {
          features.push({
            type: 'Feature',
            geometry,
            properties: newProps,
          });
        }
      });
    }

    return {type: 'FeatureCollection', features};
  }
}

function setPropertiesOfFeature(
  propertyRecord: PropertyRecord,
  properties: GJ.FeatureProperties<any>,
): GJ.FeatureProperties<number> {
  const newProps: GJ.FeatureProperties<number> = {};

  for (const prop of Object.values(propertyRecord)) {
    const name = prop.name ?? '';

    // If the prop does not exist on the feature, we have a problem
    if (!Object.hasOwn(properties, name)) {
      throw new Error('All features must have the same properties.');
    }

    const value: unknown = properties[name];

    // Add numerical property
    if (prop.type === 'numerical') {
      if (typeof value !== 'number') {
        throw new Error('All features must have the same types on the properties.');
      }

      newProps[prop.id] = value;
      continue;
    }

    // Add categorical property
    // We fill the value array, as new values are encountered.
    if (prop.type === 'categorical') {
      if (typeof value !== 'string') {
        throw new Error('All features must have the same types on the properties.');
      }

      let valueIndex = prop.values.indexOf(value);

      if (valueIndex === -1) {
        valueIndex = prop.values.push(value) - 1;
      }

      newProps[prop.id] = valueIndex;
    }
  }

  return newProps;
}
