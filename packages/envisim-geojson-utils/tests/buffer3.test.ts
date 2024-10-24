import {describe, expect, test} from 'vitest';

import {buffer, buffering, shrinking} from '../src/buffer3.js';
import {buffer as oldBuffer} from '../src/buffer.js';
import {AreaCollection, AreaFeature, GeoJSON as GJ} from '../src/index.js';

const pos_a: GJ.Position[][] = [
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0],
  ],
];

const pos_b: GJ.Position[][] = [
  [
    [0, 0],
    [5, 0],
    [5, 2.5],
    [2.5, 2.5],
    [2.5, 5],
    [0, 5],
    [0, 0],
  ],
];

const pos_c: GJ.Position[][] = [
  [
    [0, 0],
    [3, 0],
    [3, 5],
    [4, 5],
    [4, 0],
    [10, 0],
    [10, 10],
    [0, 10],
    [0, 0],
  ],
];

const pos_d: GJ.Position[][] = [
  [
    [0, 0],
    [3, 0],
    [3, 7],
    [7, 7],
    [7, 3],
    [3.5, 3],
    [3.5, 0],
    [10, 0],
    [10, 10],
    [0, 10],
    [0, 0],
  ],
];

const pos_e: GJ.Position[][] = [
  [
    [0, 0],
    [3, 0],
    [3, 2],
    [6, 2],
    [6, 0],
    [9, 0],
    [9, 5],
    [6, 5],
    [6, 3],
    [3, 3],
    [3, 5],
    [0, 5],
    [0, 0],
  ],
];

const ac = AreaCollection.create([
  AreaFeature.create({type: 'Polygon', coordinates: pos_a}),
  AreaFeature.create({type: 'Polygon', coordinates: pos_b}),
  AreaFeature.create({type: 'Polygon', coordinates: pos_c}),
  AreaFeature.create({type: 'Polygon', coordinates: pos_d}),
  AreaFeature.create({type: 'Polygon', coordinates: pos_e}),
]);

describe('buffer', () => {
  const bOptions = {radius: 1, steps: 1};
  const sOptions = {radius: -1, steps: 1};

  // expect(buffering([pos_a], options)).toEqual([
  //   [
  //     [
  //       [-1, 0],
  //       [0, -1],
  //       [1, -1],
  //       [2, 0],
  //       [2, 1],
  //       [1, 2],
  //       [0, 2],
  //       [-1, 1],
  //       [-1, 0],
  //     ],
  //   ],
  // ]);

  test('buffering', () => {
    console.log(buffering([pos_a], bOptions)[0]);
    console.log(buffering([pos_b], bOptions)[0]);
    console.log(buffering([pos_c], bOptions)[0]);
    console.log(buffering([pos_d], bOptions)[0]);
    console.log(buffering([pos_e], bOptions)[0]);
  });

  test('shrinking', () => {
    console.log(shrinking([pos_a], sOptions));
    console.log(shrinking([pos_b], sOptions)[0]);
    console.log(shrinking([pos_c], sOptions)[0]);
    console.log(shrinking([pos_d], sOptions)[0]);
    const buf = shrinking([pos_e], sOptions);
    console.log(buf[0], buf[1]);
  });

  test('buffer', () => {
    buffer(ac, bOptions).geomEach((g) => console.log(g.coordinates));
    buffer(ac, sOptions).geomEach((g) => console.log(g.coordinates));
  });

  // test('timing', () => {
  //   const a0 = Date.now();
  //   for (let i = 0; i < 10000; i++) buffer(ac, bOptions);
  //   const a1 = Date.now() - a0;

  //   const b0 = Date.now();
  //   for (let i = 0; i < 10000; i++) oldBuffer(ac, bOptions);
  //   const b1 = Date.now() - b0;

  //   const c0 = Date.now();
  //   for (let i = 0; i < 10000; i++) buffer(ac, sOptions);
  //   const c1 = Date.now() - c0;

  //   const d0 = Date.now();
  //   for (let i = 0; i < 10000; i++) oldBuffer(ac, sOptions);
  //   const d1 = Date.now() - d0;

  //   console.log(a1, b1, c1, d1);
  // });
});
