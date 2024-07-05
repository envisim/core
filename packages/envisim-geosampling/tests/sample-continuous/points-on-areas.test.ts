import {describe, expect, test} from 'vitest';

import {
  AreaCollection,
  AreaFeature,
  GeoJSON,
  Layer,
} from '@envisim/geojson-utils';

import {samplePointsOnAreas} from '../../src/sample-continuous/points-on-areas.js';

describe('samplePointsOnAreas', () => {
  const polygon: GeoJSON.Polygon = {
    type: 'Polygon',
    coordinates: [
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        [0, 0],
      ],
    ],
  };
  const collection = AreaCollection.create([AreaFeature.create(polygon, {})]);
  const frame = new Layer(collection, {});
  const sample = samplePointsOnAreas(frame, {
    pointSelection: 'independent',
    sampleSize: 10,
    buffer: 10,
  });
  //console.log(JSON.stringify(sample, null, 2));

  test('samplePointsOnAreas', () => {
    expect(sample.collection.features.length).toBe(10);
  });
});
