/**
 * @module @envisim/geojson
 */

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
  type PrimitiveOfObject,
  type ObjectOfPrimitive,
} from "./objects/index.js";

// Features
export { Feature } from "./class-feature.js";

// FeatureCollections
export {
  FeatureCollection,
  type FeatureCollectionExtrasJson,
  type ForEachCallback,
  type StrippedFeatureCollectionJson,
  perimeter,
  convexHull,
  union,
} from "./collection/index.js";

export {
  intersectAreaAreaGeometries,
  intersectLineAreaGeometries,
  intersectLineLineGeometries,
  intersectPointAreaGeometries,
} from "./intersect/index.js";

// PropertyRecord
export {
  type CategoricalProperty,
  type NumericalProperty,
  type Property,
  type PropertyList,
  SPECIAL_KEYS,
  type SpecialPropertyNames,
  type SpecialFeatureProperties,
  type FeatureProperties,
  PropertyRecord,
} from "./property-record.js";

// Utils
export { type CirclesToPolygonsOptions } from "./utils/circles-to-polygons.js";
export { type BufferOptions } from "./buffer/index.js";
