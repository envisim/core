import {destination, copy} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

// This file has a set of functions to deal with a model
// feature (tract), which is a GeoJSON feature with cartesian
// coordinates relative to (0,0).
//
// Exports are:
// placeModelTract
// radiusOfModelTract
// sizeOfModelTract
//
// straightLineTract
// ellLineTract
// rectangularLineTract
// squareLineTract
// regularPolygonLineTract
// circleLineTract
//
// circleAreaTract
// squareCircleAreaTract
// rectangularAreaTract
// squareAreaTract
// regularPolygonAreaTract
//
// pointTract
// squarePointTract

// Internal.
const placePoint = (
  point: GeoJSON.Position,
  position: GeoJSON.Position,
  rotation: number,
): GeoJSON.Position => {
  const dist = Math.sqrt(point[0] * point[0] + point[1] * point[1]);
  const angle =
    90 - (Math.atan2(point[1], point[0]) * 180) / Math.PI + rotation;
  return destination(position, dist, angle);
};

// Internal.
const setCoordinatesForGeometry = (
  geoJSON:
    | GeoJSON.Point
    | GeoJSON.MultiPoint
    | GeoJSON.LineString
    | GeoJSON.MultiLineString
    | GeoJSON.Polygon
    | GeoJSON.MultiPolygon,
  position: GeoJSON.Position,
  rotation: number,
): void => {
  switch (geoJSON.type) {
    case 'Point':
      geoJSON.coordinates = placePoint(geoJSON.coordinates, position, rotation);
      break;
    case 'MultiPoint':
    case 'LineString':
      for (let i = 0; geoJSON.coordinates; i++) {
        geoJSON.coordinates[i] = placePoint(
          geoJSON.coordinates[i],
          position,
          rotation,
        );
      }
      break;
    case 'MultiLineString':
    case 'Polygon':
      for (let i = 0; i < geoJSON.coordinates.length; i++) {
        for (let j = 0; j < geoJSON.coordinates[i].length; j++) {
          geoJSON.coordinates[i][j] = placePoint(
            geoJSON.coordinates[i][j],
            position,
            rotation,
          );
        }
      }
      break;
    case 'MultiPolygon':
      for (let i = 0; i < geoJSON.coordinates.length; i++) {
        for (let j = 0; j < geoJSON.coordinates[i].length; j++) {
          for (let k = 0; k < geoJSON.coordinates[i][j].length; k++) {
            geoJSON.coordinates[i][j][k] = placePoint(
              geoJSON.coordinates[i][j][k],
              position,
              rotation,
            );
          }
        }
      }
      break;
    default:
      throw new Error('Not a geometry.');
  }
};

// Internal.
const setCooordinatesForGeometryCollection = (
  geoJSON: GeoJSON.GeometryCollection,
  position: GeoJSON.Position,
  rotation: number,
): void => {
  for (let i = 0; i < geoJSON.geometries.length; i++) {
    let geometry = geoJSON.geometries[i];
    if (geometry.type === 'GeometryCollection') {
      setCooordinatesForGeometryCollection(geometry, position, rotation);
    } else {
      setCoordinatesForGeometry(geometry, position, rotation);
    }
  }
};

/**
 * Positions a modelTract at position and optionally rotates the coordinates around position.
 *
 * @param modelTract - A model Feature with coordinates in meters relative to (0,0). Same structure as GeoJSON Feature.
 * @param position - A position as an array [Lon,Lat].
 * @param opts - An object containing rotation in degrees (optional) and boolean randomRotation (default false).
 * @param opts.rotation - Angel of rotation in degrees from north.
 * @param opts.randomRotation - Boolean true/false for a random rotation (default false).
 * @param opts.rand - Optional instance of Random.
 * @returns - A GeoJSON feature.
 */
export const placeModelTract = (
  modelTract: GeoJSON.Feature,
  position: GeoJSON.Position,
  opts = {rotation: 0, randomRotation: false, rand: new Random()},
): GeoJSON.Feature => {
  let rotation = opts.rotation ?? 0;
  const rand = opts.rand ?? new Random();
  const randomRotation = opts.randomRotation ?? false;
  if (randomRotation) {
    rotation = Math.floor(rand.float() * 360);
  }
  const feature = copy(modelTract);
  if (feature.type !== 'Feature') {
    throw new Error('modelTract is not of type Feature.');
  }
  if (feature.geometry.type === 'GeometryCollection') {
    setCooordinatesForGeometryCollection(feature.geometry, position, rotation);
  } else {
    setCoordinatesForGeometry(feature.geometry, position, rotation);
  }
  //feature.properties._center = position.slice();
  return feature;
};

// Internal, not coordinates in longitude and latitude.
const radiusOfGeometry = (
  geometry:
    | GeoJSON.Point
    | GeoJSON.MultiPoint
    | GeoJSON.LineString
    | GeoJSON.MultiLineString
    | GeoJSON.Polygon
    | GeoJSON.MultiPolygon,
  opts = {_radius: 0},
) => {
  let maxRadius = 0;
  switch (geometry.type) {
    case 'Point':
      if (opts._radius > 0) {
        maxRadius =
          Math.sqrt(
            geometry.coordinates[0] * geometry.coordinates[0] +
              geometry.coordinates[1] * geometry.coordinates[1],
          ) + opts._radius;
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
        if (opts._radius) {
          maxRadius = Math.max(maxRadius, radius + opts._radius);
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
    default:
      throw new Error('Needs a type geometry.');
  }
  return maxRadius;
};

// Internal, not coordinates in longitude and latitude.
const radiusOfGeometryCollection = (
  geometry: GeoJSON.GeometryCollection,
  opts = {_radius: 0},
) => {
  let maxRadius = 0;
  geometry.geometries.forEach((geometry) => {
    if (geometry.type === 'GeometryCollection') {
      maxRadius = Math.max(
        maxRadius,
        radiusOfGeometryCollection(geometry, opts),
      );
    } else {
      maxRadius = Math.max(maxRadius, radiusOfGeometry(geometry, opts));
    }
  });
  return maxRadius;
};

/**
 * Computes the radius of a model tract.
 *
 * @param feature - The model tract.
 * @returns - The radius of the model tract from (0,0).
 */
export const radiusOfModelTract = (feature: GeoJSON.Feature): number => {
  let opts = {_radius: 0};
  if (feature.properties?._radius) {
    opts._radius = feature.properties._radius;
  }
  if (feature.geometry.type === 'GeometryCollection') {
    return radiusOfGeometryCollection(feature.geometry, opts);
  }
  return radiusOfGeometry(feature.geometry, opts);
};

// Internal.
const lengthOfLineString = (coords: GeoJSON.Position[]) => {
  let L = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    L += Math.sqrt(
      Math.pow(coords[i][0] - coords[i + 1][0], 2) +
        Math.pow(coords[i][1] - coords[i + 1][1], 2),
    );
  }
  return L;
};

// Internal.
const areaOfSimplePolygon = (coords: GeoJSON.Position[]): number => {
  let area = 0; // Accumulates area in the loop
  let j = coords.length - 1; // The last vertex is the 'previous' one to the first
  let n = coords.length;
  for (let i = 0; i < n; i++) {
    area += (coords[j][0] + coords[i][0]) * (coords[j][1] - coords[i][1]);
    j = i; //j is previous vertex to i
  }
  return Math.abs(area / 2);
};

// Internal.
const areaOfSinglePolygon = (coords: GeoJSON.Position[][]): number => {
  let area = areaOfSimplePolygon(coords[0]); // full area
  let n = coords.length;
  for (let i = 1; i < n; i++) {
    area = area - areaOfSimplePolygon(coords[i]); // substract holes
  }
  return area;
};

// Internal.
const sizeOfGeometry = (
  geometry:
    | GeoJSON.Point
    | GeoJSON.MultiPoint
    | GeoJSON.LineString
    | GeoJSON.MultiLineString
    | GeoJSON.Polygon
    | GeoJSON.MultiPolygon,
  opts = {_radius: 0},
) => {
  let circles = false;
  let size = 0;
  let radius = 0;
  if (opts._radius > 0) {
    // Treat points as circles.
    circles = true;
    radius = opts._radius;
  }
  switch (geometry.type) {
    case 'Point':
      if (circles) {
        size += Math.PI * radius * radius;
      } else {
        size += 1;
      }
      break;
    case 'MultiPoint':
      if (circles) {
        size += Math.PI * radius * radius * geometry.coordinates.length;
      } else {
        size += geometry.coordinates.length;
      }
      break;
    case 'LineString':
      size = lengthOfLineString(geometry.coordinates);
      break;
    case 'MultiLineString':
      geometry.coordinates.forEach((coords) => {
        size += lengthOfLineString(coords);
      });
      break;
    case 'Polygon':
      size = areaOfSinglePolygon(geometry.coordinates);
      break;
    case 'MultiPolygon':
      geometry.coordinates.forEach((coords) => {
        size += areaOfSinglePolygon(coords);
      });
      break;
    default:
      throw new Error('Not a geometry.');
  }
  return size;
};

/**
 * Computes the size of a model tract which has cartesian coordinates.
 * Size is either number of points, length or area depending on the
 * type of the model tract.
 *
 * @param feature - A GeoJSON format feature tract, but with cartesian coordinates relative to (0,0).
 * @returns - The size of the model tract.
 */
export const sizeOfModelTract = (feature: GeoJSON.Feature): number => {
  // Feature may not contain mixed geometries
  // but may be of type GeometryCollection.
  // Nested GeometryCollections are not supported.
  const opts = {_radius: 0};
  if (feature.properties?._radius) {
    opts._radius = feature.properties._radius;
  }
  let size = 0;
  if (feature.geometry.type === 'GeometryCollection') {
    feature.geometry.geometries.forEach((geometry) => {
      if (geometry.type !== 'GeometryCollection') {
        size += sizeOfGeometry(geometry, opts);
      } else {
        throw new Error('Nested GeometryCollections are not supported.');
      }
    });
  } else {
    size = sizeOfGeometry(feature.geometry, opts);
  }
  return size;
};

// Below are some functions to ease construction of common
// model tract configurations.

/**
 * Returns a model tract with a straight line (north-south direction).
 *
 * @param length - The length of the line in meters.
 * @returns - A model tract.
 */
export const straightLineTract = (length: number): GeoJSON.Feature => {
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
};

/**
 * Returns an ell-shaped line model tract.
 *
 * @param sideLength - Length of side in meters.
 * @returns - A model tract.
 */
export const ellLineTract = (sideLength: number): GeoJSON.Feature => {
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
};

/**
 * Returns a rectangular-shaped line model tract.
 *
 * @param sideLength1 - Length of side west-east in meters.
 * @param sideLength2 - Length of side south-north in meters.
 * @returns - A model tract.
 */
export const rectangularLineTract = (
  sideLength1: number,
  sideLength2: number,
): GeoJSON.Feature => {
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
};

/**
 * Returns a square-shaped line model tract.
 *
 * @param sideLength - Length of side in meters.
 * @returns - A model tract.
 */
export const squareLineTract = (sideLength: number): GeoJSON.Feature => {
  return rectangularLineTract(sideLength, sideLength);
};

/**
 * Returns a circular area model tract.
 *
 * @param radius - The radius in meters.
 * @returns - A model tract.
 */
export const circleAreaTract = (radius: number): GeoJSON.Feature => {
  const r = radius || 10;
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0, 0],
    },
    properties: {
      _radius: r,
    },
  };
};

/**
 * Returns a square shaped area model tract with a circle in
 * each of the four corners.
 *
 * @param sideLength - The side length in meters.
 * @param radius - The radius in meters.
 * @returns - A model tract.
 */
export const squareCircleAreaTract = (
  sideLength: number,
  radius: number,
): GeoJSON.Feature => {
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
        },
        {
          type: 'Point',
          coordinates: [-halfSide, halfSide],
        },
        {
          type: 'Point',
          coordinates: [-halfSide, -halfSide],
        },
        {
          type: 'Point',
          coordinates: [halfSide, -halfSide],
        },
      ],
    },
    properties: {
      _radius: r,
    },
  };
};

/**
 * Returns a rectangular-shaped area model tract.
 *
 * @param sideLength1 - Length of side west-east in meters.
 * @param sideLength2 - Length of side south-north in meters.
 * @returns - A model tract.
 */
export const rectangularAreaTract = (
  sideLength1: number,
  sideLength2: number,
): GeoJSON.Feature => {
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
};

/**
 * Returns a square-shaped area model tract.
 *
 * @param sideLength - Length of side in meters.
 * @returns - A model tract.
 */
export const squareAreaTract = (sideLength: number): GeoJSON.Feature => {
  return rectangularAreaTract(sideLength, sideLength);
};

/**
 * Returns a single point model tract
 *
 * @returns - A model point tract.
 */
export const pointTract = (): GeoJSON.Feature => {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0, 0],
    },
    properties: {},
  };
};

/**
 * Returns a square shaped model tract with a point in
 * each of the four corners.
 *
 * @param sideLength - The side length in meters.
 * @returns - A model tract.
 */
export const squarePointTract = (sideLength: number): GeoJSON.Feature => {
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
};

/**
 * Returns a model area tract as a regular polygon.
 *
 * @param sides - The number of sides/vertices.
 * @param sideLength - The side length in meters.
 * @returns - A model tract.
 */
export const regularPolygonAreaTract = (
  sides: number,
  sideLength: number,
): GeoJSON.Feature => {
  const n = Math.max(Math.round(sides || 3), 3);
  const length = sideLength || 100;
  const r = length / (2 * Math.sin(Math.PI / n));
  const coordinates = [];
  for (let i = 0; i < n + 1; i++) {
    let angle = (i / n) * 2 * Math.PI;
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
};

/**
 * Returns a model line tract as a regular polygon.
 *
 * @param sides - The number of sides/vertices.
 * @param sideLength - The side length in meters.
 * @returns - A model tract.
 */
export const regularPolygonLineTract = (
  sides: number,
  sideLength: number,
): GeoJSON.Feature => {
  const n = Math.max(Math.round(sides || 3), 3);
  const length = sideLength || 100;
  const r = length / (2 * Math.sin(Math.PI / n));
  const coordinates = [];
  for (let i = 0; i < n + 1; i++) {
    let angle = (i / n) * 2 * Math.PI;
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
};

/**
 * Returns a circular model line tract as a regular polygon with 36
 * sides. The area of the polygon matches the area of a circle with
 * the given radius.
 *
 * @param radius - The radius of the circle in meters.
 * @returns - A model tract.
 */
export const circularLineTract = (radius: number): GeoJSON.Feature => {
  const n = 36;
  const v = Math.PI / n;
  // use the radius that gives equal area to the polygon for best approximation
  let r = radius > 0 ? radius : 10;
  r = Math.sqrt((Math.PI * Math.pow(r, 2)) / (n * Math.sin(v) * Math.cos(v)));
  // compute sidelength
  const sideLength = 2 * r * Math.sin(v);
  return regularPolygonLineTract(n, sideLength);
};
