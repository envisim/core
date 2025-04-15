import { PropertyRecord } from "@envisim/geojson";
import { type RandomGenerator } from "@envisim/random";
import { throwRangeError } from "@envisim/utils";
import { SAMPLE_ERROR_LIST, type SampleError } from "../errors/index.js";

export { SAMPLE_ERROR_LIST, type SampleError, throwRangeError };

export interface OptionsBase<P extends string = string, M extends string = string> {
  /**
   * An RNG
   * @defaultValue `new Random()`
   */
  rand?: RandomGenerator;
  /**
   * Method name
   */
  method: M;
  /**
   * The sample size to use. Should be non-negative integer.
   */
  sampleSize: number;

  /**
   * The id of the numerical property to use to compute probabilities.
   * '_measure' calculates probabilities from measure.
   */
  probabilities?: P;
}

export function optionsBaseCheck<P extends string, M extends string>(
  { sampleSize, probabilities }: OptionsBase<NoInfer<P>, M>,
  record: PropertyRecord<P>,
): SampleError {
  if (!Number.isInteger(sampleSize) || sampleSize < 0) {
    // sampleSize must be a non negative integer
    return SAMPLE_ERROR_LIST.SAMPLE_SIZE_NOT_NON_NEGATIVE_INTEGER;
  }

  if (probabilities !== undefined && probabilities !== "_measure") {
    const property = record.getId(probabilities);
    if (property === null) {
      // probabilitiesFrom must exist on propertyRecord
      return SAMPLE_ERROR_LIST.PROBABILITIES_FROM_MISSING;
    }

    if (!PropertyRecord.isNumerical(property)) {
      // probabilitiesFrom must be a numerical property
      return SAMPLE_ERROR_LIST.PROBABILITIES_FROM_NOT_NUMERICAL;
    }
  }

  return null;
}

export interface OptionsBalanced<P extends string = string> {
  /**
   * An array of id's of properties to use to balance the sample.
   * This apply to cube and localCube.
   */
  balanceOn: P[];
}

export function optionsBalancedCheck<P extends string>(
  { balanceOn }: OptionsBalanced<NoInfer<P>>,
  record: PropertyRecord<P>,
): SampleError {
  if (balanceOn.length === 0 || balanceOn.some((prop) => !record.hasId(prop))) {
    // Must use balanceOn
    // balanceOn entries must exist on propertyRecord
    return SAMPLE_ERROR_LIST.BALANCE_ON_MISSING;
  }

  return null;
}

export interface OptionsSpatiallyBalanced<P extends string = string> {
  /**
   * An array of id's of properties to use to spread the sample.
   * This apply to lpm1, lpm2, scps, localCube.
   */
  spreadOn: P[];
  /**
   * Optional spread using geographical coordinates.
   * This apply to lpm1, lpm2, scps, localCube.
   */
  spreadGeo: boolean;
}

export function optionsSpatiallyBalancedCheck<P extends string>(
  { spreadOn, spreadGeo }: OptionsSpatiallyBalanced<NoInfer<P>>,
  record: PropertyRecord<P>,
): SampleError {
  // Uses nothing
  if (spreadOn.length === 0 && spreadGeo === false) {
    return SAMPLE_ERROR_LIST.SPREAD_ON_MISSING;
  }

  // Check so spreadOn properties exists on record
  if (spreadOn.length > 0 && spreadOn.some((prop) => !record.hasId(prop))) {
    return SAMPLE_ERROR_LIST.SPREAD_ON_MISSING;
  }

  return null;
}
