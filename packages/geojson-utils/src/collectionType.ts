import {TCollectionType} from './types/collection.js';

export function collectionType(
  geojson: GeoJSON.GeoJSON,
  checkCircle: boolean = false,
): TCollectionType | '' {
  switch (geojson.type) {
    case 'FeatureCollection':
      return geojson.features.length > 0
        ? collectionType(geojson.features[0])
        : '';

    case 'Feature':
      if (!geojson.geometry) return '';
      // Handle circle special case
      const tp = collectionType(geojson.geometry);
      return checkCircle && tp === 'point' && geojson.properties?._radius > 0.0
        ? 'polygon'
        : tp;

    case 'GeometryCollection':
      return geojson.geometries.length > 0
        ? collectionType(geojson.geometries[0])
        : '';

    case 'LineString':
    case 'MultiLineString':
      return 'line';

    case 'Point':
    case 'MultiPoint':
      return 'point';

    case 'Polygon':
    case 'MultiPolygon':
      return 'polygon';

    default:
      throw new Error('not a valid geometry');
  }
}

export function collectionTypeWithRadius(
  geojson: GeoJSON.GeoJSON,
  radiusIsDefined: boolean = false,
): TCollectionType | '' {
  const t = collectionType(geojson);
  return t === 'point' && radiusIsDefined === true ? 'polygon' : t;
}
