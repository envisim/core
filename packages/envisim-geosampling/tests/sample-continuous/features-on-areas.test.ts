import {expect, test} from 'vitest';

import {Feature, FeatureCollection, Polygon} from '@envisim/geojson-utils';

import {pointFeature, squareAreaFeature} from '../../src/model-feature.js';
import {sampleFeaturesOnAreas} from '../../src/sample-continuous/features-on-areas.js';

const polygon = Polygon.create([
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0],
  ],
]);

const frame = FeatureCollection.newArea([new Feature(polygon)]);

const tract = squareAreaFeature(10);

const sample = sampleFeaturesOnAreas(frame, {
  pointSelection: 'independent',
  sampleSize: 10,
  modelFeature: tract,
});

const tract2 = pointFeature();
const sample2 = sampleFeaturesOnAreas(frame, {
  pointSelection: 'independent',
  sampleSize: 10,
  modelFeature: tract2,
});

test('sampleFeaturesOnAreas', () => {
  expect(sample.size()).toBe(10);
  expect(sample2.size()).toBe(10);
});
