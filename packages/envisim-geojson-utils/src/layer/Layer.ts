import {v4 as uuidv4} from 'uuid';

import {copy} from '@envisim/utils';

import * as GJ from '../types/geojson.js';
import {
  AreaCollection,
  IPropertyRecord,
  LineCollection,
  PointCollection,
} from '../index.js';

export class Layer<
  T extends AreaCollection | LineCollection | PointCollection,
> {
  collection: T;
  propertyRecord: IPropertyRecord;

  static isLayer(
    obj: unknown,
  ): obj is Layer<AreaCollection | LineCollection | PointCollection> {
    return obj instanceof Layer;
  }

  static assert(
    obj: unknown,
    msg?: string,
  ): obj is Layer<AreaCollection | LineCollection | PointCollection> {
    if (obj instanceof Layer) return true;
    throw new TypeError(msg ?? 'Expected Layer');
  }

  static create(
    collection: GJ.FeatureCollection,
  ): Layer<AreaCollection | LineCollection | PointCollection> {
    return createLayer(collection);
  }

  constructor(collection: T, propertyRecord: IPropertyRecord) {
    this.collection = collection;
    this.propertyRecord = propertyRecord;
  }

  get type(): string {
    if (this.collection instanceof PointCollection) {
      return 'point';
    } else if (this.collection instanceof LineCollection) {
      return 'line';
    }
    return 'area';
  }

  toJSON(): GJ.FeatureCollection {
    // TODO: Convert Circles or not?
    // maybe add as parameter?
    const json: GJ.FeatureCollection = copy(this.collection);
    json.features.forEach((feature) => {
      const oldProps = feature.properties ?? {};
      const newProps: GJ.FeatureProperties = {};

      for (const key in this.propertyRecord) {
        const property = this.propertyRecord[key];
        const name: string = property.name ?? property.id;
        const value = oldProps[property.id];
        if (property.type === 'numerical') {
          newProps[name] = value;
        } else if (property.type == 'categorical') {
          newProps[name] = property.values[value];
        }
      }
      feature.properties = newProps;
    });
    return json;
  }
}

/**
 * Internal function to check type of geometry
 * @param geometry
 * @returns 'point', 'line', or 'area'
 */
function typeOfGeometry(geometry: GJ.Geometry): string {
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
  if (geomType === 'Point' || geomType === 'MultiPoint') {
    if (geometry.radius) {
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
    if (record[key].name === name) {
      return key;
    }
  }
  return null;
}

/**
 * Internal function to create a new Layer
 * @param collection
 * @returns a new Layer
 */
function createLayer(
  collection: GJ.FeatureCollection,
): Layer<AreaCollection | LineCollection | PointCollection> {
  if (collection.type !== 'FeatureCollection') {
    throw new Error('A FeatureCollection is required to make a Layer');
  }

  const g = copy(collection);
  const propertyRecord: IPropertyRecord = {};
  const type = typeOfGeometry(g.features[0].geometry);

  // set properties based on the first feature in the collection
  const props = g.features[0].properties ?? {};

  const specialKeys = ['_designWeight', '_parent', '_randomRotation'];

  for (const name in props) {
    const value = props[name];
    let id = '';

    if (specialKeys.includes(name)) {
      id = name;
    } else {
      id = uuidv4();
    }

    if (typeof value === 'number') {
      propertyRecord[id] = {type: 'numerical', name, id};
    } else if (typeof value === 'string') {
      propertyRecord[id] = {
        type: 'categorical',
        name,
        id,
        values: [],
      };
    } else {
      throw new Error('Only type number or string is supported for properties');
    }
  }

  // add all values for categorical properties
  // to the propertyRecord and check that type of geometry
  // is the same as for the first feature

  g.features.forEach((feature) => {
    // make sure all features have the same geometry type
    if (typeOfGeometry(feature.geometry) !== type) {
      throw new Error('All features must have the same geometry dimension');
    }

    const props: GJ.FeatureProperties = feature.properties ?? {};

    for (const name in props) {
      const value = props[name];
      const recordKey = recordKeyFromName(name, propertyRecord);
      if (recordKey === null) {
        throw new Error('All features must have the same set of properties');
      }
      const record = propertyRecord[recordKey];
      // check if value is in values, otherwise push it
      if (
        record.type === 'categorical' &&
        !record.values.includes(value.toString())
      ) {
        record.values.push(value.toString());
      }
    }

    const newProps: GJ.FeatureProperties = {};

    for (const key in propertyRecord) {
      const record = propertyRecord[key];
      if (record.name) {
        if (record.type === 'numerical') {
          if (typeof props[record.name] !== 'number') {
            throw new Error('The same property may not contain mixed types');
          }
          newProps[record.id] = props[record.name];
        } else if (record.type === 'categorical') {
          if (typeof props[record.name] !== 'string') {
            throw new Error('The same property may not contain mixed types');
          }
          const index = record.values.indexOf(props[record.name].toString());
          if (index !== -1) {
            newProps[record.id] = index;
          } else {
            throw new Error('Value not found in property record');
          }
        }
      }
    }
    feature.properties = newProps;
  });

  // properties are fixed
  // now make Layer
  if (type === 'point') {
    return new Layer(
      new PointCollection(g as GJ.PointFeatureCollection, true),
      propertyRecord,
    );
  }
  if (type === 'line') {
    return new Layer(
      new LineCollection(g as GJ.LineFeatureCollection, true),
      propertyRecord,
    );
  }
  return new Layer(
    new AreaCollection(g as GJ.AreaFeatureCollection, true),
    propertyRecord,
  );
}
