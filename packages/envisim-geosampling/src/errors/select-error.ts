import {type ErrorType} from './utils.js';

export const SELECT_ERROR_LIST = {
  // select general
  EXPECTED_AREA: 'select-error-collection-is-not-area',
  EXPECTED_LINE: 'select-error-collection-is-not-line',
  EXPECTED_POINT: 'select-error-collection-is-not-point',
  COLLECTION_MISSING: 'select-error-collection-is-missing',
  BASE_COLLECTION_EXPECTED_AREA: 'select-error-base-collection-is-not-area',
  BASE_COLLECTION_EXPECTED_LINE: 'select-error-base-collection-is-not-line',
  BASE_COLLECTION_EXPECTED_POINT: 'select-error-base-collection-is-not-line',
} as const;

export type SelectError = ErrorType<typeof SELECT_ERROR_LIST>;
