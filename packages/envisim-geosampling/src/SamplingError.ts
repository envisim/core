export const SamplingError = {
  // sample base specific errors
  SAMPLE_SIZE_NOT_NON_NEGATIVE_INTEGER: 'sample-error-sample-size',

  // sample finite specific errors
  PROBABILITIES_FROM_DONT_EXIST: 'sample-error-probabilities-from-dont-exist',
  PROBABILITIES_FROM_NOT_NUMERICAL:
    'sample-error-probabilities-from-not-numerical',
  SPATIALLY_BALANCED_MUST_USE_SPREAD: 'sample-error-must-use-spread',
  SPREAD_ON_DONT_EXIST: 'sample-error-spread-on-dont-exist',
  BALANCE_MUST_USE_BALANCE: 'sample-error-must-use-balance',
  BALANCE_ON_DONT_EXIST: 'sample-error-balance-on-dont-exist',

  // sample stratified specific errors
  STRATIFY_DONT_EXIST: 'sample-error-stratify-dont-exist',
  STRATIFY_NOT_CATEGORICAL: 'sample-error-stratify-not-categorical',
  STRATIFY_NO_VALUES: 'sample-error-stratify-no-values',
  STRATIFY_OPTIONS_LENGTH_MISMATCH:
    'sample-error-stratify-options-length-mismatch',

  // sample continuous specific errors
  POINTS_PER_CIRCLE_NOT_POSITIVE_INTEGER: 'sample-error-points-per-circle',
  RATIO_NOT_POSITIVE: 'sample-error-ratio',
  DIST_BETWEEN_NOT_POSITIVE: 'sample-error-dist-between',
  HALF_WIDTH_NOT_POSITIVE: 'sample-error-half-width',
} as const;
