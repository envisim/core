import {expect, test} from 'vitest';

import {FeatureCollection, GeoJSON as GJ, MultiPolygon, Polygon} from '../src/index.js';
import {unionOfCollection} from '../src/union-of-polygons.js';

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

const ac = FeatureCollection.newArea();
ac.addGeometry(MultiPolygon.create([pol1, pol2]));

const uc = unionOfCollection(ac);

test('unionOfPolygons', () => {
  expect(uc.features.length).toBe(1);
  Polygon.assert(uc.features[0].geometry);
  const coords = uc.features[0].geometry.coordinates[0];
  expect(coords).toEqual(
    expect.arrayContaining([
      [0, 0],
      [2, 0],
      [2, 1],
      [3, 1],
      [3, 3],
      [1, 3],
      [1, 2],
      [0, 2],
    ]),
  );
});
