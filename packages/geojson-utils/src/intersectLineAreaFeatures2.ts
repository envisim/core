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

  const areas = new Array<GJ.Position[][]>();
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

  if (coords.length === 1)
    return LineFeature.create(LineString.create(coords[0], true), {}, true);

  return LineFeature.create(MultiLineString.create(coords, true), {}, true);
}

type Segment = [GJ.Position, GJ.Position];

// returns multilinestring
function lineStringInPolygons(
  lineString: GJ.Position[],
  areas: GJ.Position[][][],
): GJ.Position[][] {
  // Go through every feature
  const mls = new Array<GJ.Position[]>();

  for (let i = 1; i < lineString.length; i++) {
    const newMls = segmentInPolygons(
      [[...lineString[i - 1]], [...lineString[i]]],
      areas,
    );

    // Skip if nothing was returned
    if (newMls.length === 0) continue;

    // Check if first linestring of return should be appended to the previous
    // linestring
    let startIndex = 0;
    if (mls.length > 0) {
      const id = mls.length - 1;
      if (xyAreEqual(newMls[0][0], mls[id][mls[id].length - 1])) {
        mls[id].pop();
        mls[id].push(...newMls[0]);
        startIndex = 1;
      }
    }

    if (startIndex === 0) {
      mls.push(...newMls);
    } else {
      for (let j = startIndex; j < newMls.length; j++) mls.push(newMls[j]);
    }
  }

  return mls;
}

// returns a list of segments still included
function segmentInPolygons(
  segment: Segment,
  areas: GJ.Position[][][],
): GJ.Position[][] {
  // Excluded segments
  const segs: Segment[] = [segment];

  // Go through all areas, excluding segments as needed
  for (let i = 0; i < areas.length; i++) {
    // Move backwards, as we're inserting new excluded segments for next areas
    for (let j = segs.length; j-- > 0; ) {
      const exclSeg = segmentInPolygon(segs[j], areas[i]);
      if (exclSeg.length > 0) segs.splice(j, 1, ...exclSeg);
      else if (exclSeg.length === 0) segs.splice(j, 1);
    }

    if (segs.length === 0) return [segment];
  }

  // Sort the excluded segments in the same order as the initial segment
  const lonComp = segment[1][0] > segment[0][0] ? lonCompare1 : lonCompare2;
  const latComp = segment[1][1] > segment[0][1] ? latCompare1 : latCompare2;
  segs.sort((a, b) => {
    const d = lonComp(a[0], b[0]);
    return d !== 0.0 ? d : latComp(a[0], b[0]);
  });

  const mls = new Array<GJ.Position[]>();

  // Add the first part, if it is not a single point
  if (!xyAreEqual(segment[0], segs[0][0])) {
    mls.push([segment[0], segs[0][0]]);
  }

  // Add the diff between all exluded segments, if it isn't a single point
  for (let i = 1; i < segs.length; i++) {
    if (!xyAreEqual(segs[i - 1][1], segs[i][0]))
      mls.push([segs[i - 1][1], segs[i][0]]);
  }

  // Add the last part, if it is not a single point
  if (!xyAreEqual(segs[segs.length - 1][1], segment[1])) {
    mls.push([segs[segs.length - 1][1], segment[1]]);
  }

  return mls;
}

// returns a list of segments still excluded
function segmentInPolygon(
  segment: Segment,
  polygon: GJ.Position[][],
): Segment[] {
  const points: GJ.Position[] = [];

  // Store all intersection points between the segment and the polygon
  for (let i = 0; i < polygon.length; i++) {
    for (let j = 1; j < polygon[i].length; j++) {
      const q = intersectSegments(segment, [polygon[i][j - 1], polygon[i][j]]);

      if (q) points.push(q);
    }
  }

  // If there are intersection points, sort them
  if (points.length > 0) {
    // Use different sorting functions depending on the direction of the segment
    const lonComp = segment[1][0] > segment[0][0] ? lonCompare1 : lonCompare2;
    const latComp = segment[1][1] > segment[0][1] ? latCompare1 : latCompare2;

    points.sort((a, b) => {
      const d = lonComp(a, b);
      return d !== 0.0 ? d : latComp(a, b);
    });
  }

  // Remove first points if they are equal to the first segment point
  let startIndex = 0;
  while (
    startIndex < points.length &&
    xyAreEqual(segment[0], points[startIndex])
  )
    startIndex++;

  if (points.length === startIndex) {
    // If there are not points, and the segment mid is fully within the polygon
    // the segment is fully within
    if (pointInSinglePolygonPosition(midpoint(segment[0], segment[1]), polygon))
      return [];
    // Else, the segment is fully outside, thus all is excluded
    return [segment];
  }

  // Check if the starting point of the segment is in the polygon
  // use midpoint in order to reduce risk of failing when starting point is on
  // a line
  if (
    pointInSinglePolygonPosition(
      midpoint(segment[0], points[startIndex]),
      polygon,
    )
  ) {
    const seg: Segment[] = [];

    // Every other pair of points are outside the polygon
    points.push(segment[1]);
    for (let i = startIndex + 1; i < points.length; i += 2)
      if (!xyAreEqual(points[i - 1], points[i]))
        seg.push([points[i - 1], points[i]]);

    return seg;
  }

  const seg: Segment[] = [[segment[0], points[0]]];

  // Every other pair of points are outside the polygon
  points.push(segment[1]);
  for (let i = startIndex + 2; i < points.length; i += 2)
    if (!xyAreEqual(points[i - 1], points[i]))
      seg.push([points[i - 1], points[i]]);

  return seg;
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
