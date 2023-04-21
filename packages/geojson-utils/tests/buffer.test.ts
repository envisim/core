import {buffer} from '../src/buffer.js';
import {unionOfPolygons} from '../src/unionOfPolygons.js';
import {length} from '../src/length.js';
import {area} from '../src/area.js';
import {toFeatureCollection} from '../src/toFeatureCollection.js';

describe('buffer', () => {
  const polygon1: GeoJSON.Feature = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-0.5, -0.5],
          [0.5, -0.5],
          [0.5, 0.5],
          [-0.5, 0.5],
          [-0.5, -0.5],
        ],
      ],
    },
    properties: {},
  };
  const polygon2: GeoJSON.Feature = {
    type: 'Feature',
    geometry: {
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
    },
    properties: {},
  };
  const collection: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [polygon1, polygon2],
  };
  //console.log(area(polygon));
  //console.log(length(polygon));
  const b = buffer(unionOfPolygons(collection), {radius: 10, steps: 10});
  //console.log(area(b));
  //console.log(JSON.stringify(b, null, 2));

  test('buffer', () => {
    expect(b.features.length).toBe(1);
  });
});
