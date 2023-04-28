import {copy as fnCopy} from './copy.js';

/**
 * Builds a new FeatureCollection from any GeoJSON type. Minimum overhead.
 * Does not convert Features to class Feature. Output standard GeoJSON
 * FeatureCollection.
 * @param geoJSON - Any GeoJSON.
 * @param copy - Boolean, default false. If true, then makes a copy of input.
 * @returns - A GeoJSON FeatureCollection.
 */
export const asFeatureCollection = (
  geoJSON: GeoJSON.GeoJSON,
  copy: boolean = false,
): GeoJSON.FeatureCollection => {
  let g: GeoJSON.GeoJSON;
  g = copy === true ? fnCopy(geoJSON) : geoJSON;
  switch (g.type) {
    case 'FeatureCollection':
      return g;
    case 'Feature':
      return {type: 'FeatureCollection', features: [g]};
    case 'Point':
    case 'MultiPoint':
    case 'LineString':
    case 'MultiLineString':
    case 'Polygon':
    case 'MultiPolygon':
    case 'GeometryCollection':
      return {
        type: 'FeatureCollection',
        features: [{type: 'Feature', geometry: g, properties: {}}],
      };
    default:
      throw new Error('Only GeoJSON types are supported.');
  }
};
