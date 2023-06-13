import {
  AreaFeature,
  LineFeature,
  LineString,
  intersectLineAreaFeatures,
  GeoJSON,
} from '../src/index.js';
import {
  intersectLineAreaFeatures as iLAF,
  segmentInPolygons,
} from '../src/intersectLineAreaFeatures2.js';
import {
  intersectLineAreaFeatures as iLAF2,
  segmentIntersectsAreas,
} from '../src/intersectLineAreaFeatures4.js';
import {intersectLineAreaFeatures as iLAF3} from '../src/intersectLineAreaFeatures5.js';
import {Segment} from '../src/utils/intersectSegments.js';
import './_equalArrays.testf';

// describe('intersectLinePolygonFeatures 2', () => {
//   const polycoords: GeoJSON.Position[][] = [
//     [
//       [-0.5, -0.5],
//       [0.5, -0.5],
//       [0.5, 0.5],
//       [-0.5, 0.5],
//       [-0.5, -0.5],
//     ],
//   ];
//   const polycoords2: GeoJSON.Position[][] = [
//     [
//       [0.0, -1.0],
//       [0.0, 1.0],
//       [1.0, 1.0],
//       [1.0, -1.0],
//       [0.0, -1.0],
//     ],
//   ];
//   const linecoords: GeoJSON.Position[] = [
//     [-2, 0],
//     [-0.5, 0],
//     [0, 0.1],
//     [0.1, 0],
//     [0.4, 0],
//     [0.5, 0],
//     [2, 0],
//   ];
//   const line = LineFeature.create(
//     {
//       type: 'LineString',
//       coordinates: linecoords,
//     },
//     {},
//     true,
//   );

//   test('Simple polygon', () => {
//     const polygon = AreaFeature.create({
//       type: 'Polygon',
//       coordinates: polycoords,
//     });

//     const intersection = iLAF(line, polygon) as LineFeature;
//     expect(intersection).not.toBeNull();

//     // console.log(intersection.geometry);
//     // console.log((intersection.geometry as LineString).coordinates);
//     expect(LineString.isObject(intersection.geometry)).toBe(true);
//     const coords = (intersection.geometry as LineString).coordinates;

//     expect(coords.length).toBe(5);
//     expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
//     expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
//     expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
//     expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
//     expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
//   });

//   test('Overlapping multipolygon', () => {
//     const polygon = AreaFeature.create({
//       type: 'MultiPolygon',
//       coordinates: [polycoords, polycoords],
//     });

//     const intersection = iLAF(line, polygon) as LineFeature;
//     expect(intersection).not.toBeNull();

//     expect(LineString.isObject(intersection.geometry)).toBe(true);
//     const coords = (intersection.geometry as LineString).coordinates;

//     expect(coords.length).toBe(5);
//     expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
//     expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
//     expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
//     expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
//     expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
//   });

//   test('Three multipolygons', () => {
//     const polygon = AreaFeature.create({
//       type: 'MultiPolygon',
//       coordinates: [polycoords, polycoords, polycoords2],
//     });

//     const intersection = iLAF(line, polygon) as LineFeature;
//     expect(intersection).not.toBeNull();

//     expect(LineString.isObject(intersection.geometry)).toBe(true);
//     const coords = (intersection.geometry as LineString).coordinates;

//     expect(coords.length).toBe(6);
//     expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
//     expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
//     expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
//     expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
//     expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
//     expect(coords[5]).arrayToAlmostEqual([1.0, 0.0], 1e-9);
//   });
// });

// describe('intersectLinePolygonFeatures 4', () => {
//   const polycoords: GeoJSON.Position[][] = [
//     [
//       [-0.5, -0.5],
//       [0.5, -0.5],
//       [0.5, 0.5],
//       [-0.5, 0.5],
//       [-0.5, -0.5],
//     ],
//   ];
//   const polycoords2: GeoJSON.Position[][] = [
//     [
//       [0.0, -1.0],
//       [0.0, 1.0],
//       [1.0, 1.0],
//       [1.0, -1.0],
//       [0.0, -1.0],
//     ],
//   ];
//   const linecoords: GeoJSON.Position[] = [
//     [-2, 0],
//     [-0.5, 0],
//     [0, 0.1],
//     [0.1, 0],
//     [0.4, 0],
//     [0.5, 0],
//     [2, 0],
//   ];
//   const line = LineFeature.create(
//     {
//       type: 'LineString',
//       coordinates: linecoords,
//     },
//     {},
//     true,
//   );

//   test('Simple polygon', () => {
//     const polygon = AreaFeature.create({
//       type: 'Polygon',
//       coordinates: polycoords,
//     });

//     const intersection = iLAF2(line, polygon) as LineFeature;
//     expect(intersection).not.toBeNull();

//     // console.log(intersection.geometry);
//     // console.log((intersection.geometry as LineString).coordinates);
//     expect(LineString.isObject(intersection.geometry)).toBe(true);
//     const coords = (intersection.geometry as LineString).coordinates;

//     expect(coords.length).toBe(5);
//     expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
//     expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
//     expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
//     expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
//     expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
//   });

//   test('Overlapping multipolygon', () => {
//     const polygon = AreaFeature.create({
//       type: 'MultiPolygon',
//       coordinates: [polycoords, polycoords],
//     });

//     const intersection = iLAF2(line, polygon) as LineFeature;
//     expect(intersection).not.toBeNull();

//     expect(LineString.isObject(intersection.geometry)).toBe(true);
//     const coords = (intersection.geometry as LineString).coordinates;

//     expect(coords.length).toBe(5);
//     expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
//     expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
//     expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
//     expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
//     expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
//   });

//   test('Three multipolygons', () => {
//     const polygon = AreaFeature.create({
//       type: 'MultiPolygon',
//       coordinates: [polycoords, polycoords, polycoords2],
//     });

//     const intersection = iLAF2(line, polygon) as LineFeature;
//     expect(intersection).not.toBeNull();

//     expect(LineString.isObject(intersection.geometry)).toBe(true);
//     const coords = (intersection.geometry as LineString).coordinates;

//     expect(coords.length).toBe(6);
//     expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
//     expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
//     expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
//     expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
//     expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
//     expect(coords[5]).arrayToAlmostEqual([1.0, 0.0], 1e-9);
//   });
// });

// describe('intersectLinePolygonFeatures 5', () => {
//   const polycoords: GeoJSON.Position[][] = [
//     [
//       [-0.5, -0.5],
//       [0.5, -0.5],
//       [0.5, 0.5],
//       [-0.5, 0.5],
//       [-0.5, -0.5],
//     ],
//   ];
//   const polycoords2: GeoJSON.Position[][] = [
//     [
//       [0.0, -1.0],
//       [0.0, 1.0],
//       [1.0, 1.0],
//       [1.0, -1.0],
//       [0.0, -1.0],
//     ],
//   ];
//   const linecoords: GeoJSON.Position[] = [
//     [-2, 0],
//     [-0.5, 0],
//     [0, 0.1],
//     [0.1, 0],
//     [0.4, 0],
//     [0.5, 0],
//     [2, 0],
//   ];
//   const line = LineFeature.create(
//     {
//       type: 'LineString',
//       coordinates: linecoords,
//     },
//     {},
//     true,
//   );

//   test('Simple polygon', () => {
//     const polygon = AreaFeature.create({
//       type: 'Polygon',
//       coordinates: polycoords,
//     });

//     const intersection = iLAF3(line, polygon) as LineFeature;
//     expect(intersection).not.toBeNull();

//     // console.log(intersection.geometry);
//     // console.log((intersection.geometry as LineString).coordinates);
//     expect(LineString.isObject(intersection.geometry)).toBe(true);
//     const coords = (intersection.geometry as LineString).coordinates;

//     expect(coords.length).toBe(5);
//     expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
//     expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
//     expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
//     expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
//     expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
//   });

//   test('Overlapping multipolygon', () => {
//     const polygon = AreaFeature.create({
//       type: 'MultiPolygon',
//       coordinates: [polycoords, polycoords],
//     });

//     const intersection = iLAF3(line, polygon) as LineFeature;
//     expect(intersection).not.toBeNull();

//     expect(LineString.isObject(intersection.geometry)).toBe(true);
//     const coords = (intersection.geometry as LineString).coordinates;

//     expect(coords.length).toBe(5);
//     expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
//     expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
//     expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
//     expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
//     expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
//   });

//   test('Three multipolygons', () => {
//     const polygon = AreaFeature.create({
//       type: 'MultiPolygon',
//       coordinates: [polycoords, polycoords, polycoords2],
//     });

//     const intersection = iLAF3(line, polygon) as LineFeature;
//     expect(intersection).not.toBeNull();

//     expect(LineString.isObject(intersection.geometry)).toBe(true);
//     const coords = (intersection.geometry as LineString).coordinates;

//     expect(coords.length).toBe(6);
//     expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
//     expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
//     expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
//     expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
//     expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
//     expect(coords[5]).arrayToAlmostEqual([1.0, 0.0], 1e-9);
//   });
// });

// describe('speed check', () => {
//   const polycoords: GeoJSON.Position[][] = [
//     [
//       [-0.5, -0.5],
//       [0.5, -0.5],
//       [0.5, 0.5],
//       [-0.5, 0.5],
//       [-0.5, -0.5],
//     ],
//   ];
//   const polycoords2: GeoJSON.Position[][] = [
//     [
//       [0.0, -1.0],
//       [0.0, 1.0],
//       [1.0, 1.0],
//       [1.0, -1.0],
//       [0.0, -1.0],
//     ],
//   ];
//   const linecoords: GeoJSON.Position[] = [
//     [-2, 0],
//     [-0.5, 0],
//     [0, 0.1],
//     [0.1, 0],
//     [0.4, 0],
//     [0.5, 0],
//     [2, 0],
//   ];
//   const line = LineFeature.create(
//     {
//       type: 'LineString',
//       coordinates: linecoords,
//     },
//     {},
//     true,
//   );
//   const multline = LineFeature.create(
//     {
//       type: 'MultiLineString',
//       coordinates: [linecoords, linecoords, linecoords],
//     },
//     {},
//     true,
//   );

//   const NRUN = 100000;
//   const polygon = AreaFeature.create({
//     type: 'Polygon',
//     coordinates: polycoords,
//   });
//   const multpolygon = AreaFeature.create({
//     type: 'MultiPolygon',
//     coordinates: [polycoords, polycoords],
//   });
//   const multpolygon2 = AreaFeature.create({
//     type: 'MultiPolygon',
//     coordinates: [
//       polycoords,
//       polycoords,
//       polycoords2,
//       polycoords2,
//       polycoords2,
//     ],
//   });

//   let start: number;
//   let stop: number[] = [0, 0, 0, 0];

//   start = Date.now();
//   for (let i = 0; i < NRUN; i++) iLAF(line, polygon);
//   stop[0] = Date.now() - start;

//   start = Date.now();
//   for (let i = 0; i < NRUN; i++) intersectLineAreaFeatures(line, polygon);
//   stop[1] = Date.now() - start;

//   start = Date.now();
//   for (let i = 0; i < NRUN; i++) iLAF2(line, polygon);
//   stop[2] = Date.now() - start;

//   start = Date.now();
//   for (let i = 0; i < NRUN; i++) iLAF3(line, polygon);
//   stop[3] = Date.now() - start;

//   console.log('1-1', stop);

//   // =========

//   start = Date.now();
//   for (let i = 0; i < NRUN; i++) iLAF(line, multpolygon);
//   stop[0] = Date.now() - start;

//   start = Date.now();
//   for (let i = 0; i < NRUN; i++) intersectLineAreaFeatures(line, multpolygon);
//   stop[1] = Date.now() - start;

//   start = Date.now();
//   for (let i = 0; i < NRUN; i++) iLAF2(line, multpolygon);
//   stop[2] = Date.now() - start;

//   start = Date.now();
//   for (let i = 0; i < NRUN; i++) iLAF3(line, multpolygon);
//   stop[3] = Date.now() - start;

//   console.log('1-2', stop);

//   // =========

//   start = Date.now();
//   for (let i = 0; i < NRUN; i++) iLAF(line, multpolygon2);
//   stop[0] = Date.now() - start;

//   start = Date.now();
//   for (let i = 0; i < NRUN; i++) intersectLineAreaFeatures(line, multpolygon2);
//   stop[1] = Date.now() - start;

//   start = Date.now();
//   for (let i = 0; i < NRUN; i++) iLAF2(line, multpolygon2);
//   stop[2] = Date.now() - start;

//   start = Date.now();
//   for (let i = 0; i < NRUN; i++) iLAF3(line, multpolygon2);
//   stop[3] = Date.now() - start;

//   console.log('1-3', stop);

//   // =========

//   start = Date.now();
//   for (let i = 0; i < NRUN; i++) iLAF(multline, multpolygon2);
//   stop[0] = Date.now() - start;

//   start = Date.now();
//   for (let i = 0; i < NRUN; i++)
//     intersectLineAreaFeatures(multline, multpolygon2);
//   stop[1] = Date.now() - start;

//   start = Date.now();
//   for (let i = 0; i < NRUN; i++) iLAF2(multline, multpolygon2);
//   stop[2] = Date.now() - start;

//   start = Date.now();
//   for (let i = 0; i < NRUN; i++) iLAF3(multline, multpolygon2);
//   stop[3] = Date.now() - start;

//   console.log('3-3', stop);
// });

describe('speed', () => {
  const polycoords: GeoJSON.Position[][] = [
    [
      [-0.5, -0.5],
      [0.5, -0.5],
      [0.5, 0.5],
      [-0.5, 0.5],
      [-0.5, -0.5],
    ],
  ];
  const p1: GeoJSON.Position = [-1, -0.5];
  const p2: GeoJSON.Position = [0.5, 1];

  const NRUN = 100000;
  let start: number;
  const end = [0, 0];

  start = Date.now();
  const seg = new Segment(p1, p2);
  for (let i = 0; i < NRUN; i++) {
    segmentIntersectsAreas(seg, [polycoords, polycoords]);
  }
  end[0] = Date.now() - start;

  start = Date.now();
  for (let i = 0; i < NRUN; i++) {
    segmentInPolygons(p1, p2, [polycoords, polycoords]);
  }
  end[1] = Date.now() - start;

  console.log(end);
});
