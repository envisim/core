import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../types/geojson.js';
import {type BufferOptions} from '../buffer/index.js';
import {unionOfBBoxes} from '../utils/bbox.js';
import {centroidFromMultipleCentroids} from '../utils/centroid.js';
import {type CirclesToPolygonsOptions} from '../utils/circles-to-polygons.js';
import {Feature} from './class-feature.js';
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
import {type FeatureProperties, PropertyRecord} from './property-record.js';

type ForEachCallback<T> = (obj: T, index: number) => void;
interface FeatureCollectionExtras {
  primitive: GeometricPrimitive;
  propertyRecord: PropertyRecord;
}
interface FeatureCollectionExtrasJson {
  primitive: GeometricPrimitive;
  propertyRecord: {record: PropertyRecord['record']};
}
type StrippedFeatureCollectionJson = OptionalParam<
  GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>> & FeatureCollectionExtrasJson,
  'type' | 'primitive' | 'propertyRecord'
>;

export class FeatureCollection<T extends PureObject, PID extends string = string>
  implements
    GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.SingleTypeObject, number | string>>,
    FeatureCollectionExtras
{
  readonly type = 'FeatureCollection';
  features: Feature<T, PID>[] = [];
  bbox?: GJ.BBox;
  readonly primitive: GeometricPrimitive;
  propertyRecord: PropertyRecord<PID>;

  static isArea<P extends string>(
    obj: FeatureCollection<PureObject, P>,
  ): obj is FeatureCollection<AreaObject, P> {
    return obj instanceof FeatureCollection && obj.geometricPrimitive() === GeometricPrimitive.AREA;
  }
  static isLine<P extends string>(
    obj: FeatureCollection<PureObject, P>,
  ): obj is FeatureCollection<LineObject, P> {
    return obj instanceof FeatureCollection && obj.geometricPrimitive() === GeometricPrimitive.LINE;
  }
  static isPoint<P extends string>(
    obj: FeatureCollection<PureObject, P>,
  ): obj is FeatureCollection<PointObject, P> {
    return (
      obj instanceof FeatureCollection && obj.geometricPrimitive() === GeometricPrimitive.POINT
    );
  }

  static assertArea<P extends string>(
    obj: FeatureCollection<PureObject, P>,
    msg: string = 'Expected area',
  ): asserts obj is FeatureCollection<AreaObject, P> {
    if (!FeatureCollection.isArea(obj)) throw new TypeError(msg);
  }
  static assertLine<P extends string>(
    obj: FeatureCollection<PureObject, P>,
    msg: string = 'Expected line',
  ): asserts obj is FeatureCollection<LineObject, P> {
    if (!FeatureCollection.isLine(obj)) throw new TypeError(msg);
  }
  static assertPoint<P extends string>(
    obj: FeatureCollection<PureObject, P>,
    msg: string = 'Expected point',
  ): asserts obj is FeatureCollection<PointObject, P> {
    if (!FeatureCollection.isPoint(obj)) throw new TypeError(msg);
  }

  static createAreaFromJson(
    collection: StrippedFeatureCollectionJson,
    shallow: boolean = true,
    options: CirclesToPolygonsOptions = {},
  ): FeatureCollection<AreaObject> {
    if (collection.primitive !== undefined && collection.primitive !== GeometricPrimitive.AREA) {
      return new FeatureCollection(GeometricPrimitive.AREA);
    }

    const {record, existed} = createPropertyRecord(collection, shallow);
    const fc = new FeatureCollection<AreaObject>(GeometricPrimitive.AREA, [], record);

    if (existed) {
      // If propertyrecord existed on provided collection, we trust it fully to be homogenous
      for (const f of collection.features) {
        const feature = Feature.createArea(f.geometry, f.properties, shallow, options);
        if (feature === null) continue;
        fc.addFeature(feature, true);
      }
    } else {
      // if it doesn't exist, we need to create it from the provided collection, and will need to
      // populate it (the categorical especially) by traversing all features. We take a harsher
      // approach here -- because we're already traversing everything -- and will reject any
      // collection which is not homogenous
      for (const f of collection.features) {
        const geometry = toAreaObject(f.geometry, shallow, options);
        if (geometry === null) continue;
        fc.addGeometry(
          geometry,
          setPropertiesOfFeature(fc.propertyRecord, f.properties ?? {}),
          true,
        );
      }
    }

    return fc;
  }
  static createLineFromJson(
    collection: StrippedFeatureCollectionJson,
    shallow: boolean = true,
  ): FeatureCollection<LineObject> {
    if (collection.primitive !== undefined && collection.primitive !== GeometricPrimitive.LINE) {
      return new FeatureCollection(GeometricPrimitive.LINE);
    }

    const {record, existed} = createPropertyRecord(collection, shallow);
    const fc = new FeatureCollection<LineObject>(GeometricPrimitive.LINE, [], record);

    if (existed) {
      for (const f of collection.features) {
        const feature = Feature.createLine(f.geometry, f.properties, shallow);
        if (feature === null) continue;
        fc.addFeature(feature, true);
      }
    } else {
      for (const f of collection.features) {
        const geometry = toLineObject(f.geometry, shallow);
        if (geometry === null) continue;
        fc.addGeometry(
          geometry,
          setPropertiesOfFeature(fc.propertyRecord, f.properties ?? {}),
          true,
        );
      }
    }

    return fc;
  }
  static createPointFromJson(
    collection: StrippedFeatureCollectionJson,
    shallow: boolean = true,
  ): FeatureCollection<PointObject> {
    if (collection.primitive !== undefined && collection.primitive !== GeometricPrimitive.POINT) {
      return new FeatureCollection(GeometricPrimitive.POINT);
    }

    const {record, existed} = createPropertyRecord(collection, shallow);
    const fc = new FeatureCollection<PointObject>(GeometricPrimitive.POINT, [], record);

    if (existed) {
      for (const f of collection.features) {
        const feature = Feature.createPoint(f.geometry, f.properties, shallow);
        if (feature === null) continue;
        fc.addFeature(feature, true);
      }
    } else {
      for (const f of collection.features) {
        const geometry = toPointObject(f.geometry, shallow);
        if (geometry === null) continue;
        fc.addGeometry(
          geometry,
          setPropertiesOfFeature(fc.propertyRecord, f.properties ?? {}),
          true,
        );
      }
    }

    return fc;
  }

  static newArea<F extends AreaObject = AreaObject, PID extends string = string>(
    features: Feature<F, PID>[] = [],
    propertyRecord?: PropertyRecord<PID>,
    shallow: boolean = true,
  ): FeatureCollection<F, PID> {
    if (shallow === true) {
      return new FeatureCollection(GeometricPrimitive.AREA, features, propertyRecord);
    }

    return new FeatureCollection(
      GeometricPrimitive.AREA,
      features.map((f) => new Feature(f.geometry, f.properties, false)),
      propertyRecord?.copy(shallow),
    );
  }
  static newLine<F extends LineObject = LineObject, PID extends string = string>(
    features: Feature<F, PID>[] = [],
    propertyRecord?: PropertyRecord<PID>,
    shallow: boolean = true,
  ): FeatureCollection<F, PID> {
    if (shallow === true) {
      return new FeatureCollection(GeometricPrimitive.LINE, features, propertyRecord);
    }

    return new FeatureCollection(
      GeometricPrimitive.LINE,
      features.map((f) => new Feature(f.geometry, f.properties, false)),
      propertyRecord?.copy(shallow),
    );
  }
  static newPoint<F extends PointObject = PointObject, PID extends string = string>(
    features: Feature<F, PID>[] = [],
    propertyRecord?: PropertyRecord<PID>,
    shallow: boolean = true,
  ): FeatureCollection<F, PID> {
    if (shallow === true) {
      return new FeatureCollection(GeometricPrimitive.POINT, features, propertyRecord);
    }

    return new FeatureCollection(
      GeometricPrimitive.POINT,
      features.map((f) => new Feature(f.geometry, f.properties, false)),
      propertyRecord?.copy(shallow),
    );
  }

  private constructor(
    primitive: GeometricPrimitive,
    features: Feature<T, PID>[] = [],
    propertyRecord?: PropertyRecord<PID>,
  ) {
    this.primitive = primitive;
    this.features = features;
    this.propertyRecord = propertyRecord ?? PropertyRecord.createFromFeature(features[0]);
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

      return new FeatureCollection(this.primitive, features, this.propertyRecord.copy(shallow));
    }

    return new FeatureCollection(
      this.primitive,
      this.features.map((f) => new Feature(f.geometry, f.properties, shallow)),
      this.propertyRecord.copy(shallow),
    );
  }

  copyEmpty(shallow: boolean = true): FeatureCollection<T, PID> {
    return new FeatureCollection(this.primitive, [], this.propertyRecord.copy(shallow));
  }

  geometricPrimitive(): GeometricPrimitive {
    return this.primitive;
  }

  /**
   * @returns the measure of the collection: the total area of an area collection, the total length
   * of a line collection, and the total count of a point collection
   */
  measure(): number {
    return this.features.reduce((p, c) => p + c.measure(), 0.0);
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

  buffer(options: BufferOptions): FeatureCollection<AreaObject, PID> | null {
    const ac = FeatureCollection.newArea<AreaObject, PID>();

    this.forEach((feature) => {
      const bf = feature.geometry.buffer(options);
      if (bf === null) return;
      ac.addGeometry(bf, feature.properties, true);
    });

    if (ac.features.length === 0) return null;
    return ac;
  }

  // LOOPING
  forEach(callback: ForEachCallback<Feature<T, PID>>): void {
    this.features.forEach(callback);
  }
  geomEach(callback: ForEachCallback<T>): void {
    this.features.forEach((f, i) => callback(f.geometry, i));
  }

  // FEATURE HANDLING
  addGeometry(geometry: T, properties: FeatureProperties<PID>, shallow: boolean = true): number {
    return this.features.push(new Feature(geometry, properties, shallow));
  }

  addFeature(feature: Feature<T, PID>, shallow: boolean = true): number {
    if (shallow === true) {
      return this.features.push(feature);
    }

    return this.features.push(new Feature(feature.geometry, feature.properties, false));
  }

  removeFeature(index: number): void {
    this.features.splice(index, 1);
  }

  setProperty(id: PID, index: number, value: number | string): void {
    if (index < 0 || index >= this.size()) throw new Error('no feature with this index exists');
    this.features[index].setProperty(id, value);
  }

  // LAYER
  appendFeatureCollection(fc: FeatureCollection<T, PID>, shallow: boolean = true): void {
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

    if (PropertyRecord.isNumerical(prop)) {
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

function createPropertyRecord(
  collection: StrippedFeatureCollectionJson,
  shallow: boolean,
): {record: PropertyRecord; existed: boolean} {
  if (collection.propertyRecord === undefined) {
    // If propertyRecord does not exist, create from feature
    return {record: PropertyRecord.createFromJson(collection.features[0]), existed: false};
  } else if (shallow === false && PropertyRecord.isRecord(collection.propertyRecord)) {
    // If shallow is false, we can copy an existing propertyrecord
    return {record: collection.propertyRecord, existed: true};
  }

  return {record: new PropertyRecord(collection.propertyRecord.record), existed: true};
}
