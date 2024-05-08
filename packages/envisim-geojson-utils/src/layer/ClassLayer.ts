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
    collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.Geometry, any>>,
  ): Layer<PointCollection> {
    return createNewPointLayer(collection);
  }

  static createLineLayer(
    collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.Geometry, any>>,
  ): Layer<LineCollection> {
    return createNewLineLayer(collection);
  }

  static createAreaLayer(
    collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.Geometry, any>>,
  ): Layer<AreaCollection> {
    return createNewAreaLayer(collection);
  }

  constructor(collection: T, propertyRecord: IPropertyRecord) {
    // TODO?: Check that all features have the properties
    // in the property record?
    this.collection = collection;
    this.propertyRecord = propertyRecord;
  }

  // TODO?: Should we have a get for type of layer?
  get type(): string {
    if (this.collection instanceof PointCollection) {
      return 'point';
    } else if (this.collection instanceof LineCollection) {
      return 'line';
    }
    return 'area';
  }

  toJSON(): GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.Geometry, any>> {
    // TODO?: Convert Circles or not? Maybe add as parameter?
    const collection: GJ.BaseFeatureCollection<
      GJ.BaseFeature<GJ.Geometry, any>
    > = copy(this.collection);

    collection.features.forEach((feature) => {
      const oldProps = feature.properties ?? {};
      const newProps: GJ.FeatureProperties<number | string> = {};

      for (const key in this.propertyRecord) {
        const rec = this.propertyRecord[key];
        const name = rec.name ?? rec.id;
        if (rec.type === 'numerical') {
          newProps[name] = oldProps[rec.id];
        } else if (rec.type == 'categorical') {
          newProps[name] = rec.values[oldProps[rec.id]];
        }
      }
      feature.properties = newProps;
    });
    return collection;
  }
}

/**
 * Internal function to check type of geometry
 * @param geometry
 * @returns 'point', 'line', or 'area'
 */
function typeOfGeometry(geometry: GJ.BaseGeometry): string {
  const geomType = geometry.type;
  if (geomType === 'GeometryCollection') {
    const type = typeOfGeometry(geometry.geometries[0]);
    geometry.geometries.forEach((geom) => {
      if (typeOfGeometry(geom) !== type) {
        throw new Error('Mixed geometries are not supported');
      }
    });
    return type;
  }
  if (geomType === 'Polygon' || geomType === 'MultiPolygon') {
    return 'area';
  }
  if (geomType === 'LineString' || geomType === 'MultiLineString') {
    return 'line';
  }
  if (geomType === 'Point') {
    if (isCircle(geometry)) {
      return 'area';
    }
    return 'point';
  }
  if (geomType === 'MultiPoint') {
    if (isMultiCircle(geometry)) {
      return 'area';
    }
    return 'point';
  }
  throw new Error('Could not resolve geometry type.');
}

/**
 * Internal function to get the record key from the property name
 * @param name
 * @param record
 * @returns key
 */
function recordKeyFromName(
  name: string,
  record: IPropertyRecord,
): string | null {
  for (const key in record) {
    if (record[key].name === name && Object.hasOwn(record, key)) {
      return key;
    }
  }
  return null;
}

/**
 * Internal function to get the property record from a collection
 * @param collection
 * @returns the property record
 */
function getPropertyRecord(
  collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.Geometry, any>>,
): IPropertyRecord {
  const record: IPropertyRecord = {};

  // set properties based on the first feature in the collection
  const props = collection.features[0].properties ?? {};

  const specialKeys = [
    '_designWeight',
    '_parent',
    '_randomRotation',
    '_distance',
  ];

  for (const name in props) {
    const value = props[name];
    let id = '';

    if (specialKeys.includes(name)) {
      id = name;
    } else {
      id = uuidv4();
    }

    if (typeof value === 'number') {
      record[id] = {type: 'numerical', name, id};
    } else if (typeof value === 'string') {
      record[id] = {
        type: 'categorical',
        name,
        id,
        values: [],
      };
    } else {
      // TODO: Throw an error or ignore this?
      throw new Error(
        'Only type number or string are supported for properties',
      );
    }
  }
  // Add all values for categorical properties
  collection.features.forEach((feature) => {
    const props: GJ.FeatureProperties<any> = feature.properties ?? {};

    for (const name in props) {
      const value = props[name];
      const recordKey = recordKeyFromName(name, record);
      if (recordKey === null) {
        throw new Error('All features must have the same set of properties');
      }
      const thisRecord = record[recordKey];
      // Check if value is in values, otherwise push it
      if (
        thisRecord.type === 'categorical' &&
        !thisRecord.values.includes(value.toString())
      ) {
        thisRecord.values.push(value.toString());
      }
    }
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

  for (const key in record) {
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
  }
  return newProps;
}

/**
 * Internal function to create a new area layer from a GeoJSON
 * feature collection
 * @param collection
 * @returns a new area layer
 */
function createNewAreaLayer(
  collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.Geometry, any>>,
): Layer<AreaCollection> {
  const layer: Layer<AreaCollection> = new Layer(
    new AreaCollection({type: 'FeatureCollection', features: []}),
    {},
  );
  const filtered: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.Geometry, any>> = {
    type: 'FeatureCollection',
    features: collection.features.filter(
      (feature) => typeOfGeometry(feature.geometry) === 'area',
    ),
  };
  layer.propertyRecord = getPropertyRecord(filtered);

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
 * feature collection
 * @param collection
 * @returns a new line layer
 */
function createNewLineLayer(
  collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.Geometry, any>>,
): Layer<LineCollection> {
  const layer: Layer<LineCollection> = new Layer(
    new LineCollection({type: 'FeatureCollection', features: []}),
    {},
  );
  const filtered: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.Geometry, any>> = {
    type: 'FeatureCollection',
    features: collection.features.filter(
      (feature) => typeOfGeometry(feature.geometry) === 'line',
    ),
  };
  layer.propertyRecord = getPropertyRecord(filtered);

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
 * feature collection
 * @param collection
 * @returns a new point layer
 */
function createNewPointLayer(
  collection: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.Geometry, any>>,
): Layer<PointCollection> {
  const layer: Layer<PointCollection> = new Layer(
    new PointCollection({type: 'FeatureCollection', features: []}),
    {},
  );
  const filtered: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.Geometry, any>> = {
    type: 'FeatureCollection',
    features: collection.features.filter(
      (feature) => typeOfGeometry(feature.geometry) === 'point',
    ),
  };
  layer.propertyRecord = getPropertyRecord(filtered);

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
