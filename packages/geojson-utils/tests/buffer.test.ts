import {buffer} from '../src/buffer.js';
import {unionOfPolygons} from '../src/unionOfPolygons.js';
import type * as GJ from '../src/geojson/types.js';

describe('buffer', () => {
  const polygon1: GJ.AreaFeature = {
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
  const polygon2: GJ.AreaFeature = {
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
  const collection: GJ.AreaFeatureCollection = {
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
