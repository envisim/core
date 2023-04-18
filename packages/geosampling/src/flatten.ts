import {deepCopy} from './deepCopy.js';

type TsingleGeom = 'Point' | 'LineString' | 'Polygon';

// Internal.
const flattenFeature = (feature: GeoJSON.Feature): GeoJSON.Feature[] => {
  let i = 0;
  let type: TsingleGeom = 'Point';
  let features: GeoJSON.Feature[] = [];
  if (feature.type === 'Feature') {
    switch (feature.geometry.type) {
      case 'MultiPoint':
      case 'MultiLineString':
      case 'MultiPolygon':
        if (feature.geometry.type === 'MultiPoint') {
          type = 'Point';
        }
        if (feature.geometry.type === 'MultiLineString') {
          type = 'LineString';
        }
        if (feature.geometry.type === 'MultiPolygon') {
          type = 'Polygon';
        }
        for (i = 0; i < feature.geometry.coordinates.length; i++) {
          features.push({
            type: 'Feature',
            geometry: {
              type: type,
              coordinates: deepCopy(feature.geometry.coordinates[i]),
            },
            properties: deepCopy(feature.properties),
          });
        }
        return features;
      case 'GeometryCollection':
        for (i = 0; i < feature.geometry.geometries.length; i++) {
          features = features.concat(
            flattenFeature({
              type: 'Feature',
              geometry: deepCopy(feature.geometry.geometries[i]),
              properties: deepCopy(feature.properties),
            }),
          );
        }
        return features;
      default:
        break;
    }
  }
  return [deepCopy(feature)];
};

/**
 * Converts Multi-geometries to a FeatureCollection of single geometries.
 * All properties are inherited from multi (features) to single (features).
 *
 * @param geoJSON - A GeoJSON object.
 * @returns - A GeoJSON FeatureCollection.
 */
export const flatten = (
  geoJSON: GeoJSON.GeoJSON,
): GeoJSON.FeatureCollection => {
  let features: GeoJSON.Feature[] = [];
  switch (geoJSON.type) {
    case 'FeatureCollection':
      for (let i = 0; i < geoJSON.features.length; i++) {
        features = features.concat(flattenFeature(geoJSON.features[i]));
      }
      break;
    case 'Feature':
      features = flattenFeature(geoJSON);
      break;
    case 'Point':
    case 'MultiPoint':
    case 'LineString':
    case 'MultiLineString':
    case 'Polygon':
    case 'MultiPolygon':
    case 'GeometryCollection':
      features = flattenFeature({
        type: 'Feature',
        geometry: geoJSON,
        properties: {},
      });
      break;
    default:
      throw new Error('flatten: Unknown GeoJSON type.');
  }
  return {
    type: 'FeatureCollection',
    features: features,
  };
};
