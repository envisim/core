export const CollectError = {
  // collect general
  LAYER_IS_NOT_AREA: 'collect-error-layer-is-not-area',
  LAYER_IS_NOT_LINE: 'collect-error-layer-is-not-line',
  LAYER_IS_NOT_POINT: 'collect-error-layer-is-not-point',
  BASE_LAYER_IS_NONE: 'collect-error-base-layer-is-none',
  BASE_LAYER_IS_NOT_AREA: 'collect-error-base-layer-is-not-area',
  BASE_LAYER_IS_NOT_AREA_OR_LINE:
    'collect-error-base-layer-is-not-area-or-line',

  // collect properties
  PROPERTY_EXISTS: 'collect-error-property-exists',
  PROPERTY_DONT_EXIST: 'collect-error-property-does-not-exist',
  PROPERTY_NOT_NUMERICAL: 'collect-error-property-not-numerical',
} as const;
