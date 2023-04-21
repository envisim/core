import {distancePointToSegment} from './distancePointToSegment.js';
import {segmentEach} from './segmentEach.js';

/**
 * Computes the shortest distance from a GeoJSON Feature with geometry type Point
 * to a GeoJSON Feature with geometry type LineString or MultiLineString.
 *
 * @param point - A GeoJSON Feature with geometry type Point.
 * @param line - A GeoJSON Feature with geometry type LineString or MultiLineString.
 * @returns - The distance between the point and the line in meters.
 */
export const distancePointToLine = (
  point: GeoJSON.Feature,
  line: GeoJSON.Feature,
): number => {
  if (point.geometry.type !== 'Point') {
    throw new Error('Type Point is required for geometry of point Feature.');
  }
  if (
    line.geometry.type !== 'LineString' &&
    line.geometry.type !== 'MultiLineString'
  ) {
    throw new Error(
      'Type LineString or MultiLineString is required for geometry of line Feature.',
    );
  }
  let d = Infinity;
  const coords = point.geometry.coordinates;
  segmentEach(line, (segment: GeoJSON.Position[]) => {
    d = Math.min(d, distancePointToSegment(coords, segment));
  });
  return d;
};
