// Internal.
const typeOfFeature = (feature: GeoJSON.Feature): string => {
  const geomType = feature.geometry.type;
  if (geomType === 'Polygon' || geomType === 'MultiPolygon') {
    return 'area';
  }
  if (geomType === 'LineString' || geomType === 'MultiLineString') {
    return 'line';
  }
  if (geomType === 'Point' || geomType === 'MultiPoint') {
    if (feature.properties?._radius) {
      return 'area';
    }
    return 'point';
  }
  // It is a GeometryCollection.
  return typeOfFeature({
    type: 'Feature',
    geometry: feature.geometry.geometries[0],
    properties: feature.properties,
  });
};

/**
 * Check for points/lines/areas and return first occurence. A frame must be of a
 * single type. Geometries of different dimensions must not be mixed in a frame.
 *
 * @param geoJSON - A GeoJSON FeatureCollection or Feature.
 * @returns - First occurence of point/line/area.
 */
export const typeOfFrame = (
  geoJSON: GeoJSON.Feature | GeoJSON.FeatureCollection,
): string => {
  switch (geoJSON.type) {
    case 'Feature':
      return typeOfFeature(geoJSON);
    case 'FeatureCollection':
      return typeOfFeature(geoJSON.features[0]);
    default:
      throw new Error('A Feature or FeatureCollection is required.');
  }
};
