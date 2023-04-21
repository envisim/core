import {rotateCoord} from '../src/rotateCoord.js';

describe('rotateCoord', () => {
  const coord = [0, 45];
  const refCoord = [0, 0];
  const angle = 180;
  const rotCoord = rotateCoord(coord, refCoord, angle);
  // expect rotCoord to be [0,-45]
  test('rotateCoord', () => {
    expect(rotCoord[0]).toBeCloseTo(0, 4);
    expect(rotCoord[1]).toBeCloseTo(-45, 4);
  });
});
