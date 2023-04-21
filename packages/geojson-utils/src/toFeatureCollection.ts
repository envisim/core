import {copy} from './copy.js';
import {toFeature} from './toFeature.js';

/**
 * Builds a new FeatureCollection from any GeoJSON type.
 * @param geoJSON - Any GeoJSON.
 * @param opts - An options object.
 * @param opts.copy - Boolean, default true. If true, then makes a copy of input.
 * @returns - A GeoJSON FeatureCollection.
 */
export const toFeatureCollection = (
  geoJSON: GeoJSON.GeoJSON,
  opts = {copy: true},
): GeoJSON.FeatureCollection => {
  let g: GeoJSON.GeoJSON;
  if (opts.copy) {
    g = copy(geoJSON);
  } else {
    g = geoJSON;
  }
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
        features: [toFeature(g, {copy: false})],
      };
    default:
      throw new Error('Only GeoJSON types are supported.');
  }
};
