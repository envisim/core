import {GeoJSON} from '@envisim/geojson-utils';

/**
 * Check for points/lines/areas and return first occurence. A tract must be of a
 * single type. Geometries of different dimensions must not be mixed in a tract.
 *
 * @param geoJSON - A GeoJSON Point/Line/AreaFeature.
 * @returns - First occurence of point/line/area.
 */
export function typeOfTract(
  feature: GeoJSON.PointFeature | GeoJSON.LineFeature | GeoJSON.AreaFeature,
): string {
  const geom =
    feature.geometry.type === 'GeometryCollection'
      ? feature.geometry.geometries[0]
      : feature.geometry;
  const geomType = geom.type;
  if (geomType === 'Polygon' || geomType === 'MultiPolygon') {
    return 'area';
  }
  if (geomType === 'LineString' || geomType === 'MultiLineString') {
    return 'line';
  }
  if (geomType === 'Point' || geomType === 'MultiPoint') {
    if (geom.radius) {
      return 'area';
    }
    return 'point';
  }
  throw new Error('Could not resolve tract type.');
}
