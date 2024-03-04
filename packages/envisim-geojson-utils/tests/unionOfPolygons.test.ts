import {describe, expect, test} from 'vitest';

import {
  AreaCollection,
  AreaFeature,
  GeoJSON as GJ,
  MultiPolygon,
  unionOfPolygons,
} from '../src/index.js';

describe('unionOfPolygons', () => {
  const pol1: GJ.Position[][] = [
    [
      [0, 0],
      [2, 0],
      [2, 2],
      [0, 2],
      [0, 0],
    ],
  ];
  const pol2: GJ.Position[][] = [
    [
      [1, 1],
      [3, 1],
      [3, 3],
      [1, 3],
      [1, 1],
    ],
  ];
  const mp = MultiPolygon.create([pol1, pol2], true);
  const ac = AreaCollection.create([AreaFeature.create(mp, {}, true)], true);
  const uc = unionOfPolygons(ac);
  // The union collection should be
  // {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[0,0],[2,0],[2,1],[3,1],[3,3],[1,3],[1,2],[0,2],[0,0]]]}}]}

  test('unionOfPolygons', () => {
    expect(uc.features[0].geometry.type).toBe('Polygon');
    if (uc.features[0].geometry.type === 'Polygon') {
      expect(JSON.stringify(uc.features[0].geometry.coordinates)).toBe(
        '[[[0,0],[2,0],[2,1],[3,1],[3,3],[1,3],[1,2],[0,2],[0,0]]]',
      );
    }
  });
});
