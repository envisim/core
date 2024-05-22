import {describe, expect, test} from 'vitest';

import {
  GeoJSON,
  Layer,
  LineCollection,
  LineFeature,
} from '@envisim/geojson-utils';

import {samplePointsOnLines} from '../src/samplePointsOnLines.js';

describe('samplePointsOnLines', () => {
  const ls: GeoJSON.LineString = {
    type: 'LineString',
    coordinates: [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      [0, 0],
    ],
  };
  const collection = LineCollection.create([LineFeature.create(ls, {})]);
  const frame = new Layer(collection, {});
  const sample = samplePointsOnLines(frame, 'uniform', 10);
  //console.log(JSON.stringify(sample, null, 2));

  test('samplePointsOnLines', () => {
    expect(sample.collection.features.length).toBe(10);
  });
});
