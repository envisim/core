import {copy} from './copy.js';
import {v4 as uuidv4} from 'uuid';
import {bbox} from './bbox.js';

const geometryTypes = [
  'Point',
  'MultiPoint',
  'LineString',
  'MultiLineString',
  'Polygon',
  'MultiPolygon',
  'GeometryCollection',
];

type ToFeatureOpts = {
  properties?: Object;
  copy?: Boolean;
  addBbox?: Boolean;
  addId?: Boolean;
};

/**
 * Builds a Feature from a GeoJSON geometry.
 * @param geometry - A GeoJSON geometry.
 * @param opts - Optional parameters.
 * @param opts.properties - The properties object to add.
 * @param opts.copy - Boolean, default true. If true, then input is copied.
 * @param opts.addBbox - Boolean, default false. If true, then a bbox is added to the feature.
 * @param opts.addId - Boolean, default false. If true, then a unique id is added to the feature.
 * @returns - A GeoJSON Feature.
 */
export const toFeature = (
  geometry: GeoJSON.Geometry,
  opts: ToFeatureOpts = {},
): GeoJSON.Feature => {
  if (!geometryTypes.includes(geometry.type)) {
    throw new Error('A GeoJSON geometry is required.');
  }
  const copyObjects = opts.copy ?? true;
  const addBbox = opts.addBbox ?? false;
  const properties = opts.properties ?? {};
  const addID = opts.addId ?? false;

  let feature: GeoJSON.Feature;
  if (copyObjects) {
    feature = {
      type: 'Feature',
      geometry: copy(geometry),
      properties: copy(properties),
    };
  } else {
    feature = {type: 'Feature', geometry: geometry, properties: properties};
  }
  if (addBbox) {
    feature.bbox = bbox(feature);
  }
  if (addID) {
    feature.id = uuidv4();
  }
  return feature;
};

export const toPoint = (
  coord: GeoJSON.Position,
  opts: ToFeatureOpts = {},
): GeoJSON.Feature => {
  const geometry: GeoJSON.Geometry = {
    type: 'Point',
    coordinates: coord,
  };
  return toFeature(geometry, opts);
};

export const toMultiPoint = (
  coord: GeoJSON.Position[],
  opts: ToFeatureOpts = {},
): GeoJSON.Feature => {
  const geometry: GeoJSON.Geometry = {
    type: 'MultiPoint',
    coordinates: coord,
  };
  return toFeature(geometry, opts);
};

export const toLine = (
  coord: GeoJSON.Position[],
  opts: ToFeatureOpts = {},
): GeoJSON.Feature => {
  const geometry: GeoJSON.Geometry = {
    type: 'LineString',
    coordinates: coord,
  };
  return toFeature(geometry, opts);
};

export const toMultiLine = (
  coord: GeoJSON.Position[][],
  opts: ToFeatureOpts = {},
): GeoJSON.Feature => {
  const geometry: GeoJSON.Geometry = {
    type: 'MultiLineString',
    coordinates: coord,
  };
  return toFeature(geometry, opts);
};

export const toPolygon = (
  coord: GeoJSON.Position[][],
  opts: ToFeatureOpts = {},
): GeoJSON.Feature => {
  const geometry: GeoJSON.Geometry = {
    type: 'Polygon',
    coordinates: coord,
  };
  return toFeature(geometry, opts);
};

export const toMultiPolygon = (
  coord: GeoJSON.Position[][][],
  opts: ToFeatureOpts = {},
): GeoJSON.Feature => {
  const geometry: GeoJSON.Geometry = {
    type: 'MultiPolygon',
    coordinates: coord,
  };
  return toFeature(geometry, opts);
};
