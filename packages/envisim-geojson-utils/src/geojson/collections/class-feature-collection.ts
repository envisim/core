import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {type BufferOptions} from '../../buffer/index.js';
import {unionOfBBoxes} from '../../utils/bbox.js';
import {centroidFromMultipleCentroids} from '../../utils/centroid.js';
import {CirclesToPolygonsOptions} from '../../utils/circles-to-polygons.js';
import {Feature} from '../features/index.js';
import {GeometricPrimitive} from '../geometric-primitive/index.js';
import {AreaObject, LineObject, PointObject} from '../objects/index.js';

type ForEachCallback<T> = (obj: T, index: number) => void;

export class FeatureCollection<T extends AreaObject | LineObject | PointObject>
  implements GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.SingleTypeObject, number>>
{
  readonly type = 'FeatureCollection';
  features: Feature<T>[] = [];
  bbox?: GJ.BBox;
  readonly primitive: GeometricPrimitive;

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
    fc: OptionalParam<GJ.AreaFeatureCollection, 'type'>,
    shallow: boolean = true,
  ): FeatureCollection<AreaObject> {
    return FeatureCollection.createArea(fc.features, shallow);
  }
  static createLineFromJson(
    fc: OptionalParam<GJ.LineFeatureCollection, 'type'>,
    shallow: boolean = true,
  ): FeatureCollection<LineObject> {
    return FeatureCollection.createLine(fc.features, shallow);
  }
  static createPointFromJson(
    fc: OptionalParam<GJ.PointFeatureCollection, 'type'>,
    shallow: boolean = true,
  ): FeatureCollection<PointObject> {
    return FeatureCollection.createPoint(fc.features, shallow);
  }

  static createArea(
    features: GJ.AreaFeature[],
    shallow: boolean = true,
    options: CirclesToPolygonsOptions = {},
  ): FeatureCollection<AreaObject> {
    const fc = new FeatureCollection<AreaObject>([], GeometricPrimitive.AREA);

    for (const f of features) {
      const feature = Feature.createArea(f.geometry, f.properties ?? {}, shallow, options);
      if (feature === null) continue;
      fc.features.push(feature);
    }

    return fc;
  }
  static createLine(
    features: GJ.LineFeature[],
    shallow: boolean = true,
  ): FeatureCollection<LineObject> {
    const fc = new FeatureCollection<LineObject>([], GeometricPrimitive.LINE);

    for (const f of features) {
      const feature = Feature.createLine(f.geometry, f.properties ?? {}, shallow);
      if (feature === null) continue;
      fc.features.push(feature);
    }

    return fc;
  }
  static createPoint(
    features: GJ.PointFeature[],
    shallow: boolean = true,
  ): FeatureCollection<PointObject> {
    const fc = new FeatureCollection<PointObject>([], GeometricPrimitive.POINT);

    for (const f of features) {
      const feature = Feature.createPoint(f.geometry, f.properties ?? {}, shallow);
      if (feature === null) continue;
      fc.features.push(feature);
    }

    return fc;
  }

  static newArea(
    features: Feature<AreaObject>[] = [],
    shallow: boolean = true,
  ): FeatureCollection<AreaObject> {
    return new FeatureCollection(
      shallow === true
        ? features
        : features.map((f) => new Feature<AreaObject>(f.geometry, f.properties, false)),
      GeometricPrimitive.AREA,
    );
  }
  static newLine(
    features: Feature<LineObject>[] = [],
    shallow: boolean = true,
  ): FeatureCollection<LineObject> {
    return new FeatureCollection(
      shallow === true
        ? features
        : features.map((f) => new Feature<LineObject>(f.geometry, f.properties, false)),
      GeometricPrimitive.LINE,
    );
  }
  static newPoint(
    features: Feature<PointObject>[] = [],
    shallow: boolean = true,
  ): FeatureCollection<PointObject> {
    return new FeatureCollection(
      shallow === true
        ? features
        : features.map((f) => new Feature<PointObject>(f.geometry, f.properties, false)),
      GeometricPrimitive.POINT,
    );
  }

  private constructor(features: Feature<T>[], primitive: GeometricPrimitive) {
    this.primitive = primitive;
    this.features = features;
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
        centroid: feature.geometry.centroid(),
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
}
