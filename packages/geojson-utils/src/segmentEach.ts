import {toFeatureCollection} from './toFeatureCollection.js';

// Internal.
const segmentInLineString = (
  ls: GeoJSON.Position[],
  geometry: GeoJSON.Geometry,
  featureIndex: number,
  callback: Function,
) => {
  for (let i = 0; i < ls.length - 1; i++) {
    callback([ls[i], ls[i + 1]], geometry, geometry, featureIndex);
  }
};

// Internal
const segmentInGeometry = (
  geometry: GeoJSON.Geometry,
  featureIndex: number,
  callback: Function,
): void => {
  switch (geometry.type) {
    case 'LineString':
      segmentInLineString(
        geometry.coordinates,
        geometry,
        featureIndex,
        callback,
      );
      break;
    case 'MultiLineString':
    case 'Polygon':
      geometry.coordinates.forEach((ring) => {
        segmentInLineString(ring, geometry, featureIndex, callback);
      });
      break;
    case 'MultiPolygon':
      geometry.coordinates.forEach((polygon) => {
        polygon.forEach((ring) => {
          segmentInLineString(ring, geometry, featureIndex, callback);
        });
      });
      break;
    case 'GeometryCollection':
      geometry.geometries.forEach((geometry) => {
        segmentInGeometry(geometry, featureIndex, callback);
      });
      break;
    default:
      break;
  }
};

/**
 * Iterates over all segments and call the callback function with the parameters
 * segment, geometry, featureIndex. Does not treat pointCircles as polygons, so
 * they are not included.
 *
 * @param geoJSON - A GeoJSON object.
 * @param callback - A function that takes segment, (and optionally) geometry and featureIndex as parameters.
 */
export const segmentEach = (
  geoJSON: GeoJSON.GeoJSON,
  callback: Function,
): void => {
  toFeatureCollection(geoJSON, {copy: false}).features.forEach(
    (feature, featureIndex) => {
      segmentInGeometry(feature.geometry, featureIndex, callback);
    },
  );
};
