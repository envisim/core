import type * as GJ from './types/geojson.js';
import {
  LineFeature,
  LineObject,
  MultiPoint,
  Point,
  PointFeature,
} from './geojson/index.js';
import {bboxInBBox} from './utils/bbox.js';
import {intersectSegments} from './utils/intersectSegments.js';

/**
 * Computes the intersect of two LineFeatures as
 * the crossing-points between the lines in the two features.
 *
 * @param feature1
 * @param feature2
 * @returns `null` if no crossings and PointFeature if intersection.
 */
export function intersectLineLineFeatures(
  feature1: LineFeature,
  feature2: LineFeature,
): PointFeature | null {
  const points: GJ.Position[] = [];

  // early return if bboxes doesn't overlap
  if (!bboxInBBox(feature1.geometry.getBBox(), feature2.geometry.getBBox()))
    return null;

  feature1.geomEach((g1: LineObject) => {
    feature2.geomEach((g2: LineObject) => {
      const coords1 =
        g1.type === 'LineString' ? [g1.coordinates] : g1.coordinates;
      const coords2 =
        g2.type === 'LineString' ? [g2.coordinates] : g2.coordinates;

      // Now we have coordinates for two MultiLineStrings.
      // Go thru all segments to find possible intersection points.
      coords1.forEach((line1) => {
        coords2.forEach((line2) => {
          for (let i = 0; i < line1.length - 1; i++) {
            for (let j = 0; j < line2.length - 1; j++) {
              const intersection = intersectSegments(
                [line1[i], line1[i + 1]],
                [line2[j], line2[j + 1]],
              );

              if (intersection) {
                points.push(intersection);
              }
            }
          }
        });
      });
    });
  });

  if (points.length === 0) {
    return null;
  }

  if (points.length === 1) {
    return PointFeature.create(Point.create(points[0], true), {}, true);
  }

  return PointFeature.create(MultiPoint.create(points, true), {}, true);
}
