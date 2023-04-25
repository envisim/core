import {toFeatureCollection} from '@envisim/geojson-utils';
import {sampleTractsOnAreas} from '../src/sampleTractsOnAreas.js';
import {squareAreaTract, pointTract} from '../src/modelTract.js';

describe('sampleTractsOnAreas', () => {
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
  const tract = squareAreaTract(10);
  const sample = sampleTractsOnAreas(frame, 'uniform', 10, tract);
  console.log(JSON.stringify(sample, null, 2));

  const tract2 = pointTract();
  const sample2 = sampleTractsOnAreas(frame, 'uniform', 10, tract2);
  console.log(JSON.stringify(sample2, null, 2));

  test('sampleTractsOnAreas', () => {
    expect(sample.features.length).toBe(10);
    expect(sample2.features.length).toBe(10);
  });
});
