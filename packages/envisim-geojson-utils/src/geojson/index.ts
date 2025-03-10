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
  type PureObject,
  type IncreasingObject,
  type DecreasingObject,
  type RetractingObject,
} from './objects/index.js';

// Features
export {Feature} from './class-feature.js';

// FeatureCollections
export {FeatureCollection} from './class-feature-collection.js';

// PropertyRecord
export {
  type CategoricalProperty,
  type NumericalProperty,
  type Property,
  type PropertyList,
  type SpecialPropertyNames,
  type FeatureProperties,
  PropertyRecord,
} from './property-record.js';

// GeometricPrimitive
export {
  GeometricPrimitive,
  getGeometryPrimitive,
  isGeometryPrimitive,
  getFeaturePrimitive,
  getCollectionPrimitive,
} from './geometric-primitive/index.js';
