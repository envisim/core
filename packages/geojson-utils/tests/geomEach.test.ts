import {PointCollection, GeoJSON as GJ} from '../src/index.js';

describe('geomEach', () => {
  const geoJSON1 = new PointCollection({
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

  let count1 = 0;
  geoJSON1.geomEach((geom: GJ.PointObject) => {
    count1++;
  });

  test('geomEach', () => {
    expect(count1).toBe(2);
  });

  const geoJSON2 = new PointCollection({
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
          type: 'GeometryCollection',
          geometries: [
            {type: 'Point', coordinates: [0, 0]},
            {type: 'Point', coordinates: [1, 0]},
            {type: 'Point', coordinates: [2, 0]},
          ],
        },
        properties: {},
      },
    ],
  });

  let count2 = 0;
  geoJSON2.geomEach((geom: GJ.PointObject) => {
    count2++;
  });

  test('geomEach', () => {
    expect(count2).toBe(4);
  });
});
