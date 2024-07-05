// Layer
export {Layer} from './ClassLayer.js';

// Property & PropertyRecord
export {
  type CategoricalProperty,
  type NumericalProperty,
  type Property,
  type PropertyRecord,
  PropertySpecialKeys,
} from './property.js';

export {
  createDesignWeightProperty,
  createDistanceProperty,
  createParentProperty,
  mergePropertyRecords,
} from './propertyUtils.js';
