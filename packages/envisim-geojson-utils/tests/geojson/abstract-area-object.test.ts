import {expect, test} from 'vitest';

import {GeoJSON as GJ, Polygon} from '../../src/index.js';

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

test('includesPosition', () => {
  const res = points.map((p) => polygon.includesPosition(p));
  expect(res).toEqual([true, false, true, true, false]);
});
