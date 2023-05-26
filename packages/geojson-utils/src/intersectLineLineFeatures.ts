import {bboxInBBox} from './bbox.js';
import {intersectSegments} from './intersectSegments.js';
import type * as GJ from './geojson/types.js';
import {LineFeature} from './geojson/lines/ClassLineFeature.js';
import {Point} from './geojson/points/ClassPoint.js';
import {MultiPoint} from './geojson/points/ClassMultiPoint.js';
import {PointFeature} from './geojson/points/ClassPointFeature.js';

/**
 * Computes the intersect of two LineFeatures as
 * the crossing-points between the lines in the two features.
 *
 * @param firstFeature - A LineFeature.
 * @param secondFeature - A LineFeature.
 * @returns - null if no crossings and PointFeature if intersection.
 */
export const intersectLineLineFeatures = (
  firstFeature: GJ.LineFeature,
  secondFeature: GJ.LineFeature,
): PointFeature | null => {
  const f1 = LineFeature.isFeature(firstFeature)
    ? firstFeature
    : new LineFeature(firstFeature);
  const f2 = LineFeature.isFeature(secondFeature)
    ? secondFeature
    : new LineFeature(secondFeature);

  const points: GJ.Position[] = [];
  const box1 = f1.getBBox();
  const box2 = f2.getBBox();

  if (bboxInBBox(box1, box2)) {
    f1.geomEach((g1: GJ.LineObject) => {
      f2.geomEach((g2: GJ.LineObject) => {
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
  }

  if (points.length === 0) {
    return null;
  }

  if (points.length === 1) {
    return PointFeature.create(Point.create(points[0]), {});
  }

  return PointFeature.create(MultiPoint.create(points), {});
};
