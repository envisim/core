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
//export * as distance from './distance.js';
export * from './feature.js';
export * from './position.js';

export {area} from './area.js';
export {bbox, pointInBbox, bboxInBbox, addBboxes} from './bbox.js';
export {buffer} from './buffer.js';
export {count} from './count.js';
export {destination} from './destination.js';
export {distance} from './distance.js';
export {distancePointToLine} from './distancePointToLine.js';
export {distancePointToPolygon} from './distancePointToPolygon.js';
export {distancePointToSegment} from './distancePointToSegment.js';
export {flatten} from './flatten.js';
export {forwardAzimuth} from './forwardAzimuth.js';
export {geomEach} from './geomEach.js';
export {intermediate} from './intermediate.js';
export {intersectLineLineFeatures} from './intersectLineLineFeatures.js';
export {intersectLinePolygonFeatures} from './intersectLinePolygonFeatures.js';
export {intersectPolygonPolygonFeatures} from './intersectPolygonPolygonFeatures.js';
export {
  intersectSegments,
  intersectGreatCircleSegments,
} from './intersectSegments.js';
export {length} from './length.js';
export {maxSegmentLength} from './maxSegmentLength.js';
export {
  pointInPolygon,
  pointInSinglePolygon,
  pointInPolygonSpherical,
  pointInSinglePolygonSpherical,
} from './pointInPolygon.js';
export {webMercator, azimuthalEquidistant, cartesian} from './projections.js';
export {rotateCoord} from './rotateCoord.js';
export {segmentEach} from './segmentEach.js';
export {summaryOfTypes} from './summaryOfTypes.js';
export {toFeature} from './toFeature.js';
export {toFeatureCollection} from './toFeatureCollection.js';
export {unionOfPolygons} from './unionOfPolygons.js';
export * as geodesic from 'geographiclib-geodesic';
