interface IsummaryOfTypes {
  FeatureCollection: number;
  Feature: number;
  GeometryCollection: number;
  Point: number;
  MultiPoint: number;
  LineString: number;
  MultiLineString: number;
  Polygon: number;
  MultiPolygon: number;
}

// Internal.
const typesInCollection = (
  gc: GeoJSON.GeometryCollection,
  summary: IsummaryOfTypes,
): void => {
  gc.geometries.forEach(geometry => {
    switch (geometry.type) {
      case 'Point':
      case 'MultiPoint':
      case 'LineString':
      case 'MultiLineString':
      case 'Polygon':
      case 'MultiPolygon':
        summary[geometry.type] += 1;
        break;
      case 'GeometryCollection':
        typesInCollection(geometry, summary);
        break;
      default:
        throw new Error('Unknown type.');
    }
  });
};

// Internal.
const typesInFeature = (
  feature: GeoJSON.Feature,
  summary: IsummaryOfTypes,
): void => {
  switch (feature.geometry.type) {
    case 'Point':
    case 'MultiPoint':
    case 'LineString':
    case 'MultiLineString':
    case 'Polygon':
    case 'MultiPolygon':
      summary[feature.geometry.type] += 1;
      break;
    case 'GeometryCollection':
      typesInCollection(feature.geometry, summary);
      break;
    default:
      throw new Error('Unknown type.');
  }
};

/**
 * Counts all GeoJSON types.
 *
 * @param geoJSON - Input GeoJSON
 * @returns - An object containing counts of all GeoJSON types as type:count.
 */
export const summaryOfTypes = (geoJSON: GeoJSON.GeoJSON): IsummaryOfTypes => {
  const summary: IsummaryOfTypes = {
    FeatureCollection: 0,
    Feature: 0,
    GeometryCollection: 0,
    Point: 0,
    MultiPoint: 0,
    LineString: 0,
    MultiLineString: 0,
    Polygon: 0,
    MultiPolygon: 0,
  };
  switch (geoJSON.type) {
    case 'Point':
    case 'MultiPoint':
    case 'LineString':
    case 'MultiLineString':
    case 'Polygon':
    case 'MultiPolygon':
      summary[geoJSON.type] += 1;
      break;
    case 'Feature':
      summary[geoJSON.type] += 1;
      typesInFeature(geoJSON, summary);
      break;
    case 'FeatureCollection':
      summary[geoJSON.type] += 1;
      summary['Feature'] = geoJSON.features.length;
      geoJSON.features.forEach(feature => {
        typesInFeature(feature, summary);
      });
      break;
    case 'GeometryCollection':
      summary[geoJSON.type] += 1;
      typesInCollection(geoJSON, summary);
      break;
    default:
      throw new Error('Unknown type.');
  }
  return summary;
};
