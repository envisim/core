import {type FeatureCollection, type PureObject} from '@envisim/geojson-utils';
import {cube} from '@envisim/sampling';

import {type SampleBalancedOptions, sampleBalancedOptionsCheck} from './options.js';
import {balancingMatrixFromLayer, inclprobsFromLayer, returnCollectionFromSample} from './utils.js';

export function sampleBalanced<T extends PureObject, P extends string>(
  collection: FeatureCollection<T, P>,
  options: SampleBalancedOptions<NoInfer<P>>,
): FeatureCollection<T, P> {
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
