import {expect, test} from 'vitest';

import {FeatureCollection, LineString, MultiPolygon, Polygon} from '../../src/index.js';
import {intersectLineAreaGeometries} from '../../src/intersect/intersect-line-area.js';

test('Simple polygon', () => {
  const polygon = Polygon.create([
    [
      [-0.5, -0.5],
      [0.5, -0.5],
      [0.5, 0.5],
      [-0.5, 0.5],
      [-0.5, -0.5],
    ],
  ]);
  const line = LineString.create([
    [-2, 0],
    [-0.5, 0],
    [0, 0.1],
    [0.1, 0],
    [0.4, 0],
    [0.5, 0],
    [2, 0],
  ]);

  const intersection = intersectLineAreaGeometries(line, polygon);
  LineString.assert(intersection);
  const coords = intersection.coordinates;

  expect(coords.length).toBe(5);
  expect(coords).toEqual(
    line.coordinates.slice(1, -1).map((v) => [expect.closeTo(v[0], 9), expect.closeTo(v[1], 9)]),
  );
});

test('Three multipolygons', () => {
  const polygon = MultiPolygon.create([
    [
      [
        [-0.5, -0.5],
        [0.5, -0.5],
        [0.5, 0.5],
        [-0.5, 0.5],
        [-0.5, -0.5],
      ],
    ],
    [
      [
        [-0.5, -0.5],
        [0.5, -0.5],
        [0.5, 0.5],
        [-0.5, 0.5],
        [-0.5, -0.5],
      ],
    ],
    [
      [
        [0.0, -1.0],
        [0.0, 1.0],
        [1.0, 1.0],
        [1.0, -1.0],
        [0.0, -1.0],
      ],
    ],
  ]);
  const line = LineString.create([
    [-2, 0],
    [-0.5, 0],
    [0, 0.1],
    [0.1, 0],
    [0.4, 0],
    [0.5, 0],
    [2, 0],
  ]);

  const intersection = intersectLineAreaGeometries(line, polygon);

  LineString.assert(intersection);
  const coords = intersection.coordinates;

  expect(coords.length).toBe(6);
  expect(coords).toEqual(
    [...line.coordinates.slice(1, -1), [1.0, 0.0]].map((v) => [
      expect.closeTo(v[0], 9),
      expect.closeTo(v[1], 9),
    ]),
  );
});

test('line polygon bug report', () => {
  const line = LineString.create([
    [20.312353080832807, 63.82092562908619],
    [20.3123531602826, 63.82130846401786],
  ]);

  const poly = Polygon.create([
    [
      [20.314, 63.821],
      [20.305, 63.822],
      [20.299, 63.82],
      [20.302, 63.823],
      [20.314, 63.821],
    ],
  ]);

  const res = intersectLineAreaGeometries(line, poly);

  expect(res.coordinates).toEqual(
    [
      [20.31235313424194, 63.82118298508423],
      [20.31235315322874, 63.82127447446187],
    ].map((v) => [expect.closeTo(v[0], 9), expect.closeTo(v[1], 9)]),
  );
});
