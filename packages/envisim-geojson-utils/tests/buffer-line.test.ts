import {describe, expect, test} from 'vitest';

import {bufferArea} from '../src/buffer-area.js';
import {bufferLine} from '../src/buffer-line.js';
import {LineString, Polygon} from '../src/index.js';

const lines = [
  LineString.create([
    [20.269, 63.798],
    [20.3, 63.783],
  ]),
  LineString.create([
    [20.326, 63.77],
    [20.298, 63.798],
    [20.288, 63.814],
    [20.267, 63.82],
    [20.229, 63.828],
    [20.214, 63.823],
    [20.188, 63.826],
  ]),
  LineString.create([
    // [20.293, 63.827],
    // [20.297, 63.83],
    // [20.306, 63.833],
    // [20.314, 63.83],
    // [20.31, 63.827],
    [20.305, 63.824],
    [20.301, 63.822],
    [20.295, 63.825],
  ]),
  LineString.create([
    [20.267, 63.82],
    [20.229, 63.828],
    [20.214, 63.823],
  ]),
];

const poly = Polygon.create([
  [
    [20.267, 63.82],
    [20.229, 63.828],
    [20.214, 63.823],
    [20.267, 63.82],
  ],
]);

const bOptions = {distance: 100, steps: 5};
const sOptions = {distance: -10, steps: 5};

test('river', () => {
  // console.log(bufferArea(poly, bOptions)?.coordinates);
  // console.log(bufferLine(lines[0], bOptions).coordinates);
  // console.log(bufferLine(lines[1], bOptions).coordinates);
  console.log(bufferLine(lines[2], bOptions).coordinates);
  // console.log(bufferLine(lines[3], bOptions).coordinates);

  // expect(bufferLine(lines[1], sOptions)).toBeNull();
  // throw new Error('a');
});
