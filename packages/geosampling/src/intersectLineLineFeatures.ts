import {bbox, bboxInBbox} from './bbox.js';
import {intersectSegments} from './intersectSegments.js';
import {geomEach} from './geomEach.js';
import {initialBearing, distance} from './distance.js';
import {length} from './length.js';

interface IdistCoord {
  dist: number;
  type: 'start' | 'end';
}

const toRad = Math.PI / 180;

// Internal, used for computing projected length.
const getDistCoordsForLineString = (
  lineString: GeoJSON.Position[],
  refPointLngLat: GeoJSON.Position,
  refLine: GeoJSON.Position[],
): IdistCoord[] => {
  let minDist = Infinity;
  let maxDist = -Infinity;

  lineString.forEach((coord) => {
    const angle = initialBearing(refPointLngLat, coord);
    const dist = distance(refPointLngLat, coord);
    const p1 = refLine[0];
    const p2 = refLine[1];
    // Compute coord as p3 in x,y by distance and angle from refPoint (0,0).
    const p3 = [
      dist * Math.cos((90 - angle) * toRad),
      dist * Math.sin((90 - angle) * toRad),
    ];
    // Project point p3 to line p1,p2 as new point p4.
    let cf =
      (p2[0] - p1[0]) * (p3[0] - p1[0]) + (p2[1] - p1[1]) * (p3[1] - p1[1]);
    cf = cf / (Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
    const p4 = [p1[0] + (p2[0] - p1[0]) * cf, p1[1] + (p2[1] - p1[1]) * cf];
    // Compute distance from p1 to p4 on line p1,p2.
    const d14 = Math.sqrt(
      Math.pow(p1[0] - p4[0], 2) + Math.pow(p1[1] - p4[1], 2),
    );
    // Store min and max distance.
    minDist = Math.min(minDist, d14);
    maxDist = Math.max(maxDist, d14);
  });
  return [
    {dist: minDist, type: 'start'},
    {dist: maxDist, type: 'end'},
  ];
};

// Internal, used for computing projected length.
const getDistCoordsForMultiLineString = (
  multiLineString: GeoJSON.Position[][],
  refPointLngLat: GeoJSON.Position,
  refLine: GeoJSON.Position[],
): IdistCoord[] => {
  let distCoords: IdistCoord[] = [];
  multiLineString.forEach((lineString) => {
    distCoords = distCoords.concat(
      getDistCoordsForLineString(lineString, refPointLngLat, refLine),
    );
  });
  return distCoords;
};

// Internal, used for computing projected length.
const getLengthFromDistCoords = (distCoords: IdistCoord[]) => {
  // Sort distCoords by dist first
  // then loop over all to find length of
  // union.
  distCoords.sort((a, b) => (a.dist < b.dist ? -1 : 1));
  let start = 0; // Number of start points passed.
  let end = 0; // Number of endpoints passed.
  let L = 0; // Length of union.
  let p1 = 0;
  let p2 = 0;
  let intervals: number[][] = [];
  distCoords.forEach((e) => {
    if (e.type == 'start') {
      if (start == end) {
        p1 = e.dist;
        intervals.push([e.dist]);
      }
      start++;
    } else {
      end++;
      if (end == start) {
        p2 = e.dist;
        L += p2 - p1;
        intervals[intervals.length - 1].push(e.dist);
      }
    }
  });
  return {L: L, intervals: intervals};
};

// Internal, used for computing projected length.
const referenceLine = (segment: GeoJSON.Position[]): GeoJSON.Position[] => {
  // ReferenceLine is 10000000 meters in each direction from [0,0]
  // at an angle perpendicular to segment (in cartesian coordinates).
  const angle = (initialBearing(segment[0], segment[1]) + 90) % 360;
  //const angleFromNorth = 90 - Math.atan2( line[1][1] - line[0][1], line[1][0] - line[0][0] ) * 180 / Math.PI;
  const toRad = Math.PI / 180;
  return [
    [
      10000000 * Math.cos((90 - angle) * toRad),
      10000000 * Math.sin((90 - angle) * toRad),
    ],
    [
      10000000 * Math.cos((270 - angle) * toRad),
      10000000 * Math.sin((270 - angle) * toRad),
    ],
  ];
};

interface Intersect {
  intersection: boolean;
  geoJSON?: GeoJSON.Feature;
  projectedLengthOfFirst?: number | number[];
  projectedLengthOfSecond?: number | number[];
  lengthOfFirst?: number;
  lengthOfSecond?: number;
}

/**
 * Computes the intersect of features containing LineString/MultiLineString.
 *
 * @param firstFeature - A Feature containing LineString/MultiLineString geometries.
 * @param secondFeature - A Feature containing LineString/MultiLineString geometries.
 * @returns - An intersect object.
 */
export const intersectLineLineFeatures = (
  firstFeature: GeoJSON.Feature,
  secondFeature: GeoJSON.Feature,
): Intersect => {
  const points: GeoJSON.Position[] = [];
  const projLengthOfSecondAtCrossings: number[] = [];
  const projLengthOfFirstAtCrossings: number[] = [];
  const box1 = firstFeature.bbox || bbox(firstFeature);
  const box2 = secondFeature.bbox || bbox(secondFeature);
  const lengthOfSecond = length(secondFeature);
  const lengthOfFirst = length(firstFeature);
  if (
    firstFeature.geometry.type !== 'LineString' &&
    firstFeature.geometry.type !== 'MultiLineString'
  ) {
    throw new Error(
      'intersectLineLineFeatures: Geometry type for firstFeature must be LineString or MultiLineString.',
    );
  }
  if (
    secondFeature.geometry.type !== 'LineString' &&
    secondFeature.geometry.type !== 'MultiLineString'
  ) {
    throw new Error(
      'intersectLineLineFeatures: Geometry type for secondFeature must be LineString or MultiLineString.',
    );
  }
  if (bboxInBbox(box1, box2)) {
    geomEach(firstFeature, (firstGeom: GeoJSON.Geometry) => {
      geomEach(secondFeature, (secondGeom: GeoJSON.Geometry) => {
        let firstCoords: GeoJSON.Position[][] = [[[]]];
        let secondCoords: GeoJSON.Position[][] = [[[]]];
        if (firstGeom.type === 'LineString') {
          firstCoords = [firstGeom.coordinates];
        }
        if (firstGeom.type === 'MultiLineString') {
          firstCoords = firstGeom.coordinates;
        }
        if (secondGeom.type === 'LineString') {
          secondCoords = [secondGeom.coordinates];
        }
        if (secondGeom.type === 'MultiLineString') {
          secondCoords = secondGeom.coordinates;
        }
        // Now we have coordinates for two MultiLineStrings.
        // Go thru all segments to find possible intersection points.
        firstCoords.forEach((firstLine) => {
          secondCoords.forEach((secondLine) => {
            for (let i = 0; i < firstLine.length - 1; i++) {
              for (let j = 0; j < secondLine.length - 1; j++) {
                const firstSegment = [firstLine[i], firstLine[i + 1]];
                const secondSegment = [secondLine[j], secondLine[j + 1]];
                const intersect = intersectSegments(
                  firstSegment,
                  secondSegment,
                );
                if (intersect.point) {
                  points.push(intersect.point);
                  // This assumes first line is sample and
                  // computes projected length of second (Multi-)LineString
                  // on a reference line perpendicular to firstSegment.
                  const projectedLengthOfSecondAtThisCrossing =
                    getLengthFromDistCoords(
                      getDistCoordsForMultiLineString(
                        secondCoords,
                        intersect.point,
                        referenceLine(firstSegment),
                      ),
                    ).L;
                  projLengthOfSecondAtCrossings.push(
                    projectedLengthOfSecondAtThisCrossing,
                  );

                  // This assumes second line is sample and
                  // computes projected length of first (Multi-)LineString
                  // on a reference line perpendicular to secondSegment.
                  const projectedLengthOfFirstAtThisCrossing =
                    getLengthFromDistCoords(
                      getDistCoordsForMultiLineString(
                        firstCoords,
                        intersect.point,
                        referenceLine(secondSegment),
                      ),
                    ).L;
                  projLengthOfFirstAtCrossings.push(
                    projectedLengthOfFirstAtThisCrossing,
                  );
                }
              }
            }
          });
        });
      });
    });
  }
  if (points.length === 0) {
    return {intersection: false};
  }
  if (points.length === 1) {
    return {
      intersection: true,
      geoJSON: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: points[0],
        },
        properties: {},
      },
      projectedLengthOfFirst: projLengthOfFirstAtCrossings[0],
      projectedLengthOfSecond: projLengthOfSecondAtCrossings[0],
      lengthOfFirst: lengthOfFirst,
      lengthOfSecond: lengthOfSecond,
    };
  }
  if (points.length > 1) {
    return {
      intersection: true,
      geoJSON: {
        type: 'Feature',
        geometry: {
          type: 'MultiPoint',
          coordinates: points,
        },
        properties: {},
      },
      projectedLengthOfFirst: projLengthOfFirstAtCrossings,
      projectedLengthOfSecond: projLengthOfSecondAtCrossings,
      lengthOfFirst: lengthOfFirst,
      lengthOfSecond: lengthOfSecond,
    };
  }
  return {intersection: false};
};
