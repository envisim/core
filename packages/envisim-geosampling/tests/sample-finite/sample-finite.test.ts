import {expect, test} from 'vitest';

import {FeatureCollection, type GeoJSON as GJ, Point} from '@envisim/geojson-utils';

import {sampleFinite} from '../../src/sample-finite/sample-finite.ts';

// Create a layer with N random points
const N = 1000;
const layer = FeatureCollection.newPoint<Point>();

for (let i = 0; i < N; i++) {
  const coordinates: GJ.Position = [180 - Math.random() * 360, 90 - Math.random() * 180];
  layer.addGeometry(Point.create(coordinates));
}

// Select sample
const sample = sampleFinite(layer, {
  methodName: 'lpm2',
  sampleSize: 10,
  spreadGeo: true,
});

test('sampleFinite', () => {
  expect(sample.size()).toBe(10);
});
