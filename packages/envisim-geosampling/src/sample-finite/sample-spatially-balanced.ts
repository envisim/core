import {
  type AreaObject,
  type FeatureCollection,
  type LineObject,
  type PointObject,
} from '@envisim/geojson-utils';
import {lpm1, lpm2, scps} from '@envisim/sampling';

import {SampleSpatiallyBalancedOptions, sampleSpatiallyBalancedOptionsCheck} from './options.js';
import {inclprobsFromLayer, returnCollectionFromSample, spreadMatrixFromLayer} from './utils.js';

export function sampleSpatiallyBalanced<T extends AreaObject | LineObject | PointObject>(
  collection: FeatureCollection<T>,
  options: SampleSpatiallyBalancedOptions,
): FeatureCollection<T> {
  const optionsError = sampleSpatiallyBalancedOptionsCheck(options, collection.propertyRecord);
  if (optionsError !== null) {
    throw new RangeError(`sampleSpatiallyBalanced error: ${optionsError}`);
  }

  // Compute inclusion probabilities
  const probabilities = inclprobsFromLayer(collection, options);
  const auxiliaries = spreadMatrixFromLayer(collection, options.spreadOn, options.spreadGeo);
  const samplingOptions = {
    probabilities,
    auxiliaries,
    rand: options.rand,
  };

  switch (options.method) {
    case 'lpm1':
      return returnCollectionFromSample(
        collection,
        lpm1(samplingOptions),
        samplingOptions.probabilities,
      );
    case 'scps':
      return returnCollectionFromSample(
        collection,
        scps(samplingOptions),
        samplingOptions.probabilities,
      );
    case 'lpm2':
    default:
      return returnCollectionFromSample(
        collection,
        lpm2(samplingOptions),
        samplingOptions.probabilities,
      );
  }
}
