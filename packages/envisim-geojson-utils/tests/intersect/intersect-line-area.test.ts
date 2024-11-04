import {expect, test} from 'vitest';

import {GeoJSON as GJ, LineString, MultiPolygon, Polygon} from '../../src/index.js';
import {intersectLineAreaGeometries} from '../../src/intersect/intersect-line-area.js';
import '../_equalArrays.testf';

const polycoords: GJ.Position[][] = [
  [
    [-0.5, -0.5],
    [0.5, -0.5],
    [0.5, 0.5],
    [-0.5, 0.5],
    [-0.5, -0.5],
  ],
];
const polycoords2: GJ.Position[][] = [
  [
    [0.0, -1.0],
    [0.0, 1.0],
    [1.0, 1.0],
    [1.0, -1.0],
    [0.0, -1.0],
  ],
];
const linecoords: GJ.Position[] = [
  [-2, 0],
  [-0.5, 0],
  [0, 0.1],
  [0.1, 0],
  [0.4, 0],
  [0.5, 0],
  [2, 0],
];
const line = LineString.create(linecoords);

test('Simple polygon', () => {
  const polygon = Polygon.create(polycoords);

  const intersection = intersectLineAreaGeometries(line, polygon);
  LineString.assert(intersection);
  const coords = intersection.coordinates;

  expect(coords.length).toBe(5);
  expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
  expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
  expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
  expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
  expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
});

test('Overlapping multipolygon', () => {
  const polygon = MultiPolygon.create([polycoords, polycoords]);

  const intersection = intersectLineAreaGeometries(line, polygon);
  LineString.assert(intersection);
  const coords = intersection.coordinates;

  expect(coords.length).toBe(5);
  expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
  expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
  expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
  expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
  expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
});

test('Three multipolygons', () => {
  const polygon = MultiPolygon.create([polycoords, polycoords, polycoords2]);

  const intersection = intersectLineAreaGeometries(line, polygon);

  LineString.assert(intersection);
  const coords = intersection.coordinates;

  expect(coords.length).toBe(6);
  expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
  expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
  expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
  expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
  expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
  expect(coords[5]).arrayToAlmostEqual([1.0, 0.0], 1e-9);
});
