import {pointInSinglePolygon} from './pointInPolygon.js';
import {intermediatePoint} from './distance.js';
import {intersectSegments} from './intersectSegments.js';

type sortArrayElement = [GeoJSON.Position, number];

// This function returns all intersection points between a
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
        p.push(q.point);
      }
    }
  }
  return p;
};

// This function returns coordinates array of (multi-)line
// in polygon (intersection). An empty array is returned
// if no intersection.
// NOTE: Passed first simple tests.
const lineStringInPolygon = (
  line: GeoJSON.Position[],
  polygon: GeoJSON.Position[][],
): GeoJSON.Position[][] => {
  // 1 build new linestring with all intersection-points added in order.
  let points: GeoJSON.Position[] = [],
    i = 0,
    j = 0,
    intersectionpoints: GeoJSON.Position[] = [];
  for (i = 0; i < line.length - 1; i++) {
    points.push(line[i]);
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
            (line[i][0] - v[0]) * (line[i][0] - v[0]) +
              (line[i][1] - v[1]) * (line[i][1] - v[1]),
          ],
        )
        .sort((a, b) => a[1] - b[1]);

      for (j = 0; j < sortArray.length; j++) {
        points.push(sortArray[j][0]);
      }
    }
  }
  points.push(line[line.length - 1]);
  // 2 check each midpoint for in/out and build new (multi-)linestring.
  let mls = [],
    linestring = [],
    midpoint = [],
    last = false;
  for (i = 0; i < points.length - 1; i++) {
    midpoint = intermediatePoint(points[i], points[i + 1], 0.5);
    if (pointInSinglePolygon(midpoint, polygon)) {
      linestring.push(points[i]);
      if (last == false) {
        last = true;
      }
    } else {
      if (last == true) {
        linestring.push(points[i]);
        last = false;
        mls.push(linestring.slice());
        linestring = [];
      }
    }
  }
  if (last == true) {
    linestring.push(points[points.length - 1]);
    mls.push(linestring.slice());
  }
  return mls;
};

// Helper function for possible multi-geometries
// returns array of coordinates for MultiLineString
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
 * @returns - An array with the new feature, empty if no intersection.
 */
export const intersectLinePolygon = (
  lineFeature: GeoJSON.Feature,
  polygonFeature: GeoJSON.Feature,
): Intersect => {
  const lf = lineFeature;
  const pf = polygonFeature;
  if (lf.type !== 'Feature') {
    throw new Error(
      'intersectLinePolygon: Argument lineFeature not of type Feature.',
    );
  }
  if (pf.type !== 'Feature') {
    throw new Error(
      'intersectLinePolygon: Argument polygonFeature not of type Feature.',
    );
  }
  if (
    lf.geometry.type !== 'LineString' &&
    lf.geometry.type !== 'MultiLineString'
  ) {
    throw new Error(
      'intersectLinePolygon: Argument lineFeature do not have a geometry of type LineString or MultiLineString.',
    );
  }
  if (pf.geometry.type !== 'Polygon' && pf.geometry.type !== 'MultiPolygon') {
    throw new Error(
      'intersectLinePolygon: Argument polygonFeature do not have a geometry of type Polygon or MultiPolygon.',
    );
  }

  let lineCoords: GeoJSON.Position[][] = [];
  let polygonCoords: GeoJSON.Position[][][] = [];

  if (lf.geometry.type === 'LineString') {
    lineCoords = [lf.geometry.coordinates.slice()];
  } else {
    lineCoords = lf.geometry.coordinates.slice();
  }
  if (pf.geometry.type === 'Polygon') {
    polygonCoords = [pf.geometry.coordinates.slice()];
  } else {
    polygonCoords = pf.geometry.coordinates.slice();
  }

  let newCoords = multiLineStringInMultiPolygon(lineCoords, polygonCoords);

  if (newCoords.length > 0) {
    if (newCoords.length === 1) {
      return {
        intersection: true,
        geoJSON: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: newCoords[0],
          },
          properties: {},
        },
      };
    } else {
      return {
        intersection: true,
        geoJSON: {
          type: 'Feature',
          geometry: {
            type: 'MultiLineString',
            coordinates: newCoords,
          },
          properties: {},
        },
      };
    }
  } else {
    return {intersection: false};
  }
};
