import {Feature} from './ClassFeature.js';
import {Collection} from './ClassCollection.js';
import {asFeatureCollection} from './asFeatureCollection.js';

/**
 * Builds a FeatureCollection (class Collection) from any GeoJSON.
 * @param geometry - A GeoJSON geometry.
 * @param properties - The properties object to add, default {}.
 * @param copy - Boolean, default false. If true, then input is copied.
 * @param strict - Boolean, if mixed geometries are allowed, default false.
 * @returns - A GeoJSON Feature.
 */
export const toFeatureCollection = (
  geoJSON: GeoJSON.GeoJSON,
  copy: boolean = false,
): Collection => {
  return new Collection(asFeatureCollection(geoJSON, copy));
};

/**
 * Builds a Feature (class Feature) from a GeoJSON geometry.
 * @param geometry - A GeoJSON geometry.
 * @param properties - The properties object to add, default {}.
 * @param copy - Boolean, default false. If true, then input is copied.
 * @param strict - Boolean, if mixed geometries are allowed, default false.
 * @returns - A GeoJSON Feature.
 */
export const toFeature = (
  geometry: GeoJSON.Geometry,
  properties: GeoJSON.GeoJsonProperties = {},
  copy: boolean = false,
  strict: boolean = true,
): Feature => {
  return Feature.create(geometry, properties, copy, strict);
};

/**
 * Makes a Feature with geometry type Point from a GeoJSON.Position
 * @param coordinates - A GeoJSON.Position
 * @param properties - The properties object to add, default {}.
 * @param copy - Boolean, default false. If true, then input is copied.
 * @param strict - Boolean, if mixed geometries are allowed, default false.
 * @returns - A GeoJSON Feature
 */
export const toPoint = (
  coordinates: GeoJSON.Position,
  properties: GeoJSON.GeoJsonProperties = {},
  copy: boolean = false,
  strict: boolean = true,
): GeoJSON.Feature => {
  const geometry: GeoJSON.Geometry = {
    type: 'Point',
    coordinates: coordinates,
  };
  return Feature.create(geometry, properties, copy, strict);
};

/**
 * Makes a Feature with geometry type MultiPoint from a GeoJSON.Position[]
 * @param coordinates - A GeoJSON.Position[]
 * @param properties - The properties object to add, default {}.
 * @param copy - Boolean, default false. If true, then input is copied.
 * @param strict - Boolean, if mixed geometries are allowed, default false.
 * @returns - A GeoJSON Feature
 */
export const toMultiPoint = (
  coordinates: GeoJSON.Position[],
  properties: GeoJSON.GeoJsonProperties = {},
  copy: boolean = false,
  strict: boolean = true,
): GeoJSON.Feature => {
  const geometry: GeoJSON.Geometry = {
    type: 'MultiPoint',
    coordinates: coordinates,
  };
  return Feature.create(geometry, properties, copy, strict);
};

/**
 * Makes a Feature with geometry type LineString from a GeoJSON.Position[]
 * @param coordinates - A GeoJSON.Position[]
 * @param properties - The properties object to add, default {}.
 * @param copy - Boolean, default false. If true, then input is copied.
 * @param strict - Boolean, if mixed geometries are allowed, default false.
 * @returns - A GeoJSON Feature
 */
export const toLineString = (
  coordinates: GeoJSON.Position[],
  properties: GeoJSON.GeoJsonProperties = {},
  copy: boolean = false,
  strict: boolean = true,
): GeoJSON.Feature => {
  const geometry: GeoJSON.Geometry = {
    type: 'LineString',
    coordinates: coordinates,
  };
  return Feature.create(geometry, properties, copy, strict);
};

/**
 * Makes a Feature with geometry type MultiLineString from a GeoJSON.Position[][]
 * @param coordinates - A GeoJSON.Position[][]
 * @param properties - The properties object to add, default {}.
 * @param copy - Boolean, default false. If true, then input is copied.
 * @param strict - Boolean, if mixed geometries are allowed, default false.
 * @returns - A GeoJSON Feature
 */
export const toMultiLineString = (
  coordinates: GeoJSON.Position[][],
  properties: GeoJSON.GeoJsonProperties = {},
  copy: boolean = false,
  strict: boolean = true,
): GeoJSON.Feature => {
  const geometry: GeoJSON.Geometry = {
    type: 'MultiLineString',
    coordinates: coordinates,
  };
  return Feature.create(geometry, properties, copy, strict);
};

/**
 * Makes a Feature with geometry type Polygon from a GeoJSON.Position[][]
 * @param coordinates - A GeoJSON.Position[][]
 * @param properties - The properties object to add, default {}.
 * @param copy - Boolean, default false. If true, then input is copied.
 * @param strict - Boolean, if mixed geometries are allowed, default false.
 * @returns - A GeoJSON Feature
 */
export const toPolygon = (
  coordinates: GeoJSON.Position[][],
  properties: GeoJSON.GeoJsonProperties = {},
  copy: boolean = false,
  strict: boolean = true,
): GeoJSON.Feature => {
  const geometry: GeoJSON.Geometry = {
    type: 'Polygon',
    coordinates: coordinates,
  };
  return Feature.create(geometry, properties, copy, strict);
};

/**
 * Makes a Feature with geometry type MultiPolygon from a GeoJSON.Position[][][]
 * @param coordinates - A GeoJSON.Position[][][]
 * @param properties - The properties object to add, default {}.
 * @param copy - Boolean, default false. If true, then input is copied.
 * @param strict - Boolean, if mixed geometries are allowed, default false.
 * @returns - A GeoJSON Feature
 */
export const toMultiPolygon = (
  coordinates: GeoJSON.Position[][][],
  properties: GeoJSON.GeoJsonProperties = {},
  copy: boolean = false,
  strict: boolean = true,
): GeoJSON.Feature => {
  const geometry: GeoJSON.Geometry = {
    type: 'MultiPolygon',
    coordinates: coordinates,
  };
  return Feature.create(geometry, properties, copy, strict);
};
