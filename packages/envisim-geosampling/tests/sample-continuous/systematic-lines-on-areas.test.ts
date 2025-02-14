import {expect, test} from 'vitest';

import {Feature, FeatureCollection, Polygon} from '@envisim/geojson-utils';

import {sampleSystematicLinesOnAreas} from '../../src/sample-continuous/index.js';

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
const area = frame.measure();
const interspace = 1000;

const sample = sampleSystematicLinesOnAreas(frame, {
  interspace,
  rotation: 0,
});
const est = sample.measure() * interspace;

test('sampleSystematicLinesOnAreas', () => {
  expect(est / area).toBeCloseTo(1, 1);
});
