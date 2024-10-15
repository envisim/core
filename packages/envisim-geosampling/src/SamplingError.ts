export const SamplingError = {
  // sample base specific errors
  SAMPLE_SIZE_NOT_NON_NEGATIVE_INTEGER:
    'sampleSize is not a non-negative integer.',

  // sample finite specific errors
  PROBABILITIES_FROM_DONT_EXIST:
    'probabilitiesFrom does not exist on propertyRecord.',
  PROBABILITIES_FROM_NOT_NUMERICAL: 'probabilitiesFrom is not numerical.',
  SPATIALLY_BALANCED_MUST_USE_SPREAD:
    'method is spatially balanced, but does not use spreadOn or spreadGeo.',
  SPREAD_ON_DONT_EXIST:
    'spatially balanced method requires spreadOn to exist on propertyRecord.',
  BALANCED_MUST_USE_BALANCE: 'balanced method requires balanceOn.',
  BALANCED_ON_DONT_EXIST:
    'balanced method requires balanceOn to exist on propertyRecord.',

  // sample stratified specific errors
  STRATIFY_DONT_EXIST: 'stratify does not exist on propertyRecord.',
  STRATIFY_NOT_CATEGORICAL: 'stratify property is not categorical.',
  STRATIFY_NO_VALUES: 'stratify property has no values.',
  STRATIFY_OPTIONS_LENGTH_MISMATCH:
    'options is an array, but its length does not match the length of stratify property values.',

  // sample continuous specific errors
  POINTS_PER_CIRCLE_NOT_POSITIVE_INTEGER:
    'pointsPerCircle is not a positive integer.',
  RATIO_NOT_POSITIVE: 'ratio is not positive.',
  DIST_BETWEEN_NOT_POSITIVE: 'distBetween is not positive.',
  HALF_WIDTH_NOT_POSITIVE: 'halfWidth is not positive.',
} as const;
