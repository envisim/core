import {
  type AreaObject,
  type FeatureCollection,
  type LineObject,
  type PointObject,
} from '@envisim/geojson-utils';
import {cube} from '@envisim/sampling';

import {SampleBalancedOptions, sampleBalancedOptionsCheck} from './options.js';
import {balancingMatrixFromLayer, inclprobsFromLayer, returnCollectionFromSample} from './utils.js';

export function sampleBalanced<T extends AreaObject | LineObject | PointObject>(
  collection: FeatureCollection<T>,
  options: SampleBalancedOptions,
): FeatureCollection<T> {
  const optionsError = sampleBalancedOptionsCheck(options, collection.propertyRecord);
  if (optionsError !== null) {
    throw new RangeError(`sampleBalanced error: ${optionsError}`);
  }

  // Compute inclusion probabilities
  const probabilities = inclprobsFromLayer(collection, options);

  // Get selected indexes
  const sample = cube({
    probabilities,
    balancing: balancingMatrixFromLayer(collection, options.balanceOn),
    rand: options.rand,
  });

  return returnCollectionFromSample(collection, sample, probabilities);
}
