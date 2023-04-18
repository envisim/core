import {
  copy,
  createCollection,
  filterCollectionByIndices,
  filterCollectionByPropertyValue,
  IPropertyRecord,
  mergeCollections,
  sizeOfCollection,
} from '@envisim/geojson-utils';
import * as sampling from '@envisim/sampling';

import type {IPropsStratification, ISampleOptionsFinite} from './types.js';

import {
  drawprobsFromCollection,
  inclprobsFromCollection,
  matrixFromCollectionProps,
  categoriesFromValidProps,
} from './utils.js';

export function sampleFinite(
  methodName: string,
  collection: GeoJSON.FeatureCollection,
  sampleOptions: ISampleOptionsFinite,
  validProps: IPropertyRecord = {},
): GeoJSON.FeatureCollection {
  let idx: number[];

  if (sampleOptions.sampleSize === 0) {
    return createCollection();
  }

  // Select the correct method, and save indices of the FeatureCollection
  switch (methodName) {
    // Standard
    case 'srs':
    case 'srswr':
    case 'srswor':
      idx = sampling[methodName](
        sampleOptions.sampleSize,
        sizeOfCollection(collection),
        {rand: sampleOptions.rand},
      );
      break;

    // Standard w/ incprobs
    case 'systematic':
    case 'randomSystematic':
    case 'poisson':
    case 'randomPivotal':
      idx = sampling[methodName](
        inclprobsFromCollection(collection, sampleOptions, validProps),
        {rand: sampleOptions.rand},
      );
      break;

    // Standard w/ drawprob
    case 'ppswr':
      idx = sampling[methodName](
        drawprobsFromCollection(collection, sampleOptions, validProps),
        sampleOptions.sampleSize,
        {rand: sampleOptions.rand},
      );
      break;

    // Spreading
    case 'lpm':
    case 'lpm1':
    case 'lpm2':
    case 'scps':
      if (
        !Array.isArray(sampleOptions.spreadOn) ||
        sampleOptions.spreadOn.length === 0
      ) {
        return sampleFinite(
          'randomSystematic',
          collection,
          sampleOptions,
          validProps,
        );
      }

      idx = sampling[methodName](
        inclprobsFromCollection(collection, sampleOptions, validProps),
        matrixFromCollectionProps(
          collection,
          sampleOptions.spreadOn ?? [],
          validProps,
        ),
        {
          rand: sampleOptions.rand,
          categorical: categoriesFromValidProps(
            sampleOptions.spreadOn ?? [],
            validProps,
          ),
          distfun: sampling.distanceGS,
        },
      );
      break;

    // Balancing
    case 'cube':
      if (
        !Array.isArray(sampleOptions.balanceOn) ||
        sampleOptions.balanceOn.length === 0
      ) {
        return sampleFinite(
          'randomSystematic',
          collection,
          sampleOptions,
          validProps,
        );
      }

      idx = sampling[methodName](
        inclprobsFromCollection(collection, sampleOptions, validProps),
        matrixFromCollectionProps(
          collection,
          sampleOptions.balanceOn ?? [],
          validProps,
        ),
        {rand: sampleOptions.rand},
      );
      break;

    // Balancing + spreading
    case 'localcube':
      idx = sampling[methodName](
        inclprobsFromCollection(collection, sampleOptions, validProps),
        matrixFromCollectionProps(
          collection,
          sampleOptions.balanceOn ?? [],
          validProps,
        ),
        matrixFromCollectionProps(
          collection,
          sampleOptions.spreadOn ?? [],
          validProps,
        ),
        {
          rand: sampleOptions.rand,
          categorical: categoriesFromValidProps(
            sampleOptions.spreadOn ?? [],
            validProps,
          ),
          distfun: sampling.distanceGS,
        },
      );
      break;

    // Default throw
    default:
      throw new TypeError('method is not valid');
  }

  return copy(filterCollectionByIndices(collection, idx));
}

export function sampleFiniteStratified(
  methodName: string,
  collection: GeoJSON.FeatureCollection,
  sampleOptions: ISampleOptionsFinite,
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
      sampleFinite(
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
