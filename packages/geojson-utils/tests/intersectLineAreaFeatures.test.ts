import {
  AreaFeature,
  LineFeature,
  intersectLineAreaFeatures,
} from '../src/index.js';
import './_equalArrays.testf';

describe('intersectLinePolygonFeatures', () => {
  const polygon = AreaFeature.create({
    type: 'Polygon',
    coordinates: [
      [
        [-0.5, -0.5],
        [0.5, -0.5],
        [0.5, 0.5],
        [-0.5, 0.5],
        [-0.5, -0.5],
      ],
    ],
  });

  const line = LineFeature.create({
    type: 'LineString',
    coordinates: [
      [-2, 0],
      [-0.5, 0],
      [0, 0.1],
      [0.1, 0],
      [0.4, 0],
      [0.5, 0],
      [2, 0],
    ],
  });

  const intersection = intersectLineAreaFeatures(line, polygon);
  let coords = [
    [2, 2],
    [3, 3],
    [3, 3],
    [3, 3],
    [3, 3],
  ];

  if (intersection) {
    if (intersection.geometry.type === 'LineString') {
      coords = intersection.geometry.coordinates;
      // console.log(JSON.stringify(intersection.geoJSON, null, 2));
      // console.log(coords);
      // expected coords are [[-0.5,0],[0.5,0]]
    }
  }

  test('intersectLinePolygonFeatures', () => {
    expect(coords[0]).arrayToAlmostEqual([-0.5, 0], 1e-9);
    expect(coords[4]).arrayToAlmostEqual([0.5, 0], 1e-9);
  });
});
