import {pointInSinglePolygon} from './pointInPolygon.js';
import {intersectSegments} from './intersectSegments.js';
import {AreaFeature} from './geojson/areas/ClassAreaFeature.js';
import {AreaObject} from './geojson/areas/AreaObjects.js';
import {LineFeature} from './geojson/lines/ClassLineFeature.js';
import {LineString} from './geojson/lines/ClassLineString.js';
import {MultiLineString} from './geojson/lines/ClassMultiLineString.js';
import {bboxInBBox} from './bbox.js';
import type * as GJ from './geojson/types.js';

type sortArrayElement = [GJ.Position, number];

// IntersectSegments can be replaced by intersectGreatCircleSegments
// if we want to treat segments as geodesics.

// Internal. Can be replaced by distance if we want to treat
// segments as geodesics.
const squaredEuclideanDistOnSegment = (
  p1: GJ.Position,
  p2: GJ.Position,
): number => {
  const dx = p1[0] - p2[0];
  const dy = p1[1] - p2[1];
  return dx * dx + dy * dy;
};

// Internal. Can be replaced by intermediate if we want to treat
// segments as geodesics.
const midpoint = (p1: GJ.Position, p2: GJ.Position): GJ.Position => {
  return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
};

// Internal. This function returns all intersection points between a
// line segment and a polygon. Returns empty array if no
// intersections.
const lineSegmentPolygonIntersectPoints = (
  segment: GJ.Position[],
  polygon: GJ.Position[][],
): GJ.Position[] => {
  let p: GJ.Position[] = [];
  let q;
  for (let i = 0; i < polygon.length; i++) {
    for (let j = 0; j < polygon[i].length - 1; j++) {
      q = intersectSegments(segment, [
        [polygon[i][j][0], polygon[i][j][1]],
        [polygon[i][j + 1][0], polygon[i][j + 1][1]],
      ]);

      if (q) {
        p.push(q);
      }
    }
  }
  return p;
};

// Internal. This function returns coordinates array of (multi-)line
// in polygon (intersection). An empty array is returned
// if no intersection.
const lineStringInPolygon = (
  line: GJ.Position[],
  polygon: GJ.Position[][],
): GJ.Position[][] => {
  // 1. Build new linestring with all intersection-points added in order.
  let points: GJ.Position[] = [];
  let intersectionpoints: GJ.Position[] = [];
  for (let i = 0; i < line.length - 1; i++) {
    points.push([...line[i]]);
    intersectionpoints = lineSegmentPolygonIntersectPoints(
      [line[i], line[i + 1]],
      polygon,
    );

    if (intersectionpoints.length > 0) {
      // Sort and add/push points here.
      let sortArray: sortArrayElement[] = intersectionpoints
        .map(
          (v: GJ.Position): sortArrayElement => [
            v,
            squaredEuclideanDistOnSegment(v, line[i]),
          ],
        )
        .sort((a, b) => a[1] - b[1]);
      const maxSqDist = squaredEuclideanDistOnSegment(line[i], line[i + 1]);
      for (let j = 0; j < sortArray.length; j++) {
        const sqDist = sortArray[j][1];
        // Make sure not to add points equal to segment points.
        if (sqDist > 0 && sqDist < maxSqDist) {
          points.push(sortArray[j][0]);
        }
      }
    }
  }
  // Add last point.
  points.push([...line[line.length - 1]]);
  // 2. Check each midpoint for in/out and build new (multi-)linestring.
  let mls = [];
  let ls = [];
  let mp = [];
  let pushed = -1;

  for (let i = 0; i < points.length - 1; i++) {
    mp = midpoint(points[i], points[i + 1]);

    if (pointInSinglePolygon(mp, polygon)) {
      // This segment is in the Polygon.
      if (pushed < i) {
        ls.push(points[i]);
      }
      ls.push(points[i + 1]);
      pushed = i + 1;
    } else if (pushed === i) {
      // Previous segment was in, but not this one. This ends a linestring.
      // Push linestring to mls and clear linestring.
      mls.push(ls);
      ls = [];
    }
  }
  if (pushed === points.length - 1) {
    // The final segment was in, but the linestring has not been pushed yet.
    mls.push(ls);
  }
  return mls;
};

// Internal. Helper function for possible multi-geometries.
// Returns array of coordinates for MultiLineString
// inside MultiPolygon (intersection). Empty array if no intersection.
const multiLineStringInMultiPolygon = (
  line: GJ.Position[][],
  polygon: GJ.Position[][][],
) => {
  let mls: GJ.Position[][] = [];
  let part;

  for (let i = 0; i < line.length; i++) {
    for (let j = 0; j < polygon.length; j++) {
      part = lineStringInPolygon(line[i], polygon[j]);

      if (part.length > 0) {
        mls = mls.concat(part);
      }
    }
  }
  return mls;
};

/**
 * Computes the intersection between a LineFeature
 * and an AreaFeature.
 *
 * @param lineFeature - A LineFeature.
 * @param areaFeature - An AreaFeature.
 * @param pointsPerCircle - Optional number of points to use in intersects with circles, default 16.
 * @returns - null if no intersection and LineFeature if intersection.
 */
export const intersectLineAreaFeatures = (
  lineFeature: GJ.LineFeature,
  areaFeature: GJ.AreaFeature,
  pointsPerCircle: number = 16,
): LineFeature | null => {
  const lf = LineFeature.isFeature(lineFeature)
    ? lineFeature
    : new LineFeature(lineFeature);
  const af = AreaFeature.isFeature(areaFeature)
    ? areaFeature
    : new AreaFeature(areaFeature);

  const box1 = lf.getBBox();
  const box2 = af.getBBox();
  if (!bboxInBBox(box1, box2)) {
    return null;
  }

  // Build MultiLineString coordinates for LineFeature
  let mls: GJ.Position[][] = [];
  lf.geomEach((lg: GJ.LineObject) => {
    if (lg.type === 'LineString') {
      mls.push(lg.coordinates);
    } else {
      mls.push(...lg.coordinates);
    }
  });

  // Build MultiPolygon coordinates for AreaFeature
  let mp: GJ.Position[][][] = [];
  af.geomEach((ag: AreaObject) => {
    switch (ag.type) {
      case 'Polygon':
        mp.push(ag.coordinates);
        break;
      case 'MultiPolygon':
        mp.push(...ag.coordinates);
        break;
      case 'Point':
        mp.push(ag.toPolygon({pointsPerCircle}).coordinates);
        break;
      case 'MultiPoint':
        mp.push(...ag.toPolygon({pointsPerCircle}).coordinates);
        break;
    }
  });

  const newCoords = multiLineStringInMultiPolygon(mls, mp);

  if (newCoords.length === 0) {
    return null;
  }
  if (newCoords.length === 1) {
    return LineFeature.create(LineString.create(newCoords[0]), {});
  }
  return LineFeature.create(MultiLineString.create(newCoords), {});
};
