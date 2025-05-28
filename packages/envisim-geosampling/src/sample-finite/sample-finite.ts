import { type FeatureCollection, type PropertyRecord, type PureObject } from "@envisim/geojson";
import {
  brewer,
  pareto,
  poissonSampling,
  ppswr,
  randomSystematic,
  rpm,
  sampford,
  spm,
  srswor,
  srswr,
  systematic,
} from "@envisim/sampling";
import type { EnvisimError } from "@envisim/utils";
import { type OptionsBase, optionsBaseCheck } from "./options.js";
import { drawprobsFromLayer, inclprobsFromLayer, returnCollectionFromSample } from "./utils.js";

export const SAMPLE_FINITE_METHODS_WR = ["srs-wr", "pps-wr"] as const;
export const SAMPLE_FINITE_METHODS_WOR = [
  "srs",
  "systematic",
  "systematic-random",
  "poisson-sampling",
  "rpm",
  "spm",
  "sampford",
  "pareto",
  "brewer",
] as const;
/**
 * @interface
 */
export type SampleFiniteOptions<P extends string = string> = OptionsBase<
  P,
  (typeof SAMPLE_FINITE_METHODS_WOR)[number]
>;
/**
 * @interface
 */
export type SampleFiniteOptionsWr<P extends string = string> = OptionsBase<
  P,
  (typeof SAMPLE_FINITE_METHODS_WR)[number]
>;

export function sampleFiniteCheck<P extends string>(
  options: SampleFiniteOptions<NoInfer<P>> | SampleFiniteOptionsWr<NoInfer<P>>,
  record: PropertyRecord<P>,
): EnvisimError {
  return optionsBaseCheck(options, record);
}

/**
 * Select a sample from a layer using sampling methods for a finite population.
 *
 * @param collection -
 * @param options -
 */
export function sampleFinite<T extends PureObject, P extends string>(
  collection: FeatureCollection<T, P>,
  options: SampleFiniteOptions<NoInfer<P>>,
): FeatureCollection<T, P> {
  sampleFiniteCheck(options, collection.propertyRecord).throwErrors();

  // Compute inclusion probabilities
  const probabilities = inclprobsFromLayer(collection, options);

  // Select the correct method, and save indices of the FeatureCollection
  switch (options.method) {
    case "systematic":
      return returnCollectionFromSample(
        collection,
        systematic({ probabilities, rand: options.rand }),
        probabilities,
      );
    case "systematic-random":
      return returnCollectionFromSample(
        collection,
        randomSystematic({ probabilities, rand: options.rand }),
        probabilities,
      );
    case "poisson-sampling":
      return returnCollectionFromSample(
        collection,
        poissonSampling({ probabilities, rand: options.rand }),
        probabilities,
      );
    case "rpm":
      return returnCollectionFromSample(
        collection,
        rpm({ probabilities, rand: options.rand }),
        probabilities,
      );
    case "spm":
      return returnCollectionFromSample(
        collection,
        spm({ probabilities, rand: options.rand }),
        probabilities,
      );
    case "sampford":
      return returnCollectionFromSample(
        collection,
        sampford({ probabilities, rand: options.rand }),
        probabilities,
      );
    case "pareto":
      return returnCollectionFromSample(
        collection,
        pareto({ probabilities, rand: options.rand }),
        probabilities,
      );
    case "brewer":
      return returnCollectionFromSample(
        collection,
        brewer({ probabilities, rand: options.rand }),
        probabilities,
      );
    case "srs":
    default:
      return returnCollectionFromSample(
        collection,
        srswor({ n: options.sampleSize, N: collection.size(), rand: options.rand }),
        probabilities,
      );
  }
}

/**
 * Select a w/o replacement sample from a layer using sampling methods for a finite population.
 *
 * @param collection -
 * @param options -
 */
export function sampleFiniteWr<T extends PureObject, P extends string>(
  collection: FeatureCollection<T, P>,
  options: SampleFiniteOptionsWr<NoInfer<P>>,
): FeatureCollection<T, P> {
  sampleFiniteCheck(options, collection.propertyRecord).throwErrors();

  let sample: number[];
  let probabilities: number[];

  // Select the correct method, and save indices of the FeatureCollection
  switch (options.method) {
    // Standard
    case "srs-wr":
    default:
      // Compute expected number of inclusions / inclusion probabilities
      probabilities = Array.from<number>({ length: collection.size() }).fill(
        options.sampleSize / collection.size(),
      );

      // Get selected indexes
      sample = srswr({ n: options.sampleSize, N: collection.size(), rand: options.rand });
      break;

    // Standard w/ drawprob
    case "pps-wr":
      // Compute expected number of inclusions / inclusion probabilities
      probabilities = drawprobsFromLayer(collection, options)
        .multiply(options.sampleSize, false)
        .slice();

      // Get selected indexes
      sample = ppswr({
        probabilities,
        n: options.sampleSize,
        rand: options.rand,
      });
      break;
  }

  return returnCollectionFromSample(collection, sample, probabilities);
}
