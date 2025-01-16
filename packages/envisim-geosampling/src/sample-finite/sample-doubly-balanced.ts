import {
  type AreaObject,
  type FeatureCollection,
  type LineObject,
  type PointObject,
} from '@envisim/geojson-utils';
import {localCube} from '@envisim/sampling';

import {SampleDoublyBalancedOptions, sampleDoublyBalancedOptionsCheck} from './options.js';
import {
  balancingMatrixFromLayer,
  inclprobsFromLayer,
  returnCollectionFromSample,
  spreadMatrixFromLayer,
} from './utils.js';

export function sampleDoublyBalanced<T extends AreaObject | LineObject | PointObject>(
  collection: FeatureCollection<T>,
  options: SampleDoublyBalancedOptions,
): FeatureCollection<T> {
  const optionsError = sampleDoublyBalancedOptionsCheck(options, collection.propertyRecord);
  if (optionsError !== null) {
    throw new RangeError(`sampleDoublyBalanced error: ${optionsError}`);
  }

  // Compute inclusion probabilities
  const probabilities = inclprobsFromLayer(collection, options);
  const auxiliaries = spreadMatrixFromLayer(collection, options.spreadOn, options.spreadGeo);

  const sample = localCube({
    probabilities,
    balancing: balancingMatrixFromLayer(collection, options.balanceOn),
    auxiliaries,
    rand: options.rand,
  });

  return returnCollectionFromSample(collection, sample, probabilities);
}
