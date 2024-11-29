export const CollectError = {
  // collect general
  EXPECTED_AREA: 'collect-error-collection-is-not-area',
  EXPECTED_LINE: 'collect-error-collection-is-not-line',
  EXPECTED_POINT: 'collect-error-collection-is-not-point',
  COLLECTION_MISSING: 'collect-error-collection-is-missing',
  BASE_COLLECTION_NOT_AREA: 'collect-error-base-collection-is-not-area',
  BASE_COLLECTION_NOT_AREA_OR_LINE: 'collect-error-base-collection-is-not-area-or-line',
  BASE_COLLECTION_MISSING: 'collect-error-collection-is-missing',

  // collect properties
  PROPERTY_CONFLICT: 'collect-error-property-already-exists',
  PROPERTY_MISSING: 'collect-error-property-is-missing',
  PROPERTY_NOT_NUMERICAL: 'collect-error-property-not-numerical',
} as const;
