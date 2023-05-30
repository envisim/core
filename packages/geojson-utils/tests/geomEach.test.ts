import type * as GJ from '../src/geojson/types.js';
import {PointCollection} from '../src/geojson/points/ClassPointCollection';

describe('geomEach', () => {
  const geoJSON = new PointCollection({
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
  });
  let count = 0;
  geoJSON.geomEach((geom: GJ.PointObject) => {
    count++;
  });
  test('geomEach', () => {
    expect(count).toBe(2);
  });
});
