import {v4 as uuidv4} from 'uuid';

import {copy} from '@envisim/utils';

import * as GJ from '../types/geojson.js';
import {
  AreaCollection,
  AreaFeature,
  IPropertyRecord,
  LineCollection,
  LineFeature,
  PointCollection,
  PointFeature,
} from '../index.js';
import {PropertySpecialKeys} from '../types/property.js';
import {isCircle, isMultiCircle} from '../types/type-guards.js';

export class Layer<
  T extends AreaCollection | LineCollection | PointCollection,
> {
  collection: T;
  propertyRecord: IPropertyRecord;

  static isPointLayer(obj: unknown): obj is Layer<PointCollection> {
    return obj instanceof Layer && obj.collection instanceof PointCollection;
  }

  static isLineLayer(obj: unknown): obj is Layer<LineCollection> {
    return obj instanceof Layer && obj.collection instanceof LineCollection;
  }

  static isAreaLayer(obj: unknown): obj is Layer<AreaCollection> {
    return obj instanceof Layer && obj.collection instanceof AreaCollection;
  }

  static assertPointLayer(
    obj: unknown,
    msg?: string,
  ): obj is Layer<PointCollection> {
    if (obj instanceof Layer && obj.collection instanceof PointCollection)
      return true;
    throw new TypeError(msg ?? 'Expected a PointLayer');
  }

  static assertLineLayer(
    obj: unknown,
    msg?: string,
  ): obj is Layer<LineCollection> {
    if (obj instanceof Layer && obj.collection instanceof LineCollection)
      return true;
    throw new TypeError(msg ?? 'Expected a LineLayer');
  }

  static assertAreaLayer(
    obj: unknown,
    msg?: string,
  ): obj is Layer<AreaCollection> {
    if (obj instanceof Layer && obj.collection instanceof AreaCollection)
      return true;
    throw new TypeError(msg ?? 'Expected an AreaLayer');
  }

  static createPointLayer(
    collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>,
  ): Layer<PointCollection> {
    return createNewPointLayer(collection);
  }

  static createLineLayer(
    collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>,
  ): Layer<LineCollection> {
    return createNewLineLayer(collection);
  }

  static createAreaLayer(
    collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>,
  ): Layer<AreaCollection> {
    return createNewAreaLayer(collection);
  }

  /**
   * Creates a new layer from a collection and a property record.
   * A layer represents a collection of type PointCollection, LineCollection or
   * AreaCollection and a record of the properties of the features. The
   * properties must be rectangular (all features must have the same properties) and
   * each property takes only numerical values. Categorical properties are supported
   * via the property record. Static methods createPointLayer, createLineLayer and
   * createAreaLayer converts string-valued properties to categorical properties.
   * Any nested geometry collection will be flattened and any non-accepted geometries
   * will be disregarded. Any properties not explicitly defined on the first valid
   * feature after removing non-accepted geometries will be disregarded.
   * Properties of types other than number or string are not supported
   * and will be silently ignored.
   *
   * @param collection
   * @param propertyRecord
   * @param shallow
   */
  constructor(
    collection: T,
    propertyRecord: IPropertyRecord,
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
}

/**
 * Internal function to check type of geometry
 * @param geometry
 * @returns 'point', 'line', or 'area'
 */
function typeOfGeometry(geometry: GJ.Object): string {
  switch (geometry.type) {
    case 'Polygon':
    case 'MultiPolygon':
      return 'area';
    case 'Point':
      return isCircle(geometry) ? 'area' : 'point';
    case 'MultiPoint':
      return isMultiCircle(geometry) ? 'area' : 'point';
    case 'LineString':
    case 'MultiLineString':
      return 'line';
    default:
      throw new Error('Unknown geometry type.');
  }
}

/**
 * Internal function to create the property record from a collection
 * @param collection
 * @returns the property record
 */
function createPropertyRecord(
  collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>,
): IPropertyRecord {
  const record: IPropertyRecord = {};

  // set properties based on the first feature in the collection
  const props = collection.features[0].properties ?? {};

  Object.keys(props).forEach((name) => {
    const value = props[name];
    const specialKey = PropertySpecialKeys.includes(name);
    const id = specialKey ? name : uuidv4();
    const valueType = typeof value;

    if (specialKey && valueType !== 'number') {
      throw new Error(
        `Property "${name}" is a special key and must be of type number.`,
      );
    }

    if (valueType === 'number') {
      record[id] = {type: 'numerical', name, id};
    } else if (valueType === 'string') {
      record[id] = {
        type: 'categorical',
        name,
        id,
        values: [],
      };
    }
  });
  // Add all values for categorical properties
  collection.features.forEach((feature) => {
    const properties: GJ.FeatureProperties<any> = feature.properties ?? {};

    Object.keys(record).forEach((key) => {
      const rec = record[key];
      const name = rec.name ?? rec.id;
      // Check if value is in values, otherwise push it
      if (rec.type === 'categorical') {
        const value = properties[name].toString();
        if (!rec.values.includes(value)) {
          rec.values.push(value);
        }
      }
    });
  });
  return record;
}

/**
 * Internal function to update properties to numeric values
 * based on a property record
 * @param properties
 * @param record
 * @returns the new properties object
 */
function updateProperties(
  properties: GJ.FeatureProperties<any>,
  record: IPropertyRecord,
): GJ.FeatureProperties<number> {
  const newProps: GJ.FeatureProperties<number> = {};

  Object.keys(record).forEach((key) => {
    const thisRecord = record[key];
    const {name, type, id} = thisRecord;

    if (name) {
      if (type === 'numerical') {
        if (typeof properties[name] !== 'number') {
          throw new Error('The same property may not contain mixed types');
        }
        newProps[id] = properties[name];
      } else if (type === 'categorical') {
        if (typeof properties[name] !== 'string') {
          throw new Error('The same property may not contain mixed types');
        }
        const index = thisRecord.values.indexOf(properties[name].toString());
        if (index !== -1) {
          newProps[id] = index;
        } else {
          throw new Error('Value not found in property record');
        }
      }
    }
  });
  return newProps;
}

/**
 * Internal function to flatten and filter out geometries
 * of correct type and push them to the collector array.
 * @param geometries an array of geometries
 * @param collector an array to push geometries to
 * @param type the type to filter out
 */
function flattenAndFilterGeometries(
  geometries: GJ.BaseGeometry[],
  collector: GJ.Geometry[],
  type: 'point' | 'line' | 'area',
): void {
  geometries.forEach((geometry) => {
    if (geometry.type === 'GeometryCollection') {
      flattenAndFilterGeometries(geometry.geometries, collector, type);
    } else if (typeOfGeometry(geometry) === type) {
      collector.push(geometry);
    }
  });
}

/**
 * Internal function to flatten nested geometry collections and
 * filter out geometries of a given type.
 * @param collection
 * @param type
 * @returns
 */
function filterCollection(
  collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>,
  type: 'point' | 'line' | 'area',
): GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>> {
  const newCollection: GJ.BaseFeatureCollection<
    GJ.BaseFeature<GJ.BaseGeometry, any>
  > = {type: 'FeatureCollection', features: []};

  collection.features.forEach((feature) => {
    const geom = feature.geometry;
    const geoms = geom.type === 'GeometryCollection' ? geom.geometries : [geom];

    const flattened: GJ.Object[] = [];
    flattenAndFilterGeometries(geoms, flattened, type);

    if (flattened.length > 0) {
      if (flattened.length === 1) {
        newCollection.features.push({
          type: 'Feature',
          geometry: flattened[0],
          properties: feature.properties,
        });
      } else {
        newCollection.features.push({
          type: 'Feature',
          geometry: {type: 'GeometryCollection', geometries: flattened},
          properties: feature.properties,
        });
      }
    }
  });
  return newCollection;
}

/**
 * Internal function to create a new area layer from a GeoJSON
 * feature collection.
 * @param collection
 * @returns a new area layer
 */
function createNewAreaLayer(
  collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>,
): Layer<AreaCollection> {
  const layer: Layer<AreaCollection> = new Layer(
    new AreaCollection({type: 'FeatureCollection', features: []}),
    {},
  );
  const filtered = filterCollection(collection, 'area');

  layer.propertyRecord = createPropertyRecord(filtered);

  filtered.features.forEach((feature) => {
    const newFeature = copy(feature);
    newFeature.properties = updateProperties(
      newFeature.properties ?? {},
      layer.propertyRecord,
    );
    layer.collection.addFeature(
      new AreaFeature(newFeature as GJ.AreaFeature, true),
    );
  });

  return layer;
}

/**
 * Internal function to create a new line layer from a GeoJSON
 * feature collection.
 * @param collection
 * @returns a new line layer
 */
function createNewLineLayer(
  collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>,
): Layer<LineCollection> {
  const layer: Layer<LineCollection> = new Layer(
    new LineCollection({type: 'FeatureCollection', features: []}),
    {},
  );
  const filtered = filterCollection(collection, 'line');

  layer.propertyRecord = createPropertyRecord(filtered);

  filtered.features.forEach((feature) => {
    const newFeature = copy(feature);
    newFeature.properties = updateProperties(
      newFeature.properties ?? {},
      layer.propertyRecord,
    );
    layer.collection.addFeature(
      new LineFeature(newFeature as GJ.LineFeature, true),
    );
  });

  return layer;
}

/**
 * Internal function to create a new point layer from a GeoJSON
 * feature collection.
 * @param collection
 * @returns a new point layer
 */
function createNewPointLayer(
  collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.BaseGeometry, any>>,
): Layer<PointCollection> {
  const layer: Layer<PointCollection> = new Layer(
    new PointCollection({type: 'FeatureCollection', features: []}),
    {},
  );
  const filtered = filterCollection(collection, 'point');

  layer.propertyRecord = createPropertyRecord(filtered);

  filtered.features.forEach((feature) => {
    const newFeature = copy(feature);
    newFeature.properties = updateProperties(
      newFeature.properties ?? {},
      layer.propertyRecord,
    );
    layer.collection.addFeature(
      new PointFeature(newFeature as GJ.PointFeature, true),
    );
  });

  return layer;
}
