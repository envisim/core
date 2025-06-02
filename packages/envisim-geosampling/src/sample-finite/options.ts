import { PropertyRecord } from "@envisim/geojson";
import { type RandomGenerator } from "@envisim/random";
import { EnvisimError, ValidationError } from "@envisim/utils";

/**
 * @inline
 * @expand
 */
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
): EnvisimError {
  const errors = new EnvisimError();

  // sampleSize must positive
  errors.add(ValidationError.check["number-not-positive"]({ arg: "sampleSize" }, sampleSize));

  if (probabilities !== undefined && probabilities !== "_measure") {
    const property = record.getId(probabilities);

    // probabilitiesFrom must exist on propertyRecord
    if (property === null)
      errors.add(ValidationError.create["property-not-existing"]({ arg: "probabilities" }));

    // probabilitiesFrom must be a numerical property
    if (!PropertyRecord.isNumerical(property))
      errors.add(ValidationError.create["property-not-numerical"]({ arg: "probabilities" }));
  }

  return errors;
}

/**
 * @inline
 * @expand
 */
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
): EnvisimError {
  const errors = new EnvisimError();

  // Must use balanceOn
  errors.add(ValidationError.check["array-empty"]({ arg: "balanceOn" }, balanceOn));
  // balanceOn entries must exist on propertyRecord
  balanceOn.forEach((prop) => {
    if (!record.hasId(prop))
      errors.add(ValidationError.create["property-not-existing"]({ arg: "balanceOn", key: prop }));
  });

  return errors;
}

/**
 * @inline
 * @expand
 */
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
): EnvisimError {
  const errors = new EnvisimError();

  // Uses nothing
  if (spreadOn.length === 0 && spreadGeo === false)
    errors.add(ValidationError.check["array-empty"]({ arg: "spreadOn" }, spreadOn));

  // Check so spreadOn properties exists on record
  spreadOn.forEach((prop) => {
    if (!record.hasId(prop))
      errors.add(ValidationError.create["property-not-existing"]({ arg: "spreadOn", key: prop }));
  });

  return errors;
}
