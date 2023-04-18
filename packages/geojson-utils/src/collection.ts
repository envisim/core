import {ColumnVector} from '@envisim/matrix';

import {copy} from './copy.js';

export function sizeOfCollection(
  collection: GeoJSON.FeatureCollection,
): number {
  return collection.features.length;
}

export function createCollection(
  features: GeoJSON.Feature[] = [],
): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features,
  };
}

export function mergeCollections(
  ...collections: GeoJSON.FeatureCollection[]
): GeoJSON.FeatureCollection {
  return createCollection(collections.flatMap((e) => e.features));
}

export function filterCollectionByIndices(
  collection: GeoJSON.FeatureCollection,
  indices: number[],
): GeoJSON.FeatureCollection {
  const idx = new ColumnVector(indices).unique();

  const filteredCollection: GeoJSON.FeatureCollection = createCollection();

  for (let i = 0; i < idx.length; i++) {
    filteredCollection.features.push(copy(collection.features[idx.atIndex(i)]));
  }

  return filteredCollection;
}

export function filterCollectionByPropertyValue(
  collection: GeoJSON.FeatureCollection,
  property: string,
  value: any,
): GeoJSON.FeatureCollection {
  return createCollection(
    collection.features.filter((e) => e.properties?.[property] === value),
  );
}
