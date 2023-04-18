import {
  createCollection,
  filterCollectionByPropertyValue,
  IPropertyRecord,
  mergeCollections,
  TCollectionType,
} from '@envisim/geojson-utils';

import type {IPropsStratification, ISampleOptionsContinuous} from './types.js';

import {sampleFromLine, sampleFromPolygon} from './sampleFromGeoJson.js';

export function sampleContinuous(
  geojsonType: Exclude<TCollectionType, 'point'>,
  methodName: string,
  collection: GeoJSON.FeatureCollection,
  sampleOptions: ISampleOptionsContinuous,
  validProps: IPropertyRecord = {},
): GeoJSON.FeatureCollection {
  if (sampleOptions.sampleSize === 0) {
    return createCollection();
  }

  switch (geojsonType) {
    case 'line':
      return sampleFromLine(methodName, collection, sampleOptions, validProps);
    case 'polygon':
      return sampleFromPolygon(
        methodName,
        collection,
        sampleOptions,
        validProps,
      );
    default:
      throw new Error('geojsonType does not match any allowed values');
  }
}

export function sampleContinuousStratified(
  geojsonType: Exclude<TCollectionType, 'point'>,
  methodName: string,
  collection: GeoJSON.FeatureCollection,
  sampleOptions: ISampleOptionsContinuous,
  validProps: IPropertyRecord,
  stratification: IPropsStratification,
): GeoJSON.FeatureCollection {
  if (!(stratification.stratify in validProps))
    throw new Error(
      'stratification is not possible as validProps does not contain the required property',
    );

  // The ID of the property
  const property = stratification.stratify;
  // The current property object
  const propertyObj = validProps[property];

  // We only allow stratification on categorical variables
  if (propertyObj.type !== 'categorical')
    throw new Error(
      'stratification is only possible to perform on categorical properties',
    );

  const sampleSizeFallback: number =
    sampleOptions.sampleSize / propertyObj.values.length;

  /*
   * For each value of the property, run sampleFinite.
   * If sampleSize is not defined on stratification, use sampleSizeFallback.
   * Merge the returning FeatureCollections
   */
  return mergeCollections(
    ...propertyObj.values.map((e, i) =>
      sampleContinuous(
        geojsonType,
        methodName,
        filterCollectionByPropertyValue(collection, property, e),
        {
          ...sampleOptions,
          sampleSize: stratification.sampleSize[i] ?? sampleSizeFallback,
        },
        validProps,
      ),
    ),
  );
}
