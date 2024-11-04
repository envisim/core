import type * as GJ from '../types/geojson.js';
import {AreaObject, Circle, MultiCircle, MultiPolygon, Polygon} from '../geojson/index.js';
import {Geodesic} from '../utils/Geodesic.js';
import {bboxInBBox} from '../utils/bbox.js';
import {CirclesToPolygonsOptions} from '../utils/circles-to-polygons.js';
import {intersectPolygons} from './intersect-polygons.js';

/**
 * Intersect of two areas.
 *
 * @returns the intersect or `null` if no intersect
 */
export function intersectAreaAreaGeometries(
  geometry1: AreaObject,
  geometry2: AreaObject,
  options: CirclesToPolygonsOptions = {},
): AreaObject | null {
  // early return if bboxes doesn't overlap
  if (!bboxInBBox(geometry1.getBBox(), geometry2.getBBox())) {
    return null;
  }

  if (Polygon.isObject(geometry1) || MultiPolygon.isObject(geometry1)) {
    if (Circle.isObject(geometry2) || MultiCircle.isObject(geometry2)) {
      return intersectCirclePolygonGeometries(geometry2, geometry1, options);
    } else {
      return intersectPolygonGeometries(geometry1, geometry2);
    }
  }

  if (Circle.isObject(geometry2) || MultiCircle.isObject(geometry2)) {
    return intersectCircleGeometries(geometry1, geometry2, options);
  }

  return intersectCirclePolygonGeometries(geometry1, geometry2, options);
}

function intersectPolygonGeometries(
  polygon1: Polygon | MultiPolygon,
  polygon2: Polygon | MultiPolygon,
): Polygon | MultiPolygon | null {
  const intersect = intersectPolygons(polygon1.getCoordinateArray(), polygon2.getCoordinateArray());

  if (intersect.length === 0) {
    return null;
  }

  if (intersect.length === 1) {
    return Polygon.create(intersect[0], true);
  }

  return MultiPolygon.create(intersect, true);
}

/**
 * @returns the centres of all (smaller) circles completely within larger circles, or `null` if any
 * circle partially overlaps a larger circle.
 */
function intersectCircleGeometries(
  circle1: Circle | MultiCircle,
  circle2: Circle | MultiCircle,
  options: CirclesToPolygonsOptions = {},
): AreaObject | null {
  let smallCircles: GJ.Position[];
  let largeCircles: GJ.Position[];
  let smallRadius: number;
  let radiusDiff: number;
  const radiusSum = circle1.radius + circle2.radius;

  if (circle1.radius <= circle2.radius) {
    smallCircles = circle1.getCoordinateArray();
    largeCircles = circle2.getCoordinateArray();
    smallRadius = circle1.radius;
    radiusDiff = circle2.radius - circle1.radius;
  } else {
    smallCircles = circle2.getCoordinateArray();
    largeCircles = circle1.getCoordinateArray();
    smallRadius = circle2.radius;
    radiusDiff = circle1.radius - circle2.radius;
  }

  if (
    smallCircles.length === 0 ||
    largeCircles.length === 0 ||
    smallCircles.length + largeCircles.length === 1 ||
    circle1.radius <= 0.0 ||
    circle2.radius <= 0.0
  ) {
    return null;
  }

  const retainedCircles: GJ.Position[] = [];

  for (const sc of smallCircles) {
    for (const lc of largeCircles) {
      const d = Geodesic.distance(sc, lc);
      if (d <= radiusDiff) {
        // Smaller circle completely within larger
        retainedCircles.push(sc);
        break;
      } else if (d < radiusSum) {
        // Smaller circle partially overlaps larger -- we need to abandon ship and convert to
        // polygons.
        // toPolygon will only return null if the circle(s) lack coordinates, or if the radius is
        // non-positive, both of which has already been tested here.
        return intersectPolygonGeometries(
          circle1.toPolygon(options) as Polygon | MultiPolygon,
          circle2.toPolygon(options) as Polygon | MultiPolygon,
        );
      }
    }
  }

  if (retainedCircles.length === 0) {
    return null;
  } else if (retainedCircles.length === 1) {
    return Circle.create(retainedCircles[0], smallRadius, false);
  }

  return MultiCircle.create(retainedCircles, smallRadius, false);
}

function intersectCirclePolygonGeometries(
  circle: Circle | MultiCircle,
  polygon: Polygon | MultiPolygon,
  options: CirclesToPolygonsOptions = {},
): AreaObject | null {
  const circles = circle.getCoordinateArray();
  if (circles.length === 0 || circle.radius <= 0.0) {
    return null;
  }

  const retainedCircles: GJ.Position[] = [];

  for (const c of circles) {
    const distance = polygon.distanceToPosition(c);

    if (distance <= -circle.radius) {
      // Smaller circle completely within polygon
      retainedCircles.push(c);
    } else if (distance < circle.radius) {
      // Polygon partially overlaps circle -- we need to convert circles to polygon and continue
      // from there.
      // toPolygon will only return null if the circle(s) lack coordinates, or if the radius is
      // non-positive, both of which has already been tested here.
      return intersectPolygonGeometries(
        circle.toPolygon(options) as Polygon | MultiPolygon,
        polygon,
      );
    }
  }

  if (retainedCircles.length === 0) {
    return null;
  } else if (retainedCircles.length === 1) {
    return Circle.create(retainedCircles[0], circle.radius, false);
  }

  return MultiCircle.create(retainedCircles, circle.radius, false);
}
