import {type GeoJSON as GJ, typeGuards} from '@envisim/geojson-utils';

/**
 * Check for points/lines/areas and return first occurence. A feature must be of a
 * single type. Geometries of different dimensions must not be mixed in a feature.
 *
 * @param feature a Point/Line/AreaFeature.
 * @returns first occurence of point/line/area.
 */
export function typeOfFeature(
  feature: GJ.PointFeature | GJ.LineFeature | GJ.AreaFeature,
): string {
  const geom =
    feature.geometry.type === 'GeometryCollection'
      ? feature.geometry.geometries[0]
      : feature.geometry;

  switch (geom.type) {
    case 'Polygon':
    case 'MultiPolygon':
      return 'area';
    case 'LineString':
    case 'MultiLineString':
      return 'line';
    case 'Point':
      return typeGuards.isCircle(geom) ? 'area' : 'point';
    case 'MultiPoint':
      return typeGuards.isMultiCircle(geom) ? 'area' : 'point';
    default:
      throw new Error('Could not resolve tract type.');
  }
}
