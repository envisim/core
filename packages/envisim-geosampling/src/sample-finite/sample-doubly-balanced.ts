import { type FeatureCollection, type PropertyRecord, type PureObject } from "@envisim/geojson";
import { localCube } from "@envisim/sampling";
import {
  type OptionsBalanced,
  type OptionsBase,
  type OptionsSpatiallyBalanced,
  type SampleError,
  optionsBalancedCheck,
  optionsBaseCheck,
  optionsSpatiallyBalancedCheck,
  throwRangeError,
} from "./options.js";
import {
  balancingMatrixFromLayer,
  inclprobsFromLayer,
  returnCollectionFromSample,
  spreadMatrixFromLayer,
} from "./utils.js";

export const SAMPLE_DOUBLY_BALANCED_METHODS = ["local-cube"] as const;
/**
 * @interface
 */
export type SampleDoublyBalancedOptions<P extends string = string> = OptionsBase<
  P,
  (typeof SAMPLE_DOUBLY_BALANCED_METHODS)[number]
> &
  OptionsBalanced<P> &
  OptionsSpatiallyBalanced<P>;

export function sampleDoublyBalancedCheck<P extends string>(
  options: SampleDoublyBalancedOptions<NoInfer<P>>,
  record: PropertyRecord<P>,
): SampleError {
  return (
    optionsBaseCheck(options, record) ||
    optionsBalancedCheck(options, record) ||
    optionsSpatiallyBalancedCheck(options, record)
  );
}

export function sampleDoublyBalanced<T extends PureObject, P extends string>(
  collection: FeatureCollection<T, P>,
  options: SampleDoublyBalancedOptions<NoInfer<P>>,
): FeatureCollection<T, P> {
  throwRangeError(sampleDoublyBalancedCheck(options, collection.propertyRecord));

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
