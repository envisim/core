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
export {Feature, type PureFeature} from './features/index.js';

// FeatureCollections
export {FeatureCollection, type PureCollection} from './collections/index.js';

// PropertyRecord
export {
  type CategoricalProperty,
  type NumericalProperty,
  type Property,
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
