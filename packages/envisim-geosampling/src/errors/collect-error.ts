/**
 * @enum
 */
export const COLLECT_ERROR_LIST = {
  // collect general
  LINE_EXPECTS_AREA: "collect-error-line-expects-area",
  POINT_EXPECTS_AREA: "collect-error-point-expects-area",
  BASE_COLLECTION_MISSING: "collect-error-collection-is-missing",

  // collect properties
  PROPERTY_ID_COLLISION: "collect-error-property-is-missing",
  PROPERTY_MISSING: "collect-error-property-is-missing",
  PROPERTY_NOT_NUMERICAL: "collect-error-property-not-numerical",
} as const;

export type CollectError = (typeof COLLECT_ERROR_LIST)[keyof typeof COLLECT_ERROR_LIST] | null;
