import { type FeatureCollection, type PropertyRecord, type PureObject } from "@envisim/geojson";
import { cube } from "@envisim/sampling";
import { type EnvisimError } from "@envisim/utils";
import {
  type OptionsBalanced,
  type OptionsBase,
  optionsBalancedCheck,
  optionsBaseCheck,
} from "./options.js";
import {
  balancingMatrixFromLayer,
  inclprobsFromLayer,
  returnCollectionFromSample,
} from "./utils.js";

export const SAMPLE_BALANCED_METHODS = ["cube"] as const;
/**
 * @interface
 */
export type SampleBalancedOptions<P extends string = string> = OptionsBase<
  P,
  (typeof SAMPLE_BALANCED_METHODS)[number]
> &
  OptionsBalanced<P>;

export function sampleBalancedCheck<P extends string>(
  options: SampleBalancedOptions<P>,
  record: PropertyRecord<P>,
): EnvisimError {
  return optionsBaseCheck(options, record).append(optionsBalancedCheck(options, record));
}

export function sampleBalanced<T extends PureObject, P extends string>(
  collection: FeatureCollection<T, P>,
  options: SampleBalancedOptions<NoInfer<P>>,
): FeatureCollection<T, P> {
  sampleBalancedCheck(options, collection.propertyRecord).throwErrors();

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
