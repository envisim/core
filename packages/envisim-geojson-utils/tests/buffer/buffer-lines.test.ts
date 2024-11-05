import {expect, test} from 'vitest';

import {LineString} from '../../src/index.js';

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
    [20.293, 63.827],
    [20.297, 63.83],
    [20.306, 63.833],
    [20.314, 63.83],
    [20.31, 63.827],
    [20.305, 63.824],
    [20.301, 63.822],
    [20.295, 63.826],
  ]),
  LineString.create([
    [20.267, 63.82],
    [20.229, 63.828],
    [20.214, 63.823],
  ]),
];

const bOptions = {distance: 100, steps: 5};
const sOptions = {distance: -10, steps: 5};

test('river', () => {
  expect(lines[1].buffer(sOptions)).toBeNull();
  expect(lines.map((l) => l.buffer(bOptions)?.coordinates.length)).toEqual([1, 1, 2, 1]);
});
