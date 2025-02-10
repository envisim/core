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
  M = (typeof SAMPLE_FINITE_METHODS_WOR)[number],
  P extends string = string,
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

export function sampleFiniteOptionsCheck<M, P extends string>(
  {sampleSize, probabilities}: SampleFiniteOptions<M, P>,
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
  M = (typeof SAMPLE_BALANCED_METHODS)[number],
  P extends string = string,
> extends SampleFiniteOptions<M, P> {
  /**
   * An array of id's of properties to use to balance the sample.
   * This apply to cube and localCube.
   */
  balanceOn: string[];
}

export function sampleBalancedOptionsCheck<M, P extends string>(
  {balanceOn, ...options}: SampleBalancedOptions<M, P>,
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
  M = (typeof SAMPLE_SPATIALLY_BALANCED_METHODS)[number],
  P extends string = string,
> extends SampleFiniteOptions<M, P> {
  /**
   * An array of id's of properties to use to spread the sample.
   * This apply to lpm1, lpm2, scps, localCube.
   */
  spreadOn: string[];
  /**
   * Optional spread using geographical coordinates.
   * This apply to lpm1, lpm2, scps, localCube.
   */
  spreadGeo: boolean;
}

export function sampleSpatiallyBalancedOptionsCheck<M, P extends string>(
  {spreadOn, spreadGeo, ...options}: SampleSpatiallyBalancedOptions<M, P>,
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
export type SampleDoublyBalancedOptions<P extends string> = SampleBalancedOptions<
  (typeof SAMPLE_DOUBLY_BALANCED_METHODS)[number],
  P
> &
  SampleSpatiallyBalancedOptions<(typeof SAMPLE_DOUBLY_BALANCED_METHODS)[number], P>;

export function sampleDoublyBalancedOptionsCheck<P extends string>(
  options: SampleDoublyBalancedOptions<P>,
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
