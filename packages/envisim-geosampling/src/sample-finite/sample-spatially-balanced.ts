import { type FeatureCollection, type PropertyRecord, type PureObject } from "@envisim/geojson";
import { lpm1, lpm2, scps } from "@envisim/sampling";
import type { EnvisimError } from "@envisim/utils";
import {
  type OptionsBase,
  type OptionsSpatiallyBalanced,
  optionsBaseCheck,
  optionsSpatiallyBalancedCheck,
} from "./options.js";
import { inclprobsFromLayer, returnCollectionFromSample, spreadMatrixFromLayer } from "./utils.js";

export const SAMPLE_SPATIALLY_BALANCED_METHODS = ["lpm1", "lpm2", "scps"] as const;
/**
 * @interface
 */
export type SampleSpatiallyBalancedOptions<P extends string = string> = OptionsBase<
  P,
  (typeof SAMPLE_SPATIALLY_BALANCED_METHODS)[number]
> &
  OptionsSpatiallyBalanced<P>;

export function sampleSpatiallyBalancedCheck<P extends string>(
  options: SampleSpatiallyBalancedOptions<P>,
  record: PropertyRecord<P>,
): EnvisimError {
  return optionsBaseCheck(options, record).append(optionsSpatiallyBalancedCheck(options, record));
}

export function sampleSpatiallyBalanced<T extends PureObject, P extends string>(
  collection: FeatureCollection<T, P>,
  options: SampleSpatiallyBalancedOptions<NoInfer<P>>,
): FeatureCollection<T, P> {
  sampleSpatiallyBalancedCheck(options, collection.propertyRecord).throwErrors();

  // Compute inclusion probabilities
  const probabilities = inclprobsFromLayer(collection, options);
  const auxiliaries = spreadMatrixFromLayer(collection, options.spreadOn, options.spreadGeo);
  const samplingOptions = {
    probabilities,
    auxiliaries,
    rand: options.rand,
  };

  switch (options.method) {
    case "lpm1":
      return returnCollectionFromSample(
        collection,
        lpm1(samplingOptions),
        samplingOptions.probabilities,
      );
    case "scps":
      return returnCollectionFromSample(
        collection,
        scps(samplingOptions),
        samplingOptions.probabilities,
      );
    case "lpm2":
    default:
      return returnCollectionFromSample(
        collection,
        lpm2(samplingOptions),
        samplingOptions.probabilities,
      );
  }
}
