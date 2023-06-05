import {
  LineFeature,
  PointObject,
  intersectLineLineFeatures,
} from '../src/index.js';
import './_equalArrays.testf';

describe('intersectLineLineFeatures', () => {
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
  const coords = (intersection?.geometry as PointObject)?.coordinates ?? [
    Infinity,
    Infinity,
  ];

  test('intersectLineLineFeatures', () => {
    expect(coords).arrayToAlmostEqual([0, 0], 1e-9);
  });
});
