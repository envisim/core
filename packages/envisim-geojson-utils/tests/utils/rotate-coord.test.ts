import {expect, test} from 'vitest';

import {GeoJSON as GJ} from '../../src/index.js';
import {rotateCoord} from '../../src/utils/rotate-coord.js';

const coord: GJ.Position = [0, 45];
const refCoord: GJ.Position = [0, 0];
const angle = 180;

// expect rotCoord to be [0,-45]
test('rotateCoord', () => {
  expect(rotateCoord(coord, refCoord, angle)).toEqual(
    [0.0, -45.0].map((v) => expect.closeTo(v, 4)),
  );
});
