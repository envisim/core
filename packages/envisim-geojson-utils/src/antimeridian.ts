import { BoundingBox, bboxFromPositions } from "./bbox.js";
import type * as GJ from "./geojson.js";
import { intersectPolygons } from "./intersect-polygons.js";
import { normalizeLongitude } from "./position.js";

// Internal function to compare two positions
function equalPositions(a: GJ.Position, b: GJ.Position): boolean {
  return a.length === b.length && a.every((val, index) => val === b[index]);
}
// Internal function that makes sure to not add duplicate positions
function addPosition(arr: GJ.Position[], coord: GJ.Position) {
  if (arr.length > 0 && !equalPositions(arr[arr.length - 1], coord)) {
    arr.push(coord);
  }
  if (arr.length === 0) {
    arr.push(coord);
  }
}

// Internal function that cuts lines on the antimeridian
function cutLineStringCoords(ls: GJ.Position[]): GJ.Position[][] {
  const box = BoundingBox.removeAltitude(bboxFromPositions(ls));
  if (BoundingBox.includesAntimeridian(box) === false) {
    return [ls];
  }
  // Crosses the antimeridian
  const coords: GJ.Position[] = ls.map((c) => {
    if (c[0] <= box[2]) {
      return [c[0] + 360, ...c.slice(1)] as GJ.Position;
    }
    return [...c];
  });
  // Cut at 180
  let prevSide = coords[0][0] < 180;
  // multilinestring
  const mls: GJ.Position[][] = [];
  let nls: GJ.Position[] = [];
  let prevCoord = [...coords[0]];
  nls.push([normalizeLongitude(coords[0][0]), ...coords[0].slice(1)] as GJ.Position);
  for (let i = 1; i < coords.length; i++) {
    const currSide = coords[i][0] < 180;
    const currCoord = coords[i];
    if (currSide != prevSide) {
      // Find breakpoint, push and start new nls
      const t = (180 - prevCoord[0]) / (currCoord[0] - prevCoord[0]);
      const latAlt = [prevCoord[1] + t * (currCoord[1] - prevCoord[1])];
      if (currCoord[2] !== undefined) {
        // push altitude
        latAlt.push(prevCoord[2] + t * (currCoord[2] - prevCoord[2]));
      }
      if (prevSide) {
        // Positive side for prev, i.e. lon = 180
        addPosition(nls, [180, ...latAlt] as GJ.Position);
      } else {
        // Negative side for prev, i.e. lon = -180
        addPosition(nls, [-180, ...latAlt] as GJ.Position);
      }
      // close
      mls.push([...nls]);
      // clear
      nls = [];
      // start new
      if (currSide) {
        // Positive side for curr, i.e. lon = 180
        addPosition(nls, [180, ...latAlt] as GJ.Position);
      } else {
        // Negative side for curr, i.e. lon = -180
        addPosition(nls, [-180, ...latAlt] as GJ.Position);
      }
    }
    const coord = [normalizeLongitude(currCoord[0]), ...currCoord.slice(1)] as GJ.Position;
    addPosition(nls, coord);
    prevCoord = [...currCoord];
    prevSide = currSide;
  }
  // push the last
  mls.push(nls);
  return mls;
}

/**
 * Cuts a LineGeometry on the antimeridian
 * @param g the LineGeometry to cut
 * @returns the cut LineGeometry
 */
export function cutLineGeometry(g: GJ.LineObject): GJ.LineObject {
  const coords: GJ.MultiLineString["coordinates"] = [];

  if (g.type === "LineString") {
    coords.push(...cutLineStringCoords(g.coordinates));
  } else {
    g.coordinates.forEach((p) => coords.push(...cutLineStringCoords(p)));
  }

  return coords.length === 1
    ? { type: "LineString", coordinates: coords[0] }
    : { type: "MultiLineString", coordinates: coords };
}

// use these polygons to cut polygons
export const EARTH_BOUNDARIES: {
  left: GJ.Position2[][];
  normal: GJ.Position2[][];
  right: GJ.Position2[][];
} = {
  left: [
    [
      [-540.0, -90.0],
      [-180.0, -90.0],
      [-180.0, 90.0],
      [-540.0, 90.0],
      [-540.0, -90.0],
    ],
  ],
  normal: [
    [
      [-180.0, -90.0],
      [180.0, -90.0],
      [180.0, 90.0],
      [-180.0, 90.0],
      [-180.0, -90.0],
    ],
  ],
  right: [
    [
      [180.0, -90.0],
      [540.0, -90.0],
      [540.0, 90.0],
      [180.0, 90.0],
      [180.0, -90.0],
    ],
  ],
} as const;

// Internal function to cut a polygon at the antimeridian
function cutPolygonCoords(pol: GJ.Position[][]): GJ.Position[][][] {
  const box = BoundingBox.removeAltitude(bboxFromPositions(pol[0])); // outer ring only
  if (BoundingBox.includesAntimeridian(box) === false) {
    return [pol];
  }

  // Crosses the antimeridian
  const coords: GJ.Position2[][] = pol.map((ring) =>
    ring.map((c) => [c[0] <= box[2] ? c[0] + 360.0 : c[0], c[1]]),
  );

  // Intersect coords with leftArea to create the first polygon and rightArea
  // to create the second polygon.
  const returningPolys: GJ.Position2[][][] = [];

  const left = intersectPolygons([coords], [EARTH_BOUNDARIES.normal]);

  if (left.length > 0) {
    returningPolys.push(...left);
  }

  const right = intersectPolygons([coords], [EARTH_BOUNDARIES.right]).map((r) =>
    r.map((p) => p.map<[number, number]>((c) => [c[0] - 360.0, c[1]])),
  );

  if (right.length > 0) {
    returningPolys.push(...right);
  }

  return returningPolys;
}

/**
 * Cuts an AreaGeometry on the antimeridian
 * @param g the AreaGeometry to cut
 * @returns the cut AreaGeometry
 */
export function cutAreaGeometry(g: GJ.Circle): GJ.Circle;
export function cutAreaGeometry(g: GJ.MultiCircle): GJ.MultiCircle;
export function cutAreaGeometry(g: GJ.Polygon | GJ.MultiPolygon): GJ.Polygon | GJ.MultiPolygon;
export function cutAreaGeometry(g: GJ.AreaObject): GJ.AreaObject {
  if (g.type === "Point" || g.type === "MultiPoint") {
    return g;
  }

  const coords: GJ.MultiPolygon["coordinates"] = [];

  if (g.type === "Polygon") {
    coords.push(...cutPolygonCoords(g.coordinates));
  } else {
    g.coordinates.forEach((p) => coords.push(...cutPolygonCoords(p)));
  }

  return coords.length === 1
    ? { type: "Polygon", coordinates: coords[0] }
    : { type: "MultiPolygon", coordinates: coords };
}

/**
 * Moves rings that starts on the west side of the meridian (-180 -- 0) to the positive counterpart (180--360)
 */
export function moveCoordsAroundEarth(coords: GJ.Position[]): GJ.Position[] {
  const xSmall = coords.reduce((p, c) => Math.min(c[0], p), Number.MAX_VALUE);
  if (xSmall >= 0.0) return coords;
  return coords.map((c) => [c[0] + 360.0, c[1]]);
}

/**
 * An unrolled polygon is a polygon which may exist outside the boundaries of normal earth
 * (-180, 180), as if the earth(s) was unrolled on a sheet of paper.
 *
 * This function takes polygons with unrolled coordinates and, rolls them into (-180, 180). The
 * function assumes that no polygon exists solely on the left earth (-540, -180), or the right
 * earth, (180, 540), but that the following polygons may exist:
 * - overlapping -180,
 * - solely in normal earth (-180, 180),
 * - overlapping 180.
 */
export function rerollPolygons(polygons: GJ.Position2[][][]): GJ.Position2[][][] {
  const returningPolys: GJ.Position2[][][] = [];

  for (let i = 0; i < polygons.length; i++) {
    const range = polygons[i][0].reduce(
      (p, c) => {
        p[0] = Math.min(p[0], c[0]);
        p[1] = Math.max(p[1], c[0]);
        return p;
      },
      [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
    );

    if (-180.0 <= range[0] && range[1] <= 180.0) {
      return polygons;
    }

    if (range[0] < -180.0) {
      // Polygons can be drawn over -180, but cannot exist soley there, as any crossed polygon would
      // have been moved +360 before operations.
      // range[0] < -180 therefore implies range[1] > -180
      const l = intersectPolygons([polygons[i]], [EARTH_BOUNDARIES.left]).map((r) =>
        r.map((p) => p.map<[number, number]>((c) => [c[0] + 360.0, c[1]])),
      );

      if (l.length > 0) {
        returningPolys.push(...l);
      }

      const n = intersectPolygons([polygons[i]], [EARTH_BOUNDARIES.normal]);

      if (n.length > 0) {
        returningPolys.push(...n);
      }
    } else if (range[0] < 180.0 && 180.0 < range[1]) {
      const r = intersectPolygons([polygons[i]], [EARTH_BOUNDARIES.right]).map((r) =>
        r.map((p) => p.map<[number, number]>((c) => [c[0] - 360.0, c[1]])),
      );

      if (r.length > 0) {
        returningPolys.push(...r);
      }

      const n = intersectPolygons([polygons[i]], [EARTH_BOUNDARIES.normal]);

      if (n.length > 0) {
        returningPolys.push(...n);
      }
    } else {
      // Something can be alone on the rightmost earth ... no need to intersect

      const r = polygons[i].map((p) => p.map<[number, number]>((c) => [c[0] - 360.0, c[1]]));
      returningPolys.push(r);
    }
  }

  return returningPolys;
}
