import type * as GJ from '../types/geojson.js';
import {type AreaObject, type LineObject, LineString, MultiLineString} from '../geojson/index.js';
import {bboxInBBox} from '../utils/bbox.js';
import {type CirclesToPolygonsOptions} from '../utils/circles-to-polygons.js';
import {Segment} from '../utils/class-segment.js';
import {pointInSinglePolygonPosition} from '../utils/point-in-polygon.js';

/**
 * Intersect between a line and an area.
 *
 * @returns the intersection or `null` if none exists.
 */
export function intersectLineAreaGeometries(
  line: LineObject,
  area: AreaObject,
  options: CirclesToPolygonsOptions = {},
  // lineFeature: LineFeature,
  // areaFeature: AreaFeature,
  // pointsPerCircle: number = 16,
): LineObject | null {
  // early return if bboxes doesn't overlap
  if (!bboxInBBox(line.getBBox(), area.getBBox())) {
    return null;
  }

  // Construct the MultiLineString by fetching all LineStrings
  const multiLineString: GJ.Position[][] = line.getCoordinateArray();

  // Construct the MultiPolygon (areas) by fetching all polygons
  const areas: GJ.Position[][][] | undefined = area.toPolygon(options)?.getCoordinateArray();
  if (areas === undefined) return null;

  // Since lineStringInAreaFeature returns MultiLineString, we need to flatten
  const coords = multiLineString.flatMap((ls) => lineStringInPolygons(ls, areas));

  if (coords.length === 0) {
    return null;
  } else if (coords.length === 1) {
    // We don't need to claim Multi if there is only one LineString left
    return LineString.create(coords[0], true);
  }

  return MultiLineString.create(coords, true);
}

/**
 * @internal
 * @returns the coordinates of a MultiLineString containing the intersect
 */
function lineStringInPolygons(
  lineString: GJ.Position[],
  areas: GJ.Position[][][],
): GJ.Position[][] {
  const mls: GJ.Position[][] = [];
  let ls: GJ.Position[] = [];

  for (let i = 1; i < lineString.length; i++) {
    const seg = new Segment(lineString[i - 1], lineString[i]);
    const vals = segmentIntersectsAreas(seg, areas);

    if (vals.length === 0) {
      ls.push(seg.start());
      continue;
    }

    if (vals[0] === 0.0) {
      if (ls.length > 0) {
        ls.push(seg.start());
        mls.push(ls);
        ls = [];
      }
    } else {
      ls.push(seg.start(), seg.position(vals[0]));
      mls.push(ls);
      ls = [];
    }

    for (let j = 1; j < vals.length - 1; j++) {
      ls.push(seg.position(vals[j]));
      if (j % 2 === 0) {
        mls.push(ls);
        ls = [];
      }
    }

    if (vals[vals.length - 1] < 1.0) {
      ls.push(seg.position(vals[vals.length - 1]));
    }
  }

  if (ls.length > 0) {
    const plast = lineString[lineString.length - 1];
    ls.push([plast[0], plast[1]]);
    mls.push(ls);
  }

  return mls;
}

/**
 * @internal
 * @returns the parametric values, in pairs, which contains the excluded
 * segments from all polygons
 */
function segmentIntersectsAreas(segment: Segment, areas: GJ.Position[][][]): number[] {
  const values: number[] = [0.0, 1.0];

  for (let i = 0; i < areas.length; i++) {
    segmentIntersectsArea(segment, values, areas[i]);
    if (values.length === 0) break;
  }

  return values;
}

/**
 * @internal
 * @returns the parametric values, in pairs, which contains the excluded
 * segments from one polygon
 */
function segmentIntersectsArea(segment: Segment, values: number[], area: GJ.Position[][]): void {
  const tarr: number[] = [];
  const vsmall = values[0];

  for (let i = 0; i < area.length; i++) {
    for (let j = 1; j < area[i].length; j++) {
      // Returns the parametric intersect of the line and area segment, first value being the line
      const t = segment.parametricIntersect(new Segment(area[i][j - 1], area[i][j]), false)?.[0];
      if (t !== undefined && t > vsmall) tarr.push(t);
    }
  }

  if (tarr.length > 0) tarr.sort();

  // Remove all if there is no t's
  if (tarr.length === 0) {
    if (pointInSinglePolygonPosition(segment.position((values[0] + 1.0) * 0.5), area)) {
      values.splice(0);
    }

    return;
  }

  let i = 0;
  // Make sure that i points to a t that marks the end of an ex-zone
  if (pointInSinglePolygonPosition(segment.position((values[0] + tarr[0]) * 0.5), area)) {
    if (tarr[0] === values[1]) {
      values.splice(0, 2);
    } else {
      values[0] = tarr[0];
    }
    i = 1;
  }

  // values is assumed to be even-length
  // going until < tarr.len -1 makes sure that we treat tarr as even
  let j = 0;
  while (j < values.length && i < tarr.length - 1) {
    // Increment t if t1 < v0
    // Increment v if t0 > v1
    // Cases:
    // a- t0 === t1 implies nothing to do                  next t
    // b- t1 < v0 implies t0 < v0                          next t
    // c- t0 > v1 implies t1 > v1                          next v
    // d- t0 <= v0, t1 => v1 => remove the seg and cont    ------
    // e- t0 <= v0, t1 in v  => replace v0 with t1         next t
    // f- t0 in v , t1 in v  => place t within v           next t, v
    // g- t0 in v , t1 >  v1 => replace v1 with t0         next v
    if (tarr[i] === tarr[i + 1]) {
      // a
      i += 2;
    } else if (tarr[i + 1] <= values[j]) {
      // b
      i += 2;
    } else if (tarr[i] >= values[j + 1]) {
      // c
      j += 2;
    } else if (tarr[i] <= values[j]) {
      if (tarr[i + 1] >= values[j + 1]) {
        // d
        values.splice(j, 2);
      } else {
        // e
        values[j] = tarr[i + 1];
        i += 2;
      }
    } else if (tarr[i] > values[j]) {
      if (tarr[i + 1] < values[j + 1]) {
        // f
        values.splice(j + 1, 0, tarr[i], tarr[i + 1]);
        i += 2;
        j += 2;
      } else {
        // g
        values[j + 1] = tarr[i];
        j += 2;
      }
    }
  }

  // if tarr was odd, the last i point to the end of an ex-zone
  // thus, we can remove all remaining
  if (i < tarr.length) {
    while (j < values.length) {
      if (tarr[i] >= values[j + 1]) {
        j += 2;
      } else if (tarr[i] <= values[j]) {
        break;
      } else {
        values[j + 1] = tarr[i];
        j += 2;
      }
    }

    values.splice(j);
  }
}
