import {describe, expect, test} from 'vitest';

import {randomSystematic, systematic} from '../src/index';
import {RandomMock} from './_Random.testf';
import './_equalArrays.testf';

describe('systematic', () => {
  const ps = [1, 4, 7, 1.5, 5, 6, 1.3, 3, 9].map((e) => (e / 37.8) * 3);
  const rand01 = new RandomMock(0.1);
  const rand99 = new RandomMock(0.9999);

  test('systematic', () => {
    expect(systematic({probabilities: ps, rand: rand01})).arrayToEqual([
      1, 4, 7,
    ]);
    expect(systematic({probabilities: ps, rand: rand99})).arrayToEqual([
      3, 6, 8,
    ]);
  });

  test('random systematic', () => {
    expect(randomSystematic({probabilities: ps, rand: rand01})).arrayToEqual([
      1, 4, 7,
    ]);
    expect(randomSystematic({probabilities: ps, rand: rand99})).arrayToEqual([
      3, 6, 8,
    ]);
  });
});
