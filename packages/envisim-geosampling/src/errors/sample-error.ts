import {ErrorType} from './utils.js';

export const SAMPLE_ERROR_LIST = {
  // incorrect collection
  EXPECTED_AREA: 'sample-error-expected-area',
  EXPECTED_LINE: 'sample-error-expected-line',
  EXPECTED_POINT: 'sample-error-expected-point',
  INCORRECT_PRIMITIVE: 'sample-error-incorrect-primitive',
  COLLECTION_MISSING: 'sample-error-collection-do-not-exist',

  // sample base specific errors
  SAMPLE_SIZE_NOT_NON_NEGATIVE_INTEGER: 'sample-error-sample-size',

  // sample finite specific errors
  PROBABILITIES_FROM_MISSING: 'sample-error-probabilities-from-do-not-exist',
  PROBABILITIES_FROM_NOT_NUMERICAL: 'sample-error-probabilities-from-not-numerical',
  SPREAD_ON_MISSING: 'sample-error-spread-on-do-not-exist',
  BALANCE_ON_MISSING: 'sample-error-balance-on-do-not-exist',

  // sample stratified specific errors
  STRATIFY_MISSING: 'sample-error-stratify-do-not-exist',
  STRATIFY_NOT_CATEGORICAL: 'sample-error-stratify-not-categorical',
  STRATIFY_NO_VALUES: 'sample-error-stratify-no-values',
  STRATIFY_OPTIONS_LENGTH_MISMATCH: 'sample-error-stratify-options-length-mismatch',

  // sample continuous specific errors
  POINTS_PER_CIRCLE_NOT_POSITIVE_INTEGER: 'sample-error-points-per-circle',
  RATIO_NOT_POSITIVE: 'sample-error-ratio',
  DIST_BETWEEN_NOT_POSITIVE: 'sample-error-dist-between',
  HALF_WIDTH_NOT_POSITIVE: 'sample-error-half-width',
  FACTOR_NOT_POSITIVE: 'sample-error-factor',
  SIZE_PROPERTY_MISSING: 'sample-error-size-property-do-not-exist',
  SIZE_PROPERTY_NOT_NUMERICAL: 'sample-error-size-property-not-numerical',
} as const;

export type SampleError = ErrorType<typeof SAMPLE_ERROR_LIST>;
