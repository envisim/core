import {expect, test} from 'vitest';

import {FeatureCollection, type GeoJSON as GJ, Point} from '@envisim/geojson-utils';

import {sampleFinite} from '../../src/sample-finite/sample-finite.js';
import {sampleSpatiallyBalanced} from '../../src/sample-finite/sample-spatially-balanced.js';

// Create a layer with N random points
const N = 1000;
const layer = FeatureCollection.newPoint<Point>();

for (let i = 0; i < N; i++) {
  const coordinates: GJ.Position = [180 - Math.random() * 360, 90 - Math.random() * 180];
  layer.addGeometry(Point.create(coordinates), {});
}

// Select sample

test('sampleFinite', () => {
  const s1 = sampleFinite(layer, {
    method: 'srs',
    sampleSize: 10,
  });
  expect(s1.size()).toBe(10);

  const s2 = sampleSpatiallyBalanced(layer, {
    method: 'lpm2',
    sampleSize: 10,
    spreadGeo: true,
    spreadOn: [],
  });
  expect(s2.size()).toBe(10);
});
