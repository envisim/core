import {expect, test} from 'vitest';

import {AreaFeature, GeoJSON as GJ, LineFeature, LineString} from '../src/index.js';
import {intersectLineAreaFeatures} from '../src/intersect-line-area-features.js';
import './_equalArrays.testf';

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
const line = LineFeature.create(
  {
    type: 'LineString',
    coordinates: linecoords,
  },
  {},
  true,
);

test('Simple polygon', () => {
  const polygon = AreaFeature.create({
    type: 'Polygon',
    coordinates: polycoords,
  });

  const intersection = intersectLineAreaFeatures(line, polygon) as LineFeature;
  expect(intersection).not.toBeNull();

  expect(LineString.isObject(intersection.geometry)).toBe(true);
  const coords = (intersection.geometry as LineString).coordinates;

  expect(coords.length).toBe(5);
  expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
  expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
  expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
  expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
  expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
});

test('Overlapping multipolygon', () => {
  const polygon = AreaFeature.create({
    type: 'MultiPolygon',
    coordinates: [polycoords, polycoords],
  });

  const intersection = intersectLineAreaFeatures(line, polygon) as LineFeature;
  expect(intersection).not.toBeNull();

  expect(LineString.isObject(intersection.geometry)).toBe(true);
  const coords = (intersection.geometry as LineString).coordinates;

  expect(coords.length).toBe(5);
  expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
  expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
  expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
  expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
  expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
});

test('Three multipolygons', () => {
  const polygon = AreaFeature.create({
    type: 'MultiPolygon',
    coordinates: [polycoords, polycoords, polycoords2],
  });

  const intersection = intersectLineAreaFeatures(line, polygon) as LineFeature;
  expect(intersection).not.toBeNull();

  expect(LineString.isObject(intersection.geometry)).toBe(true);
  const coords = (intersection.geometry as LineString).coordinates;

  expect(coords.length).toBe(6);
  expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
  expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
  expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
  expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
  expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
  expect(coords[5]).arrayToAlmostEqual([1.0, 0.0], 1e-9);
});
