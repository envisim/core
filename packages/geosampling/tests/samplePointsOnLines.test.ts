import {toFeatureCollection} from '@envisim/geojson-utils';

import {samplePointsOnLines} from '../src/samplePointsOnLines.js';

describe('samplePointsOnAreas', () => {
  const polygon: GeoJSON.Geometry = {
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
  const frame = toFeatureCollection(polygon);
  const sample = samplePointsOnLines(frame, 'uniform', 10);
  //console.log(JSON.stringify(sample, null, 2));

  test('samplePointsOnAreas', () => {
    expect(sample.features.length).toBe(10);
  });
});
