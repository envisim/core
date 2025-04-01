import {
  bbox4,
  bboxCrossesAntimeridian,
  moveCoordsAroundEarth,
  rerollPolygons,
} from "@envisim/geojson-utils";
import type * as GJ from "@envisim/geojson-utils/geojson";
import {
  type AreaObject,
  Circle,
  type LineObject,
  MultiCircle,
  MultiPolygon,
  type PointObject,
  Polygon,
} from "../objects/index.js";
import { type CirclesToPolygonsOptions } from "../utils/circles-to-polygons.js";
import { FeatureCollection } from "./class-feature-collection.js";

/**
 * Computes the convex hull from a collection using
 * Andrew's monotone chain algorithm. If the hull polygon
 * crosses the antimeridian, then the resulting collection will
 * contain a multipolygon.
 *
 * @param collection
 * @param options
 * @returns
 */
export function convexHull(
  collection:
    | FeatureCollection<AreaObject>
    | FeatureCollection<LineObject>
    | FeatureCollection<PointObject>,
  options: CirclesToPolygonsOptions = {},
): Polygon | MultiPolygon | null {
  // Grab only outer coords (no inner rings)
  let points: GJ.Position[] = outerCoords(collection, options);

  // Return empty collection if less than 3 points
  if (points.length < 3) {
    return null;
  }

  // Check if coords need to be moved (i.e. the bbox crosses antimeridian)
  const box = bbox4(collection.getBBox());
  const crosses = bboxCrossesAntimeridian(box);
  if (crosses) {
    points = moveCoordsAroundEarth(points);
  }

  // Now start the computation of the hull
  points.sort(compare);
  const L: GJ.Position2[] = [];
  for (let i = 0; i < points.length; i++) {
    while (L.length >= 2 && cross(L[L.length - 2], L[L.length - 1], points[i]) <= 0) {
      L.pop();
    }
    L.push([points[i][0], points[i][1]]);
  }
  const U: GJ.Position2[] = [];
  for (let i = points.length - 1; i >= 0; i--) {
    while (U.length >= 2 && cross(U[U.length - 2], U[U.length - 1], points[i]) <= 0) {
      U.pop();
    }
    U.push([points[i][0], points[i][1]]);
  }
  L.pop();
  U.pop();

  // Join lower and upper hull
  const P = L.concat(U);

  if (collinear(P)) {
    return null;
  }

  // close the ring
  P.push([...L[0]]);

  // If coordinates were moved, then reroll
  const mpc = crosses ? rerollPolygons([[P]]) : [[P]];
  return mpc.length == 1 ? Polygon.create(mpc[0], true) : MultiPolygon.create(mpc, true);
}

/**
 * Internal function to get all outer coordinates in the collection as an array.
 * @param collection
 * @param options
 * @returns
 */
function outerCoords(
  collection:
    | FeatureCollection<PointObject>
    | FeatureCollection<LineObject>
    | FeatureCollection<AreaObject>,
  options: CirclesToPolygonsOptions = {},
): GJ.Position[] {
  const coords: GJ.Position[] = [];

  if (FeatureCollection.isArea(collection)) {
    collection.geomEach((geom) => {
      let poly: Polygon | MultiPolygon | null;
      if (Circle.isObject(geom) || MultiCircle.isObject(geom)) {
        poly = geom.toPolygon(options);
      } else {
        poly = geom;
      }
      if (poly) {
        poly.getCoordinateArray().forEach((pc) => {
          // only outer ring of polygons
          coords.push(...pc[0]);
        });
      }
    });
    return coords;
  }
  if (FeatureCollection.isLine(collection)) {
    collection.geomEach((geom) => {
      geom.getCoordinateArray().forEach((lc) => {
        coords.push(...lc);
      });
    });
    return coords;
  }
  if (FeatureCollection.isPoint(collection)) {
    collection.geomEach((geom) => {
      coords.push(...geom.getCoordinateArray());
    });
    return coords;
  }
  return coords;
}

/**
 * Internal compare function used to sort positions
 * @param a
 * @param b
 * @returns
 */
function compare(a: GJ.Position, b: GJ.Position): number {
  return a[0] == b[0] ? a[1] - b[1] : a[0] - b[0];
}

/**
 * Internal cross product of the vectors formed by the three positions
 * @param a
 * @param b
 * @param o
 * @returns
 */
function cross(a: GJ.Position, b: GJ.Position, o: GJ.Position): number {
  return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

/**
 * Internal function to test for degenerate case (all points on a line or same point)
 * @param points
 * @returns
 */
function collinear(points: GJ.Position[]): boolean {
  if (points.length < 3) return true;

  // Find the first two distinct points
  const p1 = points[0];
  let p2: GJ.Position | null = null;

  for (let i = 1; i < points.length; i++) {
    if (points[i][0] !== p1[0] || points[i][1] !== p1[1]) {
      p2 = points[i];
      break;
    }
  }

  // If all points are identical
  if (!p2) return true;

  const [x1, y1] = p1;
  const [x2, y2] = p2;

  // Check if all points are on the line formed by p1 and p2
  return points.every(([x, y]) => {
    // Use cross-product to avoid division (slope comparison)
    return (x - x1) * (y2 - y1) === (y - y1) * (x2 - x1);
  });
}
