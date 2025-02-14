import {type FeatureCollection, type PropertyRecord, type PureObject} from '@envisim/geojson-utils';
import {lpm1, lpm2, scps} from '@envisim/sampling';

import {
  type OptionsBase,
  type OptionsSpatiallyBalanced,
  type SampleError,
  optionsBaseCheck,
  optionsSpatiallyBalancedCheck,
  throwRangeError,
} from './options.js';
import {inclprobsFromLayer, returnCollectionFromSample, spreadMatrixFromLayer} from './utils.js';

export const SAMPLE_SPATIALLY_BALANCED_METHODS = ['lpm1', 'lpm2', 'scps'] as const;
export type SampleSpatiallyBalancedOptions<P extends string = string> = OptionsBase<
  P,
  (typeof SAMPLE_SPATIALLY_BALANCED_METHODS)[number]
> &
  OptionsSpatiallyBalanced<P>;

export function sampleSpatiallyBalancedCheck<P extends string>(
  options: SampleSpatiallyBalancedOptions<P>,
  record: PropertyRecord<P>,
): SampleError {
  return optionsBaseCheck(options, record) || optionsSpatiallyBalancedCheck(options, record);
}

export function sampleSpatiallyBalanced<T extends PureObject, P extends string>(
  collection: FeatureCollection<T, P>,
  options: SampleSpatiallyBalancedOptions<NoInfer<P>>,
): FeatureCollection<T, P> {
  throwRangeError(sampleSpatiallyBalancedCheck(options, collection.propertyRecord));

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
