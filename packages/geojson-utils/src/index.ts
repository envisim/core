/**
 * @module geojson-utils
 */

// Types
export type {TCollectionType} from './types/collection.js';
export type {
  ICategoricalProperty,
  INumericalProperty,
  IProperty,
  IPropertyRecord,
} from './types/property.js';

// Utils
export {copy} from './copy.js';
export * from './collection.js';
export * as distance from './distance.js';
export * from './feature.js';
export * from './position.js';
