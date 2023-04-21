import {toFeatureCollection} from './toFeatureCollection.js';
import {copy} from './copy.js';

// Internal.
const flattenFeature = (feature: GeoJSON.Feature): GeoJSON.Feature[] => {
  let i = 0;
  let features: GeoJSON.Feature[] = [];
  if (feature.type === 'Feature') {
    switch (feature.geometry.type) {
      case 'MultiPoint':
        feature.geometry.coordinates.forEach((coord) => {
          features.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [...coord],
            },
            properties: copy(feature.properties),
          });
        });
        return features;
      case 'MultiLineString':
        feature.geometry.coordinates.forEach((coords) => {
          features.push({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: copy(coords),
            },
            properties: copy(feature.properties),
          });
        });
        return features;
      case 'MultiPolygon':
        feature.geometry.coordinates.forEach((coords) => {
          features.push({
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: copy(coords),
            },
            properties: copy(feature.properties),
          });
        });
        return features;
      case 'GeometryCollection':
        for (i = 0; i < feature.geometry.geometries.length; i++) {
          features = features.concat(
            flattenFeature({
              type: 'Feature',
              geometry: copy(feature.geometry.geometries[i]),
              properties: copy(feature.properties),
            }),
          );
        }
        return features;
      default:
        break;
    }
    return [copy(feature)];
  }
  throw new Error('Not a Feature.');
};

/**
 * Converts Multi-geometries to a FeatureCollection of single geometries.
 * All properties are inherited from multi (features) to single (features).
 *
 * @param geoJSON - A GeoJSON.
 * @returns - A GeoJSON FeatureCollection.
 */
export const flatten = (
  geoJSON: GeoJSON.GeoJSON,
): GeoJSON.FeatureCollection => {
  const g = toFeatureCollection(geoJSON, {copy: false}); // objects are copied in flattenFeature
  let features: GeoJSON.Feature[] = [];
  for (let i = 0; i < g.features.length; i++) {
    features = features.concat(flattenFeature(g.features[i]));
  }
  return {
    type: 'FeatureCollection',
    features: features,
  };
};
