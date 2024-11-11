// GeoJSON
export * from './geojson/index.js';

// Types
export type * as GeoJSON from './types/geojson.js';
export * as typeGuards from './types/type-guards.js';

// Utils
export {Geodesic} from './utils/class-geodesic.js';
export {Rhumb} from './utils/class-rhumb.js';
export {PlateCarree} from './utils/class-plate-carree.js';

export {areaOfPolygonLonLat} from './utils/area.js';
export {bbox4, bboxFromPositions, bboxInBBox, pointInBBox, unionOfBBoxes} from './utils/bbox.js';
export {type CirclesToPolygonsOptions} from './utils/circles-to-polygons.js';
export {lengthOfLineString} from './utils/length.js';
export {pointInSinglePolygonPosition} from './utils/point-in-polygon.js';
export {
  checkInRange,
  checkLongitudeInRange,
  longitudeDistance,
  longitudeCenter,
  normalizeLongitude,
} from './utils/position.js';
export {rotateCoord} from './utils/rotate-coord.js';
export {cutLineGeometry, cutAreaGeometry} from './utils/antimeridian.js';

// Dependent
export {
  intersectAreaAreaGeometries,
  intersectLineAreaGeometries,
  intersectLineLineGeometries,
  intersectPointAreaGeometries,
} from './intersect/index.js';
export {perimeter} from './perimeter.js';
export {unionOfCollection as unionOfPolygons} from './union-of-polygons.js';
