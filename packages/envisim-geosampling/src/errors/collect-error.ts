import {type ErrorType} from './utils.js';

export const COLLECT_ERROR_LIST = {
  // collect general
  LINE_EXPECTS_AREA_LINE: 'collect-error-line-expects-area-line',
  POINT_EXPECTS_AREA: 'collect-error-point-expects-area',
  BASE_COLLECTION_MISSING: 'collect-error-collection-is-missing',

  // collect properties
  PROPERTY_ID_COLLISION: 'collect-error-property-is-missing',
  PROPERTY_MISSING: 'collect-error-property-is-missing',
  PROPERTY_NOT_NUMERICAL: 'collect-error-property-not-numerical',
} as const;

export type CollectError = ErrorType<typeof COLLECT_ERROR_LIST>;
