import {
  type AreaObject,
  Circle,
  type GeoJSON as GJ,
  Geodesic,
  type LineObject,
  LineString,
  MultiCircle,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  type PointObject,
  Polygon,
  cutAreaGeometry,
  cutLineGeometry,
  typeGuards,
} from '@envisim/geojson-utils';
import {type RandomGenerator} from '@envisim/random';

// This file has a set of functions to deal with a model
// geometry (tract), which is a GeoJSON geometry with cartesian
// coordinates in meters relative to (0,0).

// Internal.
function placePoint(point: GJ.Position, position: GJ.Position, rotation: number): GJ.Position {
  const dist = Math.sqrt(point[0] * point[0] + point[1] * point[1]);
  const angle = 90.0 - (Math.atan2(point[1], point[0]) * 180.0) / Math.PI + rotation;
  return Geodesic.destination(position, dist, angle);
}

interface PlaceOptions<G extends GJ.SingleTypeObject> {
  modelGeometry: G;
  rotationOfGeometry: number | 'random';
  rand: RandomGenerator;
  buffer: number;
}

/**
 * Positions a modelGeometry at position and optionally rotates the coordinates around position.
 *
 * @param modelGeometry a model Geometry with coordinates in meters relative to (0,0). Same structure as GeoJSON Feature.
 * @param position a position [lon,lat].
 * @param opts an object containing rotation in degrees (optional) and boolean randomRotation (default false).
 * @param opts.rotation angel of rotation in degrees from north.
 * @param opts.randomRotation boolean true/false for a random rotation (default false).
 * @param opts.rand optional instance of Random.
 * @param opts.radius optional radius of modelFeature.
 * @param opts.type optional type of modelFeature ('point','line','area').
 * @returns a GeoJSON Point/Line/AreaObject.
 */
export function placeAreaGeometry(
  position: GJ.Position,
  {modelGeometry, ...opts}: PlaceOptions<GJ.AreaObject>,
): AreaObject {
  const rotation =
    opts.rotationOfGeometry === 'random' ? opts.rand.random() * 360 : opts.rotationOfGeometry;

  if (modelGeometry.type === 'Point') {
    return Circle.create(
      placePoint(modelGeometry.coordinates, position, rotation),
      modelGeometry.radius,
      true,
    );
  } else if (modelGeometry.type === 'MultiPoint') {
    return MultiCircle.create(
      modelGeometry.coordinates.map((p) => placePoint(p, position, rotation)),
      modelGeometry.radius,
      true,
    );
  }

  let geom: GJ.Polygon | GJ.MultiPolygon;
  if (modelGeometry.type === 'Polygon') {
    geom = {
      type: 'Polygon',
      coordinates: modelGeometry.coordinates.map((parr) =>
        parr.map((p) => placePoint(p, position, rotation)),
      ),
    };
  } else {
    geom = {
      type: 'MultiPolygon',
      coordinates: modelGeometry.coordinates.map((pouter) =>
        pouter.map((pinner) => pinner.map((p) => placePoint(p, position, rotation))),
      ),
    };
  }

  // May need cut if area or line as the distance to the antimeridian is less than the radius
  if (Geodesic.distance(position, [180, position[1]]) < opts.buffer) {
    geom = cutAreaGeometry(geom);
  }

  return geom.type === 'Polygon'
    ? Polygon.create(geom.coordinates, true)
    : MultiPolygon.create(geom.coordinates, true);
}

export function placeLineGeometry(
  position: GJ.Position,
  {modelGeometry, ...opts}: PlaceOptions<GJ.LineObject>,
): LineObject {
  const rotation =
    opts.rotationOfGeometry === 'random' ? opts.rand.random() * 360 : opts.rotationOfGeometry;

  let geom: GJ.LineString | GJ.MultiLineString;
  if (modelGeometry.type === 'LineString') {
    geom = {
      type: 'LineString',
      coordinates: modelGeometry.coordinates.map((p) => placePoint(p, position, rotation)),
    };
  } else {
    geom = {
      type: 'MultiLineString',
      coordinates: modelGeometry.coordinates.map((parr) =>
        parr.map((p) => placePoint(p, position, rotation)),
      ),
    };
  }

  // May need cut if area or line as the distance to the antimeridian is less than the radius
  if (Geodesic.distance(position, [180, position[1]]) < opts.buffer) {
    geom = cutLineGeometry(geom);
  }

  return geom.type === 'LineString'
    ? LineString.create(geom.coordinates, true)
    : MultiLineString.create(geom.coordinates, true);
}
export function placePointGeometry(
  position: GJ.Position,
  {modelGeometry, ...opts}: PlaceOptions<GJ.PointObject>,
): PointObject {
  const rotation =
    opts.rotationOfGeometry === 'random' ? opts.rand.random() * 360 : opts.rotationOfGeometry;

  if (modelGeometry.type === 'Point') {
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
    case 'Point':
      return (
        Math.sqrt(
          geometry.coordinates[0] * geometry.coordinates[0] +
            geometry.coordinates[1] * geometry.coordinates[1],
        ) + ((geometry as GJ.Circle).radius ?? 0.0)
      );

    case 'MultiPoint':
      return (
        Math.sqrt(geometry.coordinates.reduce((a, b) => Math.max(a, b[0] ** 2 + b[1] ** 2), 0.0)) +
        ((geometry as GJ.MultiCircle).radius ?? 0.0)
      );

    case 'LineString':
      return Math.sqrt(
        geometry.coordinates.reduce((a, b) => Math.max(a, b[0] ** 2 + b[1] ** 2), 0.0),
      );

    case 'MultiLineString':
      return Math.sqrt(
        geometry.coordinates.reduce(
          (a, ls) => ls.reduce((b, c) => Math.max(b, c[0] ** 2 + c[1] ** 2), a),
          0.0,
        ),
      );

    case 'Polygon':
      // Outer ring is sufficient.
      return Math.sqrt(
        geometry.coordinates[0].reduce((a, b) => Math.max(a, b[0] ** 2 + b[1] ** 2), 0.0),
      );

    case 'MultiPolygon':
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
    case 'Point':
      return typeGuards.isCircle(geometry) ? Math.PI * geometry.radius * geometry.radius : 1;

    case 'MultiPoint':
      return (
        (typeGuards.isMultiCircle(geometry) ? Math.PI * geometry.radius * geometry.radius : 1) *
        geometry.coordinates.length
      );

    case 'LineString':
      return lengthOfLineString(geometry.coordinates);

    case 'MultiLineString':
      return geometry.coordinates.reduce((size, coords) => size + lengthOfLineString(coords), 0.0);

    case 'Polygon':
      return areaOfSinglePolygon(geometry.coordinates);

    case 'MultiPolygon':
      return geometry.coordinates.reduce((size, coords) => size + areaOfSinglePolygon(coords), 0.0);
  }
}

// Below are some functions to ease construction of common
// model geometries.

/**
 * Returns a model geometry with a straight line (north-south direction).
 *
 * @param sideLength the length of the line in meters.
 * @returns a model geometry.
 */
export function straightLineGeometry(sideLength: number = 100.0): GJ.LineString {
  const halfSide = sideLength * 0.5;
  return {
    type: 'LineString',
    coordinates: [
      [0, halfSide],
      [0, -halfSide],
    ],
  };
}

/**
 * Returns an ell-shaped line model geometry.
 *
 * @param sideLength length of side in meters.
 * @returns a model geometry.
 */
export function ellLineGeometry(sideLength: number = 100.0): GJ.LineString {
  const halfSide = sideLength * 0.5;
  return {
    type: 'LineString',
    coordinates: [
      [-halfSide, halfSide],
      [-halfSide, -halfSide],
      [halfSide, -halfSide],
    ],
  };
}

/**
 * Returns a rectangular-shaped line model geometry.
 *
 * @param width length of side west-east in meters.
 * @param height length of side south-north in meters.
 * @returns a model geometry.
 */
export function rectangularLineGeometry(
  width: number = 100.0,
  height: number = 100.0,
): GJ.LineString {
  const halfSide1 = width * 0.5;
  const halfSide2 = height * 0.5;
  return {
    type: 'LineString',
    coordinates: [
      [-halfSide1, halfSide2],
      [-halfSide1, -halfSide2],
      [halfSide1, -halfSide2],
      [halfSide1, halfSide2],
      [-halfSide1, halfSide2],
    ],
  };
}

/**
 * Returns a square-shaped line model geometry.
 *
 * @param sideLength1 length of side west-east in meters.
 * @param sideLength2 length of side south-north in meters.
 * @returns a model geometry.
 */
export function squareLineGeometry(sideLength: number = 100.0): GJ.LineString {
  return rectangularLineGeometry(sideLength, sideLength);
}

/**
 * Returns a circular area model geometry.
 *
 * @param radius the radius in meters.
 * @returns a model geometry.
 */
export function circleAreaGeometry(radius: number = 10.0): GJ.Circle {
  return {
    type: 'Point',
    coordinates: [0, 0],
    radius,
  };
}

/**
 * Returns a square shaped area model geometry with a circle in
 * each of the four corners.
 *
 * @param sideLength the side length in meters.
 * @param radius the radius in meters.
 * @returns a model geometry.
 */
export function squareCircleAreaGeometry(
  sideLength: number = 100.0,
  radius: number = 10.0,
): GJ.MultiCircle {
  const halfSide = sideLength * 0.5;
  return {
    type: 'MultiPoint',
    radius: radius,
    coordinates: [
      [halfSide, halfSide],
      [-halfSide, halfSide],
      [-halfSide, -halfSide],
      [halfSide, -halfSide],
    ],
  };
}

/**
 * Returns a rectangular-shaped area model geometry.
 *
 * @param sideLength1 length of side west-east in meters.
 * @param sideLength2 length of side south-north in meters.
 * @returns a model geometry.
 */
export function rectangularAreaGeometry(
  sideLength1: number = 100.0,
  sideLength2: number = 100.0,
): GJ.Polygon {
  const halfSide1 = sideLength1 * 0.5;
  const halfSide2 = sideLength2 * 0.5;
  return {
    type: 'Polygon',
    coordinates: [
      [
        [-halfSide1, halfSide2],
        [-halfSide1, -halfSide2],
        [halfSide1, -halfSide2],
        [halfSide1, halfSide2],
        [-halfSide1, halfSide2],
      ],
    ],
  };
}

/**
 * Returns a square-shaped area model geometry.
 *
 * @param sideLength length of side in meters.
 * @returns a model geometry.
 */
export function squareAreaGeometry(sideLength: number = 100.0): GJ.Polygon {
  return rectangularAreaGeometry(sideLength, sideLength);
}

/**
 * Returns a single point model geometry.
 *
 * @returns a model point geometry.
 */
export function pointGeometry(): GJ.Point {
  return {
    type: 'Point',
    coordinates: [0, 0],
  };
}

/**
 * Returns a square shaped model geometry with a point in
 * each of the four corners.
 *
 * @param sideLength the side length in meters.
 * @returns a model geometry.
 */
export function squarePointGeometry(sideLength: number = 100.0): GJ.MultiPoint {
  const halfSide = sideLength * 0.5;
  return {
    type: 'MultiPoint',
    coordinates: [
      [-halfSide, halfSide],
      [-halfSide, -halfSide],
      [halfSide, -halfSide],
      [halfSide, halfSide],
    ],
  };
}

/**
 * Returns a model area geometry as a regular polygon.
 *
 * @param sides the number of sides/vertices.
 * @param radius the radius in meters.
 * @returns a model geometry.
 */
export function regularPolygonAreaGeometry(sides: number = 3, radius: number = 0.05): GJ.Polygon {
  const n = Math.max(Math.round(sides), 3);
  const r = Math.max(radius, 0.05);
  const coordinates: GJ.Position[] = [];
  const startAngle = -Math.PI / n - Math.PI * 0.5;

  for (let i = 0; i < n + 1; i++) {
    const angle = startAngle + (i / n) * 2 * Math.PI;
    coordinates.push([r * Math.cos(angle), r * Math.sin(angle)]);
  }

  return {
    type: 'Polygon',
    coordinates: [coordinates],
  };
}

/**
 * Returns a model line geometry as a regular polygon.
 *
 * @param sides the number of sides/vertices.
 * @param radius the radius in meters.
 * @returns a model geometry.
 */
export function regularPolygonLineGeometry(
  sides: number = 3,
  radius: number = 0.05,
): GJ.LineString {
  const n = Math.max(Math.round(sides), 3);
  const r = Math.max(radius, 0.05);
  const coordinates: GJ.Position[] = [];
  const startAngle = -Math.PI / n - Math.PI * 0.5;

  for (let i = 0; i < n + 1; i++) {
    const angle = startAngle + (i / n) * 2 * Math.PI;
    coordinates.push([r * Math.cos(angle), r * Math.sin(angle)]);
  }

  return {
    type: 'LineString',
    coordinates: coordinates,
  };
}

/**
 * Returns a model point geometry as a regular polygon.
 *
 * @param sides the number of sides/vertices.
 * @param radius the radius in meters.
 * @returns a model geometry.
 */
export function regularPolygonPointGeometry(
  sides: number = 3,
  radius: number = 0.05,
): GJ.MultiPoint {
  const n = Math.max(Math.round(sides), 3);
  const r = Math.max(radius);
  const coordinates: GJ.Position[] = [];
  const startAngle = -Math.PI / n - Math.PI * 0.5;

  for (let i = 0; i < n; i++) {
    const angle = startAngle + (i / n) * 2 * Math.PI;
    coordinates.push([r * Math.cos(angle), r * Math.sin(angle)]);
  }

  return {
    type: 'MultiPoint',
    coordinates: coordinates,
  };
}

/**
 * Returns a circular model line geometry as a regular polygon with 36
 * sides. The area of the polygon matches the area of a circle with
 * the given radius.
 *
 * @param radius the radius of the circle in meters.
 * @returns a model geometry.
 */
export function circleLineGeometry(radius: number = 10): GJ.LineString {
  const n = 36;
  const v = Math.PI / n;
  // use the radius that gives equal area to the polygon for best approximation
  const r = radius > 0 ? radius : 10;
  return regularPolygonLineGeometry(
    n,
    Math.sqrt((Math.PI * Math.pow(r, 2)) / (n * Math.sin(v) * Math.cos(v))),
  );
}
