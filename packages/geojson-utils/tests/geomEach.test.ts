import {geomEach} from '../src/geomEach.js';

describe('geomEach', () => {
  const geoJSON: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0],
        },
        properties: {},
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [1, 1],
        },
        properties: {},
      },
    ],
  };
  let count = 0;
  geomEach(geoJSON, (geom: GeoJSON.Geometry, fi: number) => {
    count++;
  });
  test('geomEach', () => {
    expect(count).toBe(2);
  });
});
