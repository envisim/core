// GeoJSON
export * from './geojson/index.js';

// Layer
export {Layer} from './layer/ClassLayer.js';

// Types
export type * as GeoJSON from './types/geojson.js';
export * as typeGuards from './types/type-guards.js';
export {
  type ICategoricalProperty,
  type INumericalProperty,
  type IProperty,
  type IPropertyRecord,
  PropertySpecialKeys,
} from './types/property.js';

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
export {
  bbox4,
  bboxFromPositions,
  bboxInBBox,
  pointInBBox,
  unionOfBBoxes,
} from './utils/bbox.js';
export {Geodesic} from './utils/Geodesic.js';
export {Rhumb} from './utils/Rhumb.js';
export {PlateCarree} from './utils/PlateCarree.js';
export {distancePositionToSegment} from './utils/distancePositionToSegment.js';
export {intersectSegments, Segment} from './utils/intersectSegments.js';
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
export {buffer} from './buffer.js';
export {intersectLineLineFeatures} from './intersectLineLineFeatures.js';
export {intersectLineAreaFeatures} from './intersectLineAreaFeatures.js';
export {intersectAreaAreaFeatures} from './intersectAreaAreaFeatures.js';
export {intersectPointAreaFeatures} from './intersectPointAreaFeatures.js';
export {pointInAreaFeature, pointInAreaGeometry} from './pointInPolygon.js';
export {unionOfPolygons} from './unionOfPolygons.js';
