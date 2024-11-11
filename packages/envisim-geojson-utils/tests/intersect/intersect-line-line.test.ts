import {expect, test} from 'vitest';

import {LineString, Point} from '../../src/index.js';
import {intersectLineLineGeometries} from '../../src/intersect/intersect-line-line.js';

const line1 = LineString.create([
  [-2, 0],
  [2, 0],
]);
const line2 = LineString.create([
  [0, -1],
  [0, 1],
]);

test('intersect line-line', () => {
  const intersection = intersectLineLineGeometries(line1, line2);
  Point.assert(intersection);
  const coords = intersection.coordinates;

  expect(coords).toEqual([0, 0]);
});
