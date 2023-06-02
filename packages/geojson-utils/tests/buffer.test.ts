import {buffer} from '../src/buffer.js';
import {AreaCollection} from '../src/geojson/areas/ClassAreaCollection.js';
import {AreaFeature} from '../src/geojson/areas/ClassAreaFeature.js';
import {unionOfPolygons} from '../src/unionOfPolygons.js';

describe('buffer', () => {
  const polygon1 = AreaFeature.create({
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
  });

  const polygon2 = AreaFeature.create({
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
  });

  const collection = AreaCollection.create([polygon1, polygon2]);
  //console.log(area(polygon));
  //console.log(length(polygon));
  const b = buffer(unionOfPolygons(collection), {radius: 10, steps: 10});
  //console.log(area(b));
  //console.log(JSON.stringify(b, null, 2));

  test('buffer', () => {
    expect(b.features.length).toBe(1);
  });
});
