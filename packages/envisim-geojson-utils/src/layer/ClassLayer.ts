import {v4 as uuidv4} from 'uuid';

import {copy} from '@envisim/utils';

import * as GJ from '../types/geojson.js';
import {
  GeometricPrimitive,
  isGeometryPrimitive,
} from '../geometric-primitive/index.js';
import {
  AreaCollection,
  AreaFeature,
  LineCollection,
  PointCollection,
  PropertyRecord,
} from '../index.js';
import {PropertySpecialKeys} from '../types/property.js';
import {isCircle, isMultiCircle} from '../types/type-guards.js';

export class Layer<
  T extends AreaCollection | LineCollection | PointCollection,
> {
  collection: T;
  propertyRecord: PropertyRecord;

  static isLayer(
    obj: unknown,
    type: GeometricPrimitive.POINT,
  ): obj is Layer<PointCollection>;
  static isLayer(
    obj: unknown,
    type: GeometricPrimitive.LINE,
  ): obj is Layer<LineCollection>;
  static isLayer(
    obj: unknown,
    type: GeometricPrimitive.AREA,
  ): obj is Layer<AreaCollection>;
  static isLayer<
    T extends
      | Layer<PointCollection>
      | Layer<LineCollection>
      | Layer<AreaCollection>,
  >(obj: unknown, type: GeometricPrimitive): obj is T;
  static isLayer(obj: unknown, type: GeometricPrimitive): boolean {
    if (!(obj instanceof Layer)) {
      return false;
    }

    switch (type) {
      case GeometricPrimitive.POINT:
        return obj.collection instanceof PointCollection;
      case GeometricPrimitive.LINE:
        return obj.collection instanceof LineCollection;
      case GeometricPrimitive.AREA:
        return obj.collection instanceof AreaCollection;
      default:
        return false;
    }
  }

  static assert(
    obj: unknown,
    type: GeometricPrimitive.POINT,
    msg?: string,
  ): asserts obj is Layer<PointCollection>;
  static assert(
    obj: unknown,
    type: GeometricPrimitive.LINE,
    msg?: string,
  ): asserts obj is Layer<LineCollection>;
  static assert(
    obj: unknown,
    type: GeometricPrimitive.AREA,
    msg?: string,
  ): asserts obj is Layer<AreaCollection>;
  static assert<
    T extends
      | Layer<PointCollection>
      | Layer<LineCollection>
      | Layer<AreaCollection>,
  >(obj: unknown, type: GeometricPrimitive, msg?: string): asserts obj is T;
  static assert(obj: unknown, type: GeometricPrimitive, msg?: string): boolean {
    if (Layer.isLayer(obj, type)) {
      return true;
    }

    switch (type) {
      case GeometricPrimitive.POINT:
        throw new TypeError(msg ?? 'Expected Layer<PointCollection>');
      case GeometricPrimitive.LINE:
        throw new TypeError(msg ?? 'Expected Layer<LineCollection>');
      case GeometricPrimitive.AREA:
        throw new TypeError(msg ?? 'Expected Layer<AreaCollection>');
      default:
        throw new TypeError(msg ?? 'Expected Layer<T>');
    }
  }

  /**
   * Creates a new Layer from a GeoJSON FeatureCollection.
   *
   * String-valued properties will be converted to categorical properties.
   * Any nested geometry collection will be flattened and any non-accepted
   * geometries will be disregarded.
   * Any properties not explicitly defined on the first valid feature after
   * removing non-accepted geometries will be disregarded.
   * Properties of types other than number or string are not supported
   * and will be silently ignored.
   */
  static createLayer(
    collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>,
    type: GeometricPrimitive.POINT,
  ): Layer<PointCollection>;
  static createLayer(
    collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>,
    type: GeometricPrimitive.LINE,
  ): Layer<LineCollection>;
  static createLayer(
    collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>,
    type: GeometricPrimitive.AREA,
  ): Layer<AreaCollection>;
  static createLayer(
    collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>,
    type: GeometricPrimitive,
  ): Layer<PointCollection | LineCollection | AreaCollection> {
    switch (type) {
      case GeometricPrimitive.POINT: {
        const newCollection = new PointCollection({
          type: 'FeatureCollection',
          features: [],
        });
        const [newFeatures, propertyRecord] = prepareFeatures(
          collection.features,
          type,
        );
        newFeatures.forEach((feat) => {
          newCollection.addFeature(feat);
        });

        return new Layer(newCollection, propertyRecord);
      }

      case GeometricPrimitive.LINE: {
        const newCollection = new LineCollection({
          type: 'FeatureCollection',
          features: [],
        });
        const [newFeatures, propertyRecord] = prepareFeatures(
          collection.features,
          type,
        );
        newFeatures.forEach((feat) => {
          newCollection.addFeature(feat);
        });

        return new Layer(newCollection, propertyRecord);
      }

      case GeometricPrimitive.AREA: {
        const newCollection = new AreaCollection({
          type: 'FeatureCollection',
          features: [],
        });
        const [newFeatures, propertyRecord] = prepareFeatures(
          collection.features,
          type,
        );
        newFeatures.forEach((feat) => {
          newCollection.addFeature(feat);
        });

        return new Layer(newCollection, propertyRecord);
      }

      default:
        throw new Error('GeometricPrimitive not supported');
    }
  }

  /**
   * Creates a new layer from a collection and a property record.
   * Categorical properties are supported via the property record.
   *
   * A layer represents a collection of type PointCollection, LineCollection or
   * AreaCollection and a record of the properties of the features. The
   * properties must be rectangular (all features must have the same properties) and
   * each property takes only numerical values.
   *
   * @param collection
   * @param propertyRecord
   * @param shallow
   */
  constructor(
    collection: T,
    propertyRecord: PropertyRecord,
    shallow: boolean = true,
  ) {
    // TODO?: Check that all features have the properties
    // in the property record?

    this.propertyRecord = shallow ? {...propertyRecord} : copy(propertyRecord);

    if (AreaCollection.isCollection(collection)) {
      this.collection = new AreaCollection(collection, shallow) as T;
    } else if (LineCollection.isCollection(collection)) {
      this.collection = new LineCollection(collection, shallow) as T;
    } else if (PointCollection.isCollection(collection)) {
      this.collection = new PointCollection(collection, shallow) as T;
    } else {
      throw new Error('Expected a collection.');
    }
  }

  geometricPrimitive(): GeometricPrimitive {
    return this.collection.geometricPrimitive();
  }

  toGeoJSON(
    convertCircles: boolean = true,
    pointsPerCircle: number = 16,
  ): GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.Geometry, number | string>> {
    const features: GJ.BaseFeature<GJ.Geometry, number | string>[] = [];

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

      if (AreaFeature.isFeature(feature)) {
        const newFeature = new AreaFeature(feature, false);
        newFeature.geomEach((geom) => {
          if (geom.type === 'Point') {
            if (isCircle(geom) && convertCircles) {
              geom = geom.toPolygon({pointsPerCircle});
            }
          } else if (geom.type === 'MultiPoint') {
            if (isMultiCircle(geom) && convertCircles) {
              geom = geom.toPolygon({pointsPerCircle});
            }
          }
        });
        features.push({
          type: 'Feature',
          geometry: newFeature.geometry,
          properties: newProps,
        });
      } else {
        features.push({
          type: 'Feature',
          geometry: copy(feature.geometry),
          properties: newProps,
        });
      }
    });

    return {type: 'FeatureCollection', features: features};
  }

  /**
   * Appends the features from another layer
   * @param layer
   * @param shallow
   * @throws RangeError if property record does not contain the same IDs
   */
  appendFromLayer(layer: Layer<T>, shallow: boolean = true): void {
    const thisKeys = Object.keys(this.propertyRecord);
    const layerKeys = Object.keys(layer.propertyRecord);

    if (
      thisKeys.length !== layerKeys.length ||
      !thisKeys.every((id) => layerKeys.includes(id))
    ) {
      throw new RangeError('propertyRecords does not match');
    }

    const newFeatures = shallow
      ? layer.collection.features
      : copy(layer.collection.features);

    if (this.collection instanceof PointCollection) {
      if (layer.collection instanceof PointCollection) {
        this.collection.features.push(
          ...(newFeatures as PointCollection['features']),
        );
        return;
      }
    } else if (this.collection instanceof LineCollection) {
      if (layer.collection instanceof LineCollection) {
        this.collection.features.push(
          ...(newFeatures as LineCollection['features']),
        );
        return;
      }
    } else if (this.collection instanceof AreaCollection) {
      if (layer.collection instanceof AreaCollection) {
        this.collection.features.push(
          ...(newFeatures as AreaCollection['features']),
        );
        return;
      }
    }

    throw new Error('layer does not match the GeometricPrimitive');
  }
}

function flatMapGeometryCollections(
  geometry: GJ.BaseGeometry,
  primitive: GeometricPrimitive.POINT,
): GJ.PointObject | GJ.PointObject[];
function flatMapGeometryCollections(
  geometry: GJ.BaseGeometry,
  primitive: GeometricPrimitive.LINE,
): GJ.LineObject | GJ.LineObject[];
function flatMapGeometryCollections(
  geometry: GJ.BaseGeometry,
  primitive: GeometricPrimitive.AREA,
): GJ.AreaObject | GJ.AreaObject[];
function flatMapGeometryCollections(
  geometry: GJ.BaseGeometry,
  primitive: GeometricPrimitive,
): GJ.SingleTypeObject | GJ.SingleTypeObject[] {
  if (geometry.type !== 'GeometryCollection') {
    return isGeometryPrimitive(geometry, primitive, false) ? geometry : [];
  }

  return geometry.geometries.flatMap(flatMapGeometryCollections);
}

function prepareFeatures(
  features: GJ.BaseFeature<GJ.BaseGeometry, any>[],
  primitive: GeometricPrimitive.POINT,
): [GJ.PointFeature[], PropertyRecord];
function prepareFeatures(
  features: GJ.BaseFeature<GJ.BaseGeometry, any>[],
  primitive: GeometricPrimitive.LINE,
): [GJ.LineFeature[], PropertyRecord];
function prepareFeatures(
  features: GJ.BaseFeature<GJ.BaseGeometry, any>[],
  primitive: GeometricPrimitive.AREA,
): [GJ.AreaFeature[], PropertyRecord];
function prepareFeatures(
  features: GJ.BaseFeature<GJ.BaseGeometry, any>[],
  primitive: GeometricPrimitive,
): [GJ.Feature[], PropertyRecord] {
  const propertyRecord: PropertyRecord = {};
  let propertyRecordIsSet = false;

  const newFeatures = features.flatMap(({geometry, properties}) => {
    let newGeometry: GJ.Geometry;
    const newProperties: GJ.FeatureProperties = {};

    // Set newGeometry
    if (geometry.type === 'GeometryCollection') {
      // flatMapGeometryCollections will flatten out all nested GC's
      const geometries = geometry.geometries.flatMap(
        flatMapGeometryCollections,
      );

      if (geometries.length === 0) {
        return [];
      } else if (geometries.length === 1) {
        // Maximum flattness
        newGeometry = geometries[0];
      } else {
        newGeometry = {
          type: 'GeometryCollection',
          geometries,
        };
      }
    } else {
      if (!isGeometryPrimitive(geometry, primitive)) {
        return [];
      }

      newGeometry = geometry;
    }

    if (propertyRecordIsSet === false) {
      // Since all features must have the same set of properties, we choose the first
      // accepted feature to create our property list from.
      Object.entries(properties ?? {}).forEach(([name, prop]) => {
        const isSpecialKey = PropertySpecialKeys.includes(name);
        const id = isSpecialKey ? name : uuidv4();
        const valueType = typeof prop;

        if (valueType === 'number') {
          propertyRecord[id] = {type: 'numerical', name, id};
        } else if (isSpecialKey) {
          throw new Error(
            `Property ${prop} is a reserved property and must be a number`,
          );
        } else if (valueType === 'string') {
          propertyRecord[id] = {type: 'categorical', name, id, values: []};
        }
      });

      propertyRecordIsSet = true;
    }

    const orgProps = properties ?? {};

    Object.values(propertyRecord).forEach((prop) => {
      const name = prop.name ?? '';

      // If the prop does not exist on the feature, we have a problem
      if (!Object.hasOwn(orgProps, name)) {
        throw new Error('All features must have the same properties.');
      }

      const value: unknown = orgProps[name];

      // Add numerical property
      if (prop.type === 'numerical') {
        if (typeof value !== 'number') {
          throw new Error(
            'All features must have the same types on the properties.',
          );
        }

        newProperties[prop.id] = value;
        return;
      }

      // Add categorical property
      // We fill the value array, as new values are encountered.
      if (prop.type === 'categorical') {
        if (typeof value !== 'string') {
          throw new Error(
            'All features must have the same types on the properties.',
          );
        }

        let valueIndex = prop.values.indexOf(value);

        if (valueIndex === -1) {
          valueIndex = prop.values.push(value) - 1;
        }

        newProperties[prop.id] = valueIndex;
        return;
      }
    });

    return {
      type: 'Feature' as const,
      geometry: newGeometry,
      properties: newProperties,
    };
  });

  return [newFeatures, propertyRecord];
}
