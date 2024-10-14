import {describe, expect, test} from 'vitest';

import {AreaCollection, AreaFeature, Circle, LineString} from '../src/index.js';

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
  const buf = collection.buffer(-100, 10);
  //console.log(JSON.stringify(buf, null, 2));
  //console.log(buf);

  const c = Circle.create([0, 0], 10).buffer(10);
  //console.log(JSON.stringify(c, null, 2));
  const l = LineString.create([
    [0, 0],
    [0, 1],
  ]).buffer(10);
  let a = 0.0;
  if (l) a = l.area();
  //console.log(JSON.stringify(l, null, 2));

  test('buffer', () => {
    expect(buf).not.toBeNull();
    if (buf) expect(buf.features.length).toBe(2);
    expect(c?.radius).toBe(20);
    expect(a > 0.0).toBe(true);
  });
});
