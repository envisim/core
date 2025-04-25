import {
  type AreaObject,
  Circle,
  type CirclesToPolygonsOptions,
  type LineObject,
  LineString,
  MultiCircle,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  type PointObject,
  Polygon,
} from "@envisim/geojson";
import { cutAreaGeometry, cutLineGeometry } from "@envisim/geojson-utils";
import { destination, distance } from "@envisim/geojson-utils/geodesic";
import type * as GJ from "@envisim/geojson-utils/geojson";
import { isCircle, isMultiCircle } from "@envisim/geojson-utils/type-guards";
import { type RandomGenerator } from "@envisim/random";

// This file has a set of functions to deal with a model
// geometry (tract), which is a GeoJSON geometry with cartesian
// coordinates in meters relative to (0,0).

// Internal.
function placePoint(point: GJ.Position, position: GJ.Position, rotation: number): GJ.Position {
  const dist = Math.sqrt(point[0] * point[0] + point[1] * point[1]);
  const angle = 90.0 - (Math.atan2(point[1], point[0]) * 180.0) / Math.PI + rotation;
  return destination(position, dist, angle);
}

export interface PlaceOptions<G extends GJ.SingleTypeObject> {
  /** Model geometry with coordinates in meters relative to (0,0) */
  modelGeometry: G;
  /** Angel of rotation in degrees (from north), or `random` for random rotation */
  rotationOfGeometry: number | "random";
  /** Optional RNG */
  rand: RandomGenerator;
  /** Buffer */
  buffer: number;
}

/**
 * Positions a modelGeometry at position and optionally rotates the coordinates around position.
 *
 * @param position - a position [lon,lat].
 * @returns a GeoJSON Point/Line/AreaObject.
 */
export function placeAreaGeometry(
  position: GJ.Position,
  { modelGeometry, ...opts }: PlaceOptions<GJ.AreaObject>,
): AreaObject {
  const rotation =
    opts.rotationOfGeometry === "random" ? opts.rand.random() * 360 : opts.rotationOfGeometry;

  if (modelGeometry.type === "Point") {
    return Circle.create(
      placePoint(modelGeometry.coordinates, position, rotation),
      modelGeometry.radius,
      true,
    );
  } else if (modelGeometry.type === "MultiPoint") {
    return MultiCircle.create(
      modelGeometry.coordinates.map((p) => placePoint(p, position, rotation)),
      modelGeometry.radius,
      true,
    );
  }

  let geom: GJ.Polygon | GJ.MultiPolygon;
  if (modelGeometry.type === "Polygon") {
    geom = {
      type: "Polygon",
      coordinates: modelGeometry.coordinates.map((parr) =>
        parr.map((p) => placePoint(p, position, rotation)),
      ),
    };
  } else {
    geom = {
      type: "MultiPolygon",
      coordinates: modelGeometry.coordinates.map((pouter) =>
        pouter.map((pinner) => pinner.map((p) => placePoint(p, position, rotation))),
      ),
    };
  }

  // May need cut if area or line as the distance to the antimeridian is less than the radius
  if (distance(position, [180, position[1]]) < opts.buffer) {
    geom = cutAreaGeometry(geom);
  }

  return geom.type === "Polygon"
    ? Polygon.create(geom.coordinates, true)
    : MultiPolygon.create(geom.coordinates, true);
}

export function placeLineGeometry(
  position: GJ.Position,
  { modelGeometry, ...opts }: PlaceOptions<GJ.LineObject>,
): LineObject {
  const rotation =
    opts.rotationOfGeometry === "random" ? opts.rand.random() * 360 : opts.rotationOfGeometry;

  let geom: GJ.LineString | GJ.MultiLineString;
  if (modelGeometry.type === "LineString") {
    geom = {
      type: "LineString",
      coordinates: modelGeometry.coordinates.map((p) => placePoint(p, position, rotation)),
    };
  } else {
    geom = {
      type: "MultiLineString",
      coordinates: modelGeometry.coordinates.map((parr) =>
        parr.map((p) => placePoint(p, position, rotation)),
      ),
    };
  }

  // May need cut if area or line as the distance to the antimeridian is less than the radius
  if (distance(position, [180, position[1]]) < opts.buffer) {
    geom = cutLineGeometry(geom);
  }

  return geom.type === "LineString"
    ? LineString.create(geom.coordinates, true)
    : MultiLineString.create(geom.coordinates, true);
}
export function placePointGeometry(
  position: GJ.Position,
  { modelGeometry, ...opts }: PlaceOptions<GJ.PointObject>,
): PointObject {
  const rotation =
    opts.rotationOfGeometry === "random" ? opts.rand.random() * 360 : opts.rotationOfGeometry;

  if (modelGeometry.type === "Point") {
    return Point.create(placePoint(modelGeometry.coordinates, position, rotation), true);
  } else {
    return MultiPoint.create(
      modelGeometry.coordinates.map((p) => placePoint(p, position, rotation)),
      true,
    );
  }
}

/**
 * Computes the radius as maximum distance from (0,0) to any point in the given geometry.
 *
 * @param geometry a GeoJSON geometry (not geometry collection).
 * @returns the maximum distance from (0,0) to any point in the given geometry.
 */
export function radiusOfModelGeometry(geometry: GJ.SingleTypeObject) {
  switch (geometry.type) {
    case "Point":
      return (
        Math.sqrt(
          geometry.coordinates[0] * geometry.coordinates[0] +
            geometry.coordinates[1] * geometry.coordinates[1],
        ) + ((geometry as GJ.Circle).radius ?? 0.0)
      );

    case "MultiPoint":
      return (
        Math.sqrt(geometry.coordinates.reduce((a, b) => Math.max(a, b[0] ** 2 + b[1] ** 2), 0.0)) +
        ((geometry as GJ.MultiCircle).radius ?? 0.0)
      );

    case "LineString":
      return Math.sqrt(
        geometry.coordinates.reduce((a, b) => Math.max(a, b[0] ** 2 + b[1] ** 2), 0.0),
      );

    case "MultiLineString":
      return Math.sqrt(
        geometry.coordinates.reduce(
          (a, ls) => ls.reduce((b, c) => Math.max(b, c[0] ** 2 + c[1] ** 2), a),
          0.0,
        ),
      );

    case "Polygon":
      // Outer ring is sufficient.
      return Math.sqrt(
        geometry.coordinates[0].reduce((a, b) => Math.max(a, b[0] ** 2 + b[1] ** 2), 0.0),
      );

    case "MultiPolygon":
      // Outer ring for each polygon is sufficient.
      return Math.sqrt(
        geometry.coordinates.reduce(
          (a, ls) => ls[0].reduce((b, c) => Math.max(b, c[0] ** 2 + c[1] ** 2), a),
          0.0,
        ),
      );
  }
}

// Internal.
function lengthOfLineString(coords: GJ.Position[]) {
  let L = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    L += Math.sqrt(
      Math.pow(coords[i][0] - coords[i + 1][0], 2) + Math.pow(coords[i][1] - coords[i + 1][1], 2),
    );
  }
  return L;
}

// Internal.
function areaOfRing(coords: GJ.Position[]): number {
  let area = 0; // Accumulates area in the loop
  let j = coords.length - 1; // The last vertex is the 'previous' one to the first
  const n = coords.length;
  for (let i = 0; i < n; i++) {
    area += (coords[j][0] + coords[i][0]) * (coords[j][1] - coords[i][1]);
    j = i; //j is previous vertex to i
  }
  return Math.abs(area / 2);
}

// Internal.
function areaOfSinglePolygon(coords: GJ.Position[][]): number {
  let area = areaOfRing(coords[0]); // full area
  const n = coords.length;
  for (let i = 1; i < n; i++) {
    area = area - areaOfRing(coords[i]); // substract holes
  }
  return area;
}

/**
 * Computes the size of a model geometry which has cartesian coordinates.
 * Size is either number of points, length or area depending on the
 * type of the geometry.
 *
 * @param geometry a GeoJSON geometry (not geometry collection).
 * @returns the size of the geometry.
 */
export function sizeOfModelGeometry(geometry: GJ.SingleTypeObject): number {
  switch (geometry.type) {
    case "Point":
      return isCircle(geometry) ? Math.PI * geometry.radius * geometry.radius : 1;

    case "MultiPoint":
      return (
        (isMultiCircle(geometry) ? Math.PI * geometry.radius * geometry.radius : 1) *
        geometry.coordinates.length
      );

    case "LineString":
      return lengthOfLineString(geometry.coordinates);

    case "MultiLineString":
      return geometry.coordinates.reduce((size, coords) => size + lengthOfLineString(coords), 0.0);

    case "Polygon":
      return areaOfSinglePolygon(geometry.coordinates);

    case "MultiPolygon":
      return geometry.coordinates.reduce((size, coords) => size + areaOfSinglePolygon(coords), 0.0);
  }
}

// Below are some functions to ease construction of common
// model geometries.

/**
 * @returns a single point model geometry.
 */
export function pointGeometry(): GJ.Point {
  return { type: "Point", coordinates: [0, 0] };
}

/**
 * @param sideLength the length of the line in meters.
 * @returns a north-south straight line model geometry.
 */
export function straightLineGeometry(sideLength: number = 10.0): GJ.LineString {
  if (sideLength <= 0.0) {
    throw new RangeError("sideLength must be positive");
  }

  const halfSide = sideLength * 0.5;
  return {
    type: "LineString",
    coordinates: [
      [0, halfSide],
      [0, -halfSide],
    ],
  };
}

/**
 * @param sideLength length of side in meters.
 * @returns an ell-shaped line model geometry.
 */
export function ellLineGeometry(sideLength: number = 10.0): GJ.LineString {
  if (sideLength <= 0.0) {
    throw new RangeError("sideLength must be positive");
  }

  const halfSide = sideLength * 0.5;
  return {
    type: "LineString",
    coordinates: [
      [-halfSide, halfSide],
      [-halfSide, -halfSide],
      [halfSide, -halfSide],
    ],
  };
}

/**
 * @param diameter the diameter of the circle in meters.
 * @returns a circle-shaped line model geometry.
 */
export function circleLineGeometry(
  diameter: number = 1.0,
  options?: CirclesToPolygonsOptions,
): GJ.LineString {
  const pointsPerCircle = options?.pointsPerCircle ?? 16;

  if (pointsPerCircle < 3 || !Number.isInteger(pointsPerCircle)) {
    throw new RangeError("sides must be an integer larger than 3");
  } else if (diameter <= 0.0) {
    throw new RangeError("diameter must be positive");
  }

  // use the radius that gives equal area to the polygon for best approximation
  const v = Math.PI / pointsPerCircle;
  const r = diameter * 0.5;

  return regularPolygonLineGeometry(
    pointsPerCircle,
    Math.sqrt((Math.PI * Math.pow(r, 2)) / (pointsPerCircle * Math.sin(v) * Math.cos(v))),
  );
}

/**
 * @param diameter the diameter in meters.
 * @returns a circle model geometry.
 */
export function circleAreaGeometry(diameter: number = 10.0): GJ.Circle {
  if (diameter <= 0.0) {
    throw new RangeError("diameter must be positive");
  }

  return { ...pointGeometry(), radius: diameter * 0.5 };
}

function rectangularCoordinates(width: number = 10.0, height: number = width): GJ.Position2[] {
  if (width <= 0.0 || height <= 0.0) {
    throw new RangeError("width and height must be positive");
  }

  const halfWidth = width * 0.5;
  const halfHeight = height * 0.5;
  return [
    [-halfWidth, halfHeight],
    [-halfWidth, -halfHeight],
    [halfWidth, -halfHeight],
    [halfWidth, halfHeight],
  ];
}

/**
 * @param width length of side west-east in meters.
 * @param height length of side south-north in meters.
 * @returns a point model geometry in a rectangular formation.
 */
export function rectangularPointGeometry(
  width: number = 10.0,
  height: number = width,
): GJ.MultiPoint {
  const coordinates = rectangularCoordinates(width, height);
  return { type: "MultiPoint", coordinates };
}

/**
 * @param width length of side west-east in meters.
 * @param height length of side south-north in meters.
 * @returns a rectangular-shaped line model geometry.
 */
export function rectangularLineGeometry(
  width: number = 10.0,
  height: number = width,
): GJ.LineString {
  const coordinates = rectangularCoordinates(width, height);
  coordinates.push(coordinates[0]);
  return { type: "LineString", coordinates };
}

/**
 * @param width length of side west-east in meters.
 * @param height length of side south-north in meters.
 * @returns a rectangular-shaped area model geometry.
 */
export function rectangularAreaGeometry(width: number = 10.0, height: number = width): GJ.Polygon {
  const coordinates = rectangularCoordinates(width, height);
  coordinates.push(coordinates[0]);
  return { type: "Polygon", coordinates: [coordinates] };
}

/**
 * @param width length of side west-east in meters.
 * @param height length of side south-north in meters.
 * @param diameter the diameter in meters. If diameter is smaller than width, diameter is replaced
 * by width.
 * @returns a circle model geometry in a rectangular formation.
 */
export function rectangularCircleGeometry(
  width: number = 10.0,
  height: number = width,
  diameter: number = 1.0,
): GJ.MultiCircle {
  if (diameter <= 0.0) {
    throw new RangeError("diameter must be positive");
  }

  return { ...rectangularPointGeometry(width, height), radius: Math.min(diameter, width) * 0.5 };
}

function regularPolygonCoordinates(
  sides: number = 3,
  polygonDiameter: number = 1.0,
): GJ.Position2[] {
  if (sides < 3 || !Number.isInteger(sides)) {
    throw new RangeError("sides must be an integer larger than 3");
  } else if (polygonDiameter <= 0.0) {
    throw new RangeError("diameter must be positive");
  }

  const r = polygonDiameter * 0.5;
  const coordinates = Array.from<GJ.Position2>({ length: sides });
  let angle = -Math.PI / sides - Math.PI * 0.5;
  const delta = (2.0 / sides) * Math.PI;

  for (let i = 0; i < sides; i++) {
    coordinates[i] = [r * Math.cos(angle), r * Math.sin(angle)];
    angle += delta;
  }

  return coordinates;
}

/**
 * @param sides the number of sides/vertices.
 * @param polygonDiameter the diameter of the containing circle in meters.
 * @returns a point model geometry in a regular polygon formation.
 */
export function regularPolygonPointGeometry(
  sides: number = 3,
  polygonDiameter: number = 1.0,
): GJ.MultiPoint {
  const coordinates = regularPolygonCoordinates(sides, polygonDiameter);
  return { type: "MultiPoint", coordinates };
}

/**
 * @param sides the number of sides/vertices.
 * @param polygonDiameter the diameter of the containing circle in meters.
 * @returns a regular polygon line model geometry.
 */
export function regularPolygonLineGeometry(
  sides: number = 3,
  polygonDiameter: number = 1.0,
): GJ.LineString {
  const coordinates = regularPolygonCoordinates(sides, polygonDiameter);
  coordinates.push(coordinates[0]);
  return { type: "LineString", coordinates };
}

/**
 * @param sides the number of sides/vertices.
 * @param polygonDiameter the diameter of the containing circle in meters.
 * @returns a regular polygon area model geometry.
 */
export function regularPolygonAreaGeometry(
  sides: number = 3,
  polygonDiameter: number = 1.0,
): GJ.Polygon {
  const coordinates = regularPolygonCoordinates(sides, polygonDiameter);
  coordinates.push(coordinates[0]);
  return { type: "Polygon", coordinates: [coordinates] };
}

/**
 * @param sides the number of sides/vertices.
 * @param polygonDiameter the diameter of the containing circle in meters.
 * @param diameter the diameter of the circles in meters. If diameter is smaller than the distance
 * between the points in the polygon, the diameter is replaced by this distance.
 * @returns a circle model geometry in a regular polygon formation.
 */
export function regularPolygonCircleGeometry(
  sides: number = 3,
  polygonDiameter: number = 10.0,
  diameter: number = 1.0,
): GJ.MultiCircle {
  if (diameter <= 0.0) {
    throw new RangeError("diameter must be positive");
  }

  const coordinates = regularPolygonCoordinates(sides, polygonDiameter);
  const d =
    (coordinates[0][0] - coordinates[1][0]) ** 2 + (coordinates[0][1] - coordinates[1][1]) ** 2;
  let radius = diameter * 0.5;

  if (d < diameter ** 2) {
    radius = Math.sqrt(d) * 0.5;
  }

  return { type: "MultiPoint", coordinates, radius };
}
