import {type FeatureCollection, type PropertyRecord, type PureObject} from '@envisim/geojson-utils';
import {cube} from '@envisim/sampling';

import {
  type OptionsBalanced,
  type OptionsBase,
  type SampleError,
  optionsBalancedCheck,
  optionsBaseCheck,
  throwRangeError,
} from './options.js';
import {balancingMatrixFromLayer, inclprobsFromLayer, returnCollectionFromSample} from './utils.js';

export const SAMPLE_BALANCED_METHODS = ['cube'] as const;
export type SampleBalancedOptions<P extends string = string> = OptionsBase<
  P,
  (typeof SAMPLE_BALANCED_METHODS)[number]
> &
  OptionsBalanced<P>;

export function sampleBalancedCheck<P extends string>(
  options: SampleBalancedOptions<P>,
  record: PropertyRecord<P>,
): SampleError {
  return optionsBaseCheck(options, record) || optionsBalancedCheck(options, record);
}

export function sampleBalanced<T extends PureObject, P extends string>(
  collection: FeatureCollection<T, P>,
  options: SampleBalancedOptions<NoInfer<P>>,
): FeatureCollection<T, P> {
  throwRangeError(sampleBalancedCheck(options, collection.propertyRecord));
  const optionsError = optionsBalancedCheck(options, collection.propertyRecord);
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
