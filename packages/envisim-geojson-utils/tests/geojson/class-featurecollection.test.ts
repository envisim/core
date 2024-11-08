import {expect, test} from 'vitest';

import {FeatureCollection} from '../../src/geojson/collections/class-featurecollection.js';
import {MultiPoint, Point} from '../../src/index.js';

test('geomEach', () => {
  const pointCollection = FeatureCollection.newPoint();
  pointCollection.addGeometry(Point.create([0, 0]));
  pointCollection.addGeometry(Point.create([1, 1]));

  let count = 0;
  pointCollection.geomEach((geom) => {
    count += geom.count();
  });

  expect(count).toBe(2);

  pointCollection.addGeometry(Point.create([0, 0]));
  pointCollection.addGeometry(
    MultiPoint.create([
      [0, 0],
      [1, 0],
      [2, 0],
    ]),
  );

  count = 0;
  pointCollection.geomEach((geom) => {
    count += geom.count();
  });

  expect(count).toBe(6);
});
