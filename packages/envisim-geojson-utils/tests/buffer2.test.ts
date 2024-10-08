import {describe, expect, test} from 'vitest';

import {bufferPolygon} from '../src/buffer2.js';
import {GeoJSON as GJ, buffer} from '../src/index.js';

describe('buffer', () => {
  const pos_a: GJ.Position[] = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0],
  ];

  const pos_b = [
    [0, 0],
    [5, 0],
    [5, 2.5],
    [2.5, 2.5],
    [2.5, 5],
    [0, 5],
    [0, 0],
  ];

  const pos_c = [
    [0, 0],
    [3, 0],
    [3, 5],
    [4, 5],
    [4, 0],
    [10, 0],
    [10, 10],
    [0, 10],
    [0, 0],
  ];

  test('buffer2', () => {
    console.log(bufferPolygon([pos_a], 1));
    // console.log(bufferPolygon([pos_b],1));
    // console.log(bufferPolygon([pos_c],1));
  });
});
