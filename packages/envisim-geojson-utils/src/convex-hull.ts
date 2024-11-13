import {
  AreaObject,
  Circle,
  Feature,
  FeatureCollection,
  type GeoJSON as GJ,
  LineObject,
  MultiCircle,
  MultiPolygon,
  PointObject,
  Polygon,
} from './index.js';
import {moveCoordsAroundEarth, rerollPolygons} from './utils/antimeridian.js';
import {bbox4, bboxCrossesAntimeridian} from './utils/bbox.js';
import {CirclesToPolygonsOptions} from './utils/circles-to-polygons.js';

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
): FeatureCollection<AreaObject> {
  // Grab only outer coords (no inner rings)
  let points: GJ.Position[] = outerCoords(collection, options);

  // Return empty collection if less than 3 points
  if (points.length < 3) {
    return FeatureCollection.createArea([]);
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

  // Join lower and upper hull and close the ring
  const P = L.concat(U);
  P.push([...L[0]]);

  // If coordinates were moved, then reroll
  const mpc = crosses ? rerollPolygons([[P]]) : [[P]];

  // Now construct and return as feature collection
  const feature =
    mpc.length == 1
      ? new Feature(Polygon.create(mpc[0], true), {}, true)
      : new Feature(MultiPolygon.create(mpc, true), {}, true);

  return FeatureCollection.createArea([feature], false, true);
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
