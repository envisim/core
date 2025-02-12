import {type FeatureCollection, type PureObject} from '@envisim/geojson-utils';
import {localCube} from '@envisim/sampling';

import {type SampleDoublyBalancedOptions, sampleDoublyBalancedOptionsCheck} from './options.js';
import {
  balancingMatrixFromLayer,
  inclprobsFromLayer,
  returnCollectionFromSample,
  spreadMatrixFromLayer,
} from './utils.js';

export function sampleDoublyBalanced<T extends PureObject, P extends string>(
  collection: FeatureCollection<T, P>,
  options: SampleDoublyBalancedOptions<NoInfer<P>>,
): FeatureCollection<T, P> {
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
