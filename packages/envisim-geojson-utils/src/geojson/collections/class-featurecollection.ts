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
    return new FeatureCollection(
      features.map((f) => Feature.createArea(f.geometry, f.properties ?? {}, shallow, options)),
      GeometricPrimitive.AREA,
    );
  }
  static createLine(
    features: GJ.LineFeature[],
    shallow: boolean = true,
  ): FeatureCollection<LineObject> {
    return new FeatureCollection(
      features.map((f) => Feature.createLine(f.geometry, f.properties ?? {}, shallow)),
      GeometricPrimitive.LINE,
    );
  }
  static createPoint(
    features: GJ.PointFeature[],
    shallow: boolean = true,
  ): FeatureCollection<PointObject> {
    return new FeatureCollection(
      features.map((f) => Feature.createPoint(f.geometry, f.properties ?? {}, shallow)),
      GeometricPrimitive.POINT,
    );
  }

  static newArea(
    features: Feature<AreaObject>[] = [],
    shallow: boolean = true,
  ): FeatureCollection<AreaObject> {
    return new FeatureCollection(
      shallow === true
        ? features
        : features.map((f) => Feature.newArea(f.geometry, f.properties, false)),
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
        : features.map((f) => Feature.newLine(f.geometry, f.properties, false)),
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
        : features.map((f) => Feature.newPoint(f.geometry, f.properties, false)),
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
      if (bf !== null) ac.addFeature(Feature.newArea(bf), true);
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
  addFeature(this: FeatureCollection<T>, feature: Feature<T>, shallow: boolean = true): number {
    if (shallow === true) {
      return this.features.push(feature);
    }

    if (Feature.isArea(feature)) {
      return this.features.push(
        Feature.newArea(feature.geometry, feature.properties, false) as Feature<T>,
      );
    } else if (Feature.isLine(feature)) {
      return this.features.push(
        Feature.newLine(feature.geometry, feature.properties, false) as Feature<T>,
      );
    } else if (Feature.isPoint(feature)) {
      return this.features.push(
        Feature.newPoint(feature.geometry, feature.properties, false) as Feature<T>,
      );
    } else {
      throw new TypeError('unknown feature');
    }
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
