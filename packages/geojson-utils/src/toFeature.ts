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
  addID?: Boolean;
};

/**
 * Builds a Feature from a GeoJSON geometry.
 * @param geometry - A GeoJSON geometry.
 * @param opts - Optional parameters.
 * @param opts.properties - The properties object to add.
 * @param opts.copy - Boolean, default true. If true, then input is copied.
 * @param opts.addBbox - Boolean, default false. If true, then a bbox is added to the feature.
 * @param opts.addID - Boolean, default false. If true, then a unique id is added to the feature.
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
  const addID = opts.addID ?? false;

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
  coord:GeoJSON.Position,
  opts: ToFeatureOpts = {},
): GeoJSON.Feature => {
  const geometry = {
    type:"Point",
    coordinates:coord,
  }
return toFeature(geometry,opts);
};

