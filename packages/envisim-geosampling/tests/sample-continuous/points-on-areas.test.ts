import {expect, test} from 'vitest';

import {Feature, FeatureCollection, Polygon} from '@envisim/geojson-utils';

import {samplePointsOnAreas} from '../../src/sample-continuous/index.js';

const polygon = Polygon.create([
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0],
  ],
]);

const frame = FeatureCollection.newArea([new Feature(polygon, {})]);
const sample = samplePointsOnAreas(frame, {
  pointSelection: 'independent',
  sampleSize: 10,
  buffer: 10,
});

test('samplePointsOnAreas', () => {
  expect(sample.size()).toBe(10);
});
