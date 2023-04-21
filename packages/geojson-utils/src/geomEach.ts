// Internal.
const geomInCollection = (
  gc: GeoJSON.GeometryCollection,
  callback: Function,
  featureIndex: number,
): void => {
  gc.geometries.forEach((geometry) => {
    switch (geometry.type) {
      case 'Point':
      case 'MultiPoint':
      case 'LineString':
      case 'MultiLineString':
      case 'Polygon':
      case 'MultiPolygon':
        callback(geometry, featureIndex);
        break;
      case 'GeometryCollection':
        geomInCollection(geometry, callback, featureIndex);
        break;
      default:
        throw new Error('geomEach: Unknown type.');
    }
  });
};

// Internal.
const geomInFeature = (
  feature: GeoJSON.Feature,
  callback: Function,
  featureIndex: number,
): void => {
  switch (feature.geometry.type) {
    case 'Point':
    case 'MultiPoint':
    case 'LineString':
    case 'MultiLineString':
    case 'Polygon':
    case 'MultiPolygon':
      callback(feature.geometry, featureIndex);
      break;
    case 'GeometryCollection':
      geomInCollection(feature.geometry, callback, featureIndex);
      break;
    default:
      throw new Error('geomEach: Unknown type.');
  }
};

/**
 * Iterates over all geometries and executes a callback
 * function for each. The callback takes two arguments.
 * The first is the geometry and the second is index of
 * the feature it belongs to.
 *
 * @param geoJSON - Input GeoJSON to iterate over geometries.
 * @param callback - Callback function.
 */
export const geomEach = (
  geoJSON: GeoJSON.GeoJSON,
  callback: Function,
): void => {
  switch (geoJSON.type) {
    case 'Point':
    case 'MultiPoint':
    case 'LineString':
    case 'MultiLineString':
    case 'Polygon':
    case 'MultiPolygon':
      callback(geoJSON, 0);
      break;
    case 'Feature':
      geomInFeature(geoJSON, callback, 0);
      break;
    case 'FeatureCollection':
      geoJSON.features.forEach((feature, featureIndex) => {
        geomInFeature(feature, callback, featureIndex);
      });
      break;
    case 'GeometryCollection':
      geomInCollection(geoJSON, callback, 0);
      break;
    default:
      throw new Error('Unknown type.');
  }
};
