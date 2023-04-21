import {pointInSinglePolygon} from './pointInPolygon.js';
//import {distance} from './distance.js';
//import {intermediate} from './intermediate.js';
import {intersectSegments} from './intersectSegments.js';
import {toFeature} from './toFeature.js';

type sortArrayElement = [GeoJSON.Position, number];

// IntersectSegments can be replaced by intersectGreatCircleSegments
// if we want to treat segments as geodesics.

// Internal. Can be replaced by distance if we want to treat
// segments as geodesics.
const squaredEuclideanDistOnSegment = (
  p1: GeoJSON.Position,
  p2: GeoJSON.Position,
): number => {
  const dx = p1[0] - p2[0];
  const dy = p1[1] - p2[1];
  return dx * dx + dy * dy;
};

// Internal. Can be replaced by intermediate if we want to treat
// segments as geodesics.
const midpoint = (
  p1: GeoJSON.Position,
  p2: GeoJSON.Position,
): GeoJSON.Position => {
  return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
};

// Internal. This function returns all intersection points between a
// line segment and a polygon. Returns empty array if no
// intersections.
const lineSegmentPolygonIntersectPoints = (
  segment: GeoJSON.Position[],
  polygon: GeoJSON.Position[][],
): GeoJSON.Position[] => {
  let p: GeoJSON.Position[] = [],
    q,
    i,
    j;
  for (i = 0; i < polygon.length; i++) {
    for (j = 0; j < polygon[i].length - 1; j++) {
      q = intersectSegments(segment, [
        [polygon[i][j][0], polygon[i][j][1]],
        [polygon[i][j + 1][0], polygon[i][j + 1][1]],
      ]);
      if (q.point) {
        //console.log(q.point);
        p.push(q.point);
      }
    }
  }
  return p;
};

// Internal. This function returns coordinates array of (multi-)line
// in polygon (intersection). An empty array is returned
// if no intersection.
const lineStringInPolygon = (
  line: GeoJSON.Position[],
  polygon: GeoJSON.Position[][],
): GeoJSON.Position[][] => {
  // 1. Build new linestring with all intersection-points added in order.
  let points: GeoJSON.Position[] = [],
    i = 0,
    j = 0,
    intersectionpoints: GeoJSON.Position[] = [];
  for (i = 0; i < line.length - 1; i++) {
    points.push([...line[i]]);
    intersectionpoints = lineSegmentPolygonIntersectPoints(
      [line[i], line[i + 1]],
      polygon,
    );
    if (intersectionpoints.length > 0) {
      // Sort and add/push points here.
      let sortArray: sortArrayElement[] = intersectionpoints
        .map(
          (v: GeoJSON.Position): sortArrayElement => [
            v,
            squaredEuclideanDistOnSegment(v, line[i]),
          ],
        )
        .sort((a, b) => a[1] - b[1]);
      const maxSqDist = squaredEuclideanDistOnSegment(line[i], line[i + 1]);
      for (j = 0; j < sortArray.length; j++) {
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
  let mls = [],
    ls = [],
    mp: GeoJSON.Position = [],
    pushed = -1;
  for (i = 0; i < points.length - 1; i++) {
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
  line: GeoJSON.Position[][],
  polygon: GeoJSON.Position[][][],
) => {
  let mls: GeoJSON.Position[][] = [],
    part,
    i,
    j;
  for (i = 0; i < line.length; i++) {
    for (j = 0; j < polygon.length; j++) {
      part = lineStringInPolygon(line[i], polygon[j]);
      if (part.length > 0) {
        mls = mls.concat(part);
      }
    }
  }
  return mls;
};

interface Intersect {
  intersection: boolean;
  geoJSON?: GeoJSON.Feature;
}

/**
 * Computes the intersection between a GeoJSON LineString/MultiLineString Feature
 * and a GeoJSON Polygon/MultiPolygon Feature.
 *
 * @param lineFeature - A geoJSON Feature with geometry type: LineString | MultiLineString.
 * @param polygonFeature - A geoJSON Feature with geometry type: Polygon | MultiPolygon.
 * @returns - An intersect object conatining intersection:true/false and geoJSON if intersection is true.
 */
export const intersectLinePolygonFeatures = (
  lineFeature: GeoJSON.Feature,
  polygonFeature: GeoJSON.Feature,
): Intersect => {
  const lfg = lineFeature.geometry;
  const pfg = polygonFeature.geometry;
  if (lfg.type !== 'LineString' && lfg.type !== 'MultiLineString') {
    throw new Error(
      'Argument lineFeature do not have a geometry of type LineString or MultiLineString.',
    );
  }
  if (pfg.type !== 'Polygon' && pfg.type !== 'MultiPolygon') {
    throw new Error(
      'Argument polygonFeature do not have a geometry of type Polygon or MultiPolygon.',
    );
  }

  const lCoords =
    lfg.type === 'LineString' ? [lfg.coordinates] : lfg.coordinates;
  const pCoords = pfg.type === 'Polygon' ? [pfg.coordinates] : pfg.coordinates;
  const newCoords = multiLineStringInMultiPolygon(lCoords, pCoords);

  if (newCoords.length === 0) {
    return {intersection: false};
  }
  if (newCoords.length === 1) {
    return {
      intersection: true,
      geoJSON: toFeature(
        {
          type: 'LineString',
          coordinates: newCoords[0],
        },
        {copy: false},
      ),
    };
  }
  return {
    intersection: true,
    geoJSON: toFeature(
      {
        type: 'MultiLineString',
        coordinates: newCoords,
      },
      {copy: false},
    ),
  };
};
