// GeoJSON
export * from './geojson/index.js';

// Types
export type {
  ICategoricalProperty,
  INumericalProperty,
  IProperty,
  IPropertyRecord,
} from './types/property.js';

export type * as GeoJSON from './geojson/types.js';

// Utils
export {copy} from './copy.js';
export * from './position.js';

export {areaOfPolygonLonLat} from './area.js';
export {pointInBBox, bboxInBBox, bbox4} from './bbox.js';
export {buffer} from './buffer.js';
export {destination} from './destination.js';
export {distance} from './distance.js';
export {distancePositionToSegment} from './distancePositionToSegment.js';
export {forwardAzimuth} from './forwardAzimuth.js';
export {intermediate} from './intermediate.js';
export {intersectLineLineFeatures} from './intersectLineLineFeatures.js';
export {intersectLineAreaFeatures} from './intersectLineAreaFeatures.js';
export {intersectAreaAreaFeatures} from './intersectAreaAreaFeatures.js';
export {intersectPointAreaFeatures} from './intersectPointAreaFeatures.js';
export {intersectSegments} from './intersectSegments.js';
export {lengthOfLineString, lengthOfSegment} from './length.js';
export {pointInAreaFeature, pointInAreaGeometry} from './pointInPolygon.js';
export {pointInSinglePolygonPosition} from './pointInPolygonPosition.js';
export {rotateCoord} from './rotateCoord.js';
export {unionOfPolygons} from './unionOfPolygons.js';
export * as geodesic from 'geographiclib-geodesic';
