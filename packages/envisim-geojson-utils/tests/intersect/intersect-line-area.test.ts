import {expect, test} from 'vitest';

import {GeoJSON as GJ, LineString, MultiPolygon, Polygon} from '../../src/index.js';
import {intersectLineAreaGeometries} from '../../src/intersect/intersect-line-area.js';

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
const cutLinecoords = linecoords.slice(1, -1);

const line = LineString.create(linecoords);

test('Simple polygon', () => {
  const polygon = Polygon.create(polycoords);

  const intersection = intersectLineAreaGeometries(line, polygon);
  LineString.assert(intersection);
  const coords = intersection.coordinates;

  expect(coords.length).toBe(5);
  expect(coords).toEqual(
    cutLinecoords.map((v) => [expect.closeTo(v[0], 9), expect.closeTo(v[1], 9)]),
  );
});

test('Overlapping multipolygon', () => {
  const polygon = MultiPolygon.create([polycoords, polycoords]);

  const intersection = intersectLineAreaGeometries(line, polygon);
  LineString.assert(intersection);
  const coords = intersection.coordinates;

  expect(coords.length).toBe(5);
  expect(coords).toEqual(
    cutLinecoords.map((v) => [expect.closeTo(v[0], 9), expect.closeTo(v[1], 9)]),
  );
});

test('Three multipolygons', () => {
  const polygon = MultiPolygon.create([polycoords, polycoords, polycoords2]);

  const intersection = intersectLineAreaGeometries(line, polygon);

  LineString.assert(intersection);
  const coords = intersection.coordinates;

  expect(coords.length).toBe(6);
  expect(coords).toEqual(
    [...cutLinecoords, [1.0, 0.0]].map((v) => [expect.closeTo(v[0], 9), expect.closeTo(v[1], 9)]),
  );
});
