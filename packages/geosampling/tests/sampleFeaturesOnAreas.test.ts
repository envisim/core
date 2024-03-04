import {describe, expect, test} from 'vitest';

import {pointFeature, squareAreaFeature} from '../src/modelFeature.js';
import {sampleFeaturesOnAreas} from '../src/sampleFeaturesOnAreas.js';

describe('sampleFeaturesOnAreas', () => {
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
  const frame = AreaCollection.create([AreaFeature.create(polygon, {})]);
  const tract = squareAreaFeature(10);
  const sample = sampleFeaturesOnAreas(frame, 'uniform', 10, tract);
  //console.log(JSON.stringify(sample, null, 2));

  const tract2 = pointFeature();
  const sample2 = sampleFeaturesOnAreas(frame, 'uniform', 10, tract2);
  //console.log(JSON.stringify(sample2, null, 2));

  test('sampleFeaturesOnAreas', () => {
    expect(sample.features.length).toBe(10);
    expect(sample2.features.length).toBe(10);
  });
});
