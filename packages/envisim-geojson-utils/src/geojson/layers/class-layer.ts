import {copy} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {CirclesToPolygonsOptions} from '../../utils/circles-to-polygons.js';
import {FeatureCollection} from '../collections/index.js';
import {Feature} from '../features/index.js';
import {GeometricPrimitive, isGeometryPrimitive} from '../geometric-primitive/index.js';
import {
  AreaObject,
  Circle,
  LineObject,
  MultiCircle,
  PointObject,
  toAreaObject,
  toLineObject,
  toPointObject,
} from '../objects/index.js';
import {PropertyRecord, createPropertyRecordFromFeature} from './property.js';

export class Layer<T extends AreaObject | LineObject | PointObject> {
  collection: FeatureCollection<T>;
  propertyRecord: PropertyRecord;
  readonly primitive: GeometricPrimitive;

  static isArea(obj: unknown): obj is Layer<AreaObject> {
    return obj instanceof Layer && obj.geometricPrimitive() === GeometricPrimitive.AREA;
  }
  static isLine(obj: unknown): obj is Layer<LineObject> {
    return obj instanceof Layer && obj.geometricPrimitive() === GeometricPrimitive.LINE;
  }
  static isPoint(obj: unknown): obj is Layer<PointObject> {
    return obj instanceof Layer && obj.geometricPrimitive() === GeometricPrimitive.POINT;
  }

  static assertArea(obj: unknown, msg: string = 'Expected area'): asserts obj is Layer<AreaObject> {
    if (!Layer.isArea(obj)) throw new TypeError(msg);
  }
  static assertLine(obj: unknown, msg: string = 'Expected line'): asserts obj is Layer<LineObject> {
    if (!Layer.isLine(obj)) throw new TypeError(msg);
  }
  static assertPoint(
    obj: unknown,
    msg: string = 'Expected point',
  ): asserts obj is Layer<PointObject> {
    if (!Layer.isPoint(obj)) throw new TypeError(msg);
  }

  static createArea(
    collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>,
    shallow: boolean = true,
    options: CirclesToPolygonsOptions = {},
  ): Layer<AreaObject> {
    if (collection.features.length === 0) {
      return new Layer(FeatureCollection.newArea(), {}, GeometricPrimitive.AREA, false);
    }

    const layer = new Layer(
      FeatureCollection.newArea(),
      createPropertyRecordFromFeature(collection.features[0]),
      GeometricPrimitive.AREA,
      false,
    );

    for (const feature of collection.features) {
      let geometry;

      if (feature.geometry.type === 'GeometryCollection') {
        const filtered = filteredGeometryCollection(feature.geometry, GeometricPrimitive.AREA);

        if (filtered === null) {
          continue;
        }

        geometry = toAreaObject(filtered, shallow, options);
      } else {
        geometry = toAreaObject(feature.geometry, shallow, options);
      }

      if (geometry === null) {
        continue;
      }

      const feat = new Feature(geometry, {}, true);
      setProperties(layer, feat, feature.properties ?? {});
      layer.collection.addFeature(feat);
    }

    return layer;
  }
  static createLine(
    collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>,
    shallow: boolean = true,
  ): Layer<LineObject> {
    if (collection.features.length === 0) {
      return new Layer(FeatureCollection.newLine(), {}, GeometricPrimitive.LINE, false);
    }

    const layer = new Layer(
      FeatureCollection.newLine(),
      createPropertyRecordFromFeature(collection.features[0]),
      GeometricPrimitive.LINE,
      false,
    );

    for (const feature of collection.features) {
      let geometry;

      if (feature.geometry.type === 'GeometryCollection') {
        const filtered = filteredGeometryCollection(feature.geometry, GeometricPrimitive.LINE);

        if (filtered === null) {
          continue;
        }

        geometry = toLineObject(filtered, shallow);
      } else {
        geometry = toLineObject(feature.geometry, shallow);
      }

      if (geometry === null) {
        continue;
      }

      const feat = new Feature(geometry, {}, true);
      setProperties(layer, feat, feature.properties ?? {});
      layer.collection.addFeature(feat);
    }

    return layer;
  }
  static createPoint(
    collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>,
    shallow: boolean = true,
  ): Layer<PointObject> {
    if (collection.features.length === 0) {
      return new Layer(FeatureCollection.newPoint(), {}, GeometricPrimitive.POINT, false);
    }

    const layer = new Layer(
      FeatureCollection.newPoint(),
      createPropertyRecordFromFeature(collection.features[0]),
      GeometricPrimitive.POINT,
      false,
    );

    for (const feature of collection.features) {
      let geometry;

      if (feature.geometry.type === 'GeometryCollection') {
        const filtered = filteredGeometryCollection(feature.geometry, GeometricPrimitive.POINT);

        if (filtered === null) {
          continue;
        }

        geometry = toPointObject(filtered, shallow);
      } else {
        geometry = toPointObject(feature.geometry, shallow);
      }

      if (geometry === null) {
        continue;
      }

      const feat = new Feature(geometry, {}, true);
      setProperties(layer, feat, feature.properties ?? {});
      layer.collection.addFeature(feat);
    }

    return layer;
  }

  static newArea(
    collection: FeatureCollection<AreaObject>,
    properties: PropertyRecord,
    shallow: boolean = true,
  ): Layer<AreaObject> {
    const fc =
      shallow === true ? collection : FeatureCollection.newArea(collection.features, false);
    return new Layer(fc, properties, GeometricPrimitive.AREA, shallow);
  }
  static newLine(
    collection: FeatureCollection<LineObject>,
    properties: PropertyRecord,
    shallow: boolean = true,
  ): Layer<LineObject> {
    const fc =
      shallow === true ? collection : FeatureCollection.newLine(collection.features, false);
    return new Layer(fc, properties, GeometricPrimitive.LINE, shallow);
  }
  static newPoint(
    collection: FeatureCollection<PointObject>,
    properties: PropertyRecord,
    shallow: boolean = true,
  ): Layer<PointObject> {
    const fc =
      shallow === true ? collection : FeatureCollection.newPoint(collection.features, false);
    return new Layer(fc, properties, GeometricPrimitive.POINT, shallow);
  }

  copy(shallow: boolean = true): Layer<T> {
    return new Layer(this.collection, this.propertyRecord, this.primitive, shallow);
  }

  private constructor(
    collection: FeatureCollection<T>,
    properties: PropertyRecord,
    primitive: GeometricPrimitive,
    shallow: boolean = true,
  ) {
    this.primitive = primitive;
    this.collection = collection;

    if (shallow === true) {
      this.propertyRecord = properties;
      return;
    }

    this.propertyRecord = copy(properties);
  }

  geometricPrimitive(): GeometricPrimitive {
    return this.primitive;
  }

  /**
   * Appends the features from another layer in place.
   * @throws RangeError if property record does not contain the same IDs
   */
  appendFromLayer(layer: Layer<T>, shallow: boolean = true): void {
    if (this.geometricPrimitive() !== layer.geometricPrimitive()) {
      throw new TypeError('layer types does not match');
    }

    const thisKeys = Object.keys(this.propertyRecord);
    const layerKeys = Object.keys(layer.propertyRecord);

    if (thisKeys.length !== layerKeys.length || !thisKeys.every((id) => layerKeys.includes(id))) {
      throw new RangeError('propertyRecords does not match');
    }

    layer.collection.forEach((feat) => this.collection.addFeature(feat, shallow));
  }

  toGeoJSON(
    convertCircles: boolean = true,
    options: CirclesToPolygonsOptions = {},
  ): GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.SingleTypeObject, number | string>> {
    const features: GJ.BaseFeature<GJ.SingleTypeObject, number | string>[] = [];

    if (Layer.isArea(this)) {
      this.collection.forEach((feature) => {
        const oldProps = feature.properties;
        const newProps: GJ.FeatureProperties<number | string> = {};

        Object.keys(this.propertyRecord).forEach((key) => {
          const rec = this.propertyRecord[key];
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

/**
 * Flattens and filters nested GCs
 */
function flattenGeometryCollections(
  geometry: GJ.BaseGeometry,
  primitive: GeometricPrimitive.AREA | GeometricPrimitive.LINE | GeometricPrimitive.POINT,
): GJ.SingleTypeObject | GJ.SingleTypeObject[] {
  if (geometry.type !== 'GeometryCollection') {
    return isGeometryPrimitive(geometry, primitive, false) ? geometry : [];
  }

  return geometry.geometries.flatMap(flattenGeometryCollections);
}

function filteredGeometryCollection(
  geometry: GJ.BaseGeometryCollection,
  primitive: GeometricPrimitive.AREA,
): GJ.AreaGeometry | null;
function filteredGeometryCollection(
  geometry: GJ.BaseGeometryCollection,
  primitive: GeometricPrimitive.LINE,
): GJ.LineGeometry | null;
function filteredGeometryCollection(
  geometry: GJ.BaseGeometryCollection,
  primitive: GeometricPrimitive.POINT,
): GJ.PointGeometry | null;
function filteredGeometryCollection(
  geometry: GJ.BaseGeometryCollection,
  primitive: GeometricPrimitive.AREA | GeometricPrimitive.LINE | GeometricPrimitive.POINT,
): GJ.GeometryCollection<GJ.SingleTypeObject> | GJ.SingleTypeObject | null {
  // flattenGeometryCollections will flatten out all nested GC's
  const geometries = geometry.geometries.flatMap((g) => flattenGeometryCollections(g, primitive));

  if (geometries.length === 0) {
    return null;
  } else if (geometries.length === 1) {
    // Maximum flattness
    return geometries[0];
  } else {
    return {
      type: 'GeometryCollection',
      geometries,
    };
  }
}

function setProperties<T extends AreaObject | LineObject | PointObject>(
  layer: Layer<T>,
  feature: Feature<T>,
  properties: GJ.FeatureProperties<any>,
) {
  Object.values(layer.propertyRecord).forEach((prop) => {
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

      feature.setProperty(prop.id, value);
      return;
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

      feature.setProperty(prop.id, valueIndex);
      return;
    }
  });
}
