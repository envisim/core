import {toFeature} from '../src/toFeature.js';

describe('toFeature', () => {
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

  const feature = toFeature(polygon, {
    addBbox: true,
    properties: {prop: 1},
    addId: true,
  });
  // console.log(JSON.stringify(feature, null, 2));
  const box = feature.bbox ?? [2, 2, 2, 2];
  const prop = feature?.properties?.prop;

  test('toFeature', () => {
    expect(feature.type).toBe('Feature');
    expect(prop).toBe(1);
    expect(box[0]).toBe(0);
    expect(box[1]).toBe(0);
    expect(box[2]).toBe(1);
    expect(box[3]).toBe(1);
    expect(typeof feature.id).toBe('string');
  });
});
