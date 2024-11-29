export const SamplingError = {
  // incorrect collection
  EXPECTED_AREA: 'sampling-error-expected-area',
  EXPECTED_LINE: 'sampling-error-expected-line',
  EXPECTED_POINT: 'sampling-error-expected-point',
  INCORRECT_PRIMITIVE: 'sampling-error-incorrect-primitive',
  COLLECTION_MISSING: 'sampling-error-collection-do-not-exist',

  // sample base specific errors
  SAMPLE_SIZE_NOT_NON_NEGATIVE_INTEGER: 'sampling-error-sample-size',

  // sample finite specific errors
  PROBABILITIES_FROM_MISSING: 'sampling-error-probabilities-from-do-not-exist',
  PROBABILITIES_FROM_NOT_NUMERICAL: 'sampling-error-probabilities-from-not-numerical',
  SPREAD_ON_MISSING: 'sampling-error-spread-on-do-not-exist',
  BALANCE_ON_MISSING: 'sampling-error-balance-on-do-not-exist',

  // sample stratified specific errors
  STRATIFY_MISSING: 'sampling-error-stratify-do-not-exist',
  STRATIFY_NOT_CATEGORICAL: 'sampling-error-stratify-not-categorical',
  STRATIFY_NO_VALUES: 'sampling-error-stratify-no-values',
  STRATIFY_OPTIONS_LENGTH_MISMATCH: 'sampling-error-stratify-options-length-mismatch',

  // sample continuous specific errors
  POINTS_PER_CIRCLE_NOT_POSITIVE_INTEGER: 'sampling-error-points-per-circle',
  RATIO_NOT_POSITIVE: 'sampling-error-ratio',
  DIST_BETWEEN_NOT_POSITIVE: 'sampling-error-dist-between',
  HALF_WIDTH_NOT_POSITIVE: 'sampling-error-half-width',
  FACTOR_NOT_POSITIVE: 'sampling-error-factor',
  SIZE_PROPERTY_MISSING: 'sampling-error-size-property-do-not-exist',
  SIZE_PROPERTY_NOT_NUMERICAL: 'sampling-error-size-property-not-numerical',
} as const;
