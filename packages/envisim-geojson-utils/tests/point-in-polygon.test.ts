import {expect, test} from 'vitest';

import {GeoJSON as GJ, Polygon} from '../src/index.js';
import {pointInAreaGeometry} from '../src/point-in-polygon.js';

const polygon = Polygon.create([
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0],
  ],
]);

const points: GJ.Position2[] = [
  [0.5, 0.5],
  [5, 0.5],
  [0, 0],
  [0, 0.5],
  [1.000001, 1.000001],
];

test('pointInAreaGeometry', () => {
  const res = points.map((p) => pointInAreaGeometry(p, polygon));
  expect(res).toEqual([true, false, true, true, false]);
});
