export const CollectError = {
  // collect general
  LAYER_IS_NOT_AREA: 'Collecting layer must be of type area.',
  LAYER_IS_NOT_LINE: 'Collecting layer must be of type line.',
  LAYER_IS_NOT_POINT: 'Collecting layer must be of type point.',
  BASE_LAYER_IS_NONE: 'Base layer cannot be of type none.',
  BASE_LAYER_IS_NOT_AREA: 'Base layer must be of type area.',
  BASE_LAYER_IS_NOT_AREA_OR_LINE: 'Base layer must be of type area or line.',

  // collect properties
  PROPERTY_EXISTS: 'Property to collect already exists in layer.',
  PROPERTY_DONT_EXIST: 'Property to collect does not exist in base layer.',
  PROPERTY_NOT_NUMERICAL: 'Property to collect must be numerical.',
} as const;
