import {expect, test} from 'vitest';

import {LineFeature, PointObject} from '../src/index.js';
import {intersectLineLineFeatures} from '../src/intersect-line-line-features.js';
import './_equalArrays.testf';

const line1 = LineFeature.create({
  type: 'LineString',
  coordinates: [
    [-2, 0],
    [2, 0],
  ],
});
const line2 = LineFeature.create({
  type: 'LineString',
  coordinates: [
    [0, -1],
    [0, 1],
  ],
});

const intersection = intersectLineLineFeatures(line1, line2);
const coords = (intersection?.geometry as PointObject)?.coordinates ?? [Infinity, Infinity];

test('intersectLineLineFeatures', () => {
  expect(coords).arrayToAlmostEqual([0, 0], 1e-9);
});
