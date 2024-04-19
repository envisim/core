import {describe, expect, test} from 'vitest';

import {
  AreaCollection,
  AreaFeature,
  GeoJSON,
  PointCollection,
} from '@envisim/geojson-utils';

import {thomasClusterProcess} from '../src/thomasClusterProcess.js';

describe('thomasClusterProcess', () => {
  const polygon: GeoJSON.Polygon = {
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
  };
  const frame = AreaCollection.create([AreaFeature.create(polygon, {})]);
  const A = frame.area();

  const nrs = 100;
  let nsum = 0;
  let sample: PointCollection;
  for (let i = 0; i < nrs; i++) {
    sample = thomasClusterProcess(frame, 20 / A, 5, 10);
    nsum += sample.features.length;
  }
  // expect mean number of points to around 100
  test('thomasClusterProcess', () => {
    expect(nsum / nrs > 70).toBe(true);
    expect(nsum / nrs < 130).toBe(true);
  });
});
