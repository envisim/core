import {expect, test} from 'vitest';

import {Polygon} from '../../src/index.js';

const polygon = Polygon.create([
  [
    [0, 0],
    [1, 0],
    [1, 50],
    [51, 50],
    [101, 60],
    [-100, 60],
    [-50, 50],
    [0, 50],
    [0, 0],
  ],
]);
const centroid1 = polygon.centroid(10);
const centroid2 = polygon.centroid(20);

// Check convergence of 8 decimals at the 10th iteration
test('convergence', () => {
  expect(centroid1).toEqual(centroid2.map((v) => expect.closeTo(v, 8)));
});

test.todo('centroid');
