import {expect, test} from 'vitest';

import {Feature, FeatureCollection, LineString} from '@envisim/geojson-utils';

import {sampleSystematicLinesOnLines} from '../../src/sample-continuous/index.js';

const ls = LineString.create([
  [0, 0],
  [1, 0],
  [1, 1],
  [0, 1],
  [0, 0],
]);

const frame = FeatureCollection.newLine([new Feature(ls, {})]);
const sample = sampleSystematicLinesOnLines(frame, {
  dashLength: 500,
  voidLength: 15000,
});

//console.log(JSON.stringify(sample, null, 2));

test('sampleSystematicLinesOnLines', () => {
  expect(sample.size() > 0).toBe(true);
});
