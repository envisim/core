import {intersectSegments} from '../src/intersectSegments.js';
import type * as GJ from '../src/geojson/types.js';

describe('intersectSegments', () => {
  const seg1: GJ.Position[] = [
    [0, 0],
    [1, 0],
  ];
  const seg2: GJ.Position[] = [
    [0.5, -1],
    [0.5, 1],
  ];

  const intersection = intersectSegments(seg1, seg2);
  let point = [0, 1];
  if (intersection.point) {
    point = intersection.point;
  }

  const intersection2 = intersectSegments(seg1, seg1);

  // intersection point should be close to [0.5, 0]
  test('intersectSegments', () => {
    expect(point[0]).toBeCloseTo(0.5, 4);
    expect(point[1]).toBeCloseTo(0, 4);
    expect(intersection2.point).toBe(undefined);
  });
});
