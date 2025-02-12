import {PropertyRecord} from '@envisim/geojson-utils';
import {type Random} from '@envisim/random';

import {SamplingError} from '../sampling-error.js';
import {type ErrorType} from '../utils/error-type.js';

export const SAMPLE_FINITE_METHODS_WR = ['srs-wr', 'pps-wr'] as const;
export const SAMPLE_FINITE_METHODS_WOR = [
  'srs',
  'systematic',
  'systematic-random',
  'poisson-sampling',
  'rpm',
  'spm',
  'sampford',
  'pareto',
  'brewer',
] as const;
export const SAMPLE_FINITE_METHODS = [
  ...SAMPLE_FINITE_METHODS_WR,
  ...SAMPLE_FINITE_METHODS_WOR,
] as const;
export interface SampleFiniteOptions<
  P extends string = string,
  M = (typeof SAMPLE_FINITE_METHODS_WOR)[number],
> {
  /**
   * An instance of {@link random.Random}
   * @defaultValue `new Random()`
   */
  rand?: Random;
  /**
   * Method name
   */
  method?: M;
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

export function sampleFiniteOptionsCheck<P extends string, M>(
  {sampleSize, probabilities}: SampleFiniteOptions<NoInfer<P>, M>,
  record: PropertyRecord<P>,
): ErrorType<typeof SamplingError> {
  if (!Number.isInteger(sampleSize) || sampleSize < 0) {
    // sampleSize must be a non negative integer
    return SamplingError.SAMPLE_SIZE_NOT_NON_NEGATIVE_INTEGER;
  }

  if (probabilities !== undefined && probabilities !== '_measure') {
    const property = record.getId(probabilities);
    if (property === null) {
      // probabilitiesFrom must exist on propertyRecord
      return SamplingError.PROBABILITIES_FROM_MISSING;
    }

    if (!PropertyRecord.isNumerical(property)) {
      // probabilitiesFrom must be a numerical property
      return SamplingError.PROBABILITIES_FROM_NOT_NUMERICAL;
    }
  }

  return null;
}

export const SAMPLE_BALANCED_METHODS = ['cube'] as const;
export interface SampleBalancedOptions<
  P extends string = string,
  M = (typeof SAMPLE_BALANCED_METHODS)[number],
> extends SampleFiniteOptions<P, M> {
  /**
   * An array of id's of properties to use to balance the sample.
   * This apply to cube and localCube.
   */
  balanceOn: P[];
}

export function sampleBalancedOptionsCheck<P extends string, M>(
  {balanceOn, ...options}: SampleBalancedOptions<NoInfer<P>, M>,
  record: PropertyRecord<P>,
): ErrorType<typeof SamplingError> {
  const finiteCheck = sampleFiniteOptionsCheck(options, record);
  if (finiteCheck !== null) {
    return finiteCheck;
  }

  if (balanceOn.length === 0 || balanceOn.some((prop) => !record.hasId(prop))) {
    // Must use balanceOn
    // balanceOn entries must exist on propertyRecord
    return SamplingError.BALANCE_ON_MISSING;
  }

  return null;
}

export const SAMPLE_SPATIALLY_BALANCED_METHODS = ['lpm1', 'lpm2', 'scps'] as const;
export interface SampleSpatiallyBalancedOptions<
  P extends string = string,
  M = (typeof SAMPLE_SPATIALLY_BALANCED_METHODS)[number],
> extends SampleFiniteOptions<P, M> {
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

export function sampleSpatiallyBalancedOptionsCheck<P extends string, M>(
  {spreadOn, spreadGeo, ...options}: SampleSpatiallyBalancedOptions<NoInfer<P>, M>,
  record: PropertyRecord<P>,
): ErrorType<typeof SamplingError> {
  const finiteCheck = sampleFiniteOptionsCheck(options, record);
  if (finiteCheck !== null) {
    return finiteCheck;
  }

  // Uses nothing
  if (spreadOn.length === 0 && spreadGeo === false) {
    return SamplingError.SPREAD_ON_MISSING;
  }

  // Check so spreadOn properties exists on record
  if (spreadOn.length > 0 && spreadOn.some((prop) => !record.hasId(prop))) {
    return SamplingError.SPREAD_ON_MISSING;
  }

  return null;
}

export const SAMPLE_DOUBLY_BALANCED_METHODS = ['local-cube'] as const;
export type SampleDoublyBalancedOptions<P extends string = string> = SampleBalancedOptions<
  P,
  (typeof SAMPLE_DOUBLY_BALANCED_METHODS)[number]
> &
  SampleSpatiallyBalancedOptions<P, (typeof SAMPLE_DOUBLY_BALANCED_METHODS)[number]>;

export function sampleDoublyBalancedOptionsCheck<P extends string>(
  options: SampleDoublyBalancedOptions<NoInfer<P>>,
  record: PropertyRecord<P>,
): ErrorType<typeof SamplingError> {
  const balancedCheck = sampleBalancedOptionsCheck(options, record);
  if (balancedCheck !== null) {
    return balancedCheck;
  }

  const spatiallyBalancedCheck = sampleBalancedOptionsCheck(options, record);
  if (spatiallyBalancedCheck !== null) {
    return spatiallyBalancedCheck;
  }

  return null;
}
