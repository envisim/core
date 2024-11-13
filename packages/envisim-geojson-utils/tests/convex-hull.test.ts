import {expect, test} from 'vitest';

import {convexHull} from '../src/convex-hull.js';
import {FeatureCollection, GeoJSON as GJ, MultiPoint, Polygon} from '../src/index.js';

const positions: GJ.Position[] = [
  [0, 0],
  [2, 0],
  [1, 1],
  [2, 2],
  [0, 2],
  [0, 0],
];

const pc = FeatureCollection.newPoint();
pc.addGeometry(MultiPoint.create(positions));

const hull = convexHull(pc);
//console.log(JSON.stringify(hull, null, 2));

test('convexHull', () => {
  expect(pc.features.length).toBe(1);
  Polygon.assert(hull.features[0].geometry);
  const coords = hull.features[0].geometry.coordinates[0];
  expect(coords).toEqual(
    expect.arrayContaining([
      [0, 0],
      [2, 0],
      [2, 2],
      [0, 2],
      [0, 0],
    ]),
  );
});
