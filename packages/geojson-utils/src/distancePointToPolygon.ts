import {distancePointToSegment} from './distancePointToSegment.js';
import {pointInPolygon} from './pointInPolygon.js';
import {segmentEach} from './segmentEach.js';

/**
 * Computes the shortest distance from a GeoJSON Feature with geometry type Point
 * to a GeoJSON Feature with geometry type Polygon or MultiPolygon.
 *
 * @param point - A GeoJSON Feature with geometry type Point.
 * @param polygon - A GeoJSON Feature with geometry type Polygon or MultiPolygon.
 * @returns - The distance between the point and the polygon. Negative if point is inside polygon.
 */
export const distancePointToPolygon = (
  point: GeoJSON.Feature,
  polygon: GeoJSON.Feature,
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
  segmentEach(polygon, (segment: GeoJSON.Position[]) => {
    d = Math.min(d, distancePointToSegment(coords, segment));
  });
  if (pointInPolygon(point, polygon)) {
    return -d;
  } else {
    return d;
  }
};
