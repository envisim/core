import {
  type GeoJSON as GJ,
  Geodesic,
  GeometricPrimitive,
  cutAreaGeometry,
  cutLineGeometry,
  getFeaturePrimitive,
  typeGuards,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';
import {copy} from '@envisim/utils';

// This file has a set of functions to deal with a model
// feature (tract), which is a GeoJSON feature with cartesian
// coordinates in meters relative to (0,0).

// Internal.
function placePoint(
  point: GJ.Position,
  position: GJ.Position,
  rotation: number,
): GJ.Position {
  const dist = Math.sqrt(point[0] * point[0] + point[1] * point[1]);
  const angle =
    90 - (Math.atan2(point[1], point[0]) * 180) / Math.PI + rotation;
  return Geodesic.destination(position, dist, angle);
}

// Internal.
function setCoordinatesForGeometry(
  geometry: GJ.Geometry,
  position: GJ.Position,
  rotation: number,
): void {
  switch (geometry.type) {
    case 'Point':
      geometry.coordinates = placePoint(
        geometry.coordinates,
        position,
        rotation,
      );
      break;
    case 'MultiPoint':
    case 'LineString':
      for (let i = 0; geometry.coordinates; i++) {
        geometry.coordinates[i] = placePoint(
          geometry.coordinates[i],
          position,
          rotation,
        );
      }
      break;
    case 'MultiLineString':
    case 'Polygon':
      for (let i = 0; i < geometry.coordinates.length; i++) {
        for (let j = 0; j < geometry.coordinates[i].length; j++) {
          geometry.coordinates[i][j] = placePoint(
            geometry.coordinates[i][j],
            position,
            rotation,
          );
        }
      }
      break;
    case 'MultiPolygon':
      for (let i = 0; i < geometry.coordinates.length; i++) {
        for (let j = 0; j < geometry.coordinates[i].length; j++) {
          for (let k = 0; k < geometry.coordinates[i][j].length; k++) {
            geometry.coordinates[i][j][k] = placePoint(
              geometry.coordinates[i][j][k],
              position,
              rotation,
            );
          }
        }
      }
      break;
    case 'GeometryCollection':
      for (let i = 0; i < geometry.geometries.length; i++) {
        setCoordinatesForGeometry(geometry.geometries[i], position, rotation);
      }
      break;
    default:
      throw new Error('Not a geometry.');
  }
}

type PlaceOpts = {
  rotation: number;
  randomRotation: boolean;
  rand: Random;
  radius?: number;
  type?:
    | GeometricPrimitive.POINT
    | GeometricPrimitive.LINE
    | GeometricPrimitive.AREA;
};

/**
 * Positions a modelFeature at position and optionally rotates the coordinates around position.
 *
 * @param modelFeature a model Feature with coordinates in meters relative to (0,0). Same structure as GeoJSON Feature.
 * @param position a position [lon,lat].
 * @param opts an object containing rotation in degrees (optional) and boolean randomRotation (default false).
 * @param opts.rotation angel of rotation in degrees from north.
 * @param opts.randomRotation boolean true/false for a random rotation (default false).
 * @param opts.rand optional instance of Random.
 * @param opts.radius optional radius of modelFeature.
 * @param opts.type optional type of modelFeature ('point','line','area').
 * @returns a GeoJSON Point/Line/AreaFeature.
 */
function placeModelFeature(
  modelFeature: GJ.PointFeature,
  position: GJ.Position,
  opts: PlaceOpts,
): GJ.PointFeature;
function placeModelFeature(
  modelFeature: GJ.LineFeature,
  position: GJ.Position,
  opts: PlaceOpts,
): GJ.LineFeature;
function placeModelFeature(
  modelFeature: GJ.AreaFeature,
  position: GJ.Position,
  opts: PlaceOpts,
): GJ.AreaFeature;
function placeModelFeature(
  modelFeature: GJ.PointFeature | GJ.LineFeature | GJ.AreaFeature,
  position: GJ.Position,
  opts: PlaceOpts = {rotation: 0, randomRotation: false, rand: new Random()},
) {
  let rotation = opts.rotation ?? 0;
  const rand = opts.rand ?? new Random();
  const randomRotation = opts.randomRotation ?? false;
  if (randomRotation) {
    rotation = Math.floor(rand.float() * 360);
  }
  const feature = copy(modelFeature);
  if (feature.type !== 'Feature') {
    throw new Error('modelFeature is not of type Feature.');
  }
  const radius = opts.radius ?? radiusOfGeometry(feature.geometry);
  const type = opts.type ?? getFeaturePrimitive(feature);
  setCoordinatesForGeometry(feature.geometry, position, rotation);

  // check if antimeridian cut may be needed here

  if (Geodesic.distance(position, [180, position[1]]) < radius) {
    // May need cut if area or line as the distance to the antimeridian is less than the radius
    if (type === GeometricPrimitive.AREA) {
      feature.geometry = cutAreaGeometry(feature.geometry as GJ.AreaGeometry);
    } else if (type === GeometricPrimitive.LINE) {
      feature.geometry = cutLineGeometry(feature.geometry as GJ.LineGeometry);
    }
  }
  return feature;
}
export {placeModelFeature};

// Internal, not coordinates in longitude and latitude.
function radiusOfGeometry(geometry: GJ.Geometry) {
  let maxRadius = 0;
  switch (geometry.type) {
    case 'Point':
      if (typeGuards.isCircle(geometry)) {
        maxRadius =
          Math.sqrt(
            geometry.coordinates[0] * geometry.coordinates[0] +
              geometry.coordinates[1] * geometry.coordinates[1],
          ) + geometry.radius;
      } else {
        maxRadius = Math.sqrt(
          geometry.coordinates[0] * geometry.coordinates[0] +
            geometry.coordinates[1] * geometry.coordinates[1],
        );
      }
      break;
    case 'MultiPoint':
      geometry.coordinates.forEach((coord) => {
        const radius = Math.sqrt(coord[0] * coord[0] + coord[1] * coord[1]);
        if (typeGuards.isMultiCircle(geometry)) {
          maxRadius = Math.max(maxRadius, radius + geometry.radius);
        } else {
          maxRadius = Math.max(maxRadius, radius);
        }
      });
      break;
    case 'LineString':
      geometry.coordinates.forEach((coord) => {
        maxRadius = Math.max(
          maxRadius,
          Math.sqrt(coord[0] * coord[0] + coord[1] * coord[1]),
        );
      });
      break;
    case 'MultiLineString':
      geometry.coordinates.forEach((coords) => {
        coords.forEach((coord) => {
          maxRadius = Math.max(
            maxRadius,
            Math.sqrt(coord[0] * coord[0] + coord[1] * coord[1]),
          );
        });
      });
      break;
    case 'Polygon':
      // Outer ring is sufficient.
      geometry.coordinates[0].forEach((coord) => {
        maxRadius = Math.max(
          maxRadius,
          Math.sqrt(coord[0] * coord[0] + coord[1] * coord[1]),
        );
      });
      break;
    case 'MultiPolygon':
      geometry.coordinates.forEach((coords) => {
        // Outer ring for each polygon is sufficient.
        coords[0].forEach((coord) => {
          maxRadius = Math.max(
            maxRadius,
            Math.sqrt(coord[0] * coord[0] + coord[1] * coord[1]),
          );
        });
      });
      break;
    case 'GeometryCollection':
      geometry.geometries.forEach((geometry) => {
        maxRadius = Math.max(maxRadius, radiusOfGeometry(geometry));
      });
      break;
    default:
      throw new Error('Needs a type geometry.');
  }
  return maxRadius;
}

/**
 * Computes the radius of a model feature.
 *
 * @param feature the model feature.
 * @returns the radius of the model feature from (0,0).
 */
export function radiusOfModelFeature(
  feature: GJ.PointFeature | GJ.LineFeature | GJ.AreaFeature,
): number {
  return radiusOfGeometry(feature.geometry);
}

// Internal.
function lengthOfLineString(coords: GJ.Position[]) {
  let L = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    L += Math.sqrt(
      Math.pow(coords[i][0] - coords[i + 1][0], 2) +
        Math.pow(coords[i][1] - coords[i + 1][1], 2),
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

// Internal.
function sizeOfGeometry(geometry: GJ.Geometry): number {
  switch (geometry.type) {
    case 'Point':
      if (typeGuards.isCircle(geometry)) {
        return Math.PI * geometry.radius * geometry.radius;
      } else {
        return 1;
      }
    case 'MultiPoint':
      if (typeGuards.isMultiCircle(geometry)) {
        return (
          Math.PI *
          geometry.radius *
          geometry.radius *
          geometry.coordinates.length
        );
      } else {
        return geometry.coordinates.length;
      }
    case 'LineString':
      return lengthOfLineString(geometry.coordinates);
    case 'MultiLineString':
      return geometry.coordinates.reduce(
        (size, coords) => size + lengthOfLineString(coords),
        0.0,
      );
    case 'Polygon':
      return areaOfSinglePolygon(geometry.coordinates);
    case 'MultiPolygon':
      return geometry.coordinates.reduce(
        (size, coords) => size + areaOfSinglePolygon(coords),
        0.0,
      );
    case 'GeometryCollection':
      return geometry.geometries.reduce(
        (size, g) => size + sizeOfGeometry(g),
        0.0,
      );
    default:
      throw new Error('Not a geometry.');
  }
}

/**
 * Computes the size of a model feature which has cartesian coordinates.
 * Size is either number of points, length or area depending on the
 * type of the model tract.
 *
 * @param feature a GeoJSON format feature, but with cartesian coordinates relative to (0,0).
 * @returns the size of the model feature.
 */
export function sizeOfModelFeature(
  feature: GJ.PointFeature | GJ.LineFeature | GJ.AreaFeature,
): number {
  return sizeOfGeometry(feature.geometry);
}

// Below are some functions to ease construction of common
// model feature configurations.

/**
 * Returns a model feature with a straight line (north-south direction).
 *
 * @param length the length of the line in meters.
 * @returns a model feature.
 */
export function straightLineFeature(length: number): GJ.LineFeature {
  const sideLength = length || 100;
  const halfSide = sideLength / 2;
  return {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [0, halfSide],
        [0, -halfSide],
      ],
    },
    properties: {},
  };
}

/**
 * Returns an ell-shaped line model feature.
 *
 * @param sideLength length of side in meters.
 * @returns a model feature.
 */
export function ellLineFeature(sideLength: number): GJ.LineFeature {
  const length = sideLength || 100;
  const halfSide = length / 2;
  return {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [-halfSide, halfSide],
        [-halfSide, -halfSide],
        [halfSide, -halfSide],
      ],
    },
    properties: {},
  };
}

/**
 * Returns a rectangular-shaped line model feature.
 *
 * @param sideLength1 length of side west-east in meters.
 * @param sideLength2 length of side south-north in meters.
 * @returns a model feature.
 */
export function rectangularLineFeature(
  sideLength1: number,
  sideLength2: number,
): GJ.LineFeature {
  const halfSide1 = (sideLength1 || 100) / 2;
  const halfSide2 = (sideLength2 || 100) / 2;
  return {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [-halfSide1, halfSide2],
        [-halfSide1, -halfSide2],
        [halfSide1, -halfSide2],
        [halfSide1, halfSide2],
        [-halfSide1, halfSide2],
      ],
    },
    properties: {},
  };
}

/**
 * Returns a square-shaped line model feature.
 *
 * @param sideLength1 length of side west-east in meters.
 * @param sideLength2 length of side south-north in meters.
 * @returns a model feature.
 */
export function squareLineFeature(sideLength: number): GJ.LineFeature {
  return rectangularLineFeature(sideLength, sideLength);
}

/**
 * Returns a circular area model feature.
 *
 * @param radius the radius in meters.
 * @returns a model tract.
 */
export function circleAreaFeature(radius: number): GJ.AreaFeature {
  const r = radius || 10;
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0, 0],
      radius: r,
    },
    properties: {},
  };
}

/**
 * Returns a square shaped area model feature with a circle in
 * each of the four corners.
 *
 * @param sideLength the side length in meters.
 * @param radius the radius in meters.
 * @returns a model feature.
 */
export function squareCircleAreaFeature(
  sideLength: number,
  radius: number,
): GJ.AreaFeature {
  const r = radius || 10;
  const length = sideLength || 100;
  const halfSide = length / 2;
  return {
    type: 'Feature',
    geometry: {
      type: 'GeometryCollection',
      geometries: [
        {
          type: 'Point',
          coordinates: [halfSide, halfSide],
          radius: r,
        },
        {
          type: 'Point',
          coordinates: [-halfSide, halfSide],
          radius: r,
        },
        {
          type: 'Point',
          coordinates: [-halfSide, -halfSide],
          radius: r,
        },
        {
          type: 'Point',
          coordinates: [halfSide, -halfSide],
          radius: r,
        },
      ],
    },
    properties: {},
  };
}

/**
 * Returns a rectangular-shaped area model feature.
 *
 * @param sideLength1 length of side west-east in meters.
 * @param sideLength2 length of side south-north in meters.
 * @returns a model feature.
 */
export function rectangularAreaFeature(
  sideLength1: number,
  sideLength2: number,
): GJ.AreaFeature {
  const halfSide1 = (sideLength1 || 100) / 2;
  const halfSide2 = (sideLength2 || 100) / 2;
  return {
    type: 'Feature',
    geometry: {
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
    },
    properties: {},
  };
}

/**
 * Returns a square-shaped area model feature.
 *
 * @param sideLength length of side in meters.
 * @returns a model feature.
 */
export function squareAreaFeature(sideLength: number): GJ.AreaFeature {
  return rectangularAreaFeature(sideLength, sideLength);
}

/**
 * Returns a single point model feature
 *
 * @returns a model point feature.
 */
export function pointFeature(): GJ.PointFeature {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0, 0],
    },
    properties: {},
  };
}

/**
 * Returns a square shaped model feature with a point in
 * each of the four corners.
 *
 * @param sideLength the side length in meters.
 * @returns a model feature.
 */
export function squarePointFeature(sideLength: number): GJ.PointFeature {
  const length = sideLength || 100;
  const halfSide = length / 2;
  return {
    type: 'Feature',
    geometry: {
      type: 'MultiPoint',
      coordinates: [
        [-halfSide, halfSide],
        [-halfSide, -halfSide],
        [halfSide, -halfSide],
        [halfSide, halfSide],
      ],
    },
    properties: {},
  };
}

/**
 * Returns a model area feature as a regular polygon.
 *
 * @param sides the number of sides/vertices.
 * @param radius the radius in meters.
 * @returns a model feature.
 */
export function regularPolygonAreaFeature(
  sides: number,
  radius: number,
): GJ.AreaFeature {
  const n = Math.max(Math.round(sides || 3), 3);
  const r = Math.max(radius, 0.05);
  const coordinates: GJ.Position[] = [];
  const startAngle = -Math.PI / n - Math.PI / 2;

  for (let i = 0; i < n + 1; i++) {
    const angle = startAngle + (i / n) * 2 * Math.PI;
    coordinates.push([r * Math.cos(angle), r * Math.sin(angle)]);
  }

  return {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [coordinates],
    },
    properties: {},
  };
}

/**
 * Returns a model line feature as a regular polygon.
 *
 * @param sides the number of sides/vertices.
 * @param radius the radius in meters.
 * @returns a model feature.
 */
export function regularPolygonLineFeature(
  sides: number,
  radius: number,
): GJ.LineFeature {
  const n = Math.max(Math.round(sides || 3), 3);
  const r = Math.max(radius, 0.05);
  const coordinates: GJ.Position[] = [];
  const startAngle = -Math.PI / n - Math.PI / 2;

  for (let i = 0; i < n + 1; i++) {
    const angle = startAngle + (i / n) * 2 * Math.PI;
    coordinates.push([r * Math.cos(angle), r * Math.sin(angle)]);
  }

  return {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: coordinates,
    },
    properties: {},
  };
}

/**
 * Returns a model point feature as a regular polygon.
 *
 * @param sides the number of sides/vertices.
 * @param radius the radius in meters.
 * @returns a model feature.
 */
export function regularPolygonPointFeature(
  sides: number,
  radius: number,
): GJ.PointFeature {
  const n = Math.max(Math.round(sides || 3), 3);
  const r = Math.max(radius, 0.05);
  const coordinates: GJ.Position[] = [];
  const startAngle = -Math.PI / n - Math.PI / 2;

  for (let i = 0; i < n; i++) {
    const angle = startAngle + (i / n) * 2 * Math.PI;
    coordinates.push([r * Math.cos(angle), r * Math.sin(angle)]);
  }

  return {
    type: 'Feature',
    geometry: {
      type: 'MultiPoint',
      coordinates: coordinates,
    },
    properties: {},
  };
}

/**
 * Returns a circular model line feature as a regular polygon with 36
 * sides. The area of the polygon matches the area of a circle with
 * the given radius.
 *
 * @param radius the radius of the circle in meters.
 * @returns a model feature.
 */
export function circleLineFeature(radius: number): GJ.LineFeature {
  const n = 36;
  const v = Math.PI / n;
  // use the radius that gives equal area to the polygon for best approximation
  let r = radius > 0 ? radius : 10;
  r = Math.sqrt((Math.PI * Math.pow(r, 2)) / (n * Math.sin(v) * Math.cos(v)));
  return regularPolygonLineFeature(n, r);
}
