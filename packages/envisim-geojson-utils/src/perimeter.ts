import {AreaObject, FeatureCollection} from './geojson/index.js';

export function perimeter(collection: FeatureCollection<AreaObject>): number {
  return collection.features.reduce((p, c) => p + c.geometry.perimeter(), 0.0);
}
