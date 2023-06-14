import {GeoJSON, AreaFeature, AreaCollection} from '@envisim/geojson-utils';

import {samplePointsOnAreas} from '../src/samplePointsOnAreas.js';

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
  const frame = AreaCollection.create([AreaFeature.create(polygon, {})]);
  const sample = samplePointsOnAreas(frame, 'uniform', 10, {buffer: 10});
  //console.log(JSON.stringify(sample, null, 2));

  test('samplePointsOnAreas', () => {
    expect(sample.features.length).toBe(10);
  });
});
