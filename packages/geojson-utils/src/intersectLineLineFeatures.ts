import {bbox, bboxInBbox} from './bbox.js';
import {intersectSegments} from './intersectSegments.js';
import {toFeature} from './toFeature.js';

interface Intersect {
  intersection: boolean;
  geoJSON?: GeoJSON.Feature;
}

/**
 * Computes the intersect of features containing LineString/MultiLineString as
 * the crossing-points between the lines in the two features.
 * Returns {intersection:false} if no crossings and {intersection:true, geoJSON}
 * if intersection. Then geoJSON is a Feature with Point/MultiPoint geometry.
 *
 * @param firstFeature - A Feature containing LineString/MultiLineString geometry.
 * @param secondFeature - A Feature containing LineString/MultiLineString geometry.
 * @returns - An intersect object.
 */
export const intersectLineLineFeatures = (
  firstFeature: GeoJSON.Feature,
  secondFeature: GeoJSON.Feature,
): Intersect => {
  const g1 = firstFeature.geometry;
  const g2 = secondFeature.geometry;
  if (g1.type !== 'LineString' && g1.type !== 'MultiLineString') {
    throw new Error(
      'Geometry type for firstFeature must be LineString or MultiLineString.',
    );
  }
  if (g2.type !== 'LineString' && g2.type !== 'MultiLineString') {
    throw new Error(
      'Geometry type for secondFeature must be LineString or MultiLineString.',
    );
  }
  const points: GeoJSON.Position[] = [];
  const box1 = firstFeature.bbox || bbox(firstFeature);
  const box2 = secondFeature.bbox || bbox(secondFeature);

  if (bboxInBbox(box1, box2)) {
    const coords1 =
      g1.type === 'LineString' ? [g1.coordinates] : g1.coordinates;
    const coords2 =
      g2.type === 'LineString' ? [g2.coordinates] : g2.coordinates;
    // Now we have coordinates for two MultiLineStrings.
    // Go thru all segments to find possible intersection points.
    coords1.forEach(line1 => {
      coords2.forEach(line2 => {
        for (let i = 0; i < line1.length - 1; i++) {
          for (let j = 0; j < line2.length - 1; j++) {
            const intersect = intersectSegments(
              [line1[i], line1[i + 1]],
              [line2[j], line2[j + 1]],
            );
            if (intersect.point) {
              points.push(intersect.point);
            }
          }
        }
      });
    });
  }
  if (points.length === 0) {
    return {intersection: false};
  }
  if (points.length === 1) {
    return {
      intersection: true,
      geoJSON: toFeature(
        {
          type: 'Point',
          coordinates: points[0],
        },
        {copy: false},
      ),
    };
  }
  return {
    intersection: true,
    geoJSON: toFeature(
      {
        type: 'MultiPoint',
        coordinates: points,
      },
      {copy: false},
    ),
  };
};
