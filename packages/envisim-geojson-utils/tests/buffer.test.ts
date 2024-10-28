import {describe, expect, test} from 'vitest';

import {buffer} from '../src/buffer.js';
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
    [20, 0],
    [25, 0],
    [25, 2.5],
    [22.5, 2.5],
    [22.5, 5],
    [20, 5],
    [20, 0],
  ],
];

const pos_c: GJ.Position[][] = [
  [
    [0, 20],
    [3, 20],
    [3, 25],
    [4, 25],
    [4, 20],
    [10, 20],
    [10, 30],
    [0, 30],
    [0, 20],
  ],
];

const pos_d: GJ.Position[][] = [
  [
    [20, 20],
    [23, 20],
    [23, 27],
    [27, 27],
    [27, 23],
    [23.5, 23],
    [23.5, 20],
    [30, 20],
    [30, 30],
    [20, 30],
    [20, 20],
  ],
];

const pos_e: GJ.Position[][] = [
  [
    [40, 0],
    [43, 0],
    [43, 2],
    [46, 2],
    [46, 0],
    [49, 0],
    [49, 5],
    [46, 5],
    [46, 3],
    [43, 3],
    [43, 5],
    [40, 5],
    [40, 0],
  ],
];

const pos_f: GJ.Position[][] = [
  [
    [0, 40],
    [8, 40],
    [8, 46],
    [5, 46],
    [5, 44],
    [3, 44],
    [3, 46],
    [0, 46],
    [0, 40],
  ],
];

// const multiPos = [pos_a, pos_b, pos_c, pos_d, pos_e, pos_f];

const ac = AreaCollection.create([
  AreaFeature.create({type: 'Polygon', coordinates: pos_a}),
  AreaFeature.create({type: 'Polygon', coordinates: pos_b}),
  AreaFeature.create({type: 'Polygon', coordinates: pos_c}),
  AreaFeature.create({type: 'Polygon', coordinates: pos_d}),
  AreaFeature.create({type: 'Polygon', coordinates: pos_e}),
  AreaFeature.create({type: 'Polygon', coordinates: pos_f}),
  AreaFeature.create({type: 'Point', coordinates: [-10, -10], radius: 0.5}),
]);

describe('buffer', () => {
  const bOptions = {radius: 1, steps: 5};
  const sOptions = {radius: -1, steps: 5};

  test('ac', () => {
    const buf = buffer(ac, bOptions);
    expect(buf.features.length).toBe(7);
    const shr = buffer(ac, sOptions);
    expect(shr.features.length).toBe(5);
  });

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

  // test('buffering', () => {
  //   // console.log(buffering([pos_a], bOptions)[0]);
  //   const res = [
  //     ...buffering([pos_a], bOptions),
  //     ...buffering([pos_b], bOptions),
  //     ...buffering([pos_c], bOptions),
  //     ...buffering([pos_d], bOptions),
  //     ...buffering([pos_e], bOptions),
  //     ...buffering([pos_f], bOptions),
  //   ];
  //   console.log(JSON.stringify(res));
  // });

  // test('shrinking', () => {
  //   // console.log(shrinking([pos_f], sOptions)[0]);
  //   const res = [
  //     ...shrinking([pos_a], sOptions),
  //     ...shrinking([pos_b], sOptions),
  //     ...shrinking([pos_c], sOptions),
  //     ...shrinking([pos_d], sOptions),
  //     ...shrinking([pos_e], sOptions),
  //     ...shrinking([pos_f], sOptions),
  //   ];
  //   console.log(JSON.stringify(res));
  // });

  // test('buffer', () => {
  //   buffer(ac, bOptions).geomEach((g) => console.log(g.coordinates));
  //   buffer(ac, sOptions).geomEach((g) => console.log(g.coordinates));
  // });
});
