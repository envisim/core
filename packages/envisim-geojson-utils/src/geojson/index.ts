// Objects
export {
  // Areas
  Polygon,
  MultiPolygon,
  Circle,
  MultiCircle,
  type AreaObject,
  // Lines
  LineString,
  MultiLineString,
  type LineObject,
  // Points
  Point,
  MultiPoint,
  type PointObject,
  // Transform
  toAreaObject,
  toLineObject,
  toPointObject,
} from './objects/index.js';

// Features
export {Feature} from './features/index.js';

// FeatureCollections
export {FeatureCollection} from './collections/index.js';

// PropertyRecord
export {
  type CategoricalProperty,
  type NumericalProperty,
  type Property,
  type PropertyRecord,
  PropertySpecialKeys,
  createDesignWeightProperty,
  createDistanceProperty,
  createParentProperty,
  mergePropertyRecords,
} from './property-record.js';

// GeometricPrimitive
export {
  GeometricPrimitive,
  getGeometryPrimitive,
  isGeometryPrimitive,
  getFeaturePrimitive,
  getCollectionPrimitive,
} from './geometric-primitive/index.js';
