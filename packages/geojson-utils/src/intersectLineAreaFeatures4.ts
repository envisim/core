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
import {Segment, intersectSegments} from './utils/intersectSegments.js';
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
  const segmentValues = new Array<number[]>();

  for (let i = 1; i < lineString.length; i++) {
    segmentIntersects(new Segment(lineString[i - 1], lineString[i]), areas);
    segmentValues.push([0.0, 1.0]);
  }

  return;
}

function segmentIntersectsAreas(
  segment: Segment,
  areas: GJ.Position[][][],
): number[] {
  const values: number[] = [0.0, 1.0];

  for (let i = 0; i < areas.length; i++) {
    segmentIntersectsArea(segment, values, areas[i]);
    if (values.length === 0) break;
  }
}

function segmentIntersectsArea(
  segment: Segment,
  values: number[],
  area: GJ.Position[][],
): void {
  const tarr = new Array<number>();

  for (let i = 0; i < area.length; i++) {
    for (let j = 1; j < area[i].length; j++) {
      const t = segment.parameter(area[i][j - 1], area[i][j]);
      if (t) tarr.push(t);
    }
  }

  if (tarr.length > 0) tarr.sort();

  // Remove all if there is no t's
  let i = 0;
  while (i < tarr.length && tarr[i] <= values[0]) i++;
  if (i === tarr.length) {
    if (
      pointInSinglePolygonPosition(segment.midPosition(values[0], 1.0), area)
    ) {
      values.splice(0);
    }

    return;
  }

  // Make sure that i points to a t that marks the end of an ex-zone
  if (
    pointInSinglePolygonPosition(segment.midPosition(values[0], tarr[i]), area)
  ) {
    values.splice(0, tarr[i]);
    i++;
  }

  let iMarksEnd = true;

  for (let j = 0; j < values.length; j += 2) {
    if (tarr[i] > values[j + 1]) continue;
    //if (tarr[i] < values[j])
  }

  // j points to the beginning of an ex-zone
  for (let j = 0; j < values.length; j += 2) {
    while (i < tarr.length && tarr[i] <= values[j]) i += 2;
    if (i >= tarr.length) break;
    if (tarr[i] > values[j + 1]) continue;
    if (tarr[i] === values[j + 1]) {
    }

    if (tarr[i + 1] <= values[j + 1]) {
      values.splice(j, 0, tarr[i], tarr[i + 1]);
    } else {
    }
    values.splice(j + 1, tarr[i]);

    const newNums = new Array<number>();

    let istop = i + 1;
    while (istop < tarr.length && istop <= values[j + 1]) istop += 2;
  }
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
