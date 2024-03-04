import {describe, expect, test} from 'vitest';

import {Polygon} from '../src/index.js';

describe('centroid', () => {
  const geometry = Polygon.create([
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
  const centroid1 = geometry.centroid(10);
  const centroid2 = geometry.centroid(20);

  // Check convergence of 8 decimals at the 10th iteration
  test('centroid', () => {
    expect(centroid1[0]).toBeCloseTo(centroid2[0], 8);
    expect(centroid1[1]).toBeCloseTo(centroid2[1], 8);
  });
});
