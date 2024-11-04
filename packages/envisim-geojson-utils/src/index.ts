// GeoJSON
export * from './geojson/index.js';

// Layer
export {
  Layer,
  mergePropertyRecords,
  type CategoricalProperty,
  type NumericalProperty,
  type Property,
  type PropertyRecord,
  PropertySpecialKeys,
  createDesignWeightProperty,
  createDistanceProperty,
  createParentProperty,
} from './layer/index.js';

// Types
export type * as GeoJSON from './types/geojson.js';
export * as typeGuards from './types/type-guards.js';

// GeometricPrimitive
export {
  GeometricPrimitive,
  getGeometryPrimitive,
  isGeometryPrimitive,
  getFeaturePrimitive,
  getCollectionPrimitive,
} from './geometric-primitive/index.js';

// Utils
export {areaOfPolygonLonLat} from './utils/area.js';
export {bbox4, bboxFromPositions, bboxInBBox, pointInBBox, unionOfBBoxes} from './utils/bbox.js';
export {Geodesic} from './utils/Geodesic.js';
export {Rhumb} from './utils/Rhumb.js';
export {PlateCarree} from './utils/PlateCarree.js';
export {distancePositionToSegment} from './utils/distancePositionToSegment.js';
export {lengthOfLineString} from './utils/length.js';
export {pointInSinglePolygonPosition} from './utils/pointInPolygonPosition.js';
export {
  checkInRange,
  checkLongitudeInRange,
  longitudeDistance,
  longitudeCenter,
  normalizeLongitude,
} from './utils/position.js';
export {rotateCoord} from './utils/rotateCoord.js';
export {cutLineGeometry, cutAreaGeometry} from './utils/antimeridian.js';

// Dependent
export {
  intersectAreaAreaGeometries,
  intersectLineAreaGeometries,
  intersectLineLineGeometries,
  intersectPointAreaGeometries,
} from './intersect/index.js';

export {pointInAreaGeometry} from './point-in-polygon.js';
export {unionOfCollection as unionOfPolygons} from './union-of-polygons.js';
