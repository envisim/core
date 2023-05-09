import {distancePointToSegment} from './distancePointToSegment.js';
import {segmentEach} from './segmentEach.js';
import type * as GJ from './geojson/types.js';
/**
 * Computes the shortest distance from a point to a line.
 *
 * @param point - A PointFeature.
 * @param line - A LineFeature.
 * @returns - The distance between the point and the line in meters.
 */
export const distancePointToLine = (
  point: GJ.PointFeature,
  line: GJ.LineFeature,
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
  segmentEach(line, (segment: GJ.Position[]) => {
    d = Math.min(d, distancePointToSegment(coords, segment));
  });
  return d;
};
