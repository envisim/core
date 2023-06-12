import type * as GJ from './types/geojson.js';
import {
  AreaFeature,
  LineFeature,
  LineString,
  MultiLineString,
  MultiPolygon,
  Polygon,
  Circle,
} from './geojson/index.js';
import {bboxInBBox} from './utils/bbox.js';
import {copy} from './utils/copy.js';
import {intersectSegments} from './utils/intersectSegments.js';
import {pointInSinglePolygonPosition} from './utils/pointInPolygonPosition.js';
import {xyAreEqual} from './utils/position.js';

/**
 * Computes the intersection between a LineFeature
 * and an AreaFeature.
 *
 * @param lineFeature
 * @param areaFeature
 * @param pointsPerCircle number of points to use in intersects with circles.
 * @returns the intersection or `null` if none exists.
 */
export function intersectLineAreaFeatures(
  lineFeature: LineFeature,
  areaFeature: AreaFeature,
  pointsPerCircle: number = 16,
): LineFeature | null {
  // early return if bboxes doesn't overlap
  if (
    !bboxInBBox(lineFeature.geometry.getBBox(), areaFeature.geometry.getBBox())
  )
    return null;

  const geometry = lineFeature.geometry;
  let multiLineString: GJ.Position[][];
  const areas = new Array<GJ.Position[][]>();

  // Construct the MultiLineString by fetching all LineStrings
  if (LineString.isObject(geometry)) {
    multiLineString = [geometry.coordinates];
  } else if (MultiLineString.isObject(geometry)) {
    multiLineString = geometry.coordinates;
  } else {
    // A LineGC should really be a MultiLineString
    multiLineString = [];
    geometry.geomEach((geom) => {
      if (LineString.isObject(geom)) multiLineString.push(geom.coordinates);
      else multiLineString.push(...geom.coordinates);
    });
  }

  // Construct the MultiPolygon (areas) by fetching all polygons
  areaFeature.geomEach((geom) => {
    if (Polygon.isObject(geom)) {
      areas.push(geom.coordinates);
    } else if (MultiPolygon.isObject(geom)) {
      areas.push(...geom.coordinates);
    } else if (Circle.isObject(geom)) {
      areas.push(geom.toPolygon({pointsPerCircle}).coordinates);
    } else {
      areas.push(...geom.toPolygon({pointsPerCircle}).coordinates);
    }
  });

  // Since lineStringInAreaFeature returns MultiLineString, we need to flatten
  const coords = multiLineString.flatMap((ls) =>
    lineStringInPolygons(ls, areas),
  );

  if (coords.length === 0) return null;

  // We don't need to claim Multi if there is only one LineString left
  if (coords.length === 1)
    return LineFeature.create(LineString.create(coords[0], true), {}, true);

  return LineFeature.create(MultiLineString.create(coords, true), {}, true);
}

type Segment = [GJ.Position, GJ.Position];

/*
  Construct excluded linestring (lineStringInPolygons), call excludedLineStringInPolygon
  Run excluded linestring through each area (lineStringInPolygon),
  If lineStringInPolygon returns a multiLineString, add that to a list of linestings
  Patch together again before returning from excludedLineStrings
 */

// returns multilinestring
function lineStringInPolygons(
  lineString: GJ.Position[],
  areas: GJ.Position[][][],
): GJ.Position[][] {
  // Go through every feature
  const mls = new Array<GJ.Position[]>();

  for (let i = 1; i < lineString.length; i++) {
    const ls = excludeLineStringInPolygons(copy(lineString), areas);
    // if (ls.length > 0) mls.push(...ls);
  }

  return mls;
}

function excludeLineStringInPolygons(
  lineString: GJ.Position[],
  areas: GJ.Position[][][],
): GJ.Position[][] {
  let emls = [lineString];

  for (let i = 0; i < areas.length; i++) {
    const nemls = new Array<GJ.Position[]>();
    for (let j = 0; j < emls.length; j++) {
      const newlyExcluded = excludeLineStringInPolygon(emls[j], areas[i]);
      if (newlyExcluded.length > 0) nemls.push(...newlyExcluded);
    }
    emls = nemls;
  }

  if (emls.length === 0) return [lineString];

  const mls = new Array<GJ.Position[]>();
  let ls = new Array<GJ.Position>();

  if (!xyAreEqual(lineString[0], emls[0][0])) {
    ls.push(lineString[0]);
  }

  let emlsId = 0;

  for (let i = 0; i < lineString.length; i++) {}

  if (!xyAreEqual(lineString[0], emls[0][0])) {
    ls.push(emls[0][emls[0].length - 1]);
  }

  for (let i = 0; i < emls.length; i++) {
    for (let j = 0; j < emls[i].length; j++) {}
  }

  return mls;
}

function excludeLineStringInPolygon(
  lineString: GJ.Position[],
  polygon: GJ.Position[][],
): GJ.Position[][] {
  const mls = new Array<GJ.Position[]>();
  let ls = new Array<GJ.Position>();
  let prevIn: boolean = false; // true if start on inside

  for (let i = 1; i < lineString.length; i++) {
    const startPoint = lineString[i - 1];
    const endPoint = lineString[i];
    const segpts = new Array<GJ.Position>();

    for (let j = 0; j < polygon.length; j++) {
      for (let k = 1; k < polygon[i].length; j++) {
        const pt = intersectSegments(
          [startPoint, endPoint],
          [polygon[j][k - 1], polygon[j][k]],
        );
        if (pt) segpts.push(pt);
      }
    }

    // If there are intersection points, sort them
    if (segpts.length > 0) {
      // Use different sorting functions depending on the direction of the segment
      const lonComp = endPoint[0] > startPoint[0] ? lonCompare1 : lonCompare2;
      const latComp = endPoint[1] > startPoint[1] ? latCompare1 : latCompare2;

      segpts.sort((a, b) => {
        const d = lonComp(a, b);
        return d !== 0.0 ? d : latComp(a, b);
      });
    }

    // Remove first points if they are equal to the first segment point
    const startIndex =
      segpts.length > 0 && xyAreEqual(startPoint, segpts[0]) ? 1 : 0;

    // Set prevIn accordingly, if it is the first segment
    if (i === 1) {
      prevIn = pointInSinglePolygonPosition(
        midpoint(
          startPoint,
          startIndex === segpts.length ? endPoint : segpts[1],
        ),
        polygon,
      );
    }

    // We need to add startPoint, if it is in an excluded zone
    if (!prevIn) {
      ls.push(startPoint);
    }

    for (let j = startIndex; j < segpts.length; j++) {
      // If the previous point was the start of an in-zone
      // this point is the start of an ex-zone, and we should renew ls
      // Otherwise, we push the point to ls, and push ls to mls
      // as this must be the end of an ex-zone
      if (prevIn) {
        ls = [segpts[j]];
        prevIn = false;
      } else {
        ls.push(segpts[j]);
        if (ls.length > 1) mls.push(ls);
        prevIn = true;
      }
    }
  }

  // We need to add endPoint, if it is in an excluded zone
  if (!prevIn && ls.length > 0) {
    // Only add endPoint if it is different from previous point
    if (!xyAreEqual(ls[ls.length - 1], lineString[lineString.length - 1]))
      ls.push(lineString[lineString.length - 1]);
    // Only push ls if it is a LineString
    if (ls.length > 1) mls.push(ls);
  }

  return mls;
}

function lonCompare1(a: GJ.Position, b: GJ.Position): number {
  return a[0] - b[0];
}
function lonCompare2(a: GJ.Position, b: GJ.Position): number {
  return b[0] - a[0];
}
function latCompare1(a: GJ.Position, b: GJ.Position): number {
  return a[0] - b[0];
}
function latCompare2(a: GJ.Position, b: GJ.Position): number {
  return a[0] - b[0];
}
function midpoint(p1: GJ.Position, p2: GJ.Position): GJ.PositionXY {
  return [(p1[0] + p2[0]) * 0.5, (p1[1] + p2[1]) * 0.5];
}
