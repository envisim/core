import {describe, expect, test} from 'vitest';

import {
  AreaCollection,
  AreaFeature,
  buffer,
  unionOfPolygons,
} from '../src/index.js';

describe('buffer', () => {
  const polygon1 = AreaFeature.create({
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

  const polygon2 = AreaFeature.create({
    type: 'Polygon',
    coordinates: [
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        [0, 0],
      ],
    ],
  });

  const collection = AreaCollection.create([polygon1, polygon2]);
  const b = buffer(unionOfPolygons(collection), {
    radius: 10,
    steps: 10,
  }) as AreaCollection;

  test('buffer', () => {
    expect(b).not.toBeNull();
    expect(b.features.length).toBe(1);
  });
});
