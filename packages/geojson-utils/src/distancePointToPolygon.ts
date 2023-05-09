import {distancePointToSegment} from './distancePointToSegment.js';
import {pointInPolygon} from './pointInPolygon.js';
import {segmentEach} from './segmentEach.js';
import type * as GJ from './geojson/types.js';

// TODO: convert PointCircle or MultiPointCircle to Polygon/MultiPolygon
// or deal with it in some other way. Also AreaGeometryCollection...

/**
 * Computes the shortest distance from a PointFeature
 * to an AreaFeature.
 *
 * @param point - A PointFeature.
 * @param polygon - An AreaFeature.
 * @returns - The distance between the point and the area. Negative if point is inside area.
 */
export const distancePointToPolygon = (
  point: GJ.PointFeature,
  polygon: GJ.AreaFeature,
): number => {
  if (point.geometry.type !== 'Point') {
    throw new Error('Type Point is required for geometry of point Feature.');
  }
  if (
    polygon.geometry.type !== 'Polygon' &&
    polygon.geometry.type !== 'MultiPolygon'
  ) {
    throw new Error(
      'Type Polygon or MultiPolygon is required for geometry of polygon Feature.',
    );
  }
  let d = Infinity;
  const coords = point.geometry.coordinates;
  segmentEach(polygon, (segment: GJ.Position[]) => {
    d = Math.min(d, distancePointToSegment(coords, segment));
  });
  if (pointInPolygon(point, polygon)) {
    return -d;
  } else {
    return d;
  }
};
