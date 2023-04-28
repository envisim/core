import {toFeature} from '../src/to.js';

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

  const feature = toFeature(polygon, {prop: 1});
  // console.log(JSON.stringify(feature, null, 2));
  const prop = feature?.properties?.prop;

  test('toFeature', () => {
    expect(feature.type).toBe('Feature');
    expect(prop).toBe(1);
    expect(typeof feature.id).toBe('string');
  });
});
